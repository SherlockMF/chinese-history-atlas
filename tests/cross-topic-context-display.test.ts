import { describe, expect, it } from "vitest";
import { expansionMapSnapshots } from "@/data/series/expansion/map-snapshots";
import { mapSnapshots } from "@/data/series/northern-qi-zhou-sui/map-snapshots";
import { createSnapshotAtlas } from "@/features/history-map/atlas/snapshot-atlas";

const all = [...mapSnapshots, ...expansionMapSnapshots];
describe("background names across topics", () => {
  it.each([449, 497, 546, 572, 612, 1111, 1142, 1208])("%s renders peripheral context as names and shares the policy across topics", year => {
    const snapshots = all.filter(snapshot => snapshot.year === year);
    const idsByTopic: string[][] = [];
    for (const snapshot of snapshots) {
      const atlas = createSnapshotAtlas(snapshot, []);
      const background = snapshot.regions.filter(region => region.boundaryKind === "influence");
      expect(background.length).toBeGreaterThan(0);
      for (const region of background) {
        expect(atlas.realms.features.some(feature => feature.properties.dynastyId === region.polityId)).toBe(false);
        expect(atlas.outlines?.features.some(feature => feature.properties.dynastyId === region.polityId)).toBe(false);
        expect(atlas.boundaries?.features.some(feature => feature.properties.id.startsWith(`${snapshot.id}-${region.polityId}-`))).toBe(false);
        expect(atlas.places.features.some(feature => feature.properties.name === region.name && feature.properties.placeKind === "landmark")).toBe(true);
      }
      idsByTopic.push(background.map(region => region.polityId).sort());
    }
    for (const ids of idsByTopic) expect(ids).toEqual(idsByTopic[0]);
  });

  it.each([[546, "tuyuhun"], [572, "tuyuhun"], [1111, "northern-song"], [1111, "qara-khanids"], [1111, "gao-chang-uighur"], [1142, "southern-song"], [1208, "mongol"]] as const)("%s preserves the attested %s territory", (year, id) => {
    const snapshot = all.find(snapshot => snapshot.year === year)!;
    const region = snapshot.regions.find(region => region.polityId === id)!;
    const atlas = createSnapshotAtlas(snapshot, []);
    expect(atlas.realms.features.find(feature => feature.properties.dynastyId === id)?.geometry).toBe(region.geometry);
    expect(atlas.outlines?.features.some(feature => feature.properties.dynastyId === id)).toBe(true);
  });
});
