"""Build explicitly limited key-year core-area scenes, never interpolate borders.

Run with the existing QGIS Python runtime. The input records each year's
attested assignments independently from the generalized geographic envelopes.
"""
import json
from itertools import combinations
from pathlib import Path

from shapely.geometry import MultiPolygon, Point, Polygon, mapping, shape
from shapely.geometry.polygon import orient
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[2]
data = json.loads((ROOT / 'gis/jin-sixteen-kingdoms/key-year-cores.json').read_text(encoding='utf-8'))
land = unary_union([shape(f['geometry']) for f in json.loads((ROOT / 'gis/expansion/land-mask.geojson').read_text(encoding='utf-8'))['features']])
lakes = unary_union([shape(f['geometry']) for f in json.loads((ROOT / 'gis/continuous/master-lakes-mask.geojson').read_text(encoding='utf-8'))['features']])
land = land.difference(lakes)
output, report = [], []
for item in data['maps']:
    regions = []
    for polity_id, keys in item['regions'].items():
        polygons = [Polygon(data['cores'][key]['ring']) for key in keys]
        assert all(p.is_valid for p in polygons), (item['year'], polity_id, 'invalid input')
        geometry = unary_union(polygons).intersection(land)
        assert geometry.is_valid and not geometry.is_empty, (item['year'], polity_id)
        polygons = [geometry] if geometry.geom_type == 'Polygon' else list(geometry.geoms)
        assert all(p.geom_type == 'Polygon' for p in polygons)
        geometry = orient(polygons[0], sign=1) if len(polygons) == 1 else MultiPolygon([orient(p, sign=1) for p in polygons])
        label = data['cores'][keys[0]]['label']
        assert geometry.covers(Point(label)), (item['year'], polity_id, 'label outside')
        regions.append({'polityId': polity_id, 'geometry': mapping(geometry), 'labelPoint': label, 'coreKeys': keys})
    for a, b in combinations(regions, 2):
        assert shape(a['geometry']).intersection(shape(b['geometry'])).area < 1e-8, (item['year'], a['polityId'], b['polityId'], 'overlap')
    output.append({**item, 'regions': regions})
    report.append({'year': item['year'], 'regions': len(regions), 'valid': True, 'overlapArea': 0, 'labelsInside': True})
(ROOT / 'data/maps/jin-sixteen-kingdoms/key-years.json').write_text(json.dumps(output, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
(ROOT / 'gis/jin-sixteen-kingdoms/key-year-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Built {len(output)} key-year core-area scenes; valid, non-overlapping, labels inside.')
