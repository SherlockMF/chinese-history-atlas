"use client";

import { CalendarDays, Landmark, UserRound } from "lucide-react";
import Link from "next/link";

import { useHistoryStore } from "@/features/history-state/history-store";
import type { AiAnswer } from "@/types/ai";

import { suggestionLabel } from "./suggestion-labels";

export function AiSuggestionChips({ answer, onSourceNavigate, globalPage = false }: { answer: AiAnswer; onSourceNavigate?: () => void; globalPage?: boolean }) {
  const series = useHistoryStore((state) => state.series);
  const setCurrentYear = useHistoryStore((state) => state.setCurrentYear);
  const selectPerson = useHistoryStore((state) => state.selectPerson);
  const selectEvent = useHistoryStore((state) => state.selectEvent);
  const chip = (label: string, onClick: () => void, Icon: typeof CalendarDays) => <button key={label} type="button" onClick={onClick} aria-label={label} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-xs text-ink hover:border-cinnabar hover:text-cinnabar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar"><Icon aria-hidden="true" className="size-3" />{label}</button>;
  return <div className="mt-4 flex flex-wrap gap-2">{answer.relatedPeople.map((id) => chip(suggestionLabel(id), () => selectPerson(id), UserRound))}{answer.relatedEvents.map((id) => {
    const source = answer.sources.find(item => item.sourceId === `history-event:${id}`);
    return source?.href ? <Link key={id} href={source.href} onClick={event => { if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) onSourceNavigate?.(); }} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-3 py-1.5 text-xs text-ink hover:border-cinnabar hover:text-cinnabar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinnabar"><Landmark aria-hidden="true" className="size-3" />{source.title}</Link>
      : chip(suggestionLabel(id), () => selectEvent(id), Landmark);
  })}{answer.relatedYears.map((year) => !globalPage && year >= series.timelineMinYear && year <= series.timelineMaxYear
    ? chip(`${year}年`, () => setCurrentYear(year), CalendarDays)
    : <span key={year} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted"><CalendarDays aria-hidden="true" className="size-3" />{year}年</span>)}</div>;
}
