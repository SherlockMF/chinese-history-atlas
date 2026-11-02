import { describe, expect, it } from "vitest";
import { mapSnapshots } from "@/data/series/northern-qi-zhou-sui/map-snapshots";
import { northernQiZhouSuiDynasties as dynasties } from "@/data/seed/northern-qi-zhou-sui-dynasties";
import { createSnapshotAtlas } from "@/features/history-map/atlas/snapshot-atlas";

describe("snapshot atlas adapter", () => {
  it("preserves the original year, geometry, canonical colors and source references", () => {
    for (const snapshot of mapSnapshots) {
      const atlas = createSnapshotAtlas(snapshot, dynasties);
      expect(atlas.realms.features).toHaveLength(snapshot.regions.filter(region => region.displayMode !== "label-only").length);
      for (const feature of atlas.realms.features) {
        expect(feature.geometry).toBe(snapshot.regions.find((r) => r.polityId === feature.properties.dynastyId)?.geometry);
        expect(feature.properties.validFromYear).toBe(snapshot.year);
        expect(feature.properties.validToYearExclusive).toBe(snapshot.year + 1);
        expect(feature.properties.color).toBe(snapshot.regions.find((r) => r.polityId === feature.properties.dynastyId)?.color ?? dynasties.find((d) => d.id === feature.properties.dynastyId)?.color);
        expect(feature.properties.sourceRefs.every((id) => atlas.sources.some((s) => s.id === id))).toBe(true);
      }
      expect(atlas.sources.every((s) => s.redistributable === false)).toBe(true);
      expect(atlas.boundaries?.features.length).toBeGreaterThan(0);
    }
  });
  it("does not place extinct capitals on the 612 map", () => {
    const atlas = createSnapshotAtlas(mapSnapshots.find((s) => s.year === 612)!, dynasties);
    expect(atlas.places.features.filter((f) => f.properties.placeKind === "capital").map((f) => f.properties.name)).toEqual(["大兴", "东都洛阳"]);
  });
});
