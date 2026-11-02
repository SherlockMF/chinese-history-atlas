"""Regression: display bands must remain a partition in Web Mercator."""
import importlib.util
from pathlib import Path
import json
from pyproj import Transformer
from shapely import make_valid
from shapely.geometry import shape
from shapely.ops import transform, unary_union

spec = importlib.util.spec_from_file_location('atlas', Path(__file__).with_name('build-jin-sixteen-atlas.py'))
atlas = importlib.util.module_from_spec(spec)
spec.loader.exec_module(atlas)
mercator = Transformer.from_crs(4326, 3857, always_xy=True).transform

root = Path(__file__).resolve().parents[2]
scene = next(s for s in json.loads((root / 'data/maps/jin-sixteen-kingdoms/stage-maps.json').read_text(encoding='utf-8')) if s['year'] == 376)
region = shape(next(r for r in scene['regions'] if r['polityId'] == 'northern-context')['geometry'])
controlled = unary_union([shape(r['geometry']) for r in scene['regions'] if r['polityId'] in ['former-qin', 'eastern-jin']])
bands = atlas.coverage_bands(region, region.boundary.difference(controlled.buffer(.15)).buffer(.001))
bands = json.loads(json.dumps(bands))
assert all(shape(b['geometry']).is_valid for b in bands)
projected = [transform(mercator, shape(b['geometry'])) for b in bands]
assert all(b.is_valid for b in projected), 'Serialized display geometry self-intersects in Mercator'
expected = make_valid(transform(mercator, region))
union = unary_union(projected)
overlap = sum(b.area for b in projected) - union.area
spill = union.difference(expected).area
missing = expected.difference(union).area
print({'overlap_m2': overlap, 'spill_m2': spill, 'missing_m2': missing})
assert max(overlap, spill, missing) < expected.area * 1e-7, 'Projection broke the coverage partition'

# Check the actual saved payload too; repairing a projected shape here would
# hide precisely the invalid rings that the renderer must never receive.
saved = json.loads((root / 'data/maps/jin-sixteen-kingdoms/stage-maps.json').read_text(encoding='utf-8'))
legacy = json.loads((root / 'data/maps/jin-sixteen-kingdoms/fill-bands.json').read_text(encoding='utf-8'))
groups = [(str(s['year']) + '/' + r['polityId'], r['fillBands']) for s in saved for r in s['regions'] if r['fillBands']]
groups += [(year + '/' + key, bands) for year, regions in legacy.items() for key, bands in regions.items()]
for name, bands in groups:
    for band in bands:
        polygon = shape(band['geometry'])
        assert polygon.is_valid and transform(mercator, polygon).is_valid, name
print(f'Validated saved geographic and projected fills: {len(groups)} region groups')
