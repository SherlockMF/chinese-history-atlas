import { describe, expect, it } from "vitest";
import { findSeriesBySlug, getRouteSeries } from "@/data/series";
import { getEventSeries, getSeriesRepository } from "@/lib/repositories/series-repository";
import { seedData } from "@/data/seed";
import { validateHistoryData } from "@/lib/validation/history-data";

const id = "jin-sixteen-kingdoms";
describe("Two Jin and Sixteen Kingdoms integration", () => {
  it("registers the panorama without confusing it with the Jin dynasty of 1115", () => {
    expect(findSeriesBySlug(id)).toMatchObject({ title: "五胡十六国", timelineMinYear: 304, timelineMaxYear: 439, defaultYear: 382 });
    expect(findSeriesBySlug("jin")?.timelineMinYear).toBe(1114);
    expect(getRouteSeries(`/series/${id}/map`).id).toBe(id);
  });
  it("shares the transition events while preserving their preferred reading context", async () => {
    const events = await getSeriesRepository().getSeriesEvents(id);
    for (const eventId of ["wei-founded", "wei-unifies-north", "liu-song-founded"]) {
      expect(events.some(event => event.id === eventId)).toBe(true);
      expect(getEventSeries(eventId, id)?.id).toBe(id);
      expect(getRouteSeries(`/explore/${eventId}`, id).id).toBe(id);
      expect(seedData.events.filter(event => event.id === eventId)).toHaveLength(1);
    }
  });
  it("exposes original plates, eight key year reconstructions and an explicitly later epilogue", async () => {
    const snapshots = await getSeriesRepository().getSeriesMapSnapshots(id);
    expect(snapshots.map(snapshot => snapshot.year)).toEqual([281, 304, 327, 347, 366, 376, 382, 394, 395, 409, 410, 417, 431, 439, 449]);
    expect(snapshots.every(snapshot => snapshot.status === "ready")).toBe(true);
  });
  it("keeps the complete shared dataset valid", () => {
    expect(validateHistoryData(seedData)).toEqual([]);
  });
});
