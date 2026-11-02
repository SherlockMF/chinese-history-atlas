"use client";

import Link from "next/link";
import { fiveDynastiesConfig } from "@/data/series/five-dynasties/config";
import type { HistorySeriesConfig, HistoricalMapSnapshot, SeriesReadingPath } from "@/types/series";
import { HistoricalMap } from "@/features/history-map/historical-map";
import { Timeline } from "@/features/timeline/timeline";
import type { Dynasty, HistoricalEvent, HistoricalLocation, HistoricalRegion, Person } from "@/types/history";
import { ExploreCta } from "./explore-cta";
import { ReadingPaths } from "./reading-paths";
import { Hero } from "./hero";
import { HistoryIntro } from "./history-intro";
import { KeyEvents } from "./key-events";
import { KeyPeople } from "./key-people";
import { JinCityExplorer } from "@/features/series/jin-city-explorer";
import { SeriesStoryExplorer } from "@/features/series/series-story-explorer";
import { CityOverlayExplorer } from "@/features/series/city-overlay-explorer";
import { FiveDynastiesOverview } from "@/features/series/five-dynasties-overview";

type Props = {
  dynasties: Dynasty[]; events: HistoricalEvent[]; people: Person[];
  regions: HistoricalRegion[]; locations?: HistoricalLocation[];
  snapshots?: HistoricalMapSnapshot[]; readingPaths?: readonly SeriesReadingPath[];
  series?: HistorySeriesConfig; routePrefix?: string; introduction?: string;
};

export function HomePageContent({ dynasties, events, people, regions, locations, snapshots, readingPaths, introduction, series = fiveDynastiesConfig, routePrefix = "" }: Props) {
  return <main className="site-shell pb-24 lg:pb-10">
    <Hero events={events} series={series} routePrefix={routePrefix} snapshots={snapshots} />
    {series.id === fiveDynastiesConfig.id ? <HistoryIntro /> : <section className="grid gap-6 border-b border-ink/15 py-10 lg:grid-cols-[1fr_18rem]">
      <p className="max-w-3xl text-base leading-8 text-muted">{introduction ?? "从东西魏分裂到隋唐更替，沿人物、事件与三条阅读路线展开。地图依据《中国历史地图集》546、572、612年原图概括重绘，展示两魏分立、陈齐周并立与隋统一后的典型格局。"}</p>
      <div className="flex flex-col justify-between gap-4"><p className="text-sm text-muted">{events.length} 个事件 · {people.length} 位人物 · {readingPaths?.length ?? 0} 条导读</p><Link href={`${routePrefix}/sources`} className="text-sm text-cinnabar underline underline-offset-4">资料来源与阅读说明 ↗</Link></div>
    </section>}
    {series.cityOverlayId ? <a href={`#city-overlay-${series.cityOverlayId}`} className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-cinnabar/30 text-sm text-cinnabar">打开古今地图叠加对照 <span aria-hidden="true">↓</span></a> : null}
    {series.id === "jin" ? <JinCityExplorer /> : null}
    <SeriesStoryExplorer seriesId={series.id} />
    {series.cityOverlayId ? <CityOverlayExplorer key={series.id} cityId={series.cityOverlayId} /> : null}
    <ReadingPaths events={events} series={series} paths={readingPaths} />
    {series.id === fiveDynastiesConfig.id ? <FiveDynastiesOverview dynasties={dynasties} routePrefix={routePrefix} /> : null}
    <section className="py-20">
      <div className="mb-8 flex items-end justify-between gap-5"><div><p className="text-[10px] tracking-[0.2em] text-cinnabar uppercase">Atlas preview</p><h2 className="mt-4 font-serif text-3xl sm:text-4xl">{series.mapMode === "locations" ? "把历史事件放回地理" : "这一年，哪些政权同时存在？"}</h2></div><Link href={`${routePrefix}/map?year=${series.defaultYear}`} className="hidden text-sm text-cinnabar underline underline-offset-8 sm:block">查看大地图</Link></div>
      <HistoricalMap series={series} snapshots={snapshots} regions={regions} dynasties={dynasties} events={events} locations={locations} mode="preview" />
    </section>
    <section className="border-t border-ink/15 py-20"><div className="mb-8"><p className="text-[10px] tracking-[0.2em] text-cinnabar uppercase">Timeline preview</p><h2 className="mt-4 font-serif text-3xl sm:text-4xl">把地图上的变化放回时间</h2></div><Timeline key={series.id} series={series} events={events} mapYears={snapshots?.filter(snapshot => snapshot.status === "ready").map(snapshot => snapshot.year)} mode="preview" /></section>
    <KeyPeople people={people} series={series} routePrefix={routePrefix} />
    <KeyEvents events={events} series={series} routePrefix={routePrefix} />
    <ExploreCta routePrefix={routePrefix} defaultYear={series.defaultYear} person={people.find((person) => person.id === series.featuredPersonId) ?? people[0]} />
  </main>;
}
