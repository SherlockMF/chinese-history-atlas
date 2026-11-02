import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { jinSixteenSnapshots } from "@/data/series/jin-sixteen-kingdoms/map-snapshots";
import type { HistoricalMapSnapshot } from "@/types/series";
import type { MultiPolygon, Polygon } from "geojson";

function contains(geometry: Polygon | MultiPolygon, [x, y]: number[]) {
  function ring(points: number[][]) {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [a, b] = points[i], [c, d] = points[j];
      if ((b > y) !== (d > y) && x < (c - a) * (y - b) / (d - b) + a) inside = !inside;
    }
    return inside;
  }
  return (geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates)
    .some(([outer, ...holes]) => ring(outer) && !holes.some(ring));
}

async function snapshots(): Promise<HistoricalMapSnapshot[]> {
  const file = resolve("data/series/jin-sixteen-kingdoms/map-snapshots.ts");
  expect(existsSync(file), "the dated Jin atlases must exist").toBe(true);
  return jinSixteenSnapshots;
}

describe("Jin and Sixteen Kingdoms dated atlas", () => {
  it("provides dated atlas plates, sourced key-year reconstructions and a separate 449 epilogue", async () => {
    const maps = await snapshots();
    expect(maps.map(m => m.year)).toEqual([281, 304, 327, 347, 366, 376, 382, 394, 395, 409, 410, 417, 431, 439, 449]);
    for (const map of maps) {
      expect(map.id).toBe(`jin-sixteen-kingdoms-${map.year}`);
      expect(map.status).toBe("ready");
      expect(map.regions.length).toBeGreaterThan(1);
      expect(map.sources.some(s => s.referenceYear === map.year)).toBe(true);
      expect(map.sources.filter(s => s.referenceYear !== map.year).every(s => Boolean(s.note))).toBe(true);
      expect(map.outlines).toBeDefined();
      for (const region of map.regions) {
        expect(contains(region.geometry, region.labelPoint), `${map.year}/${region.polityId} label`).toBe(true);
        expect(region.name).toBeTruthy();
        expect(region.color).toBeTruthy();
      }
    }
  });
  it("locates capitals on exactly one region and excludes Taiwan from Jin", async () => {
    for (const map of await snapshots()) {
      for (const capital of map.capitals ?? []) {
        expect(map.regions.filter(r => contains(r.geometry, capital.coordinate)), `${map.year}/${capital.name}`).toHaveLength(1);
      }
      expect(map.regions.filter(r => ["western-jin", "eastern-jin"].includes(r.polityId)).some(r => contains(r.geometry, [121, 23.5]))).toBe(false);
    }
  });
  it("preserves contemporary political identities and distinct geography", async () => {
    const maps = await snapshots();
    const expected: Record<number, string[]> = {
      281: ["western-jin"], 327: ["han-zhao", "later-zhao", "cheng-han", "former-liang", "eastern-jin"],
      366: ["former-qin", "former-yan", "former-liang", "dai", "eastern-jin"],
      382: ["former-qin", "eastern-jin"],
      395: ["later-qin", "later-yan", "western-qin", "later-liang-sixteen", "northern-wei", "eastern-jin"],
      409: ["northern-wei", "hu-xia", "northern-yan", "southern-yan", "northern-liang", "western-liang-sixteen", "southern-liang-sixteen", "western-qin", "later-qin", "eastern-jin"],
      449: ["northern-wei", "liu-song"],
    };
    for (const map of maps) for (const id of expected[map.year] ?? []) expect(map.regions.some(r => r.polityId === id), `${map.year}/${id}`).toBe(true);
    expect(new Set(maps.map(m => JSON.stringify(m.regions.map(r => r.geometry)))).size).toBe(maps.length);
    expect(maps.find(m => m.year === 382)!.regions.some(r => r.polityId === "northern-wei")).toBe(false);
    expect(maps.find(m => m.year === 395)!.regions.some(r => r.polityId === "western-yan")).toBe(false);
  });
  it("records calibration and suppresses frame closures from political outlines", async () => {
    await snapshots();
    const report = JSON.parse(readFileSync(resolve("gis/jin-sixteen-kingdoms/calibration-report.json"), "utf8"));
    for (const year of [281, 327, 366, 382, 395, 409]) {
      const entry = report.maps[year];
      expect(entry.controlMaxKm).toBeLessThan(35);
      expect(entry.sourceSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(entry.frameClosureExcluded).toBe(true);
      expect(entry.overlapArea).toBeLessThan(1e-7);
    }
  });
  it("projects the same-year western insets separately and excludes offshore envelope artifacts", async () => {
    const maps = await snapshots();
    for (const [year, polity] of [[366, "former-liang"], [395, "later-liang-sixteen"], [409, "western-liang-sixteen"]] as const) {
      const region = maps.find(m => m.year === year)!.regions.find(r => r.polityId === polity)!;
      expect(contains(region.geometry, [84, 40]), `${year} western inset`).toBe(true);
    }
    for (const year of [281, 382]) {
      const map = maps.find(m => m.year === year)!;
      expect(map.regions.some(r => contains(r.geometry, [121, 16]))).toBe(false);
    }
    expect(maps.find(m => m.year === 281)!.regions.find(r => r.polityId === "western-jin")!.geometry).toBeDefined();
    expect(contains(maps.find(m => m.year === 281)!.regions.find(r => r.polityId === "western-jin")!.geometry, [127.5, 36])).toBe(false);
  });
  it("completes the south and inset seams with separately attributed reconstruction", async () => {
    const { createSnapshotAtlas } = await import("@/features/history-map/atlas/snapshot-atlas");
    for (const map of await snapshots()) {
      if (![327, 366, 395, 409].includes(map.year)) continue;
      expect(map.coverageNote).toContain("补绘");
      expect(map.sources.some(s => s.note?.includes("补绘"))).toBe(true);
      const atlas = createSnapshotAtlas(map, []);
      const jin = map.regions.find(r => r.polityId === "eastern-jin")!;
      for (const point of [[113.26, 23.13], [102.71, 25.04], [105.9, 21.1], [109.5, 19.2]]) {
        expect(contains(jin.geometry, point), `${map.year} southern place ${point}`).toBe(true);
      }
      expect(map.reconstructedOutlines?.["eastern-jin"]).toBeDefined();
      expect(atlas.boundaries?.features.some(f => f.properties.accuracyLevel === "illustrative")).toBe(true);
      expect(atlas.realms.features).toHaveLength(map.regions.filter(region => region.displayMode !== "label-only").length);
      if (map.year !== 327) {
        const id = map.year === 366 ? "former-liang" : map.year === 395 ? "later-liang-sixteen" : "western-liang-sixteen";
        const liang = map.regions.find(r => r.polityId === id)!;
        for (const x of [90, 91, 92, 93]) expect(contains(liang.geometry, [x, 40]), `${map.year} inset seam ${x}`).toBe(true);
      }
    }
    const map = (await snapshots()).find(m => m.year === 409)!;
    expect(map.regions.filter(r => contains(r.geometry, [104.06, 30.67])).map(r => r.polityId)).toEqual(["qiao-shu"]);
    expect(map.regions.filter(r => contains(r.geometry, [107.02, 33.07])).map(r => r.polityId)).toEqual(["qiu-chi"]);
    for (const map of await snapshots()) expect(map.regions.filter(r => ["former-qin", "western-jin", "eastern-jin"].includes(r.polityId)).some(r => contains(r.geometry, [127.5, 36]))).toBe(false);
  });
});
