import Link from "next/link";
import { getArchiveHref } from "@/data/sites";
import type { HistorySiteConfig } from "@/types/site";

export function RelatedSites({ sites, title = "相关历史现场", inverse = false }: {
  sites: readonly HistorySiteConfig[];
  title?: string;
  inverse?: boolean;
}) {
  if (!sites.length) return null;
  return <section className={`mt-6 border-t pt-5 ${inverse ? "border-paper/20" : "border-ink/15"}`}>
    <h2 className={`text-sm ${inverse ? "text-gold" : "text-muted"}`}>{title}</h2>
    <ul className="mt-3 space-y-4">{sites.map(site => <li key={site.id}>
      {site.status === "planned" ? <div className="flex flex-wrap items-center gap-3"><h3 className="font-serif text-xl">{site.title}</h3><span className={`rounded-full border px-3 py-1 text-xs ${inverse ? "border-paper/20 text-paper/75" : "border-ink/15 text-muted"}`}>现场内容筹备中</span></div> : <Link href={getArchiveHref(site)!} className={`inline-flex min-h-11 items-center font-serif text-xl underline-offset-4 hover:underline ${inverse ? "text-paper" : "text-cinnabar"}`}>{site.title} ↗</Link>}
      <p className={`mt-1 text-xs leading-6 ${inverse ? "text-paper/75" : "text-muted"}`}>{site.description}</p>
    </li>)}</ul>
  </section>;
}
