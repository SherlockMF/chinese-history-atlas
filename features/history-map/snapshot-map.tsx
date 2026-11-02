"use client";

import Link from "next/link";
import { useState } from "react";
import { useHistoryStore } from "@/features/history-state/history-store";
import { clampSeriesYear } from "@/lib/history/series";
import { resolveSeriesSnapshot } from "@/lib/history/series-snapshots";
import { cn } from "@/lib/utils";
import type { Dynasty, HistoricalEvent } from "@/types/history";
import type { HistoricalMapSnapshot, HistorySeriesConfig } from "@/types/series";
import { SnapshotAtlasMap } from "./snapshot-atlas-map";

const accuracyLabels = { illustrative: "示意", approximate: "近似", reconstructed: "重建" };

export function SnapshotMap({ series, snapshots, dynasties, events = [] }: {
  series: HistorySeriesConfig;
  snapshots: readonly HistoricalMapSnapshot[];
  dynasties: readonly Dynasty[];
  events?: readonly HistoricalEvent[];
}) {
  const currentYear = useHistoryStore((state) => state.currentYear);
  const setCurrentYear = useHistoryStore((state) => state.setCurrentYear);
  const [selection, setSelection] = useState<{ snapshotId: string; polityId: string } | null>(null);
  const year = clampSeriesYear(currentYear, series, "map");
  const stages = snapshots.filter((stage) => stage.seriesId === series.id).sort((a, b) => a.year - b.year);
  const snapshot = resolveSeriesSnapshot(stages, year);
  if (!snapshot) return <p role="status" className="rounded-2xl border border-dashed border-ink/20 p-8 text-muted">暂无阶段快照，等待核验后的地图资料。</p>;
  const isReady = snapshot.status === "ready" && snapshot.regions.length > 0;
  const selected = (selection?.snapshotId === snapshot.id ? snapshot.regions.find((region) => region.polityId === selection.polityId) : null) ?? snapshot.regions.find(region => dynasties.some(dynasty => dynasty.id === region.polityId)) ?? snapshot.regions[0];
  const polity = dynasties.find((dynasty) => dynasty.id === selected?.polityId);
  const relatedEvents = events.filter((event) => event.dynastyIds.includes(selected?.polityId ?? "")).sort((a, b) => Math.abs(a.startYear - snapshot.year) - Math.abs(b.startYear - snapshot.year)).slice(0, 3);
  const select = (polityId: string) => setSelection({ snapshotId: snapshot.id, polityId });

  return <section aria-label={`${series.title}阶段地图`} className="overflow-hidden rounded-2xl border border-ink/20 bg-paper">
    <div className="bg-ink px-5 py-5 text-paper">
      <label className="grid gap-3">
        <span className="flex items-baseline justify-between gap-3 text-sm">选择年份 · 阶段地图<strong className="font-serif text-3xl">{year}</strong></span>
        <input aria-label="地图年份" type="range" min={series.mapMinYear ?? series.timelineMinYear} max={series.mapMaxYear ?? series.timelineMaxYear} value={year} onChange={(event) => setCurrentYear(Number(event.target.value))} className="map-year-slider h-11 w-full cursor-pointer accent-cinnabar" />
      </label>
    </div>
    <div role="group" aria-label="地图阶段" className="flex flex-wrap gap-2 border-b border-ink/15 p-5">
      {stages.map((stage) => <button key={stage.id} type="button" aria-pressed={stage.id === snapshot.id} onClick={() => setCurrentYear(stage.year)} className={cn("min-h-11 min-w-16 rounded-full border px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar", stage.id === snapshot.id ? "border-cinnabar bg-cinnabar text-paper" : "border-ink/20 hover:border-cinnabar")}>{stage.year}{stage.status === "pending" ? <span className="ml-1 text-xs">待整理</span> : null}</button>)}
    </div>
    <div aria-live="polite" className="border-b border-ink/15 px-5 py-4">
      <h3 className="font-serif text-xl">{snapshot.year}年{isReady ? (snapshot.accuracyLevel === "reconstructed" ? " · 史料重建地图" : " · 图集典型地图") : " · 资料整理中"}</h3>
      <p className="mt-2 font-serif text-lg">{snapshot.label}</p>
      <p className="mt-2 text-sm leading-7 text-muted">{snapshot.note}</p>
      {year !== snapshot.year ? <p className="mt-2 text-sm text-cinnabar">{year < snapshot.year ? "所选年份早于首个快照；" : "所选年份没有独立快照；"}当前显示 {snapshot.year} 年地图，不代表 {year} 年格局，也不进行年度插值。</p> : null}
    </div>
    {isReady ? <>
      <SnapshotAtlasMap snapshot={snapshot} dynasties={dynasties} selectedPolityId={selected?.polityId} onSelectPolity={select} />
      <div className="grid gap-5 border-t border-ink/15 p-5 lg:grid-cols-[1fr_1.3fr]">
        <div className="min-w-0">
          <p className="text-xs leading-6 text-muted">拖动或缩放地图，点击疆域或选择下方政权查看说明。圆点标示都城；着色表示政权疆域或势力范围，外围背景可只标名称，名称位置不代表疆界。</p>
          <div role="group" aria-label="本阶段政权" className="mt-3 flex flex-wrap gap-2">
            {snapshot.regions.map((region) => {
              const dynasty = dynasties.find((item) => item.id === region.polityId);
              return <button key={region.polityId} type="button" aria-pressed={selected?.polityId === region.polityId} onClick={() => select(region.polityId)} onFocus={() => select(region.polityId)} className={cn("flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-cinnabar", selected?.polityId === region.polityId ? "border-ink bg-ink/5" : "border-ink/20")}>{region.displayMode !== "label-only" ? <span aria-hidden="true" className="h-3 w-3 rounded-full" style={{ backgroundColor: region.color ?? dynasty?.color }} /> : null}{region.name ?? dynasty?.name ?? region.polityId}</button>;
            })}
          </div>
          <p className="mt-4 text-xs leading-6 text-muted">{snapshot.scopeNote}</p>
        </div>
        {selected ? <div aria-live="polite" className="min-w-0 rounded-xl border border-ink/15 p-5">
          <h4 className="font-serif text-2xl">{selected.name ?? polity?.name}</h4>
          <p className="mt-3 text-sm leading-7">{selected.note}</p>
          <p className="mt-3 text-xs text-muted">区域精度：{accuracyLabels[selected.accuracyLevel]}{selected.boundaryKind === "influence" ? " · 诸部或势力范围，不表示统一直接行政控制" : ""}</p>
          {relatedEvents.length ? <div className="mt-5 border-t border-ink/15 pt-4"><p className="text-xs text-muted">相关内容（各条注明自身年份）</p><ul className="mt-2 space-y-3">{relatedEvents.map((event) => <li key={event.id}><Link href={`/explore/${event.id}?year=${event.startYear}&series=${series.slug}`} className="text-sm text-cinnabar underline underline-offset-4">{event.startYear} · {event.title}</Link></li>)}</ul></div> : polity ? <p className="mt-4 text-sm leading-7 text-muted">{polity.summary}</p> : null}
        </div> : null}
      </div>
      {snapshot.contextPlaces?.length ? <details className="border-t border-ink/15 px-5 py-4 text-sm leading-7">
        <summary className="cursor-pointer text-cinnabar">原图上的周边名称（{snapshot.contextPlaces.length}）</summary>
        <p className="mt-3 text-xs text-muted">名称位置依原图文字配准，仅表示大致所在地区。没有闭合历史界的名称不补画领土。</p>
        <ul className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">{snapshot.contextPlaces.map((place) => <li key={place.id}><strong className="font-medium">{place.name}</strong><p className="text-xs leading-6 text-muted">{place.note}</p></li>)}</ul>
      </details> : null}
      <div className="border-t border-ink/15 px-5 py-4 text-sm leading-7">
        <p><strong>精度：{accuracyLabels[snapshot.accuracyLevel]}</strong> · {snapshot.accuracyNote}</p>
        <details className="mt-3"><summary className="cursor-pointer text-cinnabar">{snapshot.accuracyLevel === "reconstructed" ? "重建年代与来源" : "图集年代与来源"}</summary>
          <ul className="mt-2 space-y-1">{snapshot.sources.map((source) => <li key={source.fileLabel ?? source.url ?? source.title}>{source.url ? <a href={source.url} className="underline underline-offset-4">{source.title}</a> : source.title}</li>)}</ul>
          <p className="mt-3 text-xs text-muted">{snapshot.accuracyLevel === "reconstructed" ? "依据所列史籍重建，推定接界不代表实测疆界；不同年份图集只作注明年代的地理参照。" : "谭其骧主编《中国历史地图集》，中国地图出版社。依据本地参考图概括重绘，扫描影像不在网站分发。"}自然地理沿用共用底图；都城点仅表示所在区域。</p>
        </details>
      </div>
    </> : <p role="status" className="p-10 text-center leading-8 text-muted">该阶段地图资料整理中<br /><span className="text-sm">{snapshot.accuracyNote}</span></p>}
  </section>;
}
