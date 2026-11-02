import Link from "next/link";
import { narrativeCatalog } from "@/data/narratives/catalog";
import type { Narrative } from "@/types/narrative";
import type { HistoricalEvent } from "@/types/history";

const paragraphLabel = (value: number) => `P${String(value).padStart(3, "0")}`;

export function StoryReader({ story, seriesSlug, seriesTitle, events }: {
  story: Narrative;
  seriesSlug: string;
  seriesTitle: string;
  events: HistoricalEvent[];
}) {
  const peers = narrativeCatalog.filter(item => item.seriesId === story.seriesId);
  const position = peers.findIndex(item => item.slug === story.slug);
  const previous = peers[position - 1];
  const next = peers[position + 1];
  const related = events.filter(event => story.eventIds.includes(event.id));
  const chars = story.lead.length + story.sections.reduce((total, section) => total
    + section.paragraphs.join("").length + (section.interpretation?.length ?? 0)
    + (section.poem?.lines.join("").length ?? 0) + (section.poem?.translation.length ?? 0), 0);

  return <article className="mx-auto max-w-[1200px] px-5 pb-28 pt-8 sm:px-8 lg:px-12 lg:pt-14">
    <Link href={`/series/${seriesSlug}/stories`} className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4 focus-visible:outline-cinnabar">← {seriesTitle} · 故事目录</Link>
    <header className="border-b border-ink/20 pb-10 pt-7 sm:pb-14">
      <p className="text-xs tracking-[0.16em] text-cinnabar">{story.period} / {story.category}</p>
      <h1 className="mt-5 max-w-4xl text-balance font-serif text-4xl leading-[1.35] tracking-tight sm:text-5xl lg:text-6xl">{story.title}</h1>
      <p className="mt-5 font-serif text-lg leading-8 text-muted sm:text-xl">{story.subtitle}</p>
      <p className="mt-7 text-xs text-muted">{story.sections.length} 节 · 约 {Math.max(1, Math.ceil(chars / 400))} 分钟阅读</p>
    </header>

    <div className="grid items-start gap-10 pt-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16 lg:pt-12">
      <nav aria-label="本篇目录" className="border-b border-ink/10 pb-6 lg:sticky lg:top-28 lg:border-b-0 lg:pb-0">
        <p className="mb-3 text-xs tracking-widest text-muted">本篇目录</p>
        <ol className="space-y-1">
          {story.sections.map((section, index) => <li key={section.id}>
            <a href={`#${section.id}`} className="flex min-h-11 items-start gap-3 py-2 text-sm leading-6 hover:text-cinnabar focus-visible:outline-cinnabar">
              <span aria-hidden="true" className="font-serif text-cinnabar/70">{String(index + 1).padStart(2, "0")}</span>
              <span>{section.title}</span>
            </a>
          </li>)}
        </ol>
        <a href="#reading-sources" className="mt-3 inline-flex min-h-11 items-center text-xs text-muted underline underline-offset-4 focus-visible:outline-cinnabar">阅读依据与原稿定位 ↓</a>
      </nav>

      <div className="min-w-0 max-w-[44rem]">
        <p className="border-l-2 border-cinnabar pl-5 font-serif text-xl leading-10 text-ink/85 sm:text-2xl sm:leading-[1.9]">{story.lead}</p>
        <div className="mt-14 space-y-16">
          {story.sections.map((section, index) => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
            <div className="mb-5 flex items-center gap-3 text-xs text-muted">
              <span aria-hidden="true" className="font-serif text-xl text-cinnabar">{String(index + 1).padStart(2, "0")}</span>
              <span>{section.mode === "literary-tradition" ? "文学流传" : "史籍叙事"}</span>
            </div>
            <h2 id={`${section.id}-title`} className="font-serif text-2xl leading-relaxed sm:text-3xl">{section.title}</h2>
            <div className="mt-6 space-y-6 text-[17px] leading-[2.1] text-ink/90 sm:text-lg">
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
            </div>
            {section.poem ? <figure aria-label={section.poem.title} className="my-8 border-y border-cinnabar/25 bg-white/25 px-5 py-8 sm:px-8">
              <figcaption className="font-serif text-xl">{section.poem.title}</figcaption>
              <p className="mt-3 text-sm leading-7 text-muted">{section.poem.attribution}</p>
              <blockquote className="my-7 space-y-3 font-serif text-xl leading-10 sm:text-2xl">{section.poem.lines.map(line => <p key={line}>{line}</p>)}</blockquote>
              <p className="text-sm leading-8 text-muted">{section.poem.translation}</p>
            </figure> : null}
            {section.interpretation ? <aside aria-label="编者读史" className="mt-8 border-l-2 border-gold pl-5">
              <h3 className="text-xs tracking-widest text-cinnabar">编者读史</h3>
              <p className="mt-3 text-base leading-8 text-ink/80">{section.interpretation}</p>
            </aside> : null}
            <p className="mt-6 text-xs leading-7 text-muted">本节依据：{section.sourceIds.map((id, sourceIndex) => {
              const source = story.sources.find(item => item.id === id)!;
              return <span key={id}>{sourceIndex > 0 ? "；" : ""}<a href={`#source-${id}`} className="inline-block py-1 text-cinnabar underline underline-offset-4 focus-visible:outline-cinnabar">{source.title}</a></span>;
            })}</p>
          </section>)}
        </div>

        <section id="reading-sources" aria-labelledby="reading-sources-title" className="mt-16 scroll-mt-28 border-t border-ink/20 pt-9">
          <h2 id="reading-sources-title" className="font-serif text-2xl">阅读依据</h2>
          <ol className="mt-6 space-y-6">
            {story.sources.map(source => <li id={`source-${source.id}`} key={source.id} className="scroll-mt-28">
              <a href={source.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center break-words text-sm leading-7 text-cinnabar underline underline-offset-4 focus-visible:outline-cinnabar">{source.title} ↗</a>
              <p className="mt-1 text-sm leading-7 text-muted">{source.note}</p>
            </li>)}
          </ol>
          <details className="mt-8 border-y border-ink/10 py-4">
            <summary className="min-h-11 cursor-pointer py-2 text-sm text-muted focus-visible:outline-cinnabar">原稿段落定位</summary>
            <div role="region" aria-label="原稿定位明细" className="pb-3 pt-2 text-xs leading-7 text-muted">
              <p>以下为整理所参考的原稿范围。引用范围包含校正、评论与未逐句采用的内容，不代表整段照录。</p>
              <ul className="mt-3 space-y-2">{story.sections.map(section => <li key={section.id}>
                <span className="text-ink">{section.title}</span>：{section.transcripts.map(ref => `${ref.file.replace("_clean_v1.md", "")} · ${paragraphLabel(ref.start)}–${paragraphLabel(ref.end)}`).join("；")}
              </li>)}</ul>
            </div>
          </details>
        </section>

        {related.length > 0 ? <section aria-label="相关历史事件" className="mt-9">
          <h2 className="font-serif text-xl">回到历史主线</h2>
          <ul className="mt-3 space-y-2">{related.map(event => <li key={event.id}><Link href={`/explore/${event.id}?series=${seriesSlug}`} className="inline-flex min-h-11 items-center text-sm leading-7 text-cinnabar underline underline-offset-4 focus-visible:outline-cinnabar">{event.startYear} · {event.title} →</Link></li>)}</ul>
        </section> : null}
        <nav aria-label="前后篇" className="mt-12 grid gap-5 border-t border-ink/20 pt-7 sm:grid-cols-2">
          {previous ? <Link href={`/series/${seriesSlug}/stories/${previous.slug}`} className="min-h-20 py-3 focus-visible:outline-cinnabar"><span className="text-xs text-muted">← 上一篇</span><span className="mt-2 block font-serif text-lg leading-8">{previous.title}</span></Link> : <Link href={`/series/${seriesSlug}`} className="inline-flex min-h-20 items-center text-sm text-muted underline underline-offset-4 focus-visible:outline-cinnabar">返回{seriesTitle}</Link>}
          {next ? <Link href={`/series/${seriesSlug}/stories/${next.slug}`} className="min-h-20 py-3 sm:text-right focus-visible:outline-cinnabar"><span className="text-xs text-muted">下一篇 →</span><span className="mt-2 block font-serif text-lg leading-8">{next.title}</span></Link> : <Link href={`/series/${seriesSlug}/stories`} className="inline-flex min-h-20 items-center text-sm text-cinnabar underline underline-offset-4 sm:justify-end focus-visible:outline-cinnabar">回到故事目录 →</Link>}
        </nav>
      </div>
    </div>
  </article>;
}
