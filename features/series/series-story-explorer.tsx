"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { getSeriesStories, type SeriesStory, type StoryNode } from "@/data/series/series-stories";

const nodeClass = "min-h-11 rounded-sm border px-3 py-2 text-sm leading-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar focus-visible:ring-offset-2 focus-visible:ring-offset-paper";

function NodeButton({ node, selected, onSelect, detailId, spatial = false }: {
  node: StoryNode; selected: boolean; onSelect: (id: string) => void; detailId: string; spatial?: boolean;
}) {
  return <button
    type="button"
    aria-label={node.label}
    aria-pressed={selected}
    aria-controls={detailId}
    onClick={() => onSelect(node.id)}
    style={spatial && node.position ? { left: `${node.position[0]}%`, top: `${node.position[1]}%` } : undefined}
    className={`${nodeClass} ${spatial ? "absolute z-10 max-w-[45%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap shadow-sm" : "w-full text-left"} ${selected ? "border-cinnabar bg-cinnabar text-paper" : "border-ink/25 bg-paper text-ink hover:border-cinnabar hover:bg-mist"}`}
  >
    <span className="block font-serif text-base sm:text-lg">{node.label}</span>
    {!spatial ? <span className={`mt-1 block text-xs ${selected ? "text-paper/85" : "text-muted"}`}>{node.caption}</span> : null}
  </button>;
}

function SpatialDrawing({ layout }: { layout: SeriesStory["layout"] }) {
  return <svg aria-hidden="true" focusable="false" className="absolute inset-0 size-full text-ink/30" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="0.35">
    {layout === "city" ? <>
      <path d="M8 7H55V51H8Z M12 53H51V94H12Z" fill="var(--mist)" fillOpacity=".5" />
      <path d="M18 15H45V44H18Z M21 18H42V40H21Z M9 29H55" />
      <path d="M56 48H90 M68 36Q77 24 86 36 M65 38H89" strokeDasharray="1 1" />
      <path d="M20 84H44 M20 88H44 M20 92H44 M20 82V93 M28 82V93 M36 82V93 M44 82V93" />
    </> : null}
    {layout === "network" ? <>
      <path d="M50 28V47 M50 47L25 69 M50 47L75 69" stroke="var(--cinnabar)" strokeDasharray="1.5 1.3" />
      <circle cx="50" cy="27" r="17" fill="var(--mist)" fillOpacity=".6" />
      <circle cx="25" cy="72" r="18" /><circle cx="75" cy="72" r="18" />
    </> : null}
    {layout === "lake" ? <>
      <path d="M59 35C66 35 70 43 69 54C68 65 62 73 54 77C49 72 51 66 54 60C55 52 54 44 59 35Z" fill="var(--mist)" stroke="var(--ink)" strokeOpacity=".35" />
      <path d="M42 39L37 45L41 46L35 52L38 54L34 60L38 65L34 69 M46 41L42 48L44 52L40 59L43 64" strokeOpacity=".45" />
      <path d="M6 19V6M4 10L6 6L8 10" />
    </> : null}
    {layout === "temple" ? <>
      <path d="M26 33L49 67L74 33 M26 33H74" strokeDasharray="1.5 1.5" />
      <path d="M39 49Q50 46 61 49L50 41Z M41 54Q50 51 59 54L50 47Z M43 60H57 M46 60V55H54V60 M50 38V41" stroke="var(--cinnabar)" strokeOpacity=".6" />
      <circle cx="50" cy="50" r="35" strokeOpacity=".2" />
    </> : null}
    {layout === "canal" ? <>
      <path d="M10 44H45L57 50L76 81 M45 44L54 15" stroke="var(--ink)" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M9 36Q21 33 34 38T69 35 M52 64Q73 59 91 65 M63 73Q76 69 91 74" stroke="var(--gold)" strokeOpacity=".65" />
      <circle cx="45" cy="44" r="1.5" fill="var(--cinnabar)" stroke="none" />
    </> : null}
    {layout === "livelihood" ? <>
      <path d="M5 38C35 33 43 60 64 52S86 45 97 62" stroke="var(--mist)" strokeWidth="6" />
      <path d="M5 38C35 33 43 60 64 52S86 45 97 62" />
      <path d="M6 10H38V37H6Z M6 18H38 M6 29H38 M17 10V37 M28 10V37" strokeOpacity=".45" />
      <path d="M72 63L72 74L85 74L85 69 M69 78Q75 75 82 78T96 78 M76 84Q81 81 86 84T97 84" />
      <path d="M11 85L25 91L39 85 M11 88L25 94L39 88" stroke="var(--cinnabar)" strokeOpacity=".4" />
    </> : null}
  </svg>;
}

