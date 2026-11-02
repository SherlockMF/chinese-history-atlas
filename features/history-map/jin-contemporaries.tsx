import Link from "next/link";
import { jinSixteenGroups } from "@/data/series/jin-sixteen-kingdoms/narratives";
import { politiesAtYear } from "@/data/series/jin-sixteen-kingdoms/polity-profiles";
import type { Dynasty } from "@/types/history";
import type { MapNarrativeSequence } from "@/types/map-narrative";
import { narrativeQuery } from "./narrative-state";

export function JinContemporaries({ year, currentSequenceId, sequences, dynasties }: {
  year: number; currentSequenceId?: string; sequences: readonly MapNarrativeSequence[]; dynasties: readonly Dynasty[];
}) {
  const active = new Set(politiesAtYear(year));
  return <aside aria-label={`${year}年同期对照`} className="border-t border-ink/20 pt-5">
    <p className="text-xs tracking-widest text-cinnabar">{year}年 · 同期对照</p><h3 className="mt-2 font-serif text-xl">其他几组，此时走到哪里？</h3>
    <p className="mt-3 text-xs leading-6 text-muted">政权按本年是否存续对照，包含同年建立与终结；链接各自标明节点年份。</p>
    <div className="mt-4 space-y-4">{jinSixteenGroups.filter(group => group.sequenceId !== currentSequenceId).map(group => {
      const sequence = sequences.find(item => item.id === group.sequenceId);
      if (!sequence) return null;
      const previous = sequence.steps.findLastIndex(step => step.year <= year);
      const next = sequence.steps.findIndex(step => step.year > year);
      const indices = [previous, next].filter(index => index >= 0);
      const names = group.polityIds.filter(id => active.has(id)).map(id => dynasties.find(item => item.id === id)?.name).filter(Boolean);
      return <div key={group.sequenceId} data-testid={`contemporary-${group.sequenceId}`} className="border-l border-ink/20 pl-3"><h4 className="text-sm">{group.title}</h4><p className="mt-1 text-xs leading-6 text-muted">{names.join("、") || "本年未见独立政权"}</p><div className="mt-1">{indices.map(index => { const step = sequence.steps[index]; return <Link prefetch={false} key={step.id} href={`/series/jin-sixteen-kingdoms/map?${narrativeQuery(sequence, index)}`} className="flex min-h-11 items-center text-xs leading-6 text-cinnabar underline decoration-cinnabar/30 underline-offset-4">{step.year} · {step.year === year ? "同年节点" : step.year < year ? "此前节点" : "后续节点"} · {step.title} ↗</Link>; })}</div></div>;
    })}</div>
    <p className="mt-4 text-xs leading-6 text-muted">并行背景：{year < 317 ? "西晋朝廷仍在" : year < 420 ? "东晋立足江南" : year === 420 ? "东晋禅代，刘宋建立" : "刘宋立足江南"}{year >= 386 ? "；北魏已兴起，另见收束篇。" : "。"}</p>
    <Link href="/series/jin-sixteen-kingdoms#sixteen-overview" className="mt-1 inline-flex min-h-11 items-center text-xs text-cinnabar underline underline-offset-4">回到十六国并立总览 ↗</Link>
  </aside>;
}
