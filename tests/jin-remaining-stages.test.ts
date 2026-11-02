import { expect, it } from "vitest";
import scenes from "@/data/maps/jin-sixteen-kingdoms/stage-maps.json";

function owners(year: number, x: number, y: number) {
  const ring = (points: number[][]) => {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const [a, b] = points[i], [c, d] = points[j];
      if ((b > y) !== (d > y) && x < (c - a) * (y - b) / (d - b) + a) inside = !inside;
    }
    return inside;
  };
  return scenes.find(s => s.year === year)!.regions.filter(r => {
    const polygons = r.geometry.type === "Polygon" ? [r.geometry.coordinates] : r.geometry.coordinates;
    return (polygons as number[][][][]).some(([outer, ...holes]) => ring(outer) && !holes.some(ring));
  }).map(r => r.polityId);
}

it.each([347, 376, 410, 417, 431])("%s has full stage coverage and explicit sources", year => {
  const scene = scenes.find(s => s.year === year);
  expect(scene).toBeDefined();
  expect(scene!.scopeNote).toContain("完整阶段");
  expect(scene!.sources.some(s => s.referenceYear === year && s.url)).toBe(true);
  for (const p of [[113.26, 23.13], [102.71, 25.04], [105.9, 21.1], [118.8, 32.06]]) {
    expect(owners(year, ...p as [number, number])).toEqual([year === 431 ? "liu-song" : "eastern-jin"]);
  }
});

it("417 keeps the newly conquered Guanzhong and Hedong in Jin, before Xia's 418 conquest", () => {
  for (const [x, y] of [[108.94, 34.26], [112.45, 34.62], [111.5, 36.08], [104.07, 30.67]]) expect(owners(417, x, y)).toEqual(["eastern-jin"]);
  expect(owners(417, 106.65, 35.55)).toEqual(["hu-xia"]);
  expect(owners(417, 102.4, 36.48)).toEqual(["western-qin"]);
  expect(owners(417, 98.5, 39.73)).toEqual(["western-liang-sixteen"]);
});

it("410 keeps Qiao Shu, restored Western Qin and disputed Guzang separate", () => {
  expect(owners(410, 104.07, 30.67)).toEqual(["qiao-shu"]);
  expect(owners(410, 108.94, 34.26)).toEqual(["later-qin"]);
  expect(owners(410, 118.45, 36.73)).toEqual(["eastern-jin"]);
  expect(owners(410, 102.6, 37.9)).toEqual(["guzang-contested"]);
  expect(owners(410, 107.02, 33.07)).toEqual(["qiu-chi"]);
  expect(owners(417, 107.02, 33.07)).toEqual(["eastern-jin"]);
});

it.each([410, 417])("%s joins Liang, Qin and Xia without an enclosed background sliver", year => {
  for (const [x, y] of [[105.25, 36.6], [105.4, 36.5], [104.9, 36.6]]) {
    expect(owners(year, x, y)).toEqual(["northern-liang"]);
  }
});

it("347 and 376 distinguish the two conquests of Shu and do not anticipate Xiangyang 379", () => {
  expect(owners(347, 104.07, 30.67)).toEqual(["eastern-jin"]);
  expect(owners(347, 108.94, 34.26)).toEqual(["later-zhao"]);
  expect(owners(376, 104.07, 30.67)).toEqual(["former-qin"]);
  expect(owners(376, 112.14, 32.04)).toEqual(["eastern-jin"]);
  expect(owners(376, 102.6, 37.9)).toEqual(["former-qin"]);
});

it("431 removes Qin and Xia while retaining Liang, Yan and the Longyou transition", () => {
  const ids = scenes.find(s => s.year === 431)!.regions.map(r => r.polityId);
  expect(ids).not.toContain("western-qin");
  expect(ids).not.toContain("hu-xia");
  expect(owners(431, 102.6, 37.9)).toEqual(["northern-liang"]);
  expect(owners(431, 120.45, 41.58)).toEqual(["northern-yan"]);
  expect(owners(431, 103.21, 35.6)).toEqual(["longyou-transition"]);
});

it.each([410, 417, 431, 439])("%s does not extend Northern Wei across Bohai into Liaodong", year => {
  for (const [x, y] of [[121.6, 38.9], [122.1, 39.8]]) {
    expect(owners(year, x, y)).not.toContain("northern-wei");
    expect(owners(year, x, y)).not.toContain("eastern-jin");
    expect(owners(year, x, y)).not.toContain("liu-song");
  }
});
