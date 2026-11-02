import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { SourceReference } from "@/components/history/source-reference";
import { getSeriesBySlug, getSeriesRepository } from "@/lib/repositories/series-repository";
import type { SeriesPageProps } from "@/features/series/series-page";

export default async function SourcesPage({ params }: SeriesPageProps) {
  const { seriesSlug } = await params;
  const series = await getSeriesBySlug(seriesSlug);
  if (!series) notFound();
  const repo = getSeriesRepository();
  const [events, people, dynasties, locations, relations] = await Promise.all([
    repo.getSeriesEvents(series.id), repo.getSeriesPeople(series.id), repo.getSeriesDynasties(series.id),
    repo.getSeriesLocations(series.id), repo.getSeriesPersonRelations(series.id),
  ]);
  const entities = [...events, ...people, ...dynasties, ...locations, ...relations];
  const sources = [...new Set(entities.flatMap(entity => entity.sourceRefs))];
  const episodes = [...new Map(entities.flatMap(entity => entity.sourceEpisodes ?? []).map(episode => [`${episode.sourceSeriesId}/${episode.episodeId}`, episode])).values()];
  return <PageShell eyebrow={`${series.title} · 阅读依据`} title="资料来源与阅读说明" description="每条叙述都有出处，也有材料能够支持的边界。">
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0">
        <section aria-labelledby="sources-principles" className="border-y border-ink/15 py-7">
          <h2 id="sources-principles" className="font-serif text-2xl">如何使用这些资料</h2>
          <div className="mt-4 space-y-3 text-sm leading-8 text-muted">
            <p>{["jin-sixteen-kingdoms", "western-jin", "eastern-jin"].includes(series.id) ? "本专题新增内容依据《晋书》《资治通鉴》《魏书》《宋书》等史籍整理，未使用独立的两晋十六国逐字稿。西晋、东晋、五胡十六国分别组织叙事，共享事件与人物只入库一次。与北魏、南朝共用的事件保留其原有逐字稿定位和校读资料。" : "逐字稿提供叙事线索，清洗不等于史实核验。本站将人物、年份和事件重新组织，并列出用于校读的纪传、地方志或机构资料；不公开逐字稿全文。"}</p>
            <p>¹ 标示逐字稿主线，² 标示史料补充，³ 提醒存在异说。“已校读”表示依据所列材料进行过整理，不代表争议已经消失。细节存在分歧时，以事件页的“史料异说”为准。</p>
            <p>{series.mapMode === "locations" ? "本专题地图使用现代自然地理底图与历史地点。坐标是区域参照，不是考古测绘；没有依据这些点推绘历史国界或逐年疆域。" : series.mapMode === "snapshot" ? "本专题地图展示若干有资料依据的典型格局，并非逐年疆界复原。每张地图单独列明年代、来源与精度说明。" : "逐年地图是历史地理的概括表达。边界与飞地存在资料精度限制，请结合地图说明阅读。"}</p>
          </div>
        </section>
        <section className="py-8" aria-labelledby="sources-events">
          <h2 id="sources-events" className="font-serif text-2xl">按事件追溯 <span className="text-sm text-muted">{events.length} 条</span></h2>
          <div className="mt-5 divide-y divide-ink/10">{[...events].sort((a, b) => a.startYear - b.startYear).map(event => <details key={event.id} className="py-4">
            <summary className="cursor-pointer font-serif text-lg leading-8 marker:text-cinnabar focus-visible:outline-cinnabar">{event.startYear} · {event.title}</summary>
            <div className="pl-5 pt-3 text-xs leading-7 text-muted">
              <p>{event.verificationStatus === "verified" ? "已核验" : event.verificationStatus === "illustrative" ? "示意资料" : "已校读"} · {event.contentOrigin === "historical-extension" ? "史料补充" : "逐字稿与史料对照"}</p>
              {event.sourceEpisodes?.map(episode => <p key={`${episode.sourceSeriesId}/${episode.episodeId}`}>{episode.title ?? episode.episodeId}{episode.locator ? ` · ${episode.locator}` : ""}</p>)}
              <ul className="mt-3 space-y-2">{event.sourceRefs.map(source => <li key={source}><SourceReference source={source} /></li>)}</ul>
              {event.disputedNote ? <p className="mt-3 border-l-2 border-gold pl-3">异说说明：{event.disputedNote}</p> : null}
              <Link href={`/explore/${event.id}?year=${event.startYear}&series=${series.slug}`} className="mt-3 inline-flex min-h-11 items-center text-cinnabar underline underline-offset-4">阅读完整事件 →</Link>
            </div>
          </details>)}</div>
        </section>
      </div>
      <aside className="min-w-0 space-y-8">
        <section className="rounded-2xl border border-ink/15 bg-white/30 p-5"><h2 className="font-serif text-xl">叙事线索</h2><ul className="mt-4 space-y-3 text-sm leading-6 text-muted">{episodes.map(episode => <li key={`${episode.sourceSeriesId}/${episode.episodeId}`}>{episode.title ?? episode.episodeId}</li>)}</ul>{!episodes.length ? <p className="mt-3 text-sm text-muted">原专题逐字稿索引见<Link href="/notes" className="text-cinnabar underline">资料笔记</Link>。</p> : null}</section>
        <section><h2 className="font-serif text-xl">引用书目与资料</h2><p className="mt-3 text-xs leading-6 text-muted">涵盖事件、人物、关系与地点。外链打开公开资料；古籍在线转录本仍可能存在校勘差异。</p><ul className="mt-4 space-y-4 text-xs leading-6">{sources.map(source => <li key={source}><SourceReference source={source} /></li>)}</ul></section>
      </aside>
    </div>
  </PageShell>;
}
