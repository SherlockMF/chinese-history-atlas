"""Retrace coarse northern guides along the atlas's printed purple boundary band.

The local scans remain research-only. Coordinates stay in the established
1872 x 1312 page space; no modern frontiers or synthetic roughness are used.
Run with the existing QGIS Python runtime, then build-atlas-context.py.
"""
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import gaussian_filter, map_coordinates, distance_transform_edt
from shapely.geometry import LineString, Polygon
from shapely.validation import explain_validity

ROOT = Path(__file__).resolve().parents[2]
SOURCE_ROOT = Path('D:/历史地图/中国历史地图集')
QA = ROOT / 'output/qa/northern-frontiers'


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def write(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def eligible(a, b):
    x, y = (np.array(a) + b) / 2
    # Northern perimeter and its NW approach, including shared tribal interfaces.
    # The far-west page frame is deliberately excluded from colour retracing.
    return min(a[0], b[0]) > 55 and (y < 365 or (x < 480 and y < 620))


def retrace(a, b, strength, outside):
    start, end = np.array(a, dtype=float), np.array(b, dtype=float)
    length = np.linalg.norm(end - start)
    if length < 12 or not eligible(a, b):
        return [a, b], None
    count = max(3, int(length / 2) + 1)
    guide = np.linspace(start, end, count)
    normal = np.array([-(end - start)[1], (end - start)[0]]) / length
    offsets = np.arange(-22, 23)
    candidates = guide[:, None, :] + offsets[None, :, None] * normal
    coords = np.moveaxis(candidates[..., ::-1], -1, 0)
    values = map_coordinates(strength, coords, order=1, mode='constant')
    if np.mean(values.max(axis=1) > .5) < .92:
        return [a, b], None  # Coast, frame or unresolved ink: retain for manual review.
    cost = -values + .006 * offsets[None, :] ** 2
    # A narrow corridor at each shared junction prevents crossing the next
    # segment when the printed band turns sharply (e.g. the 572 NW junction).
    along = np.linspace(0, length, count)
    corridor = np.minimum(22, np.minimum(along, length-along) * .30)
    cost[np.abs(offsets)[None, :] > corridor[:, None]] = np.inf
    transition = .10 * (offsets[:, None] - offsets[None, :]) ** 2
    scores = np.full(len(offsets), np.inf)
    scores[len(offsets) // 2] = cost[0, len(offsets) // 2]
    back = []
    for row in cost[1:]:
        choices = scores[:, None] + transition
        indices = choices.argmin(axis=0)
        scores = choices[indices, np.arange(len(offsets))] + row
        back.append(indices)
    # Keep junctions fixed, so the same segment can be shared by adjacent rings.
    index = len(offsets) // 2
    indices = [index]
    for previous in reversed(back):
        index = int(previous[index])
        indices.append(index)
    traced = candidates[np.arange(count), list(reversed(indices))]
    points = np.asarray(LineString(traced).simplify(1.0).coords).round(2).tolist()
    points[0], points[-1] = a, b
    before = map_coordinates(outside, guide[:, ::-1].T, order=1)
    after = map_coordinates(outside, traced[:, ::-1].T, order=1)
    return points, dict(guide=[a, b], vertices=len(points),
        oldMeanOutsideBandPx=round(float(before.mean()), 3),
        newMeanOutsideBandPx=round(float(after.mean()), 3),
        maxDisplacementPx=round(float(np.linalg.norm(traced-guide, axis=1).max()), 2))


def main():
    QA.mkdir(parents=True, exist_ok=True)
    guides = read(ROOT / 'gis/context/northern-boundary-guides.json')
    target_path = ROOT / 'gis/context/northern-context-traces.json'
    target = read(target_path)
    sources = {p['year']: p for folder in ['expansion', 'northern-qi-zhou-sui']
               for p in read(ROOT / f'gis/{folder}/atlas-traces.json')['maps']}
    reports = []
    for page in guides['maps']:
        year = page['year']
        source = sources[year]
        matches = list(SOURCE_ROOT.rglob(source['fileLabel']))
        assert len(matches) == 1, f'Ambiguous source {year}: {matches}'
        digest = hashlib.sha256(matches[0].read_bytes()).hexdigest()
        expected = source.get('sourceSha256', source.get('sha256'))
        if expected:
            assert digest == expected, f'Source changed: {year}'
        scan = Image.open(matches[0]).convert('RGB').resize((1872, 1312))
        rgb = np.array(scan, dtype=float)
        red, green, blue = rgb.transpose(2, 0, 1)
        purple = (red-green > 14) & (blue-green > 16) & (red > 90) & (blue > 95)
        density = gaussian_filter(purple.astype(float), 1.2)
        band = density > .28
        strength = distance_transform_edt(band) + density
        outside = distance_transform_edt(~band)
        cache, report = {}, []
        updated = next(p for p in target['maps'] if p['year'] == year)
        draw = ImageDraw.Draw(scan)
        for region in page['regions']:
            ring = []
            for a, b in zip(region['ring'], region['ring'][1:]):
                forward = tuple(a) < tuple(b)
                first, last = (a, b) if forward else (b, a)
                key = (tuple(first), tuple(last))
                if key not in cache:
                    points, audit = retrace(first, last, strength, outside)
                    cache[key] = points
                    if audit:
                        report.append(audit)
                        draw.line([tuple(p) for p in [first, last]], fill='#d53325', width=2)
                        draw.line([tuple(p) for p in points], fill='#005b55', width=1)
                points = cache[key] if forward else list(reversed(cache[key]))
                ring.extend(points[:-1])
            ring.append(ring[0])
            assert Polygon(ring).is_valid, f'Invalid refined ring: {year}/{region["id"]}: {explain_validity(Polygon(ring))}'
            next(r for r in updated['regions'] if r['id'] == region['id'])['ring'] = ring
        scan.save(QA / f'{year}-source-overlay.png')
        reports.append(dict(year=year, sourceFile=source['fileLabel'], sourceSha256=digest,
            pageSize=[1872, 1312], refinedSegments=len(report), segments=report))
        print(year, 'refined', len(report), 'segments;', sum(len(r['ring']) for r in updated['regions']), 'vertices')
    write(target_path, target)
    write(ROOT / 'gis/context/northern-boundary-audit.json', dict(
        method='Purple printed-band centre tracing; fixed shared junctions; 1 px simplification. Pixel fit is not historical frontier precision.', maps=reports))


if __name__ == '__main__':
    main()
