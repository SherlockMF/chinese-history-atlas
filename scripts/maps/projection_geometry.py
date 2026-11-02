"""Offline repair of numerical ring crossings in both map coordinate systems."""
from pyproj import Transformer
from shapely import make_valid, set_precision
from shapely.geometry import LineString, Point, Polygon, MultiPolygon
from shapely.ops import transform, unary_union
from shapely.validation import explain_validity

TO_MAP = Transformer.from_crs(4326, 3857, always_xy=True).transform
TO_GEO = Transformer.from_crs(3857, 4326, always_xy=True).transform


def polygons(geometry):
    if geometry.geom_type == 'Polygon':
        return [geometry]
    return [p for child in getattr(geometry, 'geoms', []) for p in polygons(child)]


def node_contacts(geometry):
    """Insert existing touching vertices on the opposite edge before projection."""
    for _ in range(12):
        projected = transform(TO_MAP, geometry)
        if projected.is_valid:
            return geometry
        reason = explain_validity(projected)
        assert 'Self-intersection[' in reason, reason
        x, y = map(float, reason.split('[')[1].rstrip(']').split())
        point = Point(TO_GEO(x, y))
        vertices = {p for poly in polygons(geometry) for ring in [poly.exterior, *poly.interiors]
                    for p in ring.coords if Point(p).distance(point) < .1}
        output, inserted = [], 0
        for poly in polygons(geometry):
            rings = []
            for ring in [poly.exterior, *poly.interiors]:
                coordinates, result = list(ring.coords), []
                for a, b in zip(coordinates, coordinates[1:]):
                    result.append(a)
                    line = LineString([a, b])
                    if line.distance(point) > .1:
                        continue
                    nodes = sorted((v for v in vertices if v not in (a, b) and line.distance(Point(v)) < 1e-9),
                                   key=lambda v: line.project(Point(v)))
                    result.extend(nodes)
                    inserted += len(nodes)
                rings.append(result + [coordinates[-1]])
            output.append(Polygon(rings[0], rings[1:]))
        if not inserted:
            return geometry
        geometry = unary_union(polygons(make_valid(MultiPolygon(output))))
    return geometry


def projection_safe(geometry):
    """Keep valid faces unchanged; reject repairs larger than rounding slivers.

    A straight geographic segment is not straight in Web Mercator. Touching
    coast/lake rings can therefore cross after projection even when GEOS accepts
    the geographic polygon. Repair in display space and verify the round trip.
    """
    original = unary_union(polygons(make_valid(geometry)))
    if geometry.is_valid and transform(TO_MAP, geometry).is_valid:
        return geometry
    repaired = node_contacts(original)
    if not transform(TO_MAP, repaired).is_valid:
        projected = unary_union(polygons(make_valid(transform(TO_MAP, repaired))))
        repaired = transform(TO_GEO, projected)
        if not repaired.is_valid or not transform(TO_MAP, repaired).is_valid:
            # Some inverse transforms move a shared ring node by machine epsilon.
            # Try micrometre-to-centimetre display grids, never pixel-scale blur.
            for grid in (0.00001, 0.0001, 0.001, 0.01):
                candidate = transform(TO_GEO, set_precision(projected, grid))
                if candidate.is_valid and transform(TO_MAP, candidate).is_valid:
                    repaired = candidate
                    break
    assert repaired.is_valid and transform(TO_MAP, repaired).is_valid, 'Unresolved projection crossing'
    assert repaired.geom_type in ('Polygon', 'MultiPolygon') and not repaired.is_empty
    assert original.symmetric_difference(repaired).area < 1e-7, 'Repair exceeds numerical sliver budget'
    return repaired
