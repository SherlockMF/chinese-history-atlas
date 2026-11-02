import type { MapNarrativeSequence } from "@/types/map-narrative";
import type { HistoricalMapSnapshot } from "@/types/series";
import { resolveSeriesSnapshot } from "@/lib/history/series-snapshots";

type Query = Pick<URLSearchParams, "get">;

export function resolveNarrativeState(query: Query, sequences: readonly MapNarrativeSequence[], snapshots: readonly HistoricalMapSnapshot[]) {
  const sequence = sequences.find(item => item.id === query.get("sequence"));
  const stepIndex = sequence ? Math.max(0, sequence.steps.findIndex(item => item.id === query.get("step"))) : 0;
  const step = sequence?.steps[stepIndex];
  const input = query.get("year");
  const year = input && Number.isInteger(Number(input)) ? Number(input) : 382;
  const snapshot = step
    ? snapshots.find(item => item.id === step.snapshotId)
    : resolveSeriesSnapshot(snapshots, year) ?? undefined;
  return { sequence, step, stepIndex, snapshot };
}

export function narrativeQuery(sequence: MapNarrativeSequence, stepIndex: number) {
  const step = sequence.steps[Math.max(0, Math.min(sequence.steps.length - 1, stepIndex))];
  return new URLSearchParams({ year: String(step.year), sequence: sequence.id, step: step.id }).toString();
}

export function narrativeReturnHref(seriesSlug: string, eventId: string, query: Query, sequences: readonly MapNarrativeSequence[]) {
  const sequence = sequences.find(item => item.id === query.get("sequence"));
  const index = sequence?.steps.findIndex(item => item.id === query.get("step") && item.eventIds.includes(eventId)) ?? -1;
  return sequence && index >= 0 ? `/series/${seriesSlug}/map?${narrativeQuery(sequence, index)}` : undefined;
}
