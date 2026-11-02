"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { useHistoryStore } from "@/features/history-state/history-store";
import { clampSeriesYear } from "@/lib/history/series";
import { cn } from "@/lib/utils";
import type { Dynasty, HistoricalEvent, HistoricalLocation } from "@/types/history";
import type { HistorySeriesConfig } from "@/types/series";

const LocationsCanvas = dynamic(() => import("./locations-canvas").then(module => module.LocationsCanvas), { ssr: false, loading: () => <p className="grid h-[360px] place-items-center bg-mist text-sm text-muted sm:h-[480px]">正在载入地点底图…</p> });

export function LocationsMap({ series, locations, events, dynasties }: {
  series: HistorySeriesConfig; locations: HistoricalLocation[]; events: HistoricalEvent[]; dynasties: Dynasty[];
}) {
  const currentYear = useHistoryStore(state => state.currentYear);
  const setCurrentYear = useHistoryStore(state => state.setCurrentYear);
  const selectedEvent = useHistoryStore(state => state.selectedEvent);
  const selectedDynasty = useHistoryStore(state => state.selectedDynasty);
  const selectDynasty = useHistoryStore(state => state.selectDynasty);
  const selectEvent = useHistoryStore(state => state.selectEvent);
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const year = clampSeriesYear(currentYear, series);
  const currentEvents = events.filter(event => event.startYear <= year && (event.endYear ?? event.startYear) >= year);
  const activeIds = [...new Set(currentEvents.flatMap(event => event.locationIds))];
  const requestedEvent = events.find(event => event.id === selectedEvent);
  const selectedId = selectedLocation ?? requestedEvent?.locationIds[0] ?? activeIds[0] ?? locations[0]?.id;
  const location = locations.find(place => place.id === selectedId);
  const related = events.filter(event => event.locationIds.includes(selectedId ?? "")).sort((a, b) => Math.abs(a.startYear - year) - Math.abs(b.startYear - year));
  const selectedPolity = dynasties.find(polity => polity.id === selectedDynasty);
  const relevantEvents = selectedPolity ? events.filter(event => event.dynastyIds.includes(selectedPolity.id)) : events;
  const relevantCurrentEvents = currentEvents.filter(event => !selectedPolity || event.dynastyIds.includes(selectedPolity.id));
  const nearest = [...relevantEvents].sort((a, b) => Math.abs(a.startYear - year) - Math.abs(b.startYear - year)).slice(0, 4);
  const years = [...new Set(events.map(event => event.startYear))].sort((a, b) => a - b);
  const eventLink = (event: HistoricalEvent) => <Link href={`/explore/${event.id}?year=${event.startYear}&series=${series.slug}`} className="inline-block py-2 text-sm leading-6 text-cinnabar underline decoration-cinnabar/30 underline-offset-4">{event.startYear} · {event.title}</Link>;
  const chooseYear = (value: number) => { setSelectedLocation(undefined); selectEvent(undefined); setCurrentYear(value); };

  return <section aria-label={`${series.title}历史地点地图`} className="overflow-hidden rounded-2xl border border-ink/20 bg-paper">
    <div className="grid gap-4 bg-ink p-5 text-paper sm:grid-cols-[1fr_auto]">
      <label className="grid gap-2"><span className="text-xs tracking-widest text-gold">历史地点 · {series.timelineMinYear}—{series.timelineMaxYear}</span><span className="flex items-baseline justify-between gap-4"><strong className="font-serif text-4xl">{year}</strong><span className="text-xs text-paper/65">沿年份看事件发生在哪里</span></span><input type="range" aria-label="地图年份" min={series.timelineMinYear} max={series.timelineMaxYear} value={year} onChange={event => chooseYear(Number(event.target.value))} className="h-8 w-full accent-gold" /></label>
      <label className="grid content-center gap-2 text-xs text-paper/75">跳到关键年份<select aria-label="地图关键年份" value={years.includes(year) ? year : ""} onChange={event => chooseYear(Number(event.target.value))} className="min-h-11 rounded-lg border border-paper/20 bg-ink px-3 text-paper"><option value="" disabled>选择一个事件年份</option>{years.map(value => <option key={value} value={value}>{value} 年</option>)}</select></label>
    </div>
    <p className="border-b border-ink/15 px-5 py-3 text-xs leading-6 text-muted">现代自然地理底图，仅作位置参照；地点不表示历史疆界，也不推演逐年领土。红色文字标记当年关联地点，红底标记当前选中地点。</p>
    <div className="grid lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,1fr)]">
      <div className="min-w-0"><LocationsCanvas key={series.id} locations={locations} selectedId={selectedId} activeIds={activeIds} onSelect={setSelectedLocation} />
        <div className="border-t border-ink/15 p-5"><h3 className="text-xs text-muted">选择地点 · {locations.length} 处</h3><div className="mt-3 flex max-h-48 flex-wrap gap-2 overflow-auto" role="group" aria-label="历史地点">{locations.map(place => <button key={place.id} type="button" aria-label={`选择地点：${place.name}`} aria-pressed={selectedId === place.id} onClick={() => setSelectedLocation(place.id)} className={cn("min-h-11 rounded-lg border px-3 py-2 text-xs focus-visible:ring-2 focus-visible:ring-cinnabar", selectedId === place.id ? "border-cinnabar bg-cinnabar text-paper" : "border-ink/15 hover:border-cinnabar")}>{place.name}</button>)}</div></div>
      </div>
      <div className="border-t border-ink/15 p-5 lg:border-l lg:border-t-0" aria-live="polite">
        <p className="text-xs tracking-widest text-muted">{year} 年{selectedPolity ? ` · ${selectedPolity.name}` : ""}</p>
        {selectedPolity ? <button type="button" onClick={() => selectDynasty(undefined)} className="mt-2 min-h-11 text-xs text-cinnabar underline underline-offset-4">清除政权筛选</button> : null}
        <h3 className="mt-3 font-serif text-xl">{relevantCurrentEvents.length ? "当年事件" : "邻近的历史节点"}</h3>
        {!relevantCurrentEvents.length ? <p className="mt-2 text-xs leading-6 text-muted">{selectedPolity ? "所选政权在本站没有当年事件" : "本站未收录当年事件"}，以下按距离所选年份排序，各条保留实际发生年份。</p> : null}
        <ul className="mt-2">{(relevantCurrentEvents.length ? relevantCurrentEvents : nearest).map(event => <li key={event.id}>{eventLink(event)}</li>)}</ul>
        {location ? <div className="mt-6 border-t border-ink/15 pt-5"><p className="text-xs text-muted">选中的地点 · 跨年份阅读</p><h3 className="mt-3 font-serif text-2xl">{location.name}</h3><p className="mt-2 text-xs leading-6 text-muted">{location.modernReference}</p><p className="mt-2 font-mono text-xs text-muted">{location.longitude.toFixed(2)}°E / {location.latitude.toFixed(2)}°N</p><ul className="mt-3">{related.map(event => <li key={event.id}>{eventLink(event)}</li>)}</ul>{!related.length ? <p className="mt-3 text-sm text-muted">该地点作为背景参照，暂无直接关联的已收录事件。</p> : null}</div> : <p className="mt-5 text-sm text-muted">尚无可定位的地点。</p>}
      </div>
    </div>
  </section>;
}
