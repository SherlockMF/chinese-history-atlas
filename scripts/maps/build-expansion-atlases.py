"""Build the expansion atlases from trace data and a reproducible land mask."""
import importlib.util
import json
from itertools import combinations
from pathlib import Path

import numpy as np
from pyproj import Transformer
from shapely import segmentize
from shapely.geometry import LineString, MultiLineString, Point, Polygon, box, mapping, shape
from shapely.ops import transform, unary_union
from shapely.validation import explain_validity

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('snapshot_helpers', ROOT / 'scripts/maps/build-northern-qi-zhou-sui.py')
helpers = importlib.util.module_from_spec(spec)
spec.loader.exec_module(helpers)
GIS = ROOT / 'gis/expansion'
DATA = ROOT / 'data/maps/expansion'
read, write, pack, polygons, lines = helpers.read, helpers.write, helpers.pack, helpers.polygons, helpers.lines

def projector(source):
    controls = np.array(source['gridControls'])
    to_meters = Transformer.from_crs(4326, helpers.CRS, always_xy=True)
    to_geo = Transformer.from_crs(helpers.CRS, 4326, always_xy=True)
    def terms(x,y):
        x,y = (np.asarray(x)-1000)/1000, (np.asarray(y)-800)/1000
        return np.array([np.ones_like(x),x,y,x*x,x*y,y*y]).T
    target = np.array(to_meters.transform(controls[:,2],controls[:,3])).T
    matrix = terms(controls[:,0],controls[:,1])
    coef = np.linalg.lstsq(matrix,target,rcond=None)[0]
    residual = np.linalg.norm(matrix @ coef-target,axis=1)/1000
    assert residual.max()<35, f"Calibration residual: {source['year']}/{residual.max()}"
    def locate(x,y,z=None):
        p = terms(x,y) @ coef
        return to_geo.transform(p[...,0],p[...,1])
    return locate, dict(controlRmsKm=float(np.sqrt(np.mean(residual**2))),controlMaxKm=float(residual.max()))

def build():
    mask_path = GIS / 'land-mask.geojson'
    if not mask_path.exists():
        # Existing local Natural Earth download; no network or new data dependency.
        raw = unary_union([shape(f['geometry']) for f in read(ROOT/'gis/continuous/land-source.geojson')['features']])
        islands = [p for p in polygons(raw) if any(p.covers(Point(q)) for q in [(121,23.5),(138,36),(143,43),(133.5,33.7),(131,32.5)] )]
        raw = raw.difference(unary_union(islands)).intersection(box(50,14,145,62)).simplify(.008,preserve_topology=True)
        write(mask_path,dict(type='FeatureCollection',features=[dict(type='Feature',properties={'source':'Natural Earth 1:50m land; public domain'},geometry=mapping(raw))]))
    land = unary_union([shape(f['geometry']) for f in read(mask_path)['features']])
    lakes = unary_union([shape(f['geometry']) for f in read(ROOT/'gis/continuous/master-lakes-mask.geojson')['features']])
    land = land.difference(lakes)
    output,labels,boundaries,outlines,reports = {},{},{},{},{}
    for source in read(GIS/'atlas-traces.json')['maps']:
        year = str(source['year'])
        locate, report = projector(source)
        regions = {}
        for region in source['regions']:
            ring = []
            for edge in region['edges']:
                pts = source['edges'][edge.lstrip('-')]
                if edge.startswith('-'): pts = list(reversed(pts))
                if ring:
                    assert ring[-1] == pts[0], f'Disconnected edge {year}/{edge}'
                    ring.extend(pts[1:])
                else: ring.extend(pts)
            assert ring[0]==ring[-1], f'Unclosed {year}/{region["id"]}'
            polygon = Polygon(ring)
            assert polygon.is_valid, f'Crossing trace {year}/{region["id"]}: {explain_validity(polygon)}'
            regions[region['id']] = pack(transform(locate,segmentize(polygon,5)).intersection(land))
        for (a,one),(b,two) in combinations(regions.items(),2):
            assert one.intersection(two).area<1e-8, f'Overlap {year}/{a}/{b}: {one.intersection(two).area}'
        labels[year] = {}
        for region in source['regions']:
            assert regions[region['id']].contains(Point(region['label'])), f'Label outside {year}/{region["id"]}'
            labels[year][region['id']] = region['label']
        output[year] = {key:mapping(value) for key,value in regions.items()}
        border = transform(locate,segmentize(unary_union([LineString(points) for points in source['edges'].values()]),5)).intersection(land)
        boundaries[year] = mapping(MultiLineString(lines(border)))
        outlines[year] = {key:mapping(MultiLineString(lines(value.boundary.difference(lakes.buffer(.012))))) for key,value in regions.items()}
        report.update(year=source['year'],fileLabel=source['fileLabel'],sourceSha256=source['sourceSha256'],regionCount=len(regions),bbox=list(unary_union(list(regions.values())).bounds))
        reports[year]=report
    write(DATA/'geometry.json',output)
    write(DATA/'label-points.json',labels)
    write(DATA/'boundaries.json',boundaries)
    write(DATA/'outlines.json',outlines)
    write(GIS/'calibration-report.json',dict(note='配准残差不等于历史疆界精度；边界是图集尺度概括。',maps=reports))
    print(json.dumps(reports,ensure_ascii=False,indent=2))

if __name__=='__main__': build()
