import { describe, expect, it } from "vitest";
import audit from "@/gis/context/northern-boundary-audit.json";
import guides from "@/gis/context/northern-boundary-guides.json";
import traces from "@/gis/context/northern-context-traces.json";
import context from "@/data/maps/context/atlas-context.json";
import { expansionMapSnapshots } from "@/data/series/expansion/map-snapshots";

describe("source-traced northern frontiers", () => {
  it("retains same-year source fingerprints and improves fit without geographic invention", () => {
    expect(audit.maps.map(p => p.year)).toEqual([449, 497, 546, 572, 612]);
    for (const page of audit.maps) {
      expect(page.sourceSha256).toMatch(/^[a-f\d]{64}$/);
      const before = page.segments.reduce((sum, s) => sum + s.oldMeanOutsideBandPx, 0);
      const after = page.segments.reduce((sum, s) => sum + s.newMeanOutsideBandPx, 0);
      expect(after).toBeLessThan(before);
      expect(page.segments.every(s => s.maxDisplacementPx <= 22)).toBe(true);
      const current = traces.maps.find(p => p.year === page.year)!;
      const original = guides.maps.find(p => p.year === page.year)!;
      for (const region of original.regions) {
        const ring = current.regions.find(r => r.id === region.id)!.ring;
        expect(ring[0]).toEqual(ring.at(-1));
        // Shared junctions and independently read southern interfaces stay fixed.
        for (const junction of region.ring) expect(ring.some(p => p[0] === junction[0] && p[1] === junction[1])).toBe(true);
      }
    }
  });
  it("keeps fill geometry while recording which page closures are not frontiers", () => {
    const west572 = traces.maps.find(p => p.year === 572)!.regions.find(r => r.id === "turks-northern-western-peoples")!;
    const west612 = traces.maps.find(p => p.year === 612)!.regions.find(r => r.id === "western-turks-western-states")!;
    expect("frameEdges" in west572 && west572.frameEdges).toEqual([[[43, 423], [44, 114]]]);
    expect("frameEdges" in west612 && west612.frameEdges).toEqual([[[24, 411], [23, 107]]]);
    expect(context["572"].regions.some(r => r.polityId === west572.id)).toBe(true);
    expect(context["612"].regions.some(r => r.polityId === west612.id)).toBe(true);
  });
  it("explains the difference between the northern group extent and direct Rouran rule", () => {
    const snapshot = expansionMapSnapshots.find(s => s.year === 449)!;
    expect(snapshot.scopeNote).toContain("不能理解为实测国界");
    expect(snapshot.regions.find(r => r.polityId === "rouran-northern-peoples")?.note).toContain("不能把整个色块都解释为柔然直接统治");
  });
});
