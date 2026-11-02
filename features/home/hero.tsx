"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import type { HistoricalEvent } from "@/types/history";
import { getRecordedEventYears } from "@/features/timeline/timeline-years";

import { useHistoryStore } from "@/features/history-state/history-store";

import { fiveDynastiesConfig } from "@/data/series/five-dynasties/config";
import type { HistoricalMapSnapshot, HistorySeriesConfig } from "@/types/series";

import { HeroMap } from "./hero-map";
import { SnapshotHeroMap } from "./snapshot-hero-map";

const subscribeHydration = () => () => {};

export function Hero({ series = fiveDynastiesConfig, routePrefix = "", snapshots = [], events }: { series?: HistorySeriesConfig; routePrefix?: string; snapshots?: readonly HistoricalMapSnapshot[]; events: HistoricalEvent[] }) {
  const { timelineMinYear: TIMELINE_MIN_YEAR, timelineMaxYear: MAX_YEAR } = series;
  const storedYear = useHistoryStore((state) => state.currentYear);
  const setCurrentYear = useHistoryStore((state) => state.setCurrentYear);
  const storeSeriesId = useHistoryStore((state) => state.series.id);
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const years = useMemo(() => getRecordedEventYears(events, series), [events, series]);
  const requestedYear = hydrated && storeSeriesId === series.id ? storedYear : series.defaultYear;
  const year = years.includes(requestedYear) ? requestedYear : years.find(year => year >= requestedYear) ?? years.at(-1) ?? series.defaultYear;
  useEffect(() => {
    if (hydrated && storeSeriesId === series.id && years.length && storedYear !== year) setCurrentYear(year);
  }, [hydrated, storeSeriesId, series.id, years, storedYear, year, setCurrentYear]);
  return <section className="relative grid min-h-[82vh] content-center overflow-hidden border-b border-ink/15 py-16 gap-x-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:py-24"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 min-w-0 max-w-3xl"><p className="mb-8 text-xs tracking-[0.28em] text-cinnabar uppercase">Interactive history · {TIMELINE_MIN_YEAR}—{MAX_YEAR}</p><p className="font-serif text-[clamp(5rem,15vw,12rem)] leading-[0.72] tracking-[-0.08em] text-ink">{year}</p><h1 className="mt-10 max-w-2xl font-serif text-4xl leading-[1.18] tracking-[-0.045em] text-ink sm:text-6xl">{series.title}</h1><p className="mt-7 max-w-xl text-base leading-8 text-muted">从一个年份出发，看清政权如何更替、人物如何选择，事件又如何推动下一次转折。</p><div className="mt-9 flex flex-wrap items-center gap-3"><label><span className="sr-only">选择探索年份</span><select aria-label="选择探索年份" disabled={!years.length} value={year} onChange={(event) => setCurrentYear(Number(event.target.value))} className="h-11 rounded-full border border-ink/15 bg-paper px-5 font-serif outline-none focus:ring-2 focus:ring-cinnabar">{years.map((item) => <option key={item} value={item}>{item} 年</option>)}</select></label><Link href={`${routePrefix}/timeline?year=${year}#timeline`} aria-label={`进入 ${year} 年`} className="inline-flex h-11 items-center gap-3 rounded-full bg-ink px-6 text-sm text-paper transition-colors hover:bg-cinnabar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar focus-visible:ring-offset-2">进入 {year} 年<ArrowUpRight aria-hidden="true" className="size-4" /></Link></div></motion.div>{series.mapMode === "annual" ? <HeroMap year={year} routePrefix={routePrefix} /> : <SnapshotHeroMap year={year} series={series} snapshots={snapshots} routePrefix={routePrefix} />}</section>;
}