function Diagram({ story, selectedId, onSelect, detailId }: {
  story: SeriesStory; selectedId: string; onSelect: (id: string) => void; detailId: string;
}) {
  const controls = { onSelect, detailId };
  if (story.layout === "flow") return <div className="flex min-h-80 flex-col justify-center px-5 py-7 sm:px-9" role="group" aria-label={story.diagramLabel}>
    <ol className="space-y-0">{story.nodes.map((node, index) => <li key={node.id} className="relative flex gap-4 pb-5 last:pb-0">
      {index < story.nodes.length - 1 ? <span aria-hidden="true" className="absolute bottom-0 left-[15px] top-8 border-l border-ink/25" /> : null}
      <span aria-hidden="true" className="relative mt-3 flex size-8 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-paper font-serif text-sm text-cinnabar">{index + 1}</span>
      <NodeButton node={node} selected={selectedId === node.id} {...controls} />
    </li>)}</ol>
  </div>;

  if (story.layout === "offices") return <div className="flex min-h-80 flex-col justify-center px-4 py-7 sm:px-7" role="group" aria-label={story.diagramLabel}>
    <p className="mb-5 text-center font-serif text-lg text-ink">皇帝与中枢政务</p>
    <div aria-hidden="true" className="mx-[16.6%] h-5 border-x border-t border-ink/30" />
    <div className="grid grid-cols-3 gap-2">{story.nodes.map((node) => <NodeButton key={node.id} node={node} selected={selectedId === node.id} {...controls} />)}</div>
    <div className="ml-auto mt-0 h-5 w-1/6 border-l border-ink/30" aria-hidden="true" />
    <div className="border border-ink/20 bg-white/30 p-4">
      <p className="mb-3 text-xs tracking-wider text-muted">尚书六曹 · 隋初名称</p>
      <div className="grid grid-cols-3 gap-2 text-center text-sm">{["吏部", "礼部", "兵部", "都官", "度支", "工部"].map((name) => <span key={name} className="border-b border-ink/15 py-2">{name}</span>)}</div>
    </div>
  </div>;

  return <div role="group" aria-label={story.diagramLabel} className="relative h-[340px] w-full sm:h-[390px]">
    <SpatialDrawing layout={story.layout} />
    {story.layout === "lake" ? <><span aria-hidden="true" className="absolute left-[4%] top-[21%] text-xs text-muted">北</span><span aria-hidden="true" className="absolute left-[58%] top-[53%] font-serif text-sm tracking-widest text-ink/70 [writing-mode:vertical-rl]">洱海</span></> : null}
    {story.layout === "city" ? <><span aria-hidden="true" className="absolute left-[24%] top-[4%] text-xs text-muted">上京</span><span aria-hidden="true" className="absolute left-[66%] top-[75%] text-xs text-muted">城外的政治空间</span></> : null}
    {story.layout === "network" ? <span aria-hidden="true" className="absolute left-1/2 top-[44%] -translate-x-1/2 bg-paper px-2 text-xs text-muted">治理与社会</span> : null}
    {story.layout === "canal" ? <><span aria-hidden="true" className="absolute left-[7%] top-[26%] text-xs text-muted">黄河方向</span><span aria-hidden="true" className="absolute right-[8%] top-[60%] text-xs text-muted">淮河方向</span></> : null}
    {story.nodes.map((node) => <NodeButton key={node.id} node={node} selected={selectedId === node.id} spatial {...controls} />)}
  </div>;
}

