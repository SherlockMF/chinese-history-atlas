import type { HistoricalMapSnapshot } from "@/types/series";
import { jinStageSnapshots } from "./stage-map-snapshots";

// All eight key years now use full stage reconstructions. Core-only drafts stay
// in the research inputs and must not silently return to the public atlas.
export const jinKeyYearSnapshots: HistoricalMapSnapshot[] = [...jinStageSnapshots].sort((a, b) => a.year - b.year);
