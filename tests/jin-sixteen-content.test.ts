import { describe, expect, it } from "vitest";
import { jinSixteenEventIds } from "@/data/series/jin-sixteen-kingdoms/config";

describe("两晋与十六国 content", () => {
  it("distinguishes contemporary names, intervening regimes and actual conquerors", async () => {
    const { jinSixteenKingdoms: corpus, westernJin, jinSixteenSources: sources } = await import("@/data/series/jin-sixteen-kingdoms/content");
    const { jinNarrativesBySeries } = await import("@/data/series/jin-sixteen-kingdoms/narratives");
    expect(westernJin.events.find(e => e.id === "jin-conquers-wu")!.summary).toContain("建业");
    expect(jinNarrativesBySeries["western-jin"][0].steps.at(-1)!.nodes.at(-1)!.name).toBe("建业");
    expect(sources.yanLater).toContain("卷111");
    expect(sources.yao).not.toContain("姚兴");
    for (const [id, year] of [["jin-zu-ti", 313], ["jin-former-qin-falls", 394], ["jin-sun-en", 399], ["jin-later-liang-falls", 403], ["jin-qiao-shu", 405], ["jin-western-qin-restored", 409], ["jin-lu-xun", 410], ["jin-qiao-shu-falls", 413], ["jin-southern-liang-falls", 414]] as const) {
      const { seedData } = await import("@/data/seed");
      expect(seedData.events.find(e => e.id === id)?.startYear, id).toBe(year);
    }
    expect(corpus.dynasties.find(d => d.id === "qiao-shu")).toMatchObject({ startYear: 405, endYear: 413 });
    const { northernWei } = await import("@/data/series/expansion/northern-wei");
    expect(northernWei.events.find(e => e.id === "wei-unifies-north")!.background).toContain("吐谷浑");
  });
  it("provides a sourced corpus and six linked map narratives", async () => {
    const content = await import("@/data/series/jin-sixteen-kingdoms/content").catch(() => null);
    expect(content, "the approved topic corpus must exist").not.toBeNull();
    if (!content) return;
    const { jinSixteenKingdoms: corpus } = content;
    expect(corpus, "the topic must contain linked historical data").toBeDefined();
    if (!corpus) return;
    const { jinSixteenNarratives, jinSixteenChapters } = await import("@/data/series/jin-sixteen-kingdoms/narratives");
    expect(corpus.config.id).toBe("jin-sixteen-kingdoms");
    expect(corpus.config.defaultYear).toBe(382);
    expect(corpus.events.length).toBeGreaterThanOrEqual(45);
    expect(corpus.events.map(event => event.id)).toEqual(jinSixteenEventIds);
    expect(corpus.people).toHaveLength(14);
    expect(corpus.readingPaths).toHaveLength(3);
    expect(corpus.config.polityGroups?.find(group => group.id === "sixteen-kingdoms")?.dynastyIds).toHaveLength(16);
    expect(jinSixteenChapters.map(chapter => [chapter.startYear, chapter.endYear])).toEqual([[304, 316], [317, 349], [350, 376], [377, 398], [399, 439]]);
    expect(jinSixteenNarratives.map(sequence => sequence.id)).toEqual(["hexi-liang", "yan-successions", "three-qins", "two-zhaos", "cheng-han-rise-fall", "xia-rise-fall"]);

    const events = new Set([...corpus.events.map(event => event.id), ...corpus.shared?.events ?? []]);
    const people = new Set([...corpus.people.map(person => person.id), ...corpus.shared?.people ?? []]);
    const dynasties = new Set([...corpus.dynasties.map(dynasty => dynasty.id), ...corpus.shared?.dynasties ?? []]);
    const locations = new Set([...corpus.locations.map(location => location.id), ...corpus.shared?.locations ?? []]);
    const owned = [...corpus.events, ...corpus.people, ...corpus.dynasties, ...corpus.locations, ...corpus.relations];
    expect(new Set(owned.map(entity => entity.id)).size).toBe(owned.length);
    for (const entity of owned) {
      expect(entity.contentOrigin).toBe("historical-extension");
      expect(entity.sourceEpisodes ?? []).toEqual([]);
      expect(entity.sourceRefs.some(ref => ref.includes("https://"))).toBe(true);
    }
    for (const event of corpus.events) {
      expect(event.startYear).toBeGreaterThanOrEqual(304);
      expect(event.endYear ?? event.startYear).toBeLessThanOrEqual(439);
      expect(event.tracks.some(track => corpus.config.trackIds.includes(track))).toBe(true);
      expect(event.personIds.every(id => people.has(id))).toBe(true);
      expect(event.dynastyIds.every(id => dynasties.has(id))).toBe(true);
      expect(event.locationIds.every(id => locations.has(id)), `${event.id} location references`).toBe(true);
      const { seedData } = await import("@/data/seed");
      expect([...event.causeEventIds, ...event.consequenceEventIds].every(id => seedData.events.some(event => event.id === id))).toBe(true);
      for (const field of [event.summary, event.background, event.process, event.result, event.impact]) expect(field.length).toBeGreaterThan(12);
    }
    for (const relation of corpus.relations) {
      expect(people.has(relation.sourcePersonId)).toBe(true);
      expect(people.has(relation.targetPersonId)).toBe(true);
    }
    for (const path of corpus.readingPaths) expect(path.eventIds.every(id => events.has(id))).toBe(true);
    for (const sequence of jinSixteenNarratives) {
      expect(sequence.steps.length).toBeGreaterThanOrEqual(3);
      expect(new Set(sequence.steps.map(step => step.id)).size).toBe(sequence.steps.length);
      let previousYear = 279;
      for (const step of sequence.steps) {
        expect(step.year).toBeGreaterThanOrEqual(previousYear);
        previousYear = step.year;
        const { jinSixteenSnapshots } = await import("@/data/series/jin-sixteen-kingdoms/map-snapshots");
        expect(jinSixteenSnapshots.some(snapshot => snapshot.id === step.snapshotId)).toBe(true);
        expect(step.eventIds.length).toBeGreaterThan(0);
        expect(step.eventIds.every(id => events.has(id))).toBe(true);
        expect(step.nodes.length).toBeGreaterThan(0);
        expect(step.sourceRefs.some(ref => ref.includes("https://"))).toBe(true);
        for (const node of step.nodes) {
          if (node.locationId) expect(locations.has(node.locationId)).toBe(true);
          expect(node.coordinate[0]).toBeGreaterThan(70);
          expect(node.coordinate[0]).toBeLessThan(140);
          expect(node.coordinate[1]).toBeGreaterThan(15);
          expect(node.coordinate[1]).toBeLessThan(55);
        }
      }
    }
  });
});
