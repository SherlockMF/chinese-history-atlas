import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { narrativeCatalog } from "@/data/narratives/catalog";
import { findSeriesBySlug } from "@/data/series";
import type { SeriesPageProps } from "@/features/series/series-page";

export async function generateMetadata({ params }: SeriesPageProps) {
  const series = findSeriesBySlug((await params).seriesSlug);
  if (!series) notFound();
  return { title: `${series.title} · 故事长读`, description: "沿着人物抉择、战役转折与诗文，走进历史的细节。" };
}

export default async function StoriesPage({ params }: SeriesPageProps) {
  const series = findSeriesBySlug((await params).seriesSlug);
  if (!series) notFound();
  const stories = narrativeCatalog.filter(story => story.seriesId === series.id);
  return <PageShell eyebrow={`${series.title} · 战役 / 人物 / 诗文`} title="故事长读" description="走近一次选择，看见一场转折。让历史中的人和事，慢慢展开。">
    <Link href={`/series/${series.slug}`} className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4 focus-visible:outline-cinnabar">← 返回{series.title}</Link>
    <ol className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
      {stories.map((story, index) => <li key={story.slug} className="grid gap-5 py-9 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8">
        <span aria-hidden="true" className="font-serif text-4xl text-cinnabar/50">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <p className="text-xs tracking-widest text-muted">{story.period} · {story.category}</p>
          <Link href={`/series/${series.slug}/stories/${story.slug}`} className="mt-4 inline-flex min-h-11 items-center font-serif text-2xl leading-relaxed hover:text-cinnabar focus-visible:outline-cinnabar sm:text-3xl">{story.title} →</Link>
          <p className="mt-4 max-w-3xl text-base leading-8 text-muted">{story.summary}</p>
        </div>
      </li>)}
    </ol>
    {!stories.length ? <p className="py-12 text-muted">本专题的故事正在整理，可先从时间线与人物阅读历史主线。</p> : null}
  </PageShell>;
}
