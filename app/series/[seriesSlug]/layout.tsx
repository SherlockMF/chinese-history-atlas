import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getSeriesBySlug } from "@/lib/repositories/series-repository";
import { historySeries } from "@/data/series";

export const dynamicParams = false;

export function generateStaticParams() {
  return historySeries.map(series => ({ seriesSlug: series.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ seriesSlug: string }> }) {
  const series = await getSeriesBySlug((await params).seriesSlug);
  if (!series) notFound();
  return {
    title: series.title,
    description: `${series.timelineMinYear}—${series.timelineMaxYear} · ${series.subtitle ?? series.title}`,
  };
}

export default function SeriesLayout({ children }: { children: ReactNode }) { return children; }
