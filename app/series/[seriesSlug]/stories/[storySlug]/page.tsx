import { notFound } from "next/navigation";
import { findSeriesBySlug, historySeries } from "@/data/series";
import { getNarrative } from "@/data/narratives";
import { narrativeCatalog } from "@/data/narratives/catalog";
import { StoryReader } from "@/features/stories/story-reader";
import { getSeriesRepository } from "@/lib/repositories/series-repository";

type StoryPageProps = { params: Promise<{ seriesSlug: string; storySlug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // Complete pairs avoid incomplete parent params for series without stories.
  return narrativeCatalog.map(story => ({
    seriesSlug: historySeries.find(series => series.id === story.seriesId)!.slug,
    storySlug: story.slug,
  }));
}

export async function generateMetadata({ params }: StoryPageProps) {
  const { seriesSlug, storySlug } = await params;
  const series = findSeriesBySlug(seriesSlug);
  const story = series && getNarrative(series.id, storySlug);
  if (!story) notFound();
  return { title: story.title, description: story.summary };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { seriesSlug, storySlug } = await params;
  const series = findSeriesBySlug(seriesSlug);
  if (!series) notFound();
  const story = getNarrative(series.id, storySlug);
  if (!story) notFound();
  const events = await getSeriesRepository().getSeriesEvents(series.id);
  return <StoryReader story={story} seriesSlug={series.slug} seriesTitle={series.title} events={events} />;
}
