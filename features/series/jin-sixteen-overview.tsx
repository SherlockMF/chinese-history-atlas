"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SourceReference } from "@/components/history/source-reference";
import { jinComparisonYears, jinSixteenProfiles, politiesAtYear } from "@/data/series/jin-sixteen-kingdoms/polity-profiles";
import { jinSixteenGroups } from "@/data/series/jin-sixteen-kingdoms/narratives";
import type { Dynasty, HistoricalEvent, Person } from "@/types/history";
import type { MapNarrativeSequence } from "@/types/map-narrative";
import { narrativeQuery } from "@/features/history-map/narrative-state";

import { PolityPeriodBar } from "./polity-period-bar";

const prefix = "/series/jin-sixteen-kingdoms";
const firstYear = 301, lastYear = 440;
const offset = (year: number) => `${(year - firstYear) / (lastYear - firstYear) * 100}%`;
const polityName = (dynasty: Dynasty) => dynasty.id === "han-zhao" ? "前赵（汉赵）" : dynasty.name;

export function JinSixteenOverview({ dynasties, events, people, sequences }: {
  dynasties: readonly Dynasty[]; events: readonly HistoricalEvent[]; people: readonly Person[]; sequences: readonly MapNarrativeSequence[];
}) {
  const [year, setYear] = useState(304);
  const [selectedId, setSelectedId] = useState<string>();
  const timelineRef = useRef<HTMLDivElement>(null);
  const active = new Set(politiesAtYear(year));
  useEffect(() => {
    const container = timelineRef.current;
    const plot = container?.querySelector<HTMLElement>("[data-time-plot]");
    if (!container || !plot || container.scrollWidth <= container.clientWidth) return;
    const plotLeft = plot.getBoundingClientRect().left - container.getBoundingClientRect().left + container.scrollLeft;
    const labelWidth = plot.previousElementSibling!.getBoundingClientRect().width;
    container.scrollTo({ left: plotLeft + (year - firstYear) / (lastYear - firstYear) * plot.clientWidth - (container.clientWidth + labelWidth) / 2, behavior: "instant" });
  }, [year]);
  const inspect = (id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => {
      const profile = document.getElementById(`profile-${id}`);
      profile?.querySelector("summary")?.focus({ preventScroll: true });
      profile?.scrollIntoView?.({ behavior: "instant", block: "start" });
    });
  };
  return <section id="sixteen-overview" aria-label="十六国并立总览" className="scroll-mt-24 border-t border-ink/20 py-12 sm:py-16">
    <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs tracking-[0.2em] text-cinnabar">同一时间 · 不同国号</p><h2 className="mt-3 font-serif text-3xl sm:text-4xl">把十六国放在一张时间图里。</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">长短看存续，纵向看并立。悬停、聚焦或轻点色条查看起止年；点国名展开档案。</p></div><label className="flex items-center gap-3 text-sm text-muted">对照年份<select value={year} onChange={event => setYear(Number(event.target.value))} className="min-h-11 border border-ink/25 bg-paper px-4 text-ink">{jinComparisonYears.map(value => <option key={value} value={value}>{value} 年</option>)}</select></label></div>
    <p className="mt-4 text-xs leading-6 text-muted sm:hidden">左右滑动查看完整时间图；切换年份会移到对应位置，国名固定在左侧。</p>
    <div ref={timelineRef} role="region" aria-label="十六国存续时间图，可横向滚动" tabIndex={0} className="mt-7 overflow-x-auto border border-ink/20 focus-visible:outline-2 focus-visible:outline-cinnabar">
      <div className="min-w-[760px] p-4 sm:p-6">
        <div className="mb-3 grid grid-cols-[9rem_1fr]"><span className="sticky left-0 z-20 bg-paper text-xs text-muted">301—439 · 含兴亡年</span><div className="relative h-6 text-[11px] text-muted">{[301, 325, 350, 375, 400, 425, 439].map(value => <span key={value} style={{ left: offset(value) }} className={`absolute ${value === firstYear ? "" : "-translate-x-1/2"}`}>{value}</span>)}</div></div>
        {jinSixteenGroups.map(group => <div key={group.sequenceId} className="border-t border-ink/15 py-2"><p className="sticky left-0 z-20 mb-1 w-fit bg-paper text-[10px] tracking-widest text-cinnabar">{group.title}</p>{group.polityIds.map(id => {
          const dynasty = dynasties.find(item => item.id === id)!;
          const profile = jinSixteenProfiles.find(item => item.polityId === id)!;
          return <div key={id} data-testid="polity-time-row" className="grid grid-cols-[9rem_1fr] items-center"><button type="button" aria-label={`查看${dynasty.name}档案`} aria-expanded={selectedId === id} aria-controls={`profile-${id}`} onClick={() => inspect(id)} className="sticky left-0 z-20 min-h-11 bg-paper pr-3 text-left text-sm underline decoration-ink/20 underline-offset-4 hover:text-cinnabar focus-visible:outline-2 focus-visible:outline-cinnabar">{polityName(dynasty)}</button><div data-time-plot data-testid={`polity-row-${id}`} className="relative h-11" aria-label={`${polityName(dynasty)}：${profile.periods.map(period => `${period.start}—${period.end}`).join("、")}年`}>
            {[325, 350, 375, 400, 425].map(value => <span key={value} aria-hidden="true" style={{ left: offset(value) }} className="absolute inset-y-0 border-l border-ink/10" />)}
            {profile.periods.map(period => <PolityPeriodBar key={period.start} name={polityName(dynasty)} start={period.start} end={period.end} firstYear={firstYear} lastYear={lastYear} color={dynasty.color} active={active.has(id)} />)}
            <span aria-hidden="true" style={{ left: offset(year) }} className="pointer-events-none absolute inset-y-0 z-10 border-l-2 border-cinnabar" />
          </div></div>;
        })}</div>)}
      </div>
    </div>
    <p className="mt-3 text-xs leading-6 text-muted">前凉从301年张轨任凉州刺史起算；本专题主线从304年开始。色条包含建国及终结年，不表示全年并立，也不代表疆域大小。西秦400—409年的独立统治中断留白。</p>
    <div role="region" aria-label={`${year}年同期政权`} className="mt-6 border-l-2 border-cinnabar bg-mist/35 p-5"><h3 className="font-serif text-xl">{year}年，同一时代的六组</h3><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{jinSixteenGroups.map(group => <div key={group.sequenceId}><p className="text-xs text-muted">{group.title}</p><p className="mt-2 text-sm leading-7">{group.polityIds.filter(id => active.has(id)).map(id => dynasties.find(item => item.id === id)!.name).join("、") || "本年未见独立政权"}</p></div>)}</div><Link prefetch={false} href={`${prefix}/map?year=${year}`} className="mt-3 inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">看{year}年地图资料 ↗</Link><p className="text-xs leading-6 text-muted">按存续年份对照，含同年初建与终结。地图采用可用的本年图或此前阶段图，具体日期另行标示；东晋、刘宋、北魏另作时代背景。</p></div>
    <div id="sixteen-profiles" className="mt-12 scroll-mt-24" aria-label="十六国政权档案"><p className="text-xs tracking-[0.2em] text-cinnabar">十六份档案 · 从兴起到终局</p><h2 className="mt-3 font-serif text-3xl">各有来路，各有归处。</h2><div className="mt-6 border-t border-ink/20">{jinSixteenProfiles.map(profile => {
      const dynasty = dynasties.find(item => item.id === profile.polityId)!;
      const group = jinSixteenGroups.find(item => (item.polityIds as readonly string[]).includes(dynasty.id))!;
      const sequence = sequences.find(item => item.id === group.sequenceId)!;
      const related = events.filter(event => event.dynastyIds.includes(dynasty.id) && event.startYear <= dynasty.endYear && (event.endYear ?? event.startYear) >= dynasty.startYear).sort((a, b) => a.startYear - b.startYear);
      const milestones = related.filter((event, index) => event.eventType === "founding" || index < 2 || index >= related.length - 2);
      const startStep = sequence.steps.findIndex(step => step.eventIds.some(id => related.some(event => event.id === id && event.eventType === "founding")));
      return <details key={dynasty.id} id={`profile-${dynasty.id}`} aria-label={`${dynasty.name}档案`} open={selectedId === dynasty.id} className="scroll-mt-24 border-b border-ink/20">
        <summary onClick={event => { event.preventDefault(); setSelectedId(selectedId === dynasty.id ? undefined : dynasty.id); }} className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-cinnabar"><span className="flex items-center gap-3"><span aria-hidden="true" className="size-2" style={{ backgroundColor: dynasty.color }} /><span className="font-serif text-xl">{polityName(dynasty)}</span><span className="text-xs text-muted">{group.title}</span></span><span className="text-xs text-muted">{dynasty.startYear}—{dynasty.endYear} <span aria-hidden="true" className="ml-3 text-cinnabar">{selectedId === dynasty.id ? "−" : "+"}</span></span></summary>
        <div className="grid gap-7 pb-7 lg:grid-cols-[1fr_1fr]"><div><p className="text-sm leading-8">{dynasty.summary}</p><h3 className="mt-5 text-xs text-muted">都城与统治中心</h3><p className="mt-2 text-sm leading-7">{profile.capitalHistory}</p><h3 className="mt-5 text-xs text-muted">关键人物</h3><p className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">{profile.figures.map(name => { const person = people.find(item => item.name === name); return person ? <Link key={name} href={`${prefix}/people?person=${person.id}`} className="inline-flex min-h-11 items-center text-cinnabar underline underline-offset-4">{name}</Link> : <span key={name} className="inline-flex min-h-11 items-center">{name}</span>; })}</p>{profile.note ? <p className="mt-4 border-l-2 border-gold pl-3 text-xs leading-7 text-muted">{profile.note}</p> : null}</div>
          <div><h3 className="text-xs text-muted">兴亡节点</h3><ul className="mt-2 space-y-2">{milestones.map(event => <li key={event.id}><Link className="inline-flex min-h-11 items-center text-sm leading-7 text-cinnabar underline decoration-cinnabar/30 underline-offset-4" href={`/explore/${event.id}?series=jin-sixteen-kingdoms&year=${event.startYear}`}>{event.startYear}{event.endYear && event.endYear !== event.startYear ? `—${event.endYear}` : ""} · {event.title} ↗</Link></li>)}</ul><Link prefetch={false} href={`${prefix}/map?${narrativeQuery(sequence, Math.max(0, startStep))}`} className="mt-4 inline-flex min-h-11 items-center border border-ink/25 px-4 text-sm text-cinnabar">地图看兴亡 ↗</Link><details className="mt-5 text-xs leading-7"><summary className="min-h-11 cursor-pointer text-cinnabar">史料依据</summary><ul>{profile.sourceRefs.map(source => <li key={source}><SourceReference source={source} /></li>)}</ul></details></div>
        </div>
      </details>;
    })}</div></div>
  </section>;
}
