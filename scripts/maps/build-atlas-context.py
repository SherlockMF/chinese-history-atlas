"""Project same-year full-plate context; preserve the existing core geometries.

Source rings use normalized full-page pixels. Undefined frontiers remain labels.
Scans are local references and are never copied into the website.
"""
import importlib.util
import sys
from itertools import combinations
from pathlib import Path

from shapely import segmentize
from shapely.geometry import LineString, MultiLineString, Point, Polygon, box, mapping, shape
from shapely.ops import transform, unary_union
from shapely.validation import explain_validity

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('expansion', ROOT/'scripts/maps/build-expansion-atlases.py')
helpers = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helpers)
read, write, pack, lines = helpers.read, helpers.write, helpers.pack, helpers.lines


def build():
    sources, core = {}, {}
    for folder in ['northern-qi-zhou-sui', 'expansion']:
        sources.update({str(item['year']): item for item in read(ROOT/f'gis/{folder}/atlas-traces.json')['maps']})
        core.update(read(ROOT/f'data/maps/{folder}/geometry.json'))
    land = unary_union([shape(f['geometry']) for f in read(ROOT/'gis/expansion/land-mask.geojson')['features']])
    lakes = unary_union([shape(f['geometry']) for f in read(ROOT/'gis/continuous/master-lakes-mask.geojson')['features']])
    land = land.difference(lakes)
    supplements = read(ROOT/'gis/context/western-extent-supplements.json')
    # Use the existing worldwide physical data beyond the old 50E mask.
    wide_land = unary_union([shape(f['geometry']) for f in read(ROOT/'gis/continuous/land-source.geojson')['features']]).intersection(box(30, 14, 150, 62))
    # Zaysan is a natural lake enlarged by a dam (same rule as build-master-atlas).
    wide_lakes = unary_union([shape(f['geometry']) for f in read(ROOT/'gis/continuous/lakes-source.geojson')['features'] if f['properties'].get('featurecla') != 'Reservoir' or f['properties'].get('name') == 'Lake Zaysan'])
    wide_land = wide_land.difference(wide_lakes).simplify(.008, preserve_topology=True)
    output, reports = {}, {}
    for path in sorted((ROOT/'gis/context').glob('*-context-traces.json')):
        for page in read(path)['maps']:
            year = str(page['year'])
            assert year not in output, f'Duplicate year {year}'
            source = sources[year]
            # Unlike the older core trace rings, these pixels have no crop offset.
            locate, report = helpers.projector(source)
            occupied = unary_union([shape(value) for value in core[year].values()])
            supplement = supplements['maps'].get(year)
            regions, shapes, edits, frame_lines = [], {}, [], {}
            for region in page['regions']:
                ring = region['ring']
                shared = region.get('sharedCoreEdge')
                if shared:
                    # Both tracings describe one printed boundary. Reuse the
                    # core samples, including its crop offset, before projection.
                    edge = source['edges'][shared['edge']]
                    segment = edge[edge.index(shared['from']):edge.index(shared['to']) + 1]
                    assert len(segment) > 1
                    dx, dy = shared['offset']
                    ring = (ring[:ring.index(shared['replaceFrom'])]
                            + [[x + dx, y + dy] for x, y in segment]
                            + ring[ring.index(shared['replaceTo']) + 1:])
                polygon = Polygon(ring)
                assert ring[0] == ring[-1]
                assert polygon.is_valid, f'{year}/{region["id"]}: {explain_validity(polygon)}'
                raw = transform(locate, segmentize(polygon, 5))
                extended = supplement and supplement['polityId'] == region['id']
                if extended:
                    assert region.get('frameEdges') == [supplement['frameEdge']]
                    seam = transform(locate, segmentize(LineString(supplement['frameEdge']), 5))
                    patch = Polygon(list(seam.coords) + supplement['outerFromNorth'] + [seam.coords[0]])
                    assert patch.is_valid, f'Invalid supplement {year}: {explain_validity(patch)}'
                    merged = unary_union([raw, patch])
                    # The former closure must now be inside the region, not a new seam.
                    assert merged.boundary.intersection(seam).length < .001
                    raw = unary_union([raw.intersection(land), patch.intersection(wide_land)])
                else:
                    raw = raw.intersection(land)
                overlap = raw.intersection(occupied).area / raw.area
                # Reviewed 612 interfaces: Xi differs by 5–11px; the older Sui
                # southwest trace by 15–30px. Keep the existing generalized core
                # and record the clip, rather than silently raising all limits.
                reviewed_small_interfaces = {'xi-kumo', 'southwestern-peoples'}
                limit = .10 if year == '612' and region['id'] in reviewed_small_interfaces else .08
                if '--audit' in sys.argv:
                    print(f'{year}/{region["id"]}: shared edge clip {overlap:.1%}')
                else:
                    assert overlap < limit, f'Excess overlap {year}/{region["id"]}: {overlap:.1%}'
                geometry = pack(raw.difference(occupied))
                label = list(locate(*region['labelPixel']))
                assert geometry.contains(Point(label)), f'Label outside {year}/{region["id"]}'
                regions.append(dict(polityId=region['id'], name=region['name'], color=region['color'],
                    note=region['note'] + (' ' + supplement['note'] if extended else ''), boundaryKind=region['boundaryKind'], accuracyLevel='reconstructed' if extended else 'approximate',
                    labelPoint=label, geometry=mapping(geometry)))
                shapes[region['id']] = geometry
                if region.get('frameEdges') and not extended:
                    frame_lines[region['id']] = transform(locate, segmentize(
                        MultiLineString(region['frameEdges']), 5))
                occupied = unary_union([occupied, geometry])
                edits.append(dict(id=region['id'], sharedEdgeClipPercent=round(overlap*100, 3),
                                  **({'sharedCoreEdge': shared} if shared else {})))
            for first, second in combinations(shapes.values(), 2):
                assert first.intersection(second).area < 1e-8
            places = [dict(id=p['id'], name=p['name'], coordinate=list(locate(*p['pixel'])), note=p['note']) for p in page['places']]
            outlines = {}
            for key, value in shapes.items():
                boundary = value.boundary.difference((wide_lakes if supplement and key == supplement['polityId'] else lakes).buffer(.012))
                if key in frame_lines:
                    # Closing a fill at the scan edge must not invent a frontier.
                    boundary = boundary.difference(frame_lines[key].buffer(.002))
                    assert boundary.intersection(frame_lines[key]).length < 1e-8
                outlines[key] = mapping(MultiLineString(lines(boundary)))
            output[year] = dict(regions=regions, places=places, outlines=outlines)
            if supplement:
                output[year].update(supplementSources=supplements['sources'], supplementNote=supplement['scopeNote'])
            reports[year] = dict(**report, fileLabel=source['fileLabel'], sourceSha256=source.get('sourceSha256', source.get('sha256')),
                traceFile=str(path.relative_to(ROOT)).replace('\\', '/'), regionCount=len(regions), nameCount=len(places), sharedEdgeClips=edits,
                omittedFrameEdges={r['id']:r['frameEdges'] for r in page['regions'] if r.get('frameEdges')},
                completedFrameEdge=supplement['frameEdge'] if supplement else None)
    if '--audit' in sys.argv:
        return
    write(ROOT/'data/maps/context/atlas-context.json', output)
    write(ROOT/'gis/context/calibration-report.json', dict(note='配准残差不是历史边界精度；共享边的微小采样差异以既有主体为准。', maps=reports))
    for year, report in reports.items():
        print(f"{year}: {report['regionCount']} regions, {report['nameCount']} names; max shared edge clip {max((p['sharedEdgeClipPercent'] for p in report['sharedEdgeClips']), default=0)}%")


if __name__ == '__main__':
    build()
