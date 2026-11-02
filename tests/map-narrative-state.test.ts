import { describe, expect, it } from "vitest";
import { narrativeQuery, resolveNarrativeState, narrativeReturnHref } from "@/features/history-map/narrative-state";
import type { MapNarrativeSequence } from "@/types/map-narrative";
import type { HistoricalMapSnapshot } from "@/types/series";

const sequences: MapNarrativeSequence[] = [{ id: "fei", title: "淝水", period: "382—383", description: "test", steps: [
  { id: "prepare", year: 382, title: "准备", description: "", snapshotId: "map-382", eventIds: ["preparation"], nodes: [], routeKind: "campaign", sourceRefs: [] },
  { id: "battle", year: 383, title: "交战", description: "", snapshotId: "map-382", eventIds: ["battle-fei"], nodes: [], routeKind: "campaign", sourceRefs: [] },
] }];
const snapshots = [281, 382, 395, 449].map(year => ({ id: `map-${year}`, year })) as HistoricalMapSnapshot[];

describe("map narrative navigation", () => {
  it("opens the 382 panorama without autoplay or a selected narrative", () => {
    const state = resolveNarrativeState(new URLSearchParams(), sequences, snapshots);
    expect(state.sequence).toBeUndefined();
    expect(state.snapshot?.year).toBe(382);
  });
  it("keeps event time separate from the source map date", () => {
    const state = resolveNarrativeState(new URLSearchParams("sequence=fei&step=battle&year=383"), sequences, snapshots);
    expect(state.step?.year).toBe(383);
    expect(state.snapshot?.year).toBe(382);
    expect(state.stepIndex).toBe(1);
  });
  it("restores a stable step ID and bounds invalid input to the first step", () => {
    expect(resolveNarrativeState(new URLSearchParams("sequence=fei&step=unknown"), sequences, snapshots).step?.id).toBe("prepare");
    expect(resolveNarrativeState(new URLSearchParams("sequence=missing&year=garbage"), sequences, snapshots).snapshot?.year).toBe(382);
  });
  it("allows the later epilogue without changing the topic's narrative end date", () => {
    expect(resolveNarrativeState(new URLSearchParams("year=449"), sequences, snapshots).snapshot?.year).toBe(449);
  });
  it("produces refreshable queries and only permits returns to a step containing the event", () => {
    const query = narrativeQuery(sequences[0], 1);
    expect(new URLSearchParams(query).get("step")).toBe("battle");
    expect(new URLSearchParams(query).get("year")).toBe("383");
    expect(narrativeReturnHref("jin-sixteen-kingdoms", "battle-fei", new URLSearchParams(query), sequences)).toBe(`/series/jin-sixteen-kingdoms/map?${query}`);
    expect(narrativeReturnHref("jin-sixteen-kingdoms", "unrelated", new URLSearchParams(query), sequences)).toBeUndefined();
    expect(narrativeReturnHref("jin-sixteen-kingdoms", "preparation", new URLSearchParams("sequence=fei&step=wrong"), sequences)).toBeUndefined();
  });
});
