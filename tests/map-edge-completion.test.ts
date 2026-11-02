import { describe, expect, it } from "vitest";
import type { Polygon, MultiPolygon } from "geojson";
import { mapSnapshots } from "@/data/series/northern-qi-zhou-sui/map-snapshots";
import { expansionMapSnapshots } from "@/data/series/expansion/map-snapshots";
import { createSnapshotAtlas } from "@/features/history-map/atlas/snapshot-atlas";

function contains(geometry: Polygon | MultiPolygon, point: [number, number]) {
  const insideRing = (ring: number[][]) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [x, y] = ring[i], [px, py] = ring[j];
      if ((y > point[1]) !== (py > point[1]) && point[0] < (px - x) * (point[1] - y) / (py - y) + x) inside = !inside;
    }
    return inside;
  };
  return (geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates)
    .some(rings => insideRing(rings[0]) && !rings.slice(1).some(insideRing));
}

describe("map extent completion", () => {
  it.each([572, 612])("preserves %i western reference geometry but displays peripheral context as labels only", year => {
    const snapshot = mapSnapshots.find(s => s.year === year)!;
    const region = snapshot.regions.find(r => r.polityId === (year === 572 ? "turks-northern-western-peoples" : "western-turks-western-states"))!;
    // Land immediately west of the old diagonal page cut, east of the Caspian.
    expect(contains(region.geometry, [55.5, 43])).toBe(true);
    expect(contains(region.geometry, [51, 48])).toBe(true);
    expect(contains(region.geometry, [51, 42])).toBe(false);
    expect(contains(region.geometry, [83.4351, 48.7253])).toBe(false);
    // Later conquests must not be backdated to 572 / 612.
    expect(contains(region.geometry, [34, 45])).toBe(false);
    expect(contains(region.geometry, [44.8, 41.7])).toBe(false);
    expect(region.displayMode).toBe("label-only");
    expect(snapshot.scopeNote).toContain("不据此绘制疆域");
    const atlas = createSnapshotAtlas(snapshot, []);
    expect(atlas.realms.features.some(feature => feature.properties.dynastyId === region.polityId)).toBe(false);
    expect(snapshot.sources.some(s => s.title.includes("Осмонов"))).toBe(true);
    const source = atlas.sources.find(s => s.title.includes("Осмонов"))!;
    expect(source.note).toContain("通期");
    expect(source.note).not.toContain(`${year}年图页`);
  });
  it("follows the 879 eastern outer border rather than closing at the page edge or looping around internal districts", () => {
    const region = expansionMapSnapshots.find(s => s.year === 879)!.regions.find(r => r.polityId === "nanzhao")!;
    expect(contains(region.geometry, [105.6078, 23.6998])).toBe(false);
    expect(contains(region.geometry, [105.5657, 22.9929])).toBe(false);
    expect(contains(region.geometry, [104.7603, 23.0299])).toBe(true);
  });
});
