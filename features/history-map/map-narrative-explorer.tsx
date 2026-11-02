"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import type { Dynasty, HistoricalEvent, Person } from "@/types/history";
import type { HistoricalMapSnapshot, HistorySeriesConfig } from "@/types/series";
import type { MapNarrativeNode, MapNarrativeSequence } from "@/types/map-narrative";
import { cn } from "@/lib/utils";
import { NarrativeAtlas } from "./narrative-atlas";
import { NarrativeDetail } from "./narrative-detail";
import { JinContemporaries } from "./jin-contemporaries";
import { narrativeQuery, resolveNarrativeState } from "./narrative-state";
import { narrativeDuration, narrativeFrame } from "./narrative-playback";

const control = "inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cinnabar disabled:cursor-not-allowed disabled:opacity-35";

export function MapNarrativeExplorer({ series, snapshots, dynasties, events, people, sequences, relatedSequences = [] }: {
  series: HistorySeriesConfig; snapshots: readonly HistoricalMapSnapshot[]; dynasties: readonly Dynasty[];
  events: readonly HistoricalEvent[]; people: readonly Person[]; sequences: readonly MapNarrativeSequence[];
  relatedSequences?: readonly MapNarrativeSequence[];
}) {
  const pathname = usePathname();
  const query = useSearchParams();
  const { sequence, step, stepIndex, snapshot } = resolveNarrativeState(query, [...sequences, ...relatedSequences], snapshots);
  const isRelated = Boolean(sequence && relatedSequences.some(item => item.id === sequence.id));
  const choices = sequence && isRelated ? [...sequences, sequence] : sequences;
  const [playingSequence, setPlayingSequence] = useState<string>();
  const [clock, setClock] = useState<{ context: string; elapsed: number }>();
  const anchor = useRef<{ context: string; startedAt: number; elapsed: number }>(undefined);
  const position = useRef<{ context: string; elapsed: number }>(undefined);
  const [selection, setSelection] = useState<{ context: string; node?: MapNarrativeNode }>();
  const context = `${series.id}/${snapshot?.id}/${sequence?.id ?? "panorama"}/${step?.id ?? ""}`;
  const selected = selection?.context === context ? selection : undefined;
  const queriedPolity = query.get("dynasty");
  const selectedPolityId = snapshot?.regions.some(region => region.polityId === queriedPolity) ? queriedPolity ?? undefined : undefined;
  const atEnd = Boolean(sequence && stepIndex === sequence.steps.length - 1);
  const playing = Boolean(sequence && playingSequence === sequence.id);
  const duration = narrativeDuration(step);
  const elapsed = clock?.context === context ? clock.elapsed : 0;
  const remaining = Math.ceil((duration - elapsed) / 1000);
  const completed = atEnd && elapsed >= duration;
  const frame = step ? narrativeFrame(step, elapsed) : undefined;

  const navigate = (nextQuery: string) => {
    setPlayingSequence(undefined);
    setClock(undefined);
    position.current = undefined;
    anchor.current = undefined;
    window.history.replaceState(null, "", `${pathname}?${nextQuery}`);
  };
  const pausePlayback = useCallback(() => {
    if (playing && anchor.current?.context === context) {
      const paused = { context, elapsed: Math.min(duration, anchor.current.elapsed + Date.now() - anchor.current.startedAt) };
      position.current = paused;
      setClock(paused);
    }
    setPlayingSequence(undefined);
  }, [playing, context, duration, setClock, setPlayingSequence]);
  const selectNode = (node: MapNarrativeNode) => { pausePlayback(); setSelection({ context, node }); };
  const togglePlayback = () => {
    if (!sequence) return;
    if (playing) { pausePlayback(); return; }
    if (completed) navigate(narrativeQuery(sequence, 0));
    setPlayingSequence(sequence.id);
  };
  const selectPolity = (polityId: string) => {
    setSelection({ context });
    const nextQuery = new URLSearchParams(query.toString());
    nextQuery.set("year", String(step?.year ?? snapshot?.year ?? series.defaultYear));
    nextQuery.set("dynasty", polityId);
    navigate(nextQuery.toString());
  };

  useEffect(() => {
    const stop = () => { setPlayingSequence(undefined); setClock(undefined); position.current = undefined; };
    window.addEventListener("popstate", stop);
    return () => window.removeEventListener("popstate", stop);
  }, []);

  useEffect(() => {
    const hide = () => { if (document.hidden) pausePlayback(); };
    document.addEventListener("visibilitychange", hide);
    return () => document.removeEventListener("visibilitychange", hide);
  }, [pausePlayback]);

  useEffect(() => {
    if (!playing || !sequence) return;
    const initial = position.current?.context === context ? position.current.elapsed : 0;
    const startedAt = Date.now();
    anchor.current = { context, startedAt, elapsed: initial };
    const countdown = window.setInterval(() => {
      const next = { context, elapsed: Math.min(duration, initial + Date.now() - startedAt) };
      position.current = next;
      setClock(next);
    }, 100);
    const timer = window.setTimeout(() => {
      window.clearInterval(countdown);
      if (stepIndex === sequence.steps.length - 1) {
        position.current = { context, elapsed: duration };
        setClock(position.current);
        setPlayingSequence(undefined);
      } else {
        position.current = undefined;
        setClock(undefined);
        window.history.replaceState(null, "", `${pathname}?${narrativeQuery(sequence, stepIndex + 1)}`);
      }
    }, duration - initial);
    return () => { window.clearTimeout(timer); window.clearInterval(countdown); };
  }, [playing, sequence, stepIndex, pathname, context, duration]);

  if (!snapshot) return <p role="status" className="border border-ink/20 p-8">当前阶段没有可显示的地图资料。</p>;
  return <section id="map-narrative" className="min-w-0 scroll-mt-24 overflow-hidden border border-ink/25 bg-paper" aria-label={`${series.title}地图推演`}>
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/20 px-4 py-4 sm:px-6">
      <div className="flex gap-2" role="group" aria-label="探索方式">
        <button className={cn(control, !sequence ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-cinnabar")} aria-pressed={!sequence} onClick={() => navigate(`year=${snapshot.year}`)}>全景浏览</button>
        <button className={cn(control, sequence ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-cinnabar")} aria-pressed={Boolean(sequence)} onClick={() => { if (sequences[0]) navigate(narrativeQuery(sequence ?? sequences[0], sequence ? stepIndex : 0)); }}>跟随推演</button>
      </div>
      <p className="text-xs leading-6 text-muted">{step ? `事件 ${step.year} 年 · 背景地图 ${snapshot.year} 年` : snapshot.year === 449 ? "449 年 · 尾声：统一后的局势" : snapshot.year < series.timelineMinYear ? `${snapshot.year} 年 · 前因：西晋统一后的格局` : `${snapshot.year} 年 · ${snapshot.accuracyLevel === "reconstructed" ? "史料重建态势" : "图集阶段格局"}`}</p>
    </div>
    {sequence ? <div className="flex flex-wrap items-center gap-3 border-b border-ink/15 px-4 py-3 sm:px-6">
      <label className="flex min-w-0 flex-1 basis-full items-center gap-3 text-xs text-muted sm:basis-auto">选择推演<select aria-label="选择推演" value={sequence.id} onChange={event => { const next = choices.find(item => item.id === event.target.value); if (next) navigate(narrativeQuery(next, 0)); }} className="min-h-11 min-w-0 flex-1 border border-ink/20 bg-paper px-3 text-sm text-ink">{choices.map(item => <option key={item.id} value={item.id}>{item.title} · {item.period}{relatedSequences.some(related => related.id === item.id) ? " · 关联阅读" : ""}</option>)}</select></label>
      <div className="flex gap-2" role="group" aria-label="推演播放控制">
        <button aria-label="上一步" disabled={stepIndex === 0} onClick={() => navigate(narrativeQuery(sequence, stepIndex - 1))} className={cn(control, "border-ink/20 px-3")}><ArrowLeft aria-hidden="true" className="size-4" /></button>
        <button aria-label={playing ? "暂停播放" : completed ? "重新播放" : "开始播放"} onClick={togglePlayback} className={cn(control, "border-cinnabar bg-cinnabar text-paper")}>
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}<span>{playing ? "暂停推演" : completed ? "重播推演" : elapsed > 0 ? "继续推演" : "自动推演"}</span>
        </button>
        <button aria-label="下一步" disabled={atEnd} onClick={() => navigate(narrativeQuery(sequence, stepIndex + 1))} className={cn(control, "border-ink/20 px-3")}><ArrowRight aria-hidden="true" className="size-4" /></button>
      </div>
    </div> : <div role="group" aria-label="地图年代" className="flex flex-wrap gap-2 border-b border-ink/15 px-4 py-3 sm:px-6">{snapshots.map(item => <button key={item.id} aria-pressed={item.id === snapshot.id} className={cn(control, item.id === snapshot.id ? "border-cinnabar bg-cinnabar/10 text-cinnabar" : "border-ink/15 hover:border-cinnabar")} onClick={() => navigate(`year=${item.year}`)}>{item.year}{item.year === 449 ? " · 尾声" : ""}</button>)}</div>}
    {isRelated ? <p className="border-b border-ink/15 px-4 py-3 text-xs leading-6 text-muted sm:px-6">延伸阅读 · 把这条线索放回时代的交错中。</p> : null}
    {sequence ? <div className="border-b border-ink/15 bg-cinnabar/5 px-4 py-3 text-xs leading-6 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-1">
        <p role="status" className={playing ? "font-medium text-cinnabar" : "text-muted"}>{playing ? `正在自动推演 · 第 ${stepIndex + 1} / ${sequence.steps.length} 步` : completed ? `本组推演已结束 · 共 ${sequence.steps.length} 步，可从头重播。` : elapsed > 0 ? "已暂停，继续时从此处接着推演。" : "路线逐段展开，地点依次亮起；每步约 8–14 秒，随内容调整。"}</p>
        {playing ? <p className="text-cinnabar" aria-live="off">{atEnd ? `${remaining} 秒后结束本组` : `${remaining} 秒后进入：${sequence.steps[stepIndex + 1]?.title}`}</p> : null}
      </div>
      {playing || elapsed > 0 ? <><p data-testid="narrative-phase" className="mt-1 text-cinnabar" aria-live="off">{frame?.caption}</p><div className="mt-2 h-1 overflow-hidden bg-cinnabar/15" role="progressbar" aria-label="当前步骤播放进度" aria-valuemin={0} aria-valuemax={duration / 1000} aria-valuenow={Math.floor(elapsed / 1000)}><div className="narrative-playback-progress h-full origin-left bg-cinnabar" style={{ transform: `scaleX(${elapsed / duration})` }} /></div></> : null}
    </div> : null}
    {step && step.year !== snapshot.year ? <p className="border-b border-cinnabar/20 bg-cinnabar/5 px-4 py-3 text-xs leading-6 text-cinnabar sm:px-6">背景采用 {snapshot.year} 年图，不代表 {step.year} 年的疆域。色块已淡化；行动连线与疆域分别阅读。</p> : null}
    <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(19rem,1fr)]">
      <NarrativeAtlas snapshot={snapshot} dynasties={dynasties} step={step} playing={playing} elapsedMs={elapsed} selectedPolityId={selectedPolityId} onSelectPolity={selectPolity} onSelectNode={selectNode} onInteract={pausePlayback} />
      <div key={context} className="min-w-0 border-t border-ink/15 lg:max-h-[44rem] lg:overflow-y-auto lg:border-l lg:border-t-0"><NarrativeDetail seriesSlug={series.slug} snapshot={snapshot} sequence={sequence} step={step} stepIndex={stepIndex} events={events} people={people} dynasties={dynasties} selectedPolityId={selectedPolityId} selectedNode={selected?.node} activeNodeId={playing || elapsed > 0 ? step?.nodes[frame?.activeIndex ?? -1]?.id : undefined} onSelectNode={selectNode} />{series.id === "jin-sixteen-kingdoms" && step ? <div className="px-5 pb-6 sm:px-6"><JinContemporaries year={step.year} currentSequenceId={sequence?.id} sequences={sequences} dynasties={dynasties} /></div> : null}</div>
    </div>
    {sequence ? <ol className="grid gap-px border-t border-ink/15 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">{sequence.steps.map((item, index) => <li key={item.id}><button onClick={() => navigate(narrativeQuery(sequence, index))} aria-current={item.id === step?.id ? "step" : undefined} className={cn("flex h-full min-h-16 w-full items-start gap-3 p-4 text-left text-sm focus-visible:outline-2 focus-visible:outline-cinnabar", item.id === step?.id ? "bg-cinnabar text-paper" : "bg-paper hover:bg-mist")}><span className="font-serif text-xl opacity-60">{String(index + 1).padStart(2, "0")}</span><span><span className="block text-xs opacity-70">{item.year}</span>{item.title}</span></button></li>)}</ol> : <div role="group" aria-label="本图政权" className="flex flex-wrap gap-2 border-t border-ink/15 p-4">{snapshot.regions.map(region => { const polity = dynasties.find(item => item.id === region.polityId); return <button key={region.polityId} aria-pressed={selectedPolityId === region.polityId} onClick={() => selectPolity(region.polityId)} className={cn(control, selectedPolityId === region.polityId ? "border-cinnabar text-cinnabar" : "border-ink/15")}>{region.displayMode !== "label-only" ? <span aria-hidden="true" className="size-2.5 rounded-full" style={{ backgroundColor: region.color ?? polity?.color }} /> : null}{region.name ?? polity?.name ?? region.polityId}</button>; })}</div>}
    <details className="border-t border-ink/15 px-4 py-4 text-xs leading-6 text-muted sm:px-6"><summary className="cursor-pointer text-cinnabar">地图范围、年代与出处</summary><p className="mt-3">{snapshot.scopeNote}</p><p className="mt-2">{snapshot.accuracyNote}</p><ul className="mt-3 space-y-2">{snapshot.sources.map(source => <li key={source.fileLabel ?? source.title}>{source.url ? <a href={source.url} target="_blank" rel="noreferrer" className="text-cinnabar underline">{source.title}</a> : source.title}{source.note ? ` · ${source.note}` : ""}</li>)}</ul><p className="mt-3">网站展示依据资料重绘的矢量示意，不分发图集扫描影像。事件年份与背景地图年份分别标示，不作年度疆域插值。</p></details>
  </section>;
}
