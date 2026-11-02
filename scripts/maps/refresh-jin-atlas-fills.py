"""Refresh display fades only, preserving calibrated atlas political geometry."""
import importlib.util
import json
from pathlib import Path
from shapely.geometry import shape
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('atlas', Path(__file__).with_name('build-jin-sixteen-atlas.py'))
atlas = importlib.util.module_from_spec(spec)
spec.loader.exec_module(atlas)
data = ROOT / 'data/maps/jin-sixteen-kingdoms'
geometry = atlas.read(data / 'geometry.json')
metadata = atlas.read(data / 'metadata.json')
fills = atlas.read(data / 'fill-bands.json')
land = unary_union([shape(f['geometry']) for f in atlas.read(ROOT / 'gis/expansion/land-mask.geojson')['features']])
lakes = unary_union([shape(f['geometry']) for f in atlas.read(ROOT / 'gis/continuous/master-lakes-mask.geojson')['features']])
land_edge = land.difference(lakes).boundary.buffer(.012)
for year, regions in fills.items():
    # Legacy atlas files used six-decimal coordinates. Repair only the local
    # clipping masks; the archived political geometry is never rewritten here.
    shapes = {key: atlas.make_valid(shape(value)) for key, value in geometry[year].items()}
    controlled = unary_union([s for key, s in shapes.items() if metadata[year]['regions'][key]['boundaryKind'] == 'controlled']).buffer(.15)
    for key in regions:
        face = shapes[key]
        regions[key] = atlas.coverage_bands(face, face.boundary.difference(controlled).difference(land_edge).buffer(.001))
    print(f'Rebuilt display fills: {year}', flush=True)
(data / 'fill-bands.json').write_text(json.dumps(fills, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
