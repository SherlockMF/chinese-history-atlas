import { describe, expect, it } from "vitest";
import { jinSixteenSnapshots } from "@/data/series/jin-sixteen-kingdoms/map-snapshots";
import { createSnapshotAtlas } from "@/features/history-map/atlas/snapshot-atlas";

describe("peripheral labels without implied territories", () => {
  it.each(jinSixteenSnapshots.filter(snapshot => snapshot.year < 449))("$year keeps peripheral names without fill or boundary features", snapshot => {
    const atlas = createSnapshotAtlas(snapshot, []);
    const background = snapshot.regions.filter(region => /context|peoples|regimes|tuyuhun|goguryeo|korean|wusun|xianbei|rouran/.test(region.polityId));
    expect(background.length).toBeGreaterThan(0);
    for (const region of background) {
      const id = `${snapshot.id}-${region.polityId}`;
      expect(atlas.realms.features.some(feature => feature.properties.dynastyId === region.polityId)).toBe(false);
      expect(atlas.realmFills?.features.some(feature => feature.properties.dynastyId === region.polityId) ?? false).toBe(false);
      expect(atlas.boundaries?.features.some(feature => feature.properties.id.startsWith(`${id}-`))).toBe(false);
      expect(atlas.outlines?.features.some(feature => feature.properties.dynastyId === region.polityId)).toBe(false);
      expect(atlas.places.features.filter(feature => feature.properties.name === region.name)).toEqual([
        expect.objectContaining({ geometry: { type: "Point", coordinates: region.labelPoint }, properties: expect.objectContaining({ placeKind: "landmark" }) }),
      ]);
    }
  });

  it.each([[394, "northern-wei"], [394, "qingzhou-contested"], [439, "zhangye-revolt"], [376, "former-qin"], [376, "eastern-jin"]] as const)("%s preserves %s and its sourced frontier", (year, polityId) => {
    const snapshot = jinSixteenSnapshots.find(snapshot => snapshot.year === year)!;
    const region = snapshot.regions.find(region => region.polityId === polityId)!;
    const atlas = createSnapshotAtlas(snapshot, []);
    expect(atlas.realms.features.find(feature => feature.properties.dynastyId === polityId)?.geometry).toBe(region.geometry);
    expect(atlas.boundaries?.features.some(feature => feature.properties.id.startsWith(`${snapshot.id}-${polityId}-`) && feature.geometry.coordinates.length)).toBe(true);
  });

  it.each([[366, "dai"], [395, "northern-wei"]] as const)("%s does not paint the mixed %s/northern-peoples source group as a single realm", (year, id) => {
    const snapshot = jinSixteenSnapshots.find(snapshot => snapshot.year === year)!;
    const atlas = createSnapshotAtlas(snapshot, []);
    const region = snapshot.regions.find(region => region.polityId === id)!;
    expect(atlas.realms.features.some(feature => feature.properties.dynastyId === id)).toBe(false);
    expect(atlas.places.features.some(feature => feature.properties.name === region.name)).toBe(true);
    expect(atlas.boundaries?.features.some(feature => feature.properties.id.startsWith(`${snapshot.id}-${id}-`))).toBe(false);
  });
});
