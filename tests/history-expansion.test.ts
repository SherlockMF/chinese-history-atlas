import { describe, expect, it } from "vitest";
import { historySeries, getRouteSeries } from "@/data/series";
import { seedData } from "@/data/seed";
import { getSeriesRepository, getEventSeries } from "@/lib/repositories/series-repository";
import { validateHistoryData } from "@/lib/validation/history-data";

const slugs = ["northern-wei", "liao", "jin", "western-xia", "dali", "southern-dynasties", "jin-sixteen-kingdoms"];
describe("new history series", () => {
  it("registers the requested priority order after the existing reference series", () => {
    expect(historySeries.map(s => s.id)).toEqual(["five-dynasties", "northern-qi-zhou-sui", ...slugs, "western-jin", "eastern-jin"]);
  });
  it("keeps global entity IDs and references valid", () => {
    expect(validateHistoryData(seedData)).toEqual([]);
  });
  for (const slug of slugs) it(`${slug} has complete linked reading content`, async () => {
    const repo = getSeriesRepository();
    const series = await repo.getSeriesBySlug(slug);
    expect(series).not.toBeNull();
    if (!series) return;
    const [events, people, locations, dynasties, relations, paths] = await Promise.all([
      repo.getSeriesEvents(slug), repo.getSeriesPeople(slug), repo.getSeriesLocations(slug),
      repo.getSeriesDynasties(slug), repo.getSeriesPersonRelations(slug), repo.getSeriesReadingPaths(slug),
    ]);
    expect(events.length).toBeGreaterThanOrEqual(10);
    expect(people.length).toBeGreaterThanOrEqual(6);
    expect(locations.length).toBeGreaterThanOrEqual(3);
    expect(relations.length).toBeGreaterThanOrEqual(3);
    expect(paths).toHaveLength(3);
    for (const event of events) {
      expect(event.startYear).toBeGreaterThanOrEqual(series.timelineMinYear);
      expect(event.endYear ?? event.startYear).toBeLessThanOrEqual(series.timelineMaxYear);
      expect(event.tracks.some(t => series.trackIds.includes(t))).toBe(true);
      expect(event.personIds.every(id => people.some(p => p.id === id))).toBe(true);
      expect(event.dynastyIds.every(id => dynasties.some(p => p.id === id))).toBe(true);
      expect(event.locationIds.every(id => locations.some(p => p.id === id))).toBe(true);
      expect(getEventSeries(event.id)).not.toBeNull();
      expect(getRouteSeries(`/explore/${event.id}`).id).toBe(getEventSeries(event.id)?.id);
    }
    for (const path of paths) {
      expect(path.eventIds.length).toBeGreaterThanOrEqual(3);
      expect(path.eventIds.every(id => events.some(e => e.id === id))).toBe(true);
    }
  });
});
