import { describe, expect, it } from "vitest";
import type { MultiPolygon, Polygon } from "geojson";
import { jinSixteenSnapshots } from "@/data/series/jin-sixteen-kingdoms/map-snapshots";

function contains(geometry: Polygon | MultiPolygon, [x, y]: number[]) {
  const ring = (points: number[][]) => {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [a, b] = points[i], [c, d] = points[j];
      if ((b > y) !== (d > y) && x < (c - a) * (y - b) / (d - b) + a) inside = !inside;
    }
    return inside;
  };
  return (geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates).some(([outer, ...holes]) => ring(outer) && !holes.some(ring));
}
const map = (year: number) => jinSixteenSnapshots.find(item => item.year === year)!;
const owners = (year: number, point: number[]) => map(year).regions.filter(region => contains(region.geometry, point)).map(region => region.polityId);

describe("full Jin period stage atlases", () => {
  it("439 distinguishes the Song-Wei frontier, independent Chouchi and late Hexi changes", () => {
    expect(map(439).coverageNote).toContain("完整阶段");
    for (const point of [[108.94, 34.26], [112.45, 34.62], [102.6, 37.9], [98.5, 39.73]]) expect(owners(439, point), String(point)).toEqual(["northern-wei"]);
    for (const point of [[118.8, 32.06], [113.26, 23.13], [102.71, 25.04], [105.9, 21.1], [104.07, 30.67], [107.02, 33.07], [112.14, 32.04], [118.45, 36.73]]) expect(owners(439, point), String(point)).toEqual(["liu-song"]);
    expect(owners(439, [105.25, 33.6])).toEqual(["qiu-chi"]);
    expect(owners(439, [94.66, 40.14])).toEqual(["juqu-remnants"]);
    expect(owners(439, [100.45, 38.93])).toEqual(["zhangye-revolt"]);
    expect(map(439).regions.some(region => region.polityId === "northern-liang")).toBe(false);
  });
  it("394 includes the southern provinces and preserves the contemporary northern regimes", () => {
    expect(map(394).coverageNote).toContain("完整阶段");
    for (const point of [[112.45, 34.62], [104.07, 30.67], [113.26, 23.13], [102.71, 25.04], [105.9, 21.1]]) expect(owners(394, point), String(point)).toEqual(["eastern-jin"]);
    expect(owners(394, [118.45, 36.73])).toEqual(["qingzhou-contested"]);
    for (const point of [[114.4, 36.3], [112.87, 36.12], [120.45, 41.58]]) expect(owners(394, point)).toEqual(["later-yan"]);
    expect(owners(394, [108.94, 34.26])).toEqual(["later-qin"]);
    expect(owners(394, [103.21, 35.6])).toEqual(["western-qin"]);
    expect(owners(394, [105.72, 34.58])).toEqual(["shanggui-jiangru"]);
    expect(owners(394, [102.6, 37.9])).toEqual(["later-liang-sixteen"]);
    expect(owners(394, [111.8, 40.4])).toEqual(["northern-wei"]);
    expect(map(394).regions.map(region => region.polityId)).not.toContain("former-qin");
    expect(map(394).regions.map(region => region.polityId)).not.toContain("western-yan");
  });
  it("304 keeps Liang within Jin and separates the initial Han/Cheng bases from later expansion", () => {
    expect(map(304).coverageNote).toContain("完整阶段");
    for (const point of [[102.6, 37.9], [108.94, 34.26], [112.45, 34.62], [113.26, 23.13], [102.71, 25.04], [105.9, 21.1], [106.55, 29.56], [123.18, 41.27], [125.75, 39.03]]) expect(owners(304, point), String(point)).toEqual(["western-jin"]);
    expect(owners(304, [111.1, 37.5])).toEqual(["han-zhao"]);
    expect(owners(304, [104.07, 30.67])).toEqual(["cheng-han"]);
    expect(map(304).regions.some(region => region.polityId === "former-liang")).toBe(false);
    expect(map(304).capitals?.some(capital => capital.name === "长安")).toBe(true);
    expect(map(304).capitals?.some(capital => capital.name === "平阳")).toBe(false);
  });
  it.each([439, 394, 304])("%s discloses reconstruction and different-year references without changing URLs", year => {
    const snapshot = map(year);
    expect(snapshot.id).toBe(`jin-sixteen-kingdoms-${year}`);
    expect(snapshot.accuracyLevel).toBe("reconstructed");
    expect(snapshot.accuracyNote).toContain("推定");
    expect(snapshot.scopeNote).toContain("背景");
    expect(snapshot.sources.some(source => source.referenceYear === year && source.url)).toBe(true);
    expect(snapshot.sources.some(source => source.referenceYear !== year && source.note)).toBe(true);
    for (const point of [[121, 23.5], [127.5, 36], [121, 15]]) expect(snapshot.regions.filter(region => ["western-jin", "eastern-jin", "northern-wei", "liu-song"].includes(region.polityId)).some(region => contains(region.geometry, point))).toBe(false);
  });
});
