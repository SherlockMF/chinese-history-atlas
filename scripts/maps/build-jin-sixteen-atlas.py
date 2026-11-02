"""Rebuild Jin atlases from reviewed, source-pixel political line networks.

Run with the existing QGIS Python runtime. No scans are redistributed or needed
to rebuild: source hashes, graticules and generalized traces are committed.
"""
import json
from itertools import combinations
from pathlib import Path

import numpy as np
from pyproj import Transformer
from shapely import segmentize, make_valid, set_precision, constrained_delaunay_triangles
from shapely.geometry import LineString, MultiLineString, MultiPolygon, Point, Polygon, box, mapping, shape
from shapely.geometry.polygon import orient
from shapely.ops import polygonize, transform, unary_union
from shapely.validation import explain_validity
from projection_geometry import projection_safe

ROOT = Path(__file__).resolve().parents[2]
GIS = ROOT / 'gis/jin-sixteen-kingdoms'
DATA = ROOT / 'data/maps/jin-sixteen-kingdoms'
CRS = '+proj=aea +lat_1=25 +lat_2=47 +lat_0=0 +lon_0=110 +datum=WGS84 +units=m'


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def write(path, value):
    def rounded(item):
        if isinstance(item, float):
            return round(item, 6)
        if isinstance(item, dict):
            return {key: rounded(child) for key, child in item.items()}
        if isinstance(item, (list, tuple)):
            return [rounded(child) for child in item]
        return item
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(rounded(value), ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')


def parts(geometry, kinds):
    if geometry.is_empty:
        return []
    if geometry.geom_type in kinds:
        return [geometry]
    return [p for g in getattr(geometry, 'geoms', []) for p in parts(g, kinds)]


def pack(geometry):
    polygons = [orient(p, sign=1) for p in parts(geometry, ['Polygon']) if p.area > .0001]
    assert polygons, 'Empty political face'
    result = polygons[0] if len(polygons) == 1 else MultiPolygon(polygons)
    assert result.is_valid
    return result


def projector(source):
    controls = np.asarray(source['gridControls'], dtype=float)
    to_meters = Transformer.from_crs(4326, CRS, always_xy=True)
    to_geo = Transformer.from_crs(CRS, 4326, always_xy=True)

    def terms(x, y):
        x, y = (np.asarray(x) - 950) / 1000, (np.asarray(y) - 650) / 1000
        return np.array([np.ones_like(x), x, y, x*x, x*y, y*y]).T

    target = np.array(to_meters.transform(controls[:, 2], controls[:, 3])).T
    matrix = terms(controls[:, 0], controls[:, 1])
    coefficients = np.linalg.lstsq(matrix, target, rcond=None)[0]
    errors = np.linalg.norm(matrix @ coefficients - target, axis=1) / 1000
    assert errors.max() < 35, f"{source['year']} calibration residual: {errors.max()} km"

    def locate(x, y, z=None):
        projected = terms(x, y) @ coefficients
        return to_geo.transform(projected[..., 0], projected[..., 1])

    return locate, dict(controlRmsKm=float(np.sqrt(np.mean(errors**2))), controlMaxKm=float(errors.max()))


def coverage_bands(region, frame_edges):
    """Partition the fade in the same projection used by MapLibre.

    Geographic-space slivers can self-intersect after Mercator projection,
    causing the renderer to triangulate them into long, visible spikes.
    This changes display geometry only, never the historical political face.
    """
    open_edges = region.boundary.intersection(frame_edges).simplify(.008)
    if open_edges.length < .03:
        return []
    to_map = Transformer.from_crs(4326, 3857, always_xy=True).transform
    to_geo = Transformer.from_crs(3857, 4326, always_xy=True).transform
    working = set_precision(make_valid(transform(to_map, region)), .01)
    edges = transform(to_map, open_edges)
    bands, previous = [], working

    def append_band(geometry, opacity):
        for polygon in parts(geometry, ['Polygon']):
            geographic = transform(to_geo, polygon)
            displayed = transform(to_map, geographic)
            if geographic.is_valid and displayed.is_valid:
                bands.append(dict(geometry=mapping(geographic), opacity=opacity))
            else:
                # A curved inverse projection can make a thin ring cross itself.
                # Convex triangles have no holes and remain valid in both spaces;
                # only unstable pieces need this decomposition.
                for triangle in parts(constrained_delaunay_triangles(polygon), ['Polygon']):
                    geographic = transform(to_geo, triangle)
                    assert geographic.is_valid and transform(to_map, geographic).is_valid
                    bands.append(dict(geometry=mapping(geographic), opacity=opacity))
    for index in range(1, 25):
        interior = working.difference(edges.buffer(200000 * index / 24, quad_segs=4))
        progress = (index - .5) / 24
        append_band(previous.difference(interior), progress * progress * (3 - 2 * progress))
        previous = interior
    append_band(previous, 1)
    shapes = [shape(band['geometry']) for band in bands]
    assert all(s.is_valid for s in shapes), [explain_validity(s) for s in shapes if not s.is_valid][:3]
    displayed = [transform(to_map, s) for s in shapes]
    assert all(s.is_valid for s in displayed)
    combined = unary_union(displayed)
    tolerance = working.area * 1e-7
    assert combined.symmetric_difference(working).area < tolerance, ('coverage', combined.symmetric_difference(working).area, tolerance)
    assert abs(sum(s.area for s in displayed) - combined.area) < tolerance, ('overlap', abs(sum(s.area for s in displayed) - combined.area), tolerance)
    return bands

def build():
    sources = read(GIS / 'atlas-traces.json')
    completion = read(GIS / 'completion-traces.json')
    insets = {str(item['year']): item for item in read(GIS / 'inset-traces.json')['maps']}
    land = unary_union([shape(f['geometry']) for f in read(ROOT / 'gis/expansion/land-mask.geojson')['features']])
    # Offshore closure segments are only construction aids. Never assign the
    # Philippines or other unrelated islands through an ocean envelope.
    mainland = [p for p in parts(land, ['Polygon']) if p.covers(Point(110, 35))]
    hainan = [p for p in parts(land, ['Polygon']) if p.covers(Point(109.5, 19.2))]
    land = unary_union(mainland + hainan)
    lakes = unary_union([shape(f['geometry']) for f in read(ROOT / 'gis/continuous/master-lakes-mask.geojson')['features']])
    land = land.difference(lakes)
    geometry, labels, outlines, metadata, reports, fills, reconstructed = {}, {}, {}, {}, {}, {}, {}
    for source in sources['maps']:
        year = str(source['year'])
        locate, report = projector(source)
        frame = Polygon(source['frame'])
        assert frame.is_valid
        network = unary_union([frame.boundary, *[LineString(edge) for edge in source['edges'].values()]])
        faces = [p for p in polygonize(network) if frame.covers(p.representative_point())]
        regions, used, details = {}, {}, {}
        for region in source['regions']:
            selected = []
            for seed in region['seeds']:
                matches = [(i, face) for i, face in enumerate(faces) if face.contains(Point(seed))]
                assert len(matches) == 1, f"{year}/{region['id']} seed {seed}: {len(matches)} faces"
                index, face = matches[0]
                assert index not in used or used[index] == region['id'], f"{year}/{region['id']}: face already assigned to {used.get(index)}"
                if index in used:
                    continue
                used[index] = region['id']
                selected.append(face)
            raw = unary_union(selected)
            regions[region['id']] = pack(transform(locate, segmentize(raw, 5)).intersection(land))
            details[region['id']] = {key: value for key, value in region.items() if key not in ['seeds', 'label']}
        inset_frames = []
        if year in insets:
            inset = insets[year]
            inset_locate, inset_report = projector(inset)
            polygon = Polygon(inset['ring'])
            assert polygon.is_valid, f'{year}: invalid western inset'
            addition = transform(inset_locate, segmentize(polygon, 3)).intersection(land)
            polity_id = inset['polityId']
            regions[polity_id] = pack(unary_union([regions[polity_id], addition]))
            inset_frames.append(transform(inset_locate, segmentize(Polygon(inset['frame']).boundary, 3)))
            report['insetCalibration'] = inset_report
        excluded = unary_union([transform(locate, segmentize(frame.boundary, 5)), *inset_frames]).buffer(.018)
        original = dict(regions)
        original_lines = {key: value.boundary.difference(excluded).difference(lakes.buffer(.012)) for key, value in regions.items()}
        capitals = [dict(capital) for capital in source.get('capitals', [])]
        label_overrides = {}
        completed = source['year'] in [327, 366, 395, 409]
        if completed:
            def extend(key, trace):
                patch = Polygon(completion[trace]).intersection(land).difference(unary_union(list(regions.values())))
                if not patch.is_empty:
                    regions[key] = pack(unary_union([regions[key], patch]))

            def add_region(key, name, color, boundary_kind, note, polygon):
                regions[key] = pack(polygon)
                details[key] = dict(name=name, color=color, boundaryKind=boundary_kind, note=note)
                label_overrides[key] = list(regions[key].representative_point().coords)[0]

            if year == '327':
                extend('cheng-han', 'chengSouthernTip')
            extend('eastern-jin', 'southernEnvelope')
            details['eastern-jin'].update(name='东晋', note='北界保留本年原图；宁州、交州、广州等南方范围依地理志及区域地理补绘，点线为推定边缘，不表示逐县行政控制。' + ('409年巴蜀谯纵政权单列；广州卢循当时受晋官号，其410年进攻另见事件。' if year == '409' else ''))
            label_overrides['eastern-jin'] = [113, 27.5]
            if year != '327':
                west = {'366': 'former-liang', '395': 'later-liang-sixteen', '409': 'western-liang-sixteen'}[year]
                extend(west, 'westernBridge')
                details[west]['note'] = '河西主图与西域附图均采用本年资料；原图间未绘地带按两侧线端作概括连接，以点线标示。西域为统属示意，不等于所有绿洲均由河西政权直接治理。'
            extend('tuyuhun', 'plateauContext')
            if 'goguryeo' not in regions:
                add_region('goguryeo', '高句丽与东北诸部', '#9aab8a', 'influence', '东北地理背景合组；不表示单一国家或完整政治疆界。', Polygon(completion['northeasternContext']).intersection(land).difference(unary_union(list(regions.values()))))
            else:
                extend('goguryeo', 'northeasternContext')
                details['goguryeo'].update(name='高句丽与东北诸部', boundaryKind='influence', note='高句丽及东北诸部背景合组；补绘仅延续地理背景，不表示高句丽统治全部着色范围。')
            north = {'327': 'xianbei-northern', '366': 'dai', '395': 'northern-wei', '409': 'rouran'}[year]
            add_region('northern-context', '北方与西域诸部', '#b0a4b6', 'influence', '外围地理背景，不表示统一国家或任何一国的统治范围；不把主图以外的诸部归入代、北魏或柔然。', Polygon(completion['northernContext']).intersection(land).difference(unary_union(list(regions.values()))))
            label_overrides['northern-context'] = [104, 49]
            details[north]['note'] += ' 原图外的北方与西域诸部另列为背景，不归属本政权。'
            details[north]['name'] = details[north]['name'].replace('（图内部分）', '')
            if year == '409':
                patch = Polygon(completion['qiaoShu']).intersection(regions['eastern-jin'])
                regions['eastern-jin'] = pack(regions['eastern-jin'].difference(patch))
                add_region('qiao-shu', '谯蜀', '#a08069', 'controlled', '405—413年谯纵据蜀，409年向后秦称藩；据《晋书》卷100校正原图东晋合色。轮廓为巴蜀区域概括补绘，不是已核对的州县界。', patch)
                label_overrides['qiao-shu'] = [103.7, 29.4]
                capitals.append(dict(name='成都', coordinate=[104.06, 30.67], polityId='qiao-shu'))
            patch = Polygon(completion['qiuChi409' if year == '409' else 'qiuChiCore']).intersection(land)
            for key in list(regions):
                regions[key] = pack(regions[key].difference(patch))
            add_region('qiu-chi', '仇池', '#a18c79', 'controlled', '杨氏仇池在陇南的核心范围；327、366年为前仇池，395、409年为后仇池。臣属与受封不等于秦、晋直接控制；边界为区域示意。', patch)
            if year == '409':
                details['qiu-chi']['note'] += ' 据《宋书》卷98补入杨盛部在405—413年占据的汉中。'
            label_overrides['qiu-chi'] = [105.25, 33.6]
        # A disconnected Korean peninsula face inherited the Qin seed through
        # the ocean closure; it is not evidence for Qin control of Baekje/Silla.
        if year == '382':
            korea = regions['former-qin'].intersection(box(126, 33, 132, 38))
            regions['former-qin'] = pack(regions['former-qin'].difference(korea))
            regions['korean-kingdoms'] = pack(korea)
            details['korean-kingdoms'] = dict(name='百济、新罗等', color='#aaa88b', boundaryKind='influence', note='原图半岛南部诸国背景；与前秦无统属关系，不应因跨海闭合而并入前秦。')
            label_overrides['korean-kingdoms'] = [127.5, 36]
        overlap = sum(a.intersection(b).area for a, b in combinations(regions.values(), 2))
        assert overlap < 1e-7, f'{year}: overlapping territory {overlap}'
        labels[year], outlines[year], fills[year], reconstructed[year] = {}, {}, {}, {}
        source_labels = {region['id']: region.get('label') for region in source['regions']}
        controlled = unary_union([s for key, s in regions.items() if details[key]['boundaryKind'] == 'controlled'])
        for key, shape_ in regions.items():
            label = label_overrides.get(key, source_labels.get(key))
            point = Point(label) if label else shape_.representative_point()
            assert shape_.contains(point), f"{year}/{key} label outside: {point}"
            labels[year][key] = list(point.coords)[0]
            known = original_lines.get(key, MultiLineString([])).intersection(shape_.boundary.buffer(.00001))
            outlines[year][key] = mapping(MultiLineString(parts(known, ['LineString', 'LinearRing'])))
            if completed:
                # Draw only the new perimeter, never the join at an old neatline.
                inferred = shape_.boundary.difference(known.buffer(.00002)).difference(lakes.buffer(.012)).difference(land.boundary.buffer(.012))
                if details[key]['boundaryKind'] == 'influence':
                    inferred = inferred.intersection(controlled.buffer(.00002))
                    open_edge = shape_.boundary.difference(controlled.buffer(.15)).difference(land.boundary.buffer(.012))
                    bands = coverage_bands(shape_, open_edge.buffer(.001))
                else:
                    bands = []
                reconstructed[year][key] = mapping(MultiLineString(parts(inferred, ['LineString', 'LinearRing'])))
                if bands:
                    fills[year][key] = bands
        for capital in capitals:
            ids = [key for key, shape_ in regions.items() if shape_.contains(Point(capital['coordinate']))]
            assert ids == [capital['polityId']], f"{year}/{capital['name']}: belongs to {ids} not {capital['polityId']}"
        geometry[year] = {key: mapping(value) for key, value in regions.items()}
        metadata[year] = dict(regions=details, capitals=[{k: v for k, v in capital.items() if k != 'polityId'} for capital in capitals], contextPlaces=source.get('contextPlaces', []), fileLabel=source['fileLabel'], note=(f'{year}年主图与同年附图为底稿；南方、附图缺口及外围据史料补绘，点线单列，不把382年北方疆界挪用到本年。' if completed else source['note']))
        report.update(year=source['year'], fileLabel=source['fileLabel'], sourceSha256=source['sourceSha256'], regionCount=len(regions), frameClosureExcluded=True, openCoverageRegions=list(fills[year]), coverageFootprintPreserved=not completed, reconstructedRegions=list(reconstructed[year]), originalArea=sum(p.area for p in original.values()), completedArea=sum(p.area for p in regions.values()), overlapArea=overlap, bbox=list(unary_union(list(regions.values())).bounds))
        reports[year] = report
    # Preserve shared GEOS nodes: independent six-decimal rounding reopens
    # narrow coastal/enclave seams. Validate controlled fills in display space.
    for year, regions in geometry.items():
        for key, value in regions.items():
            if metadata[year]['regions'][key]['boundaryKind'] == 'controlled':
                regions[key] = mapping(projection_safe(shape(value)))
    (DATA / 'geometry.json').write_text(json.dumps(geometry, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    write(DATA / 'label-points.json', labels)
    write(DATA / 'outlines.json', outlines)
    write(DATA / 'metadata.json', metadata)
    # Rounding display slivers can reintroduce intersections after projection.
    (DATA / 'fill-bands.json').write_text(json.dumps(fills, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    write(DATA / 'reconstructed-outlines.json', reconstructed)
    write(GIS / 'calibration-report.json', dict(method=sources['method'], note='配准残差不等于历史边界精度。自然海岸与湖泊仅作定位，图框与附图遮挡边不作为政治边界。', maps=reports))
    print(json.dumps(reports, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    build()
