import { describe, expect, it } from "vitest";
import { cityOverlays } from "@/data/series/city-overlays";

describe("historical city cartography", () => {
  it("includes all thirteen Jin outer gates, with four on the north", () => {
    const gates = cityOverlays.jin.places.filter(p => p.kind === "gate" && p.layer === "gates");
    expect(gates).toHaveLength(13);
    expect(gates.filter(p => p.side === "north").map(p => p.name)).toEqual(["会城门", "通玄门", "崇智门", "光泰门"]);
    expect(gates.filter(p => p.side === "south").map(p => p.name)).toEqual(["端礼门", "丰宜门", "景风门"]);
  });
  it("separates the later Beijing city from Jin's own city", () => {
    const city = cityOverlays.jin;
    expect(city.features.features.filter(f => f.properties.layer === "comparison").map(f => f.properties.name)).toEqual(expect.arrayContaining(["明清北京内城", "明清北京外城"]));
    expect(city.places.find(p => p.name === "正阳门")?.layer).toBe("comparison");
    expect(city.places.find(p => p.name === "应天门")?.layer).toBe("zones");
  });
  it("shows Sui markets, gates and streets without moving Tang palaces into Sui", () => {
    const city = cityOverlays.daxing;
    const names = city.places.map(p => p.name);
    expect(names).toEqual(expect.arrayContaining(["利人市", "都会市", "明德门", "大兴门", "朱雀门"]));
    expect(names).not.toContain("大明宫");
    expect(names).not.toContain("兴庆宫");
    expect(city.features.features.filter(f => f.properties.layer === "streets").length).toBeGreaterThan(10);
  });
  it("traces every historical place to a source and keeps coordinates in the comparison view", () => {
    for (const city of Object.values(cityOverlays)) for (const place of city.places) {
      expect(place.sourceIds.length).toBeGreaterThan(0);
      for (const id of place.sourceIds) expect(city.sources.some(s => s.id === id)).toBe(true);
      expect(place.description.length).toBeGreaterThan(10);
      const [[w, s], [e, n]] = city.bounds;
      expect(place.coordinates[0]).toBeGreaterThanOrEqual(w); expect(place.coordinates[0]).toBeLessThanOrEqual(e);
      expect(place.coordinates[1]).toBeGreaterThanOrEqual(s); expect(place.coordinates[1]).toBeLessThanOrEqual(n);
    }
  });
  it("keeps an unverified Lotus Pond shoreline out of the historical water layer", () => {
    const city = cityOverlays.jin;
    expect(city.features.features.some(f => f.geometry.type === "Polygon" && f.properties.name.includes("莲花池"))).toBe(false);
    expect(city.places.find(p => p.id === "jin-source")?.description).toContain("不足以确定金代湖岸");
    const water = city.features.features.filter(f => f.properties.layer === "water");
    expect(water.some(f => f.geometry.type === "Polygon" && f.properties.name.includes("鱼藻池"))).toBe(true);
    for (const feature of water) for (const id of feature.properties.sourceIds) expect(city.sources.some(s => s.id === id)).toBe(true);
  });
});
