import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EventDetail } from "@/features/events/event-detail";
import { getEventSeries, getSeriesRepository } from "@/lib/repositories/series-repository";
import { getHistoryRepository } from "@/lib/repositories";
import { narrativeReturnHref } from "@/features/history-map/narrative-state";
import { jinNarrativesBySeries } from "@/data/series/jin-sixteen-kingdoms/narratives";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const event = await getHistoryRepository().getEvent(id);
  return { title: event?.title ?? "事件未找到", description: event?.summary };
}

export default async function EventPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ year?: string | string[]; path?: string | string[]; series?: string | string[]; sequence?: string | string[]; step?: string | string[] }> }) {
  const { id } = await params;
  const repository = getHistoryRepository();
  const query = await searchParams;
  const series = getEventSeries(id, typeof query.series === "string" ? query.series : undefined);
  if (!series) notFound();
  const seriesRepository = getSeriesRepository();
  const [event, relations, relatedEvents, readingPaths] = await Promise.all([repository.getEvent(id), repository.getEventRelations(id), seriesRepository.getSeriesEvents(series.id), seriesRepository.getSeriesReadingPaths(series.id)]);
  if (!event) notFound();
  const year = typeof query.year === "string" ? Number(query.year) : NaN;
  const returnYear = Number.isInteger(year) && year >= series.timelineMinYear && year <= series.timelineMaxYear ? year : event.startYear;
  const narrativeParams = new URLSearchParams(Object.entries(query).filter((entry): entry is [string, string] => typeof entry[1] === "string"));
  const sequences = jinNarrativesBySeries[series.id];
  const mapReturnHref = sequences ? narrativeReturnHref(series.slug, event.id, narrativeParams, sequences) : undefined;
  return <EventDetail mapReturnHref={mapReturnHref} readingPaths={readingPaths} seriesSlug={series.slug} routePrefix={series.id === "five-dynasties" ? "" : `/series/${series.slug}`} event={event} relations={relations} relatedEvents={relatedEvents} returnYear={returnYear} pathId={typeof query.path === "string" ? query.path : undefined} />;
}
