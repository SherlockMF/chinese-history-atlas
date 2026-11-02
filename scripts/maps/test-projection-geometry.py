"""Regress the actual ring failures found by the all-topic display audit."""
import json
import unittest
from pathlib import Path

from shapely.geometry import Polygon, shape
from shapely.ops import transform
from projection_geometry import TO_MAP, projection_safe

ROOT = Path(__file__).resolve().parents[2]


class ProjectionTests(unittest.TestCase):
    def test_valid_faces_are_not_rewritten(self):
        face = Polygon([(100, 30), (101, 30), (101, 31), (100, 30)])
        self.assertIs(projection_safe(face), face)

    def test_all_runtime_annual_fills_are_valid_after_projection(self):
        registry = json.loads((ROOT / 'data/maps/continuous-registry.json').read_text(encoding='utf-8'))
        for snapshot in {row['snapshotId'] for row in registry['years']}:
            path = ROOT / 'public' / registry['manifests'][snapshot]['files']['realms'].lstrip('/')
            for feature in json.loads(path.read_text(encoding='utf-8'))['features']:
                with self.subTest(snapshot=snapshot, region=feature['properties']['id']):
                    face = shape(feature['geometry'])
                    self.assertTrue(face.is_valid)
                    self.assertTrue(transform(TO_MAP, face).is_valid)

    def test_northern_shared_contacts_have_no_land_holes(self):
        core = json.loads((ROOT / 'data/maps/northern-qi-zhou-sui/geometry.json').read_text(encoding='utf-8'))
        context = json.loads((ROOT / 'data/maps/context/atlas-context.json').read_text(encoding='utf-8'))
        # Reviewed against the same-year printed contact, not natural lake holes.
        points = {'546': [(103.7496, 32.5736), (95.2856, 39.311), (97.3538, 38.9973), (103.665, 33.7008)],
                  '572': [(100.8676, 36.282), (97.4541, 38.9308), (95.3192, 39.3017), (94.3153, 39.7519)]}
        from shapely.geometry import Point
        for year, samples in points.items():
            regions = [shape(value) for value in core[year].values()]
            regions += [shape(r['geometry']) for r in context[year]['regions'] if r['polityId'] == 'tuyuhun']
            for point in samples:
                with self.subTest(year=year, point=point):
                    self.assertEqual(sum(region.covers(Point(point)) for region in regions), 1)


if __name__ == '__main__':
    unittest.main()
