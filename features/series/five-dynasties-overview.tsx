"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fiveDynastiesConfig } from "@/data/series/five-dynasties/config";
import type { Dynasty } from "@/types/history";
import { PolityPeriodBar } from "./polity-period-bar";

const firstYear = 902, lastYear = 980;
const mapMinYear = fiveDynastiesConfig.mapMinYear!;
const ticks = [902, 920, 940, 960, 979];
const groups = fiveDynastiesConfig.polityGroups!.filter(group => group.id === "five-dynasties" || group.id === "ten-kingdoms");
const offset = (year: number) => `${(year - firstYear) / (lastYear - firstYear) * 100}%`;

export function FiveDynastiesOverview({ dynasties, routePrefix = "" }: { dynasties: readonly Dynasty[]; routePrefix?: string }) {
  const [year, setYear] = useState(936);
  const timeline = useRef<HTMLDivElement>(null);
  const polities = groups.flatMap(group => group.dynastyIds).map(id => dynasties.find(dynasty => dynasty.id === id)).filter((dynasty): dynasty is Dynasty => Boolean(dynasty));
  useEffect(() => {
    const container = timeline.current, plot = container?.querySelector<HTMLElement>("[data-time-plot]");
    if (!container || !plot || container.scrollWidth <= container.clientWidth) return;
    const plotLeft = plot.getBoundingClientRect().left - container.getBoundingClientRect().left + container.scrollLeft;
    const labelWidth = plot.previousElementSibling!.getBoundingClientRect().width;
    container.scrollTo({ left: plotLeft + (year - firstYear) / (lastYear - firstYear) * plot.clientWidth - (container.clientWidth + labelWidth) / 2, behavior: "instant" });
  }, [year]);
  return <section id="five-dynasties-overview" aria-label="五代十国并立总览" className="scroll-mt-24 border-t border-ink/20 py-12 sm:py-16">
    <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs tracking-[0.2em] text-cinnabar">五代相继 · 十国并立</p><h2 className="mt-3 font-serif text-3xl sm:text-4xl">把五代十国放在一张时间图里。</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">长短看存续，纵向看并立。悬停、聚焦或轻点色条查看起止年，点国名对照兴起时的格局。</p></div>
      <label className="flex items-center gap-3 text-sm text-muted">五代十国对照年份<select value={year} onChange={event => setYear(Number(event.target.value))} className="min-h-11 border border-ink/25 bg-paper px-4 text-ink">{Array.from({ length: lastYear - firstYear }, (_, index) => firstYear + index).map(value => <option key={value} value={value}>{value} 年</option>)}</select></label>
    </div>
    <p className="mt-4 text-xs leading-6 text-muted sm:hidden">左右滑动查看完整时间图；切换年份会移到对应位置，国名固定在左侧。</p>
    <div ref={timeline} role="region" aria-label="五代十国存续时间图，可横向滚动" tabIndex={0} className="mt-7 overflow-x-auto border border-ink/20 focus-visible:outline-2 focus-visible:outline-cinnabar"><div className="min-w-[760px] p-4 sm:p-6">
      <div className="mb-3 grid grid-cols-[9rem_1fr]"><span className="sticky left-0 z-20 bg-paper text-xs text-muted">902—979 · 含兴亡年</span><div className="relative h-6 text-[11px] text-muted">{ticks.map(value => <span key={value} style={{ left: offset(value) }} className={`absolute ${value === firstYear ? "" : "-translate-x-1/2"}`}>{value}</span>)}</div></div>
      {groups.map(group => <div key={group.id} className="border-t border-ink/15 py-2"><p className="sticky left-0 z-20 mb-1 w-fit bg-paper text-[10px] tracking-widest text-cinnabar">{group.label}</p>{group.dynastyIds.map(id => {
        const dynasty = polities.find(item => item.id === id);
        if (!dynasty) return null;
        return <div key={id} data-testid="five-polity-time-row" className="grid grid-cols-[9rem_1fr] items-center">
          <button type="button" onClick={() => setYear(dynasty.startYear)} aria-label={`对照${dynasty.name}兴起年份`} className="sticky left-0 z-20 min-h-11 bg-paper pr-3 text-left text-sm underline decoration-ink/20 underline-offset-4 hover:text-cinnabar focus-visible:outline-2 focus-visible:outline-cinnabar">{dynasty.name}</button>
          <div data-time-plot className="relative h-11">{ticks.slice(1, -1).map(value => <span key={value} aria-hidden="true" style={{ left: offset(value) }} className="absolute inset-y-0 border-l border-ink/10" />)}
            <PolityPeriodBar name={dynasty.name} start={dynasty.startYear} end={dynasty.endYear} firstYear={firstYear} lastYear={lastYear} color={dynasty.color} active={dynasty.startYear <= year && dynasty.endYear >= year} />
            <span aria-hidden="true" style={{ left: offset(year) }} className="pointer-events-none absolute inset-y-0 z-10 border-l-2 border-cinnabar" />
          </div>
        </div>;
      })}</div>)}
    </div></div>
    <p className="mt-3 text-xs leading-6 text-muted">沿用各政权档案的起讫年；吴从902年杨行密受封吴王起算。色条含兴亡年，不表示全年并立或疆域大小。五代至960年结束，十国延续至979年北汉灭亡；辽与北宋另见地图和时间线。</p>
    <div role="region" aria-label={`${year}年五代十国同期政权`} className="mt-6 border-l-2 border-cinnabar bg-mist/35 p-5"><h3 className="font-serif text-xl">{year}年，哪些政权同时存在？</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{groups.map(group => <div key={group.id}><p className="text-xs text-muted">{group.label}</p><p className="mt-2 text-sm leading-7">{polities.filter(dynasty => group.dynastyIds.includes(dynasty.id) && dynasty.startYear <= year && dynasty.endYear >= year).map(dynasty => dynasty.name).join("、") || "本年已无此组政权"}</p></div>)}</div><Link href={`${routePrefix}/map?year=${Math.max(year, mapMinYear)}`} className="mt-3 inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">看{Math.max(year, mapMinYear)}年地图 ↗</Link>{year < mapMinYear ? <p className="text-xs text-muted">地图从907年开始；902年的存续信息保留在此表中。</p> : null}</div>
  </section>;
}
