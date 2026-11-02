import "@xyflow/react/dist/style.css";
import { Suspense } from "react";
import { StoryLinks } from "@/features/stories/story-links";
import { expansionContent } from "@/data/series/expansion";
import { jinNarrativesBySeries, jinSixteenChapters, jinSixteenNarratives, jinSixteenRelatedNarratives } from "@/data/series/jin-sixteen-kingdoms/narratives";
import { JinSixteenHome } from "./jin-sixteen-home";
import { MapNarrativeExplorer } from "@/features/history-map/map-narrative-explorer";
import { getSitesByIds } from "@/data/sites";
import { RelatedSites } from "@/features/sites/related-sites";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { getSeriesBySlug, getSeriesRepository } from "@/lib/repositories/series-repository";
import { HomePageContent } from "@/features/home/home-page-content";
import { Timeline } from "@/features/timeline/timeline";
import { HistoricalMap } from "@/features/history-map/historical-map";
import { PersonExplorer } from "@/features/people/person-explorer";

export type SeriesPageProps = { params: Promise<{ seriesSlug: string }> };
export type SeriesView = "home" | "timeline" | "map" | "people";

export async function renderSeriesPage({ params }: SeriesPageProps, view: SeriesView) {
  const { seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);
  if (!series) notFound();
  const repository = getSeriesRepository();
  const [dynasties, events, people, regions, locations, relations, snapshots, readingPaths] = await Promise.all([
    repository.getSeriesDynasties(series.id), repository.getSeriesEvents(series.id),
    repository.getSeriesPeople(series.id), repository.getSeriesRegions(series.id),
    repository.getSeriesLocations(series.id), repository.getSeriesPersonRelations(series.id),
    repository.getSeriesMapSnapshots(series.id), repository.getSeriesReadingPaths(series.id),
  ]);
  const initialPersonId = people.find((person) => person.id === series.featuredPersonId)?.id ?? people[0]?.id;
  const sequences = series.id === "jin-sixteen-kingdoms" ? jinSixteenNarratives : jinNarrativesBySeries[series.id];
  const relatedSequences = series.id === "jin-sixteen-kingdoms" ? jinSixteenRelatedNarratives : [];
  const narrativeProps = { series, snapshots, dynasties, events, people, sequences, relatedSequences };
  const content = series.id === "jin-sixteen-kingdoms" && view === "home"
    ? <JinSixteenHome {...narrativeProps} chapters={jinSixteenChapters} readingPaths={readingPaths} />
    : sequences && view === "map"
    ? <Suspense fallback={<p role="status">正在展开地图推演…</p>}><MapNarrativeExplorer key={series.id} {...narrativeProps} /></Suspense>
    : view === "home"
    ? <HomePageContent introduction={expansionContent.find((content) => content.config.id === series.id)?.introduction} locations={locations} readingPaths={readingPaths} series={series} snapshots={snapshots} routePrefix={`/series/${series.slug}`} dynasties={dynasties} events={events} people={people} regions={regions} />
    : view === "timeline" ? <Timeline key={series.id} series={series} events={events} mapYears={snapshots.filter(snapshot => snapshot.status === "ready").map(snapshot => snapshot.year)} />
    : view === "map" ? <HistoricalMap series={series} snapshots={snapshots} regions={regions} dynasties={dynasties} events={events} locations={locations} />
    : view === "people" && initialPersonId ? <PersonExplorer key={series.id} series={series} initialPersonId={initialPersonId} people={people} dynasties={dynasties} events={events} relations={relations} />
    : <p role="status" className="rounded-2xl border border-dashed border-ink/20 p-8 text-muted">{view === "people" ? "人物资料待核验入库。" : "专题框架准备中，历史内容尚未入库。"}</p>;
  return <>
    {view === "home" ? content : <PageShell eyebrow={`${series.timelineMinYear}—${series.timelineMaxYear}`} title={series.title} description={series.subtitle ?? ""}>{content}</PageShell>}
    {view === "home" && <div className="mx-auto max-w-[1480px] px-4 sm:px-8 lg:px-12"><StoryLinks seriesId={series.id} seriesSlug={series.slug} /></div>}
    {view === "home" && Boolean(series.relatedSiteIds?.length) && <div className="mx-auto max-w-[1480px] px-4 pb-16 sm:px-8 lg:px-12"><RelatedSites sites={getSitesByIds(series.relatedSiteIds)} /></div>}
  </>;
}
