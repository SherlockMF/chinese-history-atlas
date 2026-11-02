import { expect, it } from "vitest";
import { getSeriesRepository } from "@/lib/repositories/series-repository";

const repo = getSeriesRepository();

it.each([
  ["western-jin", [281, 304]],
  ["eastern-jin", [347, 376, 394, 410, 417]],
  ["northern-wei", [394, 410, 417, 431, 439, 449]],
  ["southern-dynasties", [431, 439, 449]],
] as const)("%s shares dated geometry and sources with the Sixteen Kingdoms", async (topic, years) => {
  const originals = await repo.getSeriesMapSnapshots("jin-sixteen-kingdoms");
  const maps = await repo.getSeriesMapSnapshots(topic);
  expect(new Set(maps.map(map => map.year)).size).toBe(maps.length);
  for (const year of years) {
    const original = originals.find(map => map.year === year)!;
    const shared = maps.find(map => map.year === year);
    expect(shared, `${topic}/${year}`).toBeDefined();
    expect(shared?.seriesId).toBe(topic);
    expect(shared?.id).toBe(`${topic}-${year}`);
    for (const region of original.regions) {
      expect(shared?.regions.find(item => item.polityId === region.polityId)?.geometry).toBe(region.geometry);
    }
    if (year !== 449) {
      expect(shared?.regions).toBe(original.regions);
      expect(shared?.sources).toBe(original.sources);
    }
  }
});
