import { describe, expect, it } from "vitest";
import { mapSnapshots } from "@/data/series/northern-qi-zhou-sui/map-snapshots";
import { resolveSeriesSnapshot } from "@/lib/history/series-snapshots";
import type { SnapshotRegion } from "@/types/series";

function inRing([x, y]: number[], ring: number[][]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [a, b] = ring[i], [c, d] = ring[j];
    if ((b > y) !== (d > y) && x < (c - a) * (y - b) / (d - b) + a) inside = !inside;
  }
  return inside;
}
function contains(region: SnapshotRegion, point: number[]) {
  const polygons = region.geometry.type === "Polygon" ? [region.geometry.coordinates] : region.geometry.coordinates;
  return polygons.some(([outer, ...holes]) => inRing(point, outer) && !holes.some((hole) => inRing(point, hole)));
}
const owners = (year: number, point: number[]) => mapSnapshots.find((s) => s.year === year)?.regions.filter((r) => contains(r, point)).map((r) => r.polityId);

describe("original atlas snapshots", () => {
  it("uses the atlas dates and same-year sources", () => {
    expect(mapSnapshots.map((s) => s.year)).toEqual([546, 572, 612]);
    for (const snapshot of mapSnapshots) {
      expect(snapshot.status).toBe("ready");
      expect(snapshot.sources.some((s) => s.referenceYear === snapshot.year && s.title.includes("中国历史地图集"))).toBe(true);
    }
  });
  it("does not backdate the Sui atlas to the unification year", () => {
    expect(resolveSeriesSnapshot(mapSnapshots, 550)?.year).toBe(546);
    expect(resolveSeriesSnapshot(mapSnapshots, 589)?.year).toBe(572);
    expect(resolveSeriesSnapshot(mapSnapshots, 612)?.year).toBe(612);
  });
  it("retains the southern coastal extension shown on the Sui atlas", () => {
    expect(owners(612, [105.7, 18.7])).toEqual(["sui"]);
  });
  it("places capitals and western/southern cities inside their own polity", () => {
    for (const [year, points] of [
      [546, [[108.94, 34.26, "western-wei"], [114.4, 36.3, "eastern-wei"], [118.8, 32.06, "southern-liang"], [104.06, 30.67, "southern-liang"]]],
      [572, [[108.94, 34.26, "northern-zhou"], [114.4, 36.3, "northern-qi"], [118.8, 32.06, "chen"], [104.06, 30.67, "northern-zhou"], [112.2, 30.35, "western-liang"]]],
      [612, [[108.94, 34.26, "sui"], [112.45, 34.62, "sui"], [113.27, 23.13, "sui"], [94.66, 40.14, "sui"]]],
    ] as const) for (const [lon, lat, polity] of points) expect(owners(year, [lon, lat])).toEqual([polity]);
    for (const snapshot of mapSnapshots) {
      expect(owners(snapshot.year, [121, 23.5])).toEqual([]);
      for (const region of snapshot.regions) expect(owners(snapshot.year, region.labelPoint)).toEqual([region.polityId]);
    }
  });
});
