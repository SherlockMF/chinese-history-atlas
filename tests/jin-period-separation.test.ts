import { describe, expect, it } from "vitest";
import { findSeriesBySlug, getRouteSeries } from "@/data/series";
import { getEventSeries, getSeriesRepository } from "@/lib/repositories/series-repository";
import { jinNarrativesBySeries, jinSixteenNarratives, jinSixteenChapters } from "@/data/series/jin-sixteen-kingdoms/narratives";
import { seedData } from "@/data/seed";
import { narrativeQuery, narrativeReturnHref, resolveNarrativeState } from "@/features/history-map/narrative-state";

const repo = getSeriesRepository();

describe("Jin period topic separation", () => {
  it("offers four complete Western Jin guides with restorable steps and event returns", async () => {
    const sequences = jinNarrativesBySeries["western-jin"];
    expect(sequences.map(sequence => sequence.title)).toEqual(["晋灭吴", "八王之乱", "两京失守", "晋末南渡"]);
    const snapshots = await repo.getSeriesMapSnapshots("western-jin");
    const events = await repo.getSeriesEvents("western-jin");
    for (const sequence of sequences) {
      expect(sequence.steps.length).toBeGreaterThanOrEqual(3);
      expect(new Set(sequence.steps.map(step => step.id)).size).toBe(sequence.steps.length);
      expect(sequence.steps.map(step => step.year)).toEqual(sequence.steps.map(step => step.year).sort((a, b) => a - b));
      for (const [index, step] of sequence.steps.entries()) {
        expect(step.year).toBeGreaterThanOrEqual(265);
        expect(step.year).toBeLessThanOrEqual(316);
        expect(step.nodes.length).toBeGreaterThan(0);
        expect(step.sourceRefs.length).toBeGreaterThan(0);
        expect(step.eventIds.length).toBeGreaterThan(0);
        const query = narrativeQuery(sequence, index);
        const state = resolveNarrativeState(new URLSearchParams(query), sequences, snapshots);
        expect(state.step).toBe(step);
        expect(state.snapshot?.id).toBe(step.snapshotId);
        if (step.year >= 304) expect(state.snapshot?.year).toBe(304);
        for (const id of step.eventIds) {
          expect(events.some(event => event.id === id), id).toBe(true);
          expect(narrativeReturnHref("western-jin", id, new URLSearchParams(query), sequences)).toBe(`/series/western-jin/map?${query}`);
        }
      }
    }
    const southward = sequences.find(sequence => sequence.id === "jin-southward")!;
    expect(southward.steps.at(-1)?.nodes.some(node => node.name === "建康")).toBe(true);
    expect(jinNarrativesBySeries["jin-sixteen-kingdoms"].find(sequence => sequence.id === "jin-southward")?.steps.at(-1)?.year).toBe(318);
  });
  it.each([
    ["western-jin", "西晋", 265, 316],
    ["jin-sixteen-kingdoms", "五胡十六国", 304, 439],
    ["eastern-jin", "东晋", 317, 420],
  ])("registers %s with its own chronological focus", (slug, title, start, end) => {
    expect(findSeriesBySlug(String(slug))).toMatchObject({ title, timelineMinYear: start, timelineMaxYear: end });
  });

  it("opens the Sixteen Kingdoms with the two foundations of 304", async () => {
    const events = await repo.getSeriesEvents("jin-sixteen-kingdoms");
    expect(events.every(event => event.startYear >= 304)).toBe(true);
    expect(events.map(event => event.id)).toEqual(expect.arrayContaining(["jin-han-zhao-founded", "jin-cheng-founded", "jin-fei-river"]));
    expect(jinSixteenChapters[0].startYear).toBe(304);
    expect(jinSixteenChapters.at(-1)?.endYear).toBe(439);
    expect(jinSixteenNarratives.find(sequence => sequence.id === "two-zhaos")?.steps[0]).toMatchObject({ year: 304, eventIds: ["jin-han-zhao-founded"] });
    expect(jinSixteenNarratives.find(sequence => sequence.id === "cheng-han-rise-fall")?.steps[0]).toMatchObject({ year: 304, eventIds: ["jin-cheng-founded"] });
    expect(jinSixteenNarratives.every(sequence => sequence.steps.every(step => step.year >= 304))).toBe(true);
    expect((await repo.getSeriesReadingPaths("jin-sixteen-kingdoms")).every(path => path.eventIds.every(id => events.some(event => event.id === id)))).toBe(true);
    expect((await repo.getSeriesPeople("jin-sixteen-kingdoms")).map(person => person.id)).not.toContain("jia-nanfeng");
  });

  it("keeps Western Jin background and Eastern Jin court events in their own topics", async () => {
    for (const [slug, eventId] of [["western-jin", "jin-jia-coup"], ["eastern-jin", "jin-wang-dun"]]) {
      expect((await repo.getSeriesEvents(slug)).some(event => event.id === eventId)).toBe(true);
      expect(getEventSeries(eventId)?.slug).toBe(slug);
      expect(getRouteSeries(`/explore/${eventId}`).slug).toBe(slug);
    }
    expect((await repo.getSeriesEvents("western-jin")).some(event => event.startYear === 265)).toBe(true);
  });

  it("makes the reading paths follow the northern regimes and keeps older narrative URLs readable", async () => {
    const paths = await repo.getSeriesReadingPaths("jin-sixteen-kingdoms");
    const ids = paths.flatMap(path => path.eventIds);
    expect(ids).toEqual(expect.arrayContaining(["jin-two-zhaos", "jin-former-yan-founded", "jin-liang-splits", "jin-western-liang-falls", "wei-unifies-north"]));
    for (const id of ["jin-eastern-founded", "jin-sun-en", "jin-liu-yu-rises", "jin-lu-xun", "liu-song-founded"]) expect(ids).not.toContain(id);
    const all = jinNarrativesBySeries["jin-sixteen-kingdoms"];
    for (const id of ["jin-southward", "huan-wen-expeditions", "liu-yu-expeditions"]) expect(all.some(sequence => sequence.id === id)).toBe(true);
  });

  it("shares cross-polity events without duplicate entities or losing the requested topic", async () => {
    for (const [eventId, slugs] of [
      ["jin-han-zhao-founded", ["western-jin", "jin-sixteen-kingdoms"]],
      ["jin-fei-river", ["eastern-jin", "jin-sixteen-kingdoms"]],
      ["liu-song-founded", ["eastern-jin", "jin-sixteen-kingdoms", "southern-dynasties"]],
    ] as const) {
      expect(seedData.events.filter(event => event.id === eventId)).toHaveLength(1);
      for (const slug of slugs) {
        expect((await repo.getSeriesEvents(slug)).some(event => event.id === eventId)).toBe(true);
        expect(getEventSeries(eventId, slug)?.slug).toBe(slug);
        expect(getRouteSeries(`/explore/${eventId}`, slug).slug).toBe(slug);
      }
    }
  });

  it.each(["western-jin", "eastern-jin"])("provides valid reading paths and dated maps for %s", async slug => {
    const series = findSeriesBySlug(slug)!;
    expect(series).not.toBeNull();
    if (!series) return;
    const events = await repo.getSeriesEvents(slug);
    expect(events.every(event => event.startYear <= series.timelineMaxYear && (event.endYear ?? event.startYear) >= series.timelineMinYear)).toBe(true);
    const paths = await repo.getSeriesReadingPaths(slug);
    expect(paths).toHaveLength(3);
    expect(paths.every(path => path.eventIds.every(id => events.some(event => event.id === id)))).toBe(true);
    const maps = await repo.getSeriesMapSnapshots(slug);
    expect(maps.length).toBeGreaterThan(0);
    expect(maps.every(map => map.seriesId === slug && map.sources.length > 0)).toBe(true);
    const people = await repo.getSeriesPeople(slug);
    const places = await repo.getSeriesLocations(slug);
    const polities = await repo.getSeriesDynasties(slug);
    for (const event of events) {
      expect(event.personIds.every(id => people.some(person => person.id === id)), event.id).toBe(true);
      expect(event.locationIds.every(id => places.some(place => place.id === id)), event.id).toBe(true);
      expect(event.dynastyIds.every(id => polities.some(polity => polity.id === id)), event.id).toBe(true);
      expect(event.tracks.some(id => series.trackIds.includes(id)), event.id).toBe(true);
    }
    for (const sequence of jinNarrativesBySeries[slug]) for (const step of sequence.steps) {
      expect(maps.some(map => map.id === step.snapshotId), `${slug}/${step.id}`).toBe(true);
      expect(step.eventIds.every(id => events.some(event => event.id === id)), `${slug}/${step.id}`).toBe(true);
    }
  });
});
