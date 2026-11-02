import type { AiAnswer } from "@/types/ai";
import Link from "next/link";

import { AiSuggestionChips } from "./ai-suggestion-chips";

export function AiMessage({ answer, onSourceNavigate }: { answer: AiAnswer; onSourceNavigate?: () => void }) {
  return <div className="rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-7 text-ink shadow-sm"><div className="mb-3 flex items-center justify-between gap-3"><span className="font-serif font-semibold">问史</span><span className="text-[9px] tracking-[0.1em] text-muted uppercase">{answer.provenance === "knowledge-base" ? "知识库" : answer.provenance === "general-knowledge" ? "通用知识 · 非知识库" : "未检索到"}</span></div><p className="whitespace-pre-line">{answer.answer}</p><AiSuggestionChips answer={answer} />{answer.sources.length ? <p className="mt-4 border-t border-ink/10 pt-3 text-[10px] text-muted">来源：{answer.sources.map((source, index) => <span key={source.sourceId}>{index ? "、" : ""}{source.href ? <Link href={source.href} onClick={(event) => { if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) onSourceNavigate?.(); }} className="underline underline-offset-2">{source.title}</Link> : source.title}</span>)}</p> : null}</div>;
}