function StoryContent({ story }: { story: SeriesStory }) {
  const [selectedId, setSelectedId] = useState(story.nodes[0].id);
  const selected = story.nodes.find((node) => node.id === selectedId) ?? story.nodes[0];
  const instanceId = useId();
  const detailId = `${instanceId}-detail`;
  const selectedIndex = story.nodes.findIndex((node) => node.id === selected.id);

  return <>
    <header className="mb-6 max-w-3xl">
      <p className="text-xs tracking-widest text-cinnabar">{story.period}</p>
      <h3 className="mt-3 font-serif text-2xl leading-snug sm:text-3xl">{story.title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{story.introduction}</p>
      {story.narrativeSlug ? <Link href={`/series/${story.seriesId}/stories/${story.narrativeSlug}`} className="mt-3 inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4 focus-visible:outline-cinnabar">读完整故事：{story.title} →</Link> : null}
    </header>
    <div className="grid overflow-hidden rounded-sm border border-ink/20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <figure className="min-w-0 bg-white/25">
        <Diagram story={story} selectedId={selected.id} onSelect={setSelectedId} detailId={detailId} />
        <figcaption className="border-t border-ink/10 px-5 py-4 text-xs leading-6 text-muted">
          <span className="mb-1 block text-ink">点击图中名称，展开阅读。</span>{story.diagramNote}
        </figcaption>
      </figure>
      <section id={detailId} aria-label="图解说明" aria-live="polite" aria-atomic="true" className="min-w-0 border-t border-ink/20 bg-paper p-6 sm:p-8 lg:border-l lg:border-t-0">
        <p className="text-xs tracking-widest text-cinnabar">{selected.caption}</p>
        <h4 className="mt-4 font-serif text-2xl leading-relaxed">{selected.title}</h4>
        <div className="my-6 w-10 border-t-2 border-cinnabar" aria-hidden="true" />
        <p className="text-sm leading-8 text-ink/85 sm:text-base">{selected.description}</p>
        {selected.connection ? <p className="mt-5 border-l-2 border-gold pl-4 text-sm leading-7 text-muted"><span className="block text-xs text-cinnabar">接着看</span>{selected.connection}</p> : null}
        {selected.event ? <Link href={`/explore/${selected.event.id}?year=${selected.event.year}&series=${story.seriesId}`} className="mt-5 inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">进入事件：{selected.event.year} · {selected.event.title} →</Link> : null}
        {selected.narrativeSlug ? <Link href={`/series/${story.seriesId}/stories/${selected.narrativeSlug}`} className="mt-3 flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4 focus-visible:outline-cinnabar">读本节故事：{selected.title} →</Link> : null}
        <nav aria-label="连续阅读图解" className="mt-6 flex items-center justify-between gap-3 border-t border-ink/15 pt-4">
          <button type="button" disabled={selectedIndex === 0} onClick={() => setSelectedId(story.nodes[selectedIndex - 1].id)} className={`${nodeClass} disabled:cursor-default disabled:opacity-35`}>← 上一节</button>
          <span className="text-xs text-muted">{selectedIndex + 1} / {story.nodes.length}</span>
          <button type="button" disabled={selectedIndex === story.nodes.length - 1} onClick={() => setSelectedId(story.nodes[selectedIndex + 1].id)} className={`${nodeClass} disabled:cursor-default disabled:opacity-35`}>下一节 →</button>
        </nav>
        <p className="mt-6 flex flex-wrap gap-2 text-xs text-muted">本节依据{selected.sourceIds.map((id) => {
          const index = story.sources.findIndex((source) => source.id === id);
          return <a key={id} href={`#${instanceId}-source-${id}`} className="min-h-6 border-b border-cinnabar/40 text-cinnabar hover:border-cinnabar focus-visible:outline-2 focus-visible:outline-cinnabar" aria-label={`阅读依据 ${index + 1}`}>[{index + 1}]</a>;
        })}</p>
      </section>
    </div>
    <section aria-label="阅读依据" className="mt-6 border-l-2 border-ink/20 pl-5">
      <h4 className="font-serif text-base">阅读依据</h4>
      <p className="mt-2 text-xs leading-6 text-muted">选题线索：{story.transcripts.map((transcript, index) => <span key={`${transcript.file}-${transcript.paragraphs}`}>{index ? "；" : ""}{transcript.file.replace("_clean_v1.md", "")} · {transcript.paragraphs}</span>)}。逐字稿用于定位话题，具体解释据以下材料核对。</p>
      <ol className="mt-3 space-y-3">{story.sources.map((source, index) => <li key={source.id} id={`${instanceId}-source-${source.id}`} className="scroll-mt-24 text-xs leading-6">
        <a href={source.url} target="_blank" rel="noreferrer noopener" className="break-words border-b border-ink/25 text-ink hover:border-cinnabar hover:text-cinnabar focus-visible:outline-2 focus-visible:outline-cinnabar">[{index + 1}] {source.title} ↗<span className="sr-only">（新窗口）</span></a>
        <p className="mt-1 text-muted">{source.note}</p>
      </li>)}</ol>
    </section>
  </>;
}

function StoryCollection({ stories }: { stories: SeriesStory[] }) {
  const [storyId, setStoryId] = useState(stories[0].id);
  const story = stories.find((item) => item.id === storyId) ?? stories[0];
  const headingId = useId();
  return <section aria-labelledby={headingId} className="my-12 border-t border-ink/20 pt-9 sm:my-16 sm:pt-12">
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
      <h2 id={headingId} className="font-serif text-2xl sm:text-3xl">走进这个时代</h2>
      <p className="text-xs tracking-wider text-muted">制度 · 空间 · 日常</p>
    </div>
    {stories.length > 1 ? <div role="group" aria-label="选择深读主题" className="mb-7 flex flex-wrap gap-2">{stories.map((item) => <button key={item.id} type="button" aria-pressed={item.id === story.id} onClick={() => setStoryId(item.id)} className={`${nodeClass} ${item.id === story.id ? "border-ink bg-ink text-paper" : "border-ink/20 text-muted hover:border-ink hover:text-ink"}`}>{item.title}</button>)}</div> : null}
    <StoryContent key={story.id} story={story} />
  </section>;
}

export function SeriesStoryExplorer({ seriesId }: { seriesId: string }) {
  const stories = getSeriesStories(seriesId);
  return stories.length ? <StoryCollection key={seriesId} stories={stories} /> : null;
}
