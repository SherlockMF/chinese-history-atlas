import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { historySeries } from "@/data/series";

export function SeriesHub() {
  const orderedSeries = [...historySeries].sort((a, b) => a.timelineMinYear - b.timelineMinYear || a.timelineMaxYear - b.timelineMaxYear);
  return <main className="mx-auto max-w-[1480px] px-4 pb-20 sm:px-8 lg:px-12">
    <section className="border-b border-ink/20 py-16 sm:py-24">
      <p className="text-xs tracking-[0.25em] text-cinnabar uppercase">山河纪 · 历史专题</p>
      <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-tight text-ink sm:text-7xl">从一个时代出发，<br />看见历史的经纬。</h1>
      <p className="mt-7 max-w-2xl text-base leading-8 text-muted">选择一个专题，沿时间、地图与人物走进那个时代。每个专题，都有自己的历史现场与阅读起点。</p>
      <a href="#series" className="mt-8 inline-flex min-h-11 items-center border-b border-cinnabar text-sm text-cinnabar">选择历史专题 ↓</a>
    </section>
    <section id="series" aria-labelledby="series-heading" className="scroll-mt-24 py-12 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-4"><h2 id="series-heading" className="font-serif text-3xl">选择一个时代</h2><span className="text-right text-xs leading-5 text-muted">{historySeries.length} 个专题 · 按起始年份排列</span></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{orderedSeries.map((series, index) => <Link key={series.id} href={"/series/" + series.slug} className="group flex min-h-60 flex-col rounded-xl border border-ink/20 bg-paper p-5 transition-colors hover:border-cinnabar hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar xl:p-6">
        <div className="flex items-center justify-between gap-2"><span className="font-serif text-2xl text-ink/25">0{index + 1}</span><span className="rounded-full border border-ink/15 px-2 py-1 text-[11px] text-muted">{series.mapMode === "annual" ? "逐年疆域" : series.mapMode === "locations" ? "历史地点地图" : "阶段示意地图"}</span></div>
        <p className="mt-5 text-xs tracking-widest text-cinnabar">{series.timelineMinYear}—{series.timelineMaxYear}</p>
        <h3 className="mt-2 font-serif text-2xl leading-snug">{series.title}</h3>
        <p className="mb-5 mt-2 text-sm leading-6 text-muted">{series.subtitle}</p>
        <span className="mt-auto flex items-center justify-between border-t border-ink/15 pt-3 text-sm text-cinnabar">进入专题<ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></span>
      </Link>)}</div>
    </section>
    <section className="border-t border-ink/20 py-12"><p className="text-xs tracking-widest text-cinnabar">现场 · 调查档案</p><Link href="/archive/li-jingxun" className="mt-5 flex flex-wrap items-center justify-between gap-5 border border-ink/20 p-7 hover:border-cinnabar"><div><h2 className="font-serif text-2xl sm:text-3xl">李静训墓调查档案</h2><p className="mt-3 text-sm text-muted">隋 · 608 年 · 今西安地区</p><p className="mt-3 text-sm text-muted">现场负责发现，档案负责理解。</p></div><span className="text-sm text-cinnabar">打开档案 ↗</span></Link></section>
  </main>;
}
