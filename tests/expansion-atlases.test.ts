import { describe, expect, it } from "vitest";
import { expansionConfigs } from "@/data/series/expansion/configs";
import { expansionMapSnapshots } from "@/data/series/expansion/map-snapshots";
import { getSeriesRepository } from "@/lib/repositories/series-repository";
import { createSnapshotAtlas } from "@/features/history-map/atlas/snapshot-atlas";
import type { Polygon, MultiPolygon } from "geojson";

function contains(geometry: Polygon | MultiPolygon, [x, y]: number[]) {
  const inRing = (ring: number[][]) => {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [a, b] = ring[i], [c, d] = ring[j];
      if ((b > y) !== (d > y) && x < (c - a) * (y - b) / (d - b) + a) inside = !inside;
    }
    return inside;
  };
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.some(([outer, ...holes]) => inRing(outer) && !holes.some(inRing));
}

describe("complete expansion atlases", () => {
  it("keeps all capitals on their own land and preserves the change in Shandong", () => {
    for (const snapshot of expansionMapSnapshots) {
      for (const capital of snapshot.capitals ?? []) {
        expect(snapshot.regions.filter(r => contains(r.geometry, capital.coordinate))).toHaveLength(1);
      }
      expect(snapshot.regions.some(r => contains(r.geometry, [121, 23.5]))).toBe(false);
    }
    const shandong = [118.48, 36.68];
    const at = (id: string, year: number) => {
      const region = expansionMapSnapshots.find(s => s.seriesId === id && s.year === year)?.regions[0];
      if (!region) throw new Error(`Missing atlas: ${id} ${year}`);
      return region;
    };
    expect(contains(at("southern-dynasties", 449).geometry, shandong)).toBe(true);
    expect(contains(at("northern-wei", 449).geometry, shandong)).toBe(false);
    expect(contains(at("northern-wei", 497).geometry, shandong)).toBe(true);
  });
  it("provides dated territory maps for all six series", async () => {
    const repo = getSeriesRepository();
    for (const series of expansionConfigs) {
      expect(series.mapMode).toBe("snapshot");
      const snapshots = await repo.getSeriesMapSnapshots(series.id);
      expect(snapshots.length).toBeGreaterThanOrEqual(2);
      const dynasties = await repo.getSeriesDynasties(series.id);
      for (const snapshot of snapshots) {
        expect(snapshot.status).toBe("ready");
        expect(snapshot.regions.length).toBeGreaterThan(0);
        expect(snapshot.sources.some(s => s.referenceYear === snapshot.year)).toBe(true);
        expect(snapshot.sources.every(s => s.redistributable === false)).toBe(true);
        for (const region of snapshot.regions) {
          expect(dynasties.some(d => d.id === region.polityId) || Boolean(region.name && region.color)).toBe(true);
          expect(region.geometry.coordinates.length).toBeGreaterThan(0);
        }
        const atlas = createSnapshotAtlas(snapshot, dynasties);
        expect(atlas.boundaries?.features.length).toBeGreaterThan(0);
        expect(atlas.places.features.length).toBeGreaterThan(0);
        expect(atlas.realms.features.every(f => f.properties.name !== f.properties.dynastyId)).toBe(true);
      }
    }
  });
  it("keeps distinct early and late realms instead of relabelling one shape", () => {
    const series = (id: string) => expansionMapSnapshots.filter(s => s.seriesId === id);
    expect(series("northern-wei").map(s => s.year)).toEqual([449, 497]);
    expect(series("southern-dynasties").map(s => s.year)).toEqual([449, 497, 546, 572]);
    expect(series("liao").map(s => s.year)).toEqual([1111, 1142, 1208]);
    expect(series("dali").map(s => s.year)).toEqual([879, 1111, 1142, 1208]);
    expect(series("liao")[0].regions.some(r => r.polityId === "liao")).toBe(true);
    expect(series("liao")[1].regions.some(r => r.polityId === "western-liao")).toBe(true);
    expect(series("liao")[1].regions.some(r => r.polityId === "liao")).toBe(false);
    expect(series("western-xia").find(s => s.year === 1208)?.capitals?.[0].name).toBe("中兴府");
  });
  it("includes Song capitals, Sichuan and Hainan on the corresponding full plates", () => {
    for (const year of [1111, 1142, 1208]) {
      const snapshot = expansionMapSnapshots.find((s) => s.year === year)!;
      const song = snapshot.regions.find((r) => r.polityId === (year === 1111 ? "northern-song" : "southern-song"))!;
      for (const point of [[104.06, 30.67], [109.5, 19.2], year === 1111 ? [114.3, 34.8] : [120.15, 30.28]]) {
        expect(contains(song.geometry, point)).toBe(true);
      }
      expect(contains(song.geometry, [121, 23.5])).toBe(false);
    }
  });
});
