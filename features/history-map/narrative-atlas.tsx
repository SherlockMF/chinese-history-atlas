"use client";

import dynamic from "next/dynamic";
import { useId, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { Dynasty } from "@/types/history";
import type { HistoricalMapSnapshot } from "@/types/series";
import type { MapNarrativeNode, MapNarrativeStep } from "@/types/map-narrative";
import type { AtlasProjector } from "./atlas/atlas-types";
import { createSnapshotAtlas } from "./atlas/snapshot-atlas";
import { narrativeFocusBounds, narrativeFrame } from "./narrative-playback";
import { cn } from "@/lib/utils";

const MapLibreCanvas = dynamic(() => import("./atlas/maplibre-canvas").then(module => module.MapLibreCanvas), {
  ssr: false, loading: () => <p role="status" className="p-8 text-sm text-muted">正在展开历史地图…</p>,
});

export function NarrativeAtlas({ snapshot, dynasties, step, playing = false, elapsedMs = 0, selectedPolityId, onSelectPolity, onSelectNode, onInteract }: {
  snapshot: HistoricalMapSnapshot;
  dynasties: readonly Dynasty[];
  step?: MapNarrativeStep;
  playing?: boolean;
  elapsedMs?: number;
  selectedPolityId?: string;
  onSelectPolity: (id: string) => void;
  onSelectNode: (node: MapNarrativeNode) => void;
  onInteract: () => void;
}) {
  const atlas = useMemo(() => createSnapshotAtlas(snapshot, dynasties), [snapshot, dynasties]);
  const [projector, setProjector] = useState<AtlasProjector>();
  const [error, setError] = useState<string>();
  const [attempt, setAttempt] = useState(0);
  const [renderedYear, setRenderedYear] = useState<number>();
  const reducedMotion = useReducedMotion();
  const markerId = useId().replace(/:/g, "");
  const playbackVisible = playing || elapsedMs > 0;
  const frame = step ? narrativeFrame(step, elapsedMs) : undefined;
  const focusIndex = playbackVisible && frame?.phase === "moving" ? frame.focusIndex : -1;
  const viewBounds = useMemo(() => step && !reducedMotion && focusIndex >= 0 ? narrativeFocusBounds(step, focusIndex) : step?.cameraBounds, [step, reducedMotion, focusIndex]);
  const nodes: MapNarrativeNode[] = step?.nodes ?? (snapshot.capitals ?? []).map((capital, index) => ({ id: `capital-${index}`, name: capital.name, coordinate: capital.coordinate, note: `${snapshot.year}年图上的都城位置；坐标仅为区域参照。` }));
  const projected = nodes.flatMap(node => { const point = projector?.project(node.coordinate); return point ? [{ node, point }] : []; });
  const routeColor = step?.routeKind === "migration" ? "#746341" : "#9f4036";
  const progress = (frame?.routeProgress ?? 0) * Math.max(0, projected.length - 1);
  const segment = Math.min(Math.max(0, projected.length - 2), Math.floor(progress));
  const fraction = Math.min(1, progress - segment);
  const eased = fraction * fraction * (3 - 2 * fraction);
  const from = projected[segment]?.point, to = projected[segment + 1]?.point;
  const traveller = from && to ? [from[0] + (to[0] - from[0]) * eased, from[1] + (to[1] - from[1]) * eased] : undefined;
  const labels: { node: MapNarrativeNode; point: [number, number]; labelY: number; width: number }[] = [];
  for (const { node, point } of step ? projected : []) {
    const width = Math.max(76, node.name.length * 12 + 44);
    let labelY = point[1];
    // Nearby places keep separate touch targets; leader lines retain their true map positions.
    while (labels.some(label => Math.abs(label.point[0] - point[0]) < (label.width + width) / 2 + 8 && Math.abs(label.labelY - labelY) < 52)) labelY += 52;
    labels.push({ node, point, labelY, width });
  }

  return <div className="relative h-[52vh] min-h-[23rem] overflow-hidden bg-[#d7e0df] sm:h-[36rem] lg:h-full lg:min-h-[38rem]" data-testid="narrative-atlas" data-rendered-year={renderedYear} onPointerDownCapture={onInteract} onKeyDownCapture={onInteract} onWheelCapture={onInteract}>
    {error ? <div role="alert" className="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
      <p className="font-serif text-xl">互动地图暂时无法显示</p><p className="max-w-sm text-sm leading-7 text-muted">{error}。仍可使用步骤列表阅读事件、地点和出处。</p>
      <button type="button" className="min-h-11 border border-ink/30 px-5" onClick={() => { setError(undefined); setAttempt(value => value + 1); }}>重试地图</button>
    </div> : <>
      <MapLibreCanvas key={attempt} atlas={atlas} year={snapshot.year} fitToData selectedDynastyId={selectedPolityId} viewBounds={viewBounds} cameraDurationMs={2200} cameraPlaying={playing} reducedMotion={Boolean(reducedMotion)} mutedRealms={Boolean(step && step.year !== snapshot.year)} onSelectRegion={selection => onSelectPolity(selection.dynastyId)} onProjectorChange={setProjector} onFatalError={failure => setError(failure.message)} onRenderSuccess={setRenderedYear} />
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
        <defs><marker id={markerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0L7 3.5L0 7Z" fill={step?.routeKind === "migration" ? "#746341" : "#9f4036"} /></marker></defs>
        {step && step.routeKind !== "political" && projected.length > 1 ? <polyline points={projected.map(({ point }) => point.join(",")).join(" ")} fill="none" stroke={routeColor} strokeWidth={step.routeKind === "migration" ? 5 : 3} strokeOpacity={playbackVisible && !reducedMotion ? 0.18 : 0.8} strokeDasharray={step.routeKind === "migration" ? "9 7" : "5 4"} strokeLinejoin="round" markerEnd={playbackVisible && !reducedMotion ? undefined : `url(#${markerId})`} /> : null}
        {playbackVisible && step && !reducedMotion ? step.routeKind !== "political" && projected.length > 1
          ? <g data-testid="narrative-route-reveal">
            {projected.slice(1).map(({ node, point }, index) => {
              const value = Math.min(1, Math.max(0, progress - index));
              const reveal = value * value * (3 - 2 * value);
              return <line key={`${step.id}-${node.id}`} className="narrative-route-segment" x1={projected[index].point[0]} y1={projected[index].point[1]} x2={point[0]} y2={point[1]} pathLength="100" stroke={routeColor} strokeWidth="4" strokeLinecap="round" strokeDasharray="100" style={{ strokeDashoffset: 100 * (1 - reveal) }} />;
            })}
            {traveller ? <g data-testid="narrative-traveller" className="narrative-traveller" style={{ transform: `translate(${traveller[0]}px, ${traveller[1]}px)` }}><circle r="12" fill={routeColor} opacity=".12" /><circle r="5" fill={routeColor} stroke="#f3f0e7" strokeWidth="2" /></g> : null}
          </g>
          : projected.filter((_, index) => index === frame?.activeIndex).map(({ node, point }) => <circle key={`${step.id}-${node.id}`} className="narrative-point-pulse" style={{ animationPlayState: playing ? "running" : "paused" }} cx={point[0]} cy={point[1]} r="18" fill="none" stroke={routeColor} strokeWidth="2" />)
          : null}
        {labels.filter(label => label.labelY !== label.point[1]).map(({ node, point, labelY }) => <g key={node.id}><line x1={point[0]} y1={point[1]} x2={point[0]} y2={labelY} stroke="#9f4036" strokeWidth="1" /><circle cx={point[0]} cy={point[1]} r="3" fill="#9f4036" /></g>)}
      </svg>
      {!step ? projected.map(({ node, point }) => <button key={node.id} type="button" data-map-capital="true" aria-label={`查看地点：${node.name}`} title={node.name} onClick={() => onSelectNode(node)} style={{ left: point[0], top: point[1] }} className="absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full focus-visible:bg-paper/80 focus-visible:outline-2 focus-visible:outline-cinnabar hover:bg-cinnabar/10"><span className="size-2 rounded-full border border-paper bg-cinnabar" /></button>) : null}
      {labels.map(({ node, point, labelY, width }, index) => {
        const state = !playbackVisible || !frame ? "idle" : index === frame.activeIndex ? "active" : index < frame.activeIndex ? "visited" : "upcoming";
        return <button key={node.id} type="button" onClick={() => onSelectNode(node)} style={{ left: point[0], top: labelY, width }} data-node-state={state} className={cn("narrative-map-node absolute z-10 flex min-h-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1.5 whitespace-nowrap rounded-sm border px-2 text-xs shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar", state === "active" ? "border-cinnabar bg-cinnabar text-paper ring-4 ring-cinnabar/15" : "border-cinnabar/50 bg-paper/95 text-ink hover:bg-paper", state === "upcoming" && "border-ink/15 bg-paper text-muted shadow-none")} aria-label={`查看地点：${node.name}`}><span className={cn("grid size-5 place-items-center rounded-full text-[10px]", state === "active" ? "bg-paper text-cinnabar" : state === "upcoming" ? "bg-ink/10 text-muted" : "bg-cinnabar text-paper")}>{step ? index + 1 : "•"}</span>{node.name}</button>;
      })}
      <p className="pointer-events-none absolute left-4 top-4 border border-ink/15 bg-paper/95 px-3 py-2 text-xs leading-5 text-muted">{snapshot.year} 年背景地图{step ? <><br />{step.routeKind === "migration" ? "虚线：区域迁徙方向" : step.routeKind === "campaign" ? "虚线：行动地点的先后联系" : "圆点：政治事件地点"}</> : null}</p>
      {snapshot.coverageNote ? <p data-testid="map-coverage-note" className="pointer-events-none absolute left-4 right-16 top-20 w-fit border border-ink/15 bg-paper/95 px-3 py-2 text-xs leading-5 text-muted sm:inset-x-4 sm:bottom-4 sm:top-auto">{snapshot.coverageNote}</p> : null}
    </>}
  </div>;
}
