import { describe, expect, it } from "vitest";
import { narrativeDuration, narrativeFrame, narrativeFocusBounds } from "@/features/history-map/narrative-playback";
import type { MapNarrativeStep } from "@/types/map-narrative";

const step: MapNarrativeStep = { id: "route", title: "行进", year: 280, snapshotId: "281", description: "沿江东下。", nodes: [
  { id: "a", name: "甲", coordinate: [110, 30] }, { id: "b", name: "乙", coordinate: [112, 31] }, { id: "c", name: "丙", coordinate: [115, 32] },
], routeKind: "campaign", eventIds: [], sourceRefs: [], cameraBounds: [[108, 28], [117, 34]] };

describe("narrative playback choreography", () => {
  it("gives longer routes more time and reserves a final reading pause", () => {
    expect(narrativeDuration(step)).toBeGreaterThan(narrativeDuration({ ...step, nodes: step.nodes.slice(0, 1) }));
    const duration = narrativeDuration(step);
    expect(duration).toBeGreaterThanOrEqual(8000);
    expect(narrativeDuration({ ...step, description: "长".repeat(2000), nodes: Array(20).fill(step.nodes[0]) })).toBeLessThanOrEqual(14000);
    expect(narrativeFrame(step, 0).phase).toBe("opening");
    expect(narrativeFrame(step, 2000).phase).toBe("moving");
    expect(narrativeFrame(step, duration - 2000)).toMatchObject({ phase: "reading", activeIndex: 2, routeProgress: 1 });
  });
  it("reveals locations in sequence without treating political nodes as a campaign", () => {
    const duration = narrativeDuration(step);
    const halfway = 1000 + (duration - 4000) / 2;
    expect(narrativeFrame(step, halfway)).toMatchObject({ activeIndex: 1, focusIndex: 2, routeProgress: 0.5 });
    expect(narrativeFrame({ ...step, routeKind: "political" }, halfway).caption).not.toContain("→");
    expect(narrativeFrame({ ...step, nodes: [] }, 0).activeIndex).toBe(-1);
  });
  it("keeps the entire route inside a gentle focus frame", () => {
    const bounds = narrativeFocusBounds(step, 2)!;
    expect(bounds).not.toEqual(step.cameraBounds);
    for (const node of step.nodes) {
      expect(node.coordinate[0]).toBeGreaterThan(bounds[0][0]);
      expect(node.coordinate[0]).toBeLessThan(bounds[1][0]);
      expect(node.coordinate[1]).toBeGreaterThan(bounds[0][1]);
      expect(node.coordinate[1]).toBeLessThan(bounds[1][1]);
    }
    expect(narrativeFocusBounds(step, -1)).toBe(step.cameraBounds);
  });
});
