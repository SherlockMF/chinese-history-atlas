import Link from "next/link";
import { SourceReference } from "@/components/history/source-reference";
import { PersonPortrait } from "@/features/people/person-portrait";
import type { Dynasty, HistoricalEvent, Person } from "@/types/history";
import type { HistoricalMapSnapshot } from "@/types/series";
import type { MapNarrativeNode, MapNarrativeSequence, MapNarrativeStep } from "@/types/map-narrative";
import { narrativeQuery } from "./narrative-state";

export function NarrativeDetail({ seriesSlug, snapshot, sequence, step, stepIndex, events, people, dynasties, selectedPolityId, selectedNode, activeNodeId, onSelectNode }: {
  seriesSlug: string; snapshot: HistoricalMapSnapshot; sequence?: MapNarrativeSequence; step?: MapNarrativeStep; stepIndex: number;
  events: readonly HistoricalEvent[]; people: readonly Person[]; dynasties: readonly Dynasty[];
  selectedPolityId?: string; selectedNode?: MapNarrativeNode; onSelectNode: (node: MapNarrativeNode) => void;
  activeNodeId?: string;
}) {
  const region = snapshot.regions.find(item => item.polityId === selectedPolityId);
  const polity = dynasties.find(item => item.id === selectedPolityId);
  const relatedEvents = step ? step.eventIds.flatMap(id => events.filter(event => event.id === id)) : events.filter(event => event.dynastyIds.includes(selectedPolityId ?? "")).sort((a, b) => Math.abs(a.startYear - snapshot.year) - Math.abs(b.startYear - snapshot.year)).slice(0, 3);
  const personIds = new Set(relatedEvents.flatMap(event => event.personIds));
  const keyPeople = people.filter(person => personIds.has(person.id)).slice(0, 4);
  return <div className="space-y-6 p-5 sm:p-6" aria-label="地图阅读说明">
    <div key={step?.id ?? snapshot.id} className={step ? "narrative-scene-enter" : undefined} aria-live="polite">
      <p className="text-xs tracking-widest text-cinnabar">{step ? `${sequence?.title} · ${stepIndex + 1}/${sequence?.steps.length}` : "全景 · 政权与地理"}</p>
      <h2 className="mt-3 font-serif text-2xl leading-snug">{step?.title ?? region?.name ?? polity?.name ?? snapshot.label}</h2>
      <p className="mt-4 text-sm leading-7 text-ink/75">{step?.description ?? region?.note ?? snapshot.note}</p>
      {!step && polity ? <p className="mt-3 text-sm leading-7 text-muted">{polity.startYear}—{polity.endYear} · {polity.capital}<br />{polity.summary}</p> : null}
    </div>
    {step && region ? <aside className="border-l-2 border-gold bg-gold/5 p-3" aria-label="政权说明"><h3 className="font-serif text-lg">{region.name ?? polity?.name}</h3><p className="mt-2 text-xs leading-6 text-muted">{snapshot.year} 年背景地图中的政权。{region.note}</p>{polity ? <p className="mt-2 text-xs leading-6 text-muted">{polity.startYear}—{polity.endYear} · {polity.summary}</p> : null}</aside> : null}
    {step ? <div>
      <p className="text-xs text-muted">沿地点阅读 · 可点选</p>
      <div className="mt-2 flex flex-wrap gap-2">{step.nodes.map((node, index) => <button key={node.id} type="button" aria-pressed={selectedNode?.id === node.id} aria-current={activeNodeId === node.id ? "location" : undefined} onClick={() => onSelectNode(node)} className={`narrative-map-node min-h-11 border px-3 text-sm hover:border-cinnabar focus-visible:outline-cinnabar ${activeNodeId === node.id ? "border-cinnabar bg-cinnabar/10 text-cinnabar" : "border-ink/20"}`}>{index + 1} · {node.name}</button>)}</div>
      <p className="mt-3 text-xs leading-6 text-muted">{step.routeKind === "migration" ? "迁徙方向为区域示意，不代表所有迁徙人群走过同一路线。" : step.routeKind === "campaign" ? "连线表示史料所见行动地点及先后关系，不是可精确复原的行军道路。" : "此步骤标示事件发生地区，不绘制行军路线。"}</p>
    </div> : null}
    {selectedNode ? <aside className="border-l-2 border-cinnabar bg-cinnabar/5 p-3" aria-label="地点说明"><h3 className="font-serif text-lg">{selectedNode.name}</h3><p className="mt-2 text-xs leading-6 text-muted">{selectedNode.note ?? "坐标仅示意历史地点所在区域，不代表遗址测绘位置。"}</p></aside> : null}
    {relatedEvents.length ? <div className="border-t border-ink/15 pt-4"><h3 className="text-xs text-muted">读事件原委</h3><ul className="mt-2 space-y-2">{relatedEvents.map(event => <li key={event.id}><Link className="inline-flex min-h-11 items-center text-sm leading-6 text-cinnabar underline decoration-cinnabar/30 underline-offset-4" href={`/explore/${event.id}?${sequence ? `${narrativeQuery(sequence, stepIndex)}&` : `year=${event.startYear}&`}series=${seriesSlug}`}>{event.startYear} · {event.title} ↗</Link></li>)}</ul></div> : null}
    {keyPeople.length ? <div className="border-t border-ink/15 pt-4"><h3 className="mb-3 text-xs text-muted">这一幕中的人物</h3><div className="flex flex-wrap gap-4">{keyPeople.map(person => <Link key={person.id} href={`/series/${seriesSlug}/people?person=${person.id}&year=${step?.year ?? snapshot.year}`} className="w-16 text-center text-xs"><PersonPortrait person={person} variant="avatar" /><span className="mt-1 block text-cinnabar">{person.name}</span></Link>)}</div></div> : null}
    {step?.sourceRefs.length ? <details className="border-t border-ink/15 pt-4 text-xs leading-6"><summary className="cursor-pointer text-cinnabar">本步骤的史料依据</summary><ul className="mt-3 space-y-2">{step.sourceRefs.map(source => <li key={source}><SourceReference source={source} /></li>)}</ul></details> : null}
  </div>;
}
