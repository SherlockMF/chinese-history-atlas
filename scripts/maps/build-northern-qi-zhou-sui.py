"""Build the 546/572/612 atlas snapshots using the existing QGIS Python runtime.

Reads only committed vector traces and Natural Earth masks. Scans stay local.
Political boundaries are generalized atlas readings, not surveyed frontiers.
"""
import json
from itertools import combinations
from pathlib import Path

import numpy as np
from pyproj import Transformer
from shapely import segmentize
from shapely.geometry import LineString, MultiLineString, MultiPolygon, Point, Polygon, mapping, shape
from shapely.geometry.polygon import orient
from shapely.ops import transform, unary_union

ROOT = Path(__file__).resolve().parents[2]
GIS = ROOT / "gis/northern-qi-zhou-sui"
DATA = ROOT / "data/maps/northern-qi-zhou-sui"
CRS = "+proj=aea +lat_1=25 +lat_2=47 +lat_0=0 +lon_0=110 +datum=WGS84 +units=m"


def read(path):
    return json.loads(path.read_text(encoding="utf-8"))


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")


def polygons(geometry):
    if geometry.geom_type == "Polygon":
        return [geometry]
    return [p for g in getattr(geometry, "geoms", []) for p in polygons(g)]


def pack(geometry):
    parts = [orient(p, sign=1) for p in polygons(geometry) if p.area > 0.0001]
    result = parts[0] if len(parts) == 1 else MultiPolygon(parts)
    assert result.is_valid and not result.is_empty, "Invalid or empty geometry"
    return result


def lines(geometry):
    if geometry.geom_type in ("LineString", "LinearRing"):
        return [geometry]
    return [line for g in getattr(geometry, "geoms", []) for line in lines(g)]


def projector(source):
    controls = np.array(source["gridControls"])
    to_meters = Transformer.from_crs(4326, CRS, always_xy=True)
    to_geo = Transformer.from_crs(CRS, 4326, always_xy=True)

    def terms(x, y):
        x, y = (np.asarray(x) - 1000) / 1000, (np.asarray(y) - 800) / 1000
        return np.array([np.ones_like(x), x, y, x*x, x*y, y*y]).T

    target = np.array(to_meters.transform(controls[:, 2], controls[:, 3])).T
    matrix = terms(controls[:, 0], controls[:, 1])
    coefficients = np.linalg.lstsq(matrix, target, rcond=None)[0]
    errors = np.linalg.norm(matrix @ coefficients - target, axis=1) / 1000
    assert errors.max() < 35, f"Graticule residual too large: {errors.max()}km"

    def locate(x, y, z=None):
        projected = terms(np.asarray(x) + 650, np.asarray(y) + 450) @ coefficients
        return to_geo.transform(projected[..., 0], projected[..., 1])

    return locate, {"controlRmsKm": float(np.sqrt(np.mean(errors**2))), "controlMaxKm": float(errors.max())}


def build():
    sources = read(GIS / "atlas-traces.json")
    raw_land = unary_union([shape(f["geometry"]) for f in read(ROOT / "gis/continuous/master-land-mask.geojson")["features"]])
    # Offshore Taiwan and Japan are not assigned through a coastal envelope.
    excluded = [p for p in polygons(raw_land) if any(p.covers(Point(point)) for point in [
        (121, 23.5), (138, 36), (143, 43), (133.5, 33.7), (131, 32.5),
    ])]
    lakes = unary_union([shape(f["geometry"]) for f in read(ROOT / "gis/continuous/master-lakes-mask.geojson")["features"]])
    land = raw_land.difference(unary_union(excluded)).difference(lakes).simplify(0.008, preserve_topology=True)
    output, reports, labels, boundaries, outlines = {}, {}, {}, {}, {}
    for source in sources["maps"]:
        year = str(source["year"])
        locate, report = projector(source)
        regions = {}
        for region in source["regions"]:
            ring = []
            for name in region["edges"]:
                points = source["edges"][name.lstrip("-")]
                if name.startswith("-"):
                    points = list(reversed(points))
                if ring:
                    assert ring[-1] == points[0], f"Disconnected edge: {year}/{name}"
                    ring.extend(points[1:])
                else:
                    ring.extend(points)
            assert ring[0] == ring[-1], f"Unclosed ring: {year}/{region['id']}"
            polygon = Polygon(ring)
            assert polygon.is_valid, f"Crossing trace: {year}/{region['id']}"
            regions[region["id"]] = transform(locate, segmentize(polygon, 5))
        for enclave in source.get("enclaves", []):
            polygon = Polygon(enclave["ring"])
            assert polygon.is_valid
            geometry = transform(locate, segmentize(polygon, 5))
            assert unary_union(list(regions.values())).covers(geometry), "Enclave outside traced coverage"
            regions = {key: value.difference(geometry) for key, value in regions.items()}
            regions[enclave["id"]] = geometry
        regions = {key: pack(value.intersection(land)) for key, value in regions.items()}
        for first, second in combinations(regions.values(), 2):
            assert first.intersection(second).area < 1e-8, f"Overlapping regions: {year}"
        labels[year] = {}
        for region in source["regions"] + source.get("enclaves", []):
            geometry = regions[region["id"]]
            point = Point(region["label"])
            assert geometry.contains(point), f"Label outside region: {year}/{region['id']} {point}"
            labels[year][region["id"]] = region["label"]
        output[year] = {key: mapping(value) for key, value in regions.items()}
        traced = [LineString(points) for points in source["edges"].values()]
        traced += [LineString(item["ring"]) for item in source.get("enclaves", [])]
        border = transform(locate, segmentize(unary_union(traced), 5)).intersection(land)
        boundaries[year] = mapping(MultiLineString(lines(border)))
        outlines[year] = {key: mapping(MultiLineString(lines(value.boundary.difference(lakes.buffer(0.012))))) for key, value in regions.items()}
        report.update({"year": source["year"], "fileLabel": source["fileLabel"], "regionCount": len(regions), "bbox": list(unary_union(list(regions.values())).bounds)})
        reports[year] = report
    write(DATA / "geometry.json", output)
    write(DATA / "label-points.json", labels)
    write(DATA / "boundaries.json", boundaries)
    write(DATA / "outlines.json", outlines)
    write(GIS / "calibration-report.json", {"method": sources["method"], "note": "配准残差不等于历史边界精度。海岸与天然湖泊采用现代自然地理定位。", "maps": reports})
    print(json.dumps(reports, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    build()
