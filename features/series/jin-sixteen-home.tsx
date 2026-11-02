import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Dynasty, HistoricalEvent, Person } from "@/types/history";
import type { HistoricalMapSnapshot, HistorySeriesConfig, SeriesReadingPath } from "@/types/series";
import type { MapNarrativeChapter, MapNarrativeSequence } from "@/types/map-narrative";
import { MapNarrativeExplorer } from "@/features/history-map/map-narrative-explorer";
import { narrativeQuery } from "@/features/history-map/narrative-state";
import { ReadingPaths } from "@/features/home/reading-paths";
import { KeyPeople } from "@/features/home/key-people";
import { jinSixteenClosingNarrative, jinSixteenGroups } from "@/data/series/jin-sixteen-kingdoms/narratives";
import { JinSixteenOverview } from "./jin-sixteen-overview";

export function JinSixteenHome({ series, snapshots, dynasties, events, people, sequences, relatedSequences, chapters, readingPaths }: {
  series: HistorySeriesConfig; snapshots: HistoricalMapSnapshot[]; dynasties: Dynasty[]; events: HistoricalEvent[]; people: Person[];
  sequences: MapNarrativeSequence[]; chapters: MapNarrativeChapter[]; readingPaths: readonly SeriesReadingPath[];
  relatedSequences?: readonly MapNarrativeSequence[];
}) {
  const prefix = `/series/${series.slug}`;
  const opening = sequences.find(item => item.id === "two-zhaos")!;
  const qin = sequences.find(item => item.id === "three-qins")!;
  const feiStep = qin.steps.findIndex(item => item.id === "fei-river");
  const mainPolities = new Set(["northern-wei", ...series.polityGroups?.filter(group => ["sixteen-kingdoms", "related-regimes"].includes(group.id)).flatMap(group => group.dynastyIds) ?? []]);
  const mainPeople = people.filter(person => person.dynastyIds.some(id => mainPolities.has(id)));
  return <main className="site-shell pb-24">
    <header className="grid gap-6 py-9 sm:py-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
      <div><p className="text-xs tracking-[0.22em] text-cinnabar">山河纪 · {series.timelineMinYear}—{series.timelineMaxYear}</p><h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">{series.title}</h1><p className="mt-4 font-serif text-xl text-muted">{series.subtitle}</p></div>
      <div><p className="max-w-xl text-sm leading-7 text-muted">五凉、四燕、三秦、二赵，一成一夏。先用543211认清十六国，再沿各组的建立、并立与终局，读懂相互交错的历史。</p><div className="mt-5 flex flex-wrap gap-3"><a href="#sixteen-groups" className="inline-flex min-h-11 items-center gap-2 bg-ink px-5 text-sm text-paper hover:bg-cinnabar">按543211认识十六国<ArrowUpRight aria-hidden="true" className="size-4" /></a><Link prefetch={false} href={`${prefix}/map?${narrativeQuery(opening, 0)}`} className="inline-flex min-h-11 items-center border-b border-cinnabar px-2 text-sm text-cinnabar">从304年诸国兴起开始 ↗</Link><Link prefetch={false} href={`${prefix}/map?${narrativeQuery(qin, feiStep)}`} className="inline-flex min-h-11 items-center border-b border-cinnabar px-2 text-sm text-cinnabar">进入淝水推演 ↗</Link></div></div>
    </header>
    <nav aria-label="专题阅读入口" className="flex flex-wrap gap-x-6 border-t border-ink/15 py-3 text-sm text-cinnabar"><a href="#sixteen-overview" className="inline-flex min-h-11 items-center underline underline-offset-4">十六国并立时间图 ↗</a><a href="#sixteen-profiles" className="inline-flex min-h-11 items-center underline underline-offset-4">十六国政权档案 ↗</a><a href="#map-narrative" className="inline-flex min-h-11 items-center underline underline-offset-4">地图与同期对照 ↗</a></nav>
    <section id="sixteen-groups" aria-label="543211：十六国分组" className="scroll-mt-24 border-t border-ink/20 pb-12 pt-8 sm:pb-16">
      <div className="grid gap-5 lg:grid-cols-[1fr_24rem] lg:items-end"><div><p className="text-xs tracking-[0.2em] text-cinnabar">543211 · 六组，十六国</p><h2 className="mt-3 font-serif text-3xl leading-snug sm:text-4xl">五凉四燕三秦二赵，<br className="sm:hidden" />一成一夏。</h2></div><p className="text-sm leading-7 text-muted">按国号归类，各组在时间上交错，并非先后相承。选一组读兴亡，再用地图与时间轴看它们如何彼此影响。</p></div>
      <div className="mt-8 grid border-l border-t border-ink/20 sm:grid-cols-2 lg:grid-cols-3">{jinSixteenGroups.map(group => {
        const sequence = sequences.find(item => item.id === group.sequenceId)!;
        const names = group.polityIds.map(id => id === "han-zhao" ? "前赵（汉赵）" : dynasties.find(item => item.id === id)!.name);
        return <Link prefetch={false} key={group.sequenceId} href={`${prefix}/map?${narrativeQuery(sequence, 0)}`} className="group flex flex-col border-b border-r border-ink/20 p-5 transition-colors hover:bg-mist/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar sm:p-6"><div className="flex items-baseline justify-between gap-4"><span aria-hidden="true" className="font-serif text-6xl leading-none text-ink/20 group-hover:text-cinnabar/60">{group.count}</span><p className="text-xs text-cinnabar">{sequence.period}</p></div><h3 className="mt-5 font-serif text-2xl group-hover:text-cinnabar">{group.title}</h3><p className="mt-3 text-sm leading-7 text-ink">{names.join(" · ")}</p><p className="mb-6 mt-3 text-sm leading-7 text-muted">{sequence.description}</p><span className="mt-auto inline-flex min-h-11 items-center border-t border-ink/10 pt-3 text-xs text-cinnabar">沿{group.title}读兴亡 ↗</span></Link>;
      })}</div>
      <p className="mt-5 text-xs leading-6 text-muted">西燕、冉魏、代、仇池等另列为相关政权，不计入这十六国；北魏在收束篇中展开。</p>
    </section>
    <Suspense fallback={<p role="status" className="min-h-80 border border-ink/20 p-8">正在展开五胡十六国地图…</p>}><MapNarrativeExplorer series={series} snapshots={snapshots} dynasties={dynasties} events={events} people={people} sequences={sequences} relatedSequences={relatedSequences} /></Suspense>
    <section className="grid gap-6 border-b border-ink/15 py-10 lg:grid-cols-[1fr_18rem]">
      <p className="max-w-3xl text-sm leading-8 text-muted">304年，刘渊称汉王，李雄据成都建立政权。本专题从汉赵、成汉的兴起讲起，到439年北魏统一北方主要地区收束。“十六国”是传统史学选取的政权集合，实际并立的政权更多；东晋及后来的刘宋作为同时代背景，共同呈现南北互动。</p>
      <div className="space-y-3 text-xs leading-6 text-muted"><p>{events.length} 个事件 · {people.length} 位人物<br />{sequences.length} 组叙事 · 另有北魏收束篇<br />五幅图集阶段图、八幅关键年重建图<br />八幅关键年均补为完整阶段格局<br />另有281年前因图、449年尾声图</p><Link href={`${prefix}/sources`} className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">资料来源与阅读说明 ↗</Link></div>
    </section>
    <aside aria-label="时代前因与并行专题" className="grid gap-6 border-b border-ink/15 py-8 sm:grid-cols-2">
      <div><p className="text-xs tracking-widest text-cinnabar">时代前因 · 西晋</p><p className="mt-3 text-sm leading-7 text-muted">八王之乱始于291年，304年仍处内乱之中。宗王战争与流民问题为新政权兴起提供背景；西晋的统一与内乱在独立专题中展开。</p><div className="mt-3 flex flex-wrap gap-x-5"><Link href="/series/western-jin" className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">进入西晋专题 ↗</Link><Link href="/series/western-jin/timeline?year=311" className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">晋末南渡 · 西晋末局 ↗</Link></div></div>
      <div><p className="text-xs tracking-widest text-cinnabar">同时代的江南 · 东晋</p><p className="mt-3 text-sm leading-7 text-muted">东晋与十六国并行。江南立国、门阀政治与北伐另有专题；淝水之战等交叉事件共享史料，可从两侧进入阅读。</p><div className="mt-3 flex flex-wrap gap-x-5"><Link href="/series/eastern-jin" className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">进入东晋专题 ↗</Link><Link prefetch={false} href="/series/eastern-jin/map?year=347&sequence=huan-wen-expeditions&step=cheng-han" className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">桓温北伐 · 东晋 ↗</Link><Link prefetch={false} href="/series/eastern-jin/map?year=409&sequence=liu-yu-expeditions&step=north-to-linqu" className="inline-flex min-h-11 items-center text-sm text-cinnabar underline underline-offset-4">刘裕北伐 · 东晋 ↗</Link></div></div>
    </aside>
    <section className="py-12 sm:py-16" aria-label="时代五幕"><p className="text-xs tracking-widest text-cinnabar">304—439 · 诸国兴亡</p><h2 className="mt-3 font-serif text-3xl">五幕之间，看北方格局重组。</h2><div className="mt-8 grid border-l border-t border-ink/20 sm:grid-cols-2 lg:grid-cols-5">{chapters.map((chapter, index) => <Link key={chapter.id} href={`${prefix}/timeline?year=${chapter.startYear}`} className="group border-b border-r border-ink/20 p-5 hover:bg-mist/50"><span className="font-serif text-3xl text-ink/25">0{index + 1}</span><p className="mt-5 text-xs text-cinnabar">{chapter.period}</p><h3 className="mt-2 font-serif text-xl">{chapter.title}</h3><p className="mt-3 text-sm leading-7 text-muted">{chapter.description}</p><span className="mt-6 inline-flex text-xs text-cinnabar">进入时间轴 ↗</span></Link>)}</div></section>
    <JinSixteenOverview dynasties={dynasties} events={events} people={people} sequences={sequences} />
    <ReadingPaths events={events} series={series} paths={readingPaths} />
    <KeyPeople people={mainPeople} series={series} routePrefix={prefix} />
    <section className="grid gap-6 border-t border-ink/20 py-12 sm:grid-cols-2"><div><p className="text-xs tracking-widest text-cinnabar">收束篇 · 北魏</p><h2 className="mt-3 font-serif text-3xl">走入南北朝</h2><p className="mt-4 text-sm leading-7 text-muted">北魏不计入传统十六国。沿拓跋氏兴起、秦夏与诸燕退场、姑臧降魏，读到439年的收束，再从北魏与刘宋两条线继续向后。</p></div><div className="grid gap-3"><Link prefetch={false} href={`${prefix}/map?${narrativeQuery(jinSixteenClosingNarrative, 0)}`} className="border border-ink/20 p-4 text-cinnabar">北魏如何收束北方 ↗</Link><Link prefetch={false} href={`${prefix}/map?year=449`} className="border border-ink/20 p-4 text-cinnabar">尾声 · 看 449 年的宋魏格局 ↗</Link><div className="grid grid-cols-2 gap-3"><Link href="/series/northern-wei" className="border border-ink/20 p-4 text-sm">进入北魏专题 ↗</Link><Link href="/series/southern-dynasties" className="border border-ink/20 p-4 text-sm">进入南朝专题 ↗</Link></div></div></section>
  </main>;
}
