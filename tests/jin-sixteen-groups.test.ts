import { describe, expect, it } from "vitest";
import { jinSixteenConfig } from "@/data/series/jin-sixteen-kingdoms/config";
import { jinNarrativesBySeries, jinSixteenGroups, jinSixteenNarratives, jinSixteenClosingNarrative } from "@/data/series/jin-sixteen-kingdoms/narratives";

describe("543211 Sixteen Kingdoms narrative", () => {
  it("covers precisely five Liang, four Yan, three Qin, two Zhao, Cheng and Xia", () => {
    expect(jinSixteenGroups).toBeDefined();
    if (!jinSixteenGroups) return;
    expect(jinSixteenGroups.map(group => group.count)).toEqual([5, 4, 3, 2, 1, 1]);
    expect(jinSixteenGroups.map(group => group.title)).toEqual(["五凉", "四燕", "三秦", "二赵", "一成", "一夏"]);
    const ids = jinSixteenGroups.flatMap(group => [...group.polityIds]);
    expect(ids).toHaveLength(16);
    expect(new Set(ids).size).toBe(16);
    expect([...ids].sort()).toEqual([...jinSixteenConfig.polityGroups!.find(group => group.id === "sixteen-kingdoms")!.dynastyIds].sort());
    for (const group of jinSixteenGroups) expect(group.polityIds.length).toBe(group.count);
    expect(jinSixteenNarratives.map(sequence => sequence.id)).toEqual(jinSixteenGroups.map(group => group.sequenceId));
  });

  it("keeps each group chronological and the Wei conclusion outside the sixteen", () => {
    expect(jinSixteenClosingNarrative).toMatchObject({ id: "wei-unification" });
    expect(jinSixteenNarratives.some(sequence => sequence.id === "wei-unification")).toBe(false);
    for (const sequence of jinSixteenNarratives) expect(sequence.steps.map(step => step.year)).toEqual(sequence.steps.map(step => step.year).sort((a, b) => a - b));
    for (const [id, endEvent] of [["three-qins", "jin-western-qin-xia-fall"], ["cheng-han-rise-fall", "jin-huan-conquers-cheng"], ["xia-rise-fall", "jin-western-qin-xia-fall"]]) {
      const sequence = jinSixteenNarratives.find(sequence => sequence.id === id);
      expect(sequence?.steps.length).toBeGreaterThanOrEqual(3);
      expect(sequence?.steps.at(-1)?.eventIds).toContain(endEvent);
    }
  });

  it("keeps all existing narrative IDs and Fei steps available to shared event returns", () => {
    const all = jinNarrativesBySeries["jin-sixteen-kingdoms"];
    expect(new Set(all.map(sequence => sequence.id)).size).toBe(all.length);
    for (const id of ["sixteen-foundations", "two-zhaos", "yan-successions", "hexi-liang", "former-qin-fei", "wei-unification", "jin-southward", "huan-wen-expeditions", "liu-yu-expeditions"]) expect(all.some(sequence => sequence.id === id), id).toBe(true);
    expect(all.find(sequence => sequence.id === "former-qin-fei")?.steps.map(step => step.id)).toContain("fei-river");
  });
});
