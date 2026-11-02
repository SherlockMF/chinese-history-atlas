import { describe, expect, it } from "vitest";
import { jinSixteenSnapshots } from "@/data/series/jin-sixteen-kingdoms/map-snapshots";
import { jinSixteenNarratives, jinSixteenRelatedNarratives } from "@/data/series/jin-sixteen-kingdoms/narratives";

describe("Sixteen Kingdoms key year reconstructions", () => {
  it("adds independently sourced key year scenes without replacing atlas plates", () => {
    for (const year of [304, 347, 376, 394, 410, 417, 431, 439]) {
      const map = jinSixteenSnapshots.find(item => item.year === year);
      expect(map, `${year} reconstruction`).toBeDefined();
      expect(map?.accuracyLevel).toBe("reconstructed");
      expect(map?.coverageNote).toContain("完整阶段");
      expect(map?.sources.some(source => source.referenceYear === year && source.url)).toBe(true);
      expect(map?.regions.length).toBeGreaterThan(1);
      expect(map?.regions.every(region => region.accuracyLevel === "reconstructed" && region.note)).toBe(true);
    }
    expect(jinSixteenSnapshots.filter(item => [281, 327, 366, 382, 395, 409, 449].includes(item.year))).toHaveLength(7);
    const ids = (year: number) => jinSixteenSnapshots.find(item => item.year === year)!.regions.map(region => region.polityId);
    expect(ids(304)).toContain("cheng-han");
    expect(ids(347)).not.toContain("cheng-han");
    expect(ids(376)).not.toContain("former-liang");
    expect(ids(394)).not.toContain("former-qin");
    expect(ids(410)).not.toContain("southern-yan");
    expect(ids(417)).not.toContain("later-qin");
    expect(ids(431)).not.toContain("hu-xia");
    expect(ids(431)).not.toContain("western-qin");
    expect(ids(439)).not.toContain("northern-liang");
    expect(ids(439)).toContain("northern-wei");
  });
  it("uses the same year scene in main and legacy narratives while keeping stable step IDs", () => {
    for (const sequence of [...jinSixteenNarratives, ...jinSixteenRelatedNarratives]) {
      for (const step of sequence.steps.filter(step => [304, 347, 376, 394, 410, 417, 431, 439].includes(step.year))) {
        expect(step.snapshotId, `${sequence.id}/${step.id}`).toBe(`jin-sixteen-kingdoms-${step.year}`);
      }
    }
  });
});
