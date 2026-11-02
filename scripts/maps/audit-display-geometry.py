"""Read-only audit of all dated political displays, excluding background labels."""
import json
import sys
from itertools import combinations
from pathlib import Path
from shapely import make_valid
from shapely.geometry import shape, Polygon
from shapely.ops import unary_union, transform
from shapely.validation import explain_validity
from shapely.strtree import STRtree
from pyproj import Transformer

ROOT = Path(__file__).resolve().parents[2]
read = lambda p: json.loads((ROOT / p).read_text(encoding='utf-8'))
project = Transformer.from_crs(4326, 3857, always_xy=True).transform
# Lake envelopes also exclude small lake islands omitted by the source land
# mask. These physical voids must not be assigned to a neighbouring polity.
water = []
for feature in read('gis/continuous/lakes-source.geojson')['features']:
    if feature['properties'].get('featurecla') == 'Reservoir' and feature['properties'].get('name') != 'Lake Zaysan':
        continue
    geometry = make_valid(shape(feature['geometry']))
    water.extend(Polygon(p.exterior) for p in getattr(geometry, 'geoms', [geometry]) if p.geom_type == 'Polygon')
water_index = STRtree(water)
plates = []
metadata = read('data/maps/jin-sixteen-kingdoms/metadata.json')
for year, regions in read('data/maps/jin-sixteen-kingdoms/geometry.json').items():
    plates.append((f'jin-{year}', {k: v for k, v in regions.items() if metadata[year]['regions'][k]['boundaryKind'] != 'influence'}))
traces = read('gis/jin-sixteen-kingdoms/stage-traces.json')
for scene in read('data/maps/jin-sixteen-kingdoms/stage-maps.json'):
    ids = {r['id'] for r in next(s for s in traces['maps'] if s['year'] == scene['year'])['regions']}
    plates.append((f'stage-{scene["year"]}', {r['polityId']: r['geometry'] for r in scene['regions'] if r['polityId'] in ids}))
context = read('data/maps/context/atlas-context.json')
for folder in ['expansion', 'northern-qi-zhou-sui']:
    for year, regions in read(f'data/maps/{folder}/geometry.json').items():
        regions.update({r['polityId']: r['geometry'] for r in context.get(year, {}).get('regions', []) if r.get('boundaryKind') != 'influence'})
        plates.append((f'{folder}-{year}', regions))
registry = read('data/maps/continuous-registry.json')
active_ids = {record['snapshotId'] for record in registry['years']}
for manifest in registry['manifests'].values():
    if manifest['id'] not in active_ids:
        continue  # Exclude archive files and the labels-only fixed 943 reference.
    path = ROOT / 'public' / manifest['files']['realms'].lstrip('/')
    data = json.loads(path.read_text(encoding='utf-8'))
    plates.append((path.parent.name, {f['properties']['id']: f['geometry'] for f in data['features']}))

results = []
for name, source in plates:
    geometries = {key: shape(value) for key, value in source.items()}
    invalid = []
    for key, geometry in geometries.items():
        projected = transform(project, geometry)
        if not geometry.is_valid or not projected.is_valid:
            invalid.append({'id': key, 'geographic': explain_validity(geometry), 'projected': explain_validity(projected)})
    valid = {key: make_valid(value) for key, value in geometries.items()}
    overlaps = [{'ids': [a, b], 'area': left.intersection(right).area}
                for (a, left), (b, right) in combinations(valid.items(), 2) if left.intersection(right).area > 1e-7]
    union = unary_union(list(valid.values()))
    gaps = []
    for polygon in getattr(union, 'geoms', [union]):
        if polygon.geom_type != 'Polygon':
            continue
        for ring in polygon.interiors:
            hole = Polygon(ring)
            nearby_water = unary_union([water[index] for index in water_index.query(hole)])
            gap = hole.difference(nearby_water.buffer(.002))
            if gap.area > .005:
                point = gap.representative_point()
                gaps.append({'area': gap.area, 'bounds': list(gap.bounds), 'point': [point.x, point.y],
                             'neighbors': [key for key, value in valid.items() if gap.distance(value) < .005]})
    results.append({'map': name, 'regions': len(source), 'invalid': invalid, 'overlaps': overlaps, 'landGaps': gaps})
output = ROOT / 'output/playwright/display-geometry-audit.json'
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'maps': len(results), 'regions': sum(r['regions'] for r in results),
                  'invalid': sum(len(r['invalid']) for r in results), 'overlaps': sum(len(r['overlaps']) for r in results),
                  'landGaps': sum(len(r['landGaps']) for r in results)}, ensure_ascii=False))
for r in results:
    if r['invalid'] or r['overlaps'] or r['landGaps']:
        print(json.dumps(r, ensure_ascii=False))
if '--check' in sys.argv and any(r['invalid'] or r['overlaps'] or r['landGaps'] for r in results):
    sys.exit(1)
