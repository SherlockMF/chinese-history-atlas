"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import type { Dynasty } from "@/types/history";
import type { HistoricalMapSnapshot } from "@/types/series";
import { createSnapshotAtlas } from "./atlas/snapshot-atlas";

const MapLibreCanvas = dynamic(() => import("./atlas/maplibre-canvas").then((module) => module.MapLibreCanvas), {
  ssr: false,
  loading: () => <p role="status" className="p-8 text-sm text-muted">正在载入互动地图…</p>,
});
const ignoreProjector = () => {};

export function SnapshotAtlasMap({ snapshot, dynasties, selectedPolityId, onSelectPolity }: {
  snapshot: HistoricalMapSnapshot;
  dynasties: readonly Dynasty[];
  selectedPolityId?: string;
  onSelectPolity: (polityId: string) => void;
}) {
  const atlas = useMemo(() => createSnapshotAtlas(snapshot, dynasties), [snapshot, dynasties]);
  const [error, setError] = useState<string>();
  const [attempt, setAttempt] = useState(0);
  const [renderedYear, setRenderedYear] = useState<number>();
  return <div className="relative h-[65vh] min-h-[26rem] max-h-[48rem] overflow-hidden bg-[#d7e0df]" data-testid="snapshot-atlas" data-rendered-year={renderedYear}>
    {error ? <div role="alert" className="p-8 text-sm leading-7">
      <p>互动地图暂时无法显示：{error}</p>
      <button type="button" className="mt-4 rounded-lg border border-ink/30 px-4 py-2" onClick={() => { setError(undefined); setAttempt((value) => value + 1); }}>重试地图</button>
    </div> : <MapLibreCanvas key={attempt} atlas={atlas} year={snapshot.year} fitToData selectedDynastyId={selectedPolityId}
      onSelectRegion={(selection) => onSelectPolity(selection.dynastyId)}
      onProjectorChange={ignoreProjector} onFatalError={(failure) => setError(failure.message)} onRenderSuccess={setRenderedYear} />}
  </div>;
}
