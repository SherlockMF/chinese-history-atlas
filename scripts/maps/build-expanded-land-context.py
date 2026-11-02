"""Provide natural land context outside the original offline PMTiles extent.

Uses the existing Natural Earth downloads. No modern boundaries or place names.
"""
import json
from pathlib import Path
from shapely.geometry import box, mapping, shape
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[2]
def read(name):
    source = ROOT / f'gis/continuous/{name}-source.geojson'
    features = json.loads(source.read_text(encoding='utf-8'))['features']
    return unary_union([shape(f['geometry']) for f in features if f['properties'].get('featurecla') != 'Reservoir' or f['properties'].get('name') == 'Lake Zaysan'])

land = read('land').intersection(box(30,14,150,62))
lakes = read('lakes').intersection(box(30,14,150,62))
context = land.difference(lakes).simplify(.015,preserve_topology=True)
assert context.is_valid and not context.is_empty
target = ROOT / 'public/maps/base/atlas-land-context.geojson'
target.write_text(json.dumps(dict(type='FeatureCollection',features=[dict(type='Feature',properties={'source':'Natural Earth 1:50m land and lakes','license':'Public domain','scope':'30–150E, 14–62N; physical context only'},geometry=mapping(context))]),ensure_ascii=False,separators=(',',':'))+'\n',encoding='utf-8')
print(f'Wrote {target.name}: {target.stat().st_size} bytes')
