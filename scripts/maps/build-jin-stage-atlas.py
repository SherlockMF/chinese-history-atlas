"""Build the eight reconstructed key-year stage scenes.

No dated atlas political geometry is imported. Stable geographic chains and
year-specific frontiers/enclaves are reviewed inputs; land/lake masks are physical
context. Shared lines do not imply that political ownership is stable over time.
"""
import importlib.util
import json
import sys
from itertools import combinations
from pathlib import Path

from shapely.geometry import LineString, MultiLineString, Point, Polygon, mapping, shape
from shapely.ops import unary_union
from projection_geometry import projection_safe

ROOT = Path(__file__).resolve().parents[2]
GIS = ROOT / 'gis/jin-sixteen-kingdoms'
DATA = ROOT / 'data/maps/jin-sixteen-kingdoms'
spec = importlib.util.spec_from_file_location('jin_atlas_helpers', ROOT / 'scripts/maps/build-jin-sixteen-atlas.py')
helpers = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helpers)
read, write, pack, parts = helpers.read, helpers.write, helpers.pack, helpers.parts


def region_polygon(region, chains):
    if 'rings' in region:
        return unary_union([region_polygon({'id': region['id'], 'ring': ring}, chains) for ring in region['rings']])
    if 'ring' in region:
        ring = region['ring']
    else:
        ring = []
        for name in region['chains']:
            points = chains[name.lstrip('-')]
            if name.startswith('-'):
                points = list(reversed(points))
            if ring:
                # A second chain may connect by its other end; never join by a
                # synthetic segment that could silently change the frontier.
                if ring[-1] == points[-1]:
                    points = list(reversed(points))
                assert ring[-1] == points[0], (region['id'], name, 'open junction')
                ring += points[1:]
            else:
                ring += points
    assert ring[0] == ring[-1], (region['id'], 'open ring')
    polygon = Polygon(ring)
    assert polygon.is_valid and not polygon.is_empty, (region['id'], 'invalid input')
    return polygon


def build():
    traces = read(GIS / 'stage-traces.json')
    raw_land = unary_union([shape(f['geometry']) for f in read(ROOT / 'gis/expansion/land-mask.geojson')['features']])
    land = unary_union([p for p in parts(raw_land, ['Polygon']) if p.covers(Point(110, 35)) or p.covers(Point(109.5, 19.2))])
    lakes = unary_union([shape(f['geometry']) for f in read(ROOT / 'gis/continuous/master-lakes-mask.geojson')['features']])
    land = land.difference(lakes)
    land_edge = land.boundary.buffer(.008)
    lake_edge = lakes.boundary.buffer(.008)
    selected_years = {int(year) for year in sys.argv[1:]}
    assert selected_years <= {scene['year'] for scene in traces['maps']}, 'unknown year'
    output = [scene for scene in read(DATA / 'stage-maps.json') if scene['year'] not in selected_years] if selected_years else []
    reports = [report for report in read(GIS / 'stage-report.json') if report['year'] not in selected_years] if selected_years else []
    for scene in traces['maps']:
        if selected_years and scene['year'] not in selected_years:
            continue
        raw = {region['id']: region_polygon(region, scene['chains']).intersection(land) for region in scene['regions']}
        geometries, details = {}, {}
        for region in scene['regions']:
            subtract = [raw[key] for key in region.get('subtract', [])]
            geometry = raw[region['id']].difference(unary_union(subtract))
            geometries[region['id']] = pack(geometry)
            details[region['id']] = region
        controlled = unary_union(list(geometries.values()))
        controlled_edge = controlled.buffer(.00001)
        controlled_margin = controlled.buffer(.15)
        # Background priority describes geography only, never competing claims.
        for original_context in traces['contexts']:
            context = {**original_context, **scene.get('contextOverrides', {}).get(original_context['id'], {})}
            geometry = Polygon(context['ring']).intersection(land).difference(unary_union(list(geometries.values())))
            assert geometry.is_valid and not geometry.is_empty, (scene['year'], context['id'], 'empty context')
            geometries[context['id']] = pack(geometry)
            details[context['id']] = {**context, 'boundaryKind': 'influence', 'context': True}
        overlap = sum(a.intersection(b).area for a, b in combinations(geometries.values(), 2))
        assert overlap < 1e-7, (scene['year'], 'overlapping regions', [
            (a, b, left.intersection(right).area) for (a, left), (b, right) in combinations(geometries.items(), 2)
            if left.intersection(right).area > 1e-7
        ])
        regions = []
        for key, geometry in geometries.items():
            info = details[key]
            label = info['label']
            assert geometry.contains(Point(label)), (scene['year'], key, 'label outside', label)
            boundary = geometry.boundary.difference(land_edge).difference(lake_edge)
            bands = []
            if info.get('context'):
                boundary = boundary.intersection(controlled_edge)
                open_edge = geometry.boundary.difference(controlled_margin).difference(land_edge)
                bands = helpers.coverage_bands(geometry, open_edge.buffer(.001))
            regions.append({
                'polityId': key, 'name': info['name'], 'color': info['color'], 'geometry': mapping(projection_safe(geometry) if key in raw else geometry),
                'labelPoint': label, 'note': info['note'], 'accuracyLevel': 'reconstructed',
                'boundaryKind': info.get('boundaryKind', 'controlled'), 'fillBands': bands,
                'outline': mapping(MultiLineString(parts(boundary, ['LineString', 'LinearRing']))),
            })
        for capital in scene['capitals']:
            owners = [key for key, polygon in geometries.items() if polygon.contains(Point(capital['coordinate']))]
            assert owners == [capital['polityId']], (scene['year'], capital['name'], owners)
        output.append({**{key: scene[key] for key in ['year', 'label', 'note', 'scopeNote', 'accuracyNote', 'sources', 'contextPlaces', 'boundaryEvidence']},
                       'capitals': [{key: value for key, value in capital.items() if key != 'polityId'} for capital in scene['capitals']], 'regions': regions})
        reports.append({'year': scene['year'], 'regionCount': len(regions), 'overlapArea': overlap,
                        'valid': True, 'capitalsUnique': True, 'sharedChains': list(scene['chains']),
                        'area': sum(p.area for p in geometries.values()), 'bounds': list(unary_union(list(geometries.values())).bounds),
                        'method': 'independent-stage-reconstruction', 'boundaryEvidence': scene['boundaryEvidence']})
        print(f"Built {scene['year']}: {len(regions)} regions", flush=True)
    # Keep GEOS coordinates: rounding narrow coastal slivers independently can
    # introduce self-intersections. Validate the exact payload readers receive.
    serialized = json.dumps(output, ensure_ascii=False, separators=(',', ':')) + '\n'
    for scene in json.loads(serialized):
        for region in scene['regions']:
            assert shape(region['geometry']).is_valid, (scene['year'], region['polityId'], 'serialized geometry invalid')
            for band in region['fillBands']:
                assert shape(band['geometry']).is_valid, (scene['year'], region['polityId'], 'serialized fill invalid')
    (DATA / 'stage-maps.json').write_text(serialized, encoding='utf-8')
    write(GIS / 'stage-report.json', reports)
    print(json.dumps(reports, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    build()
