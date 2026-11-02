import "server-only";

import { narratives } from "@/data/narratives";
import type { RetrievedEvidence } from "@/types/ai";
import type { RetrievalContext, RetrievalResult } from "./retriever";

const normalize = (text: string) => text.normalize("NFKC").toLocaleLowerCase("zh-CN").replace(/[\p{P}\p{S}\s]+/gu, "");
const clip = (text: string, length: number) => text.length <= length ? text : `${text.slice(0, length - 1)}…`;
const entries = narratives.flatMap(story => story.sections.map(section => ({
  story, section,
  fields: [
    ...section.paragraphs.map(text => ({ label: section.mode === "literary-tradition" ? "文学流传" : "正文", text })),
    ...(section.interpretation ? [{ label: "解释", text: section.interpretation }] : []),
    ...(section.poem ? [{ label: "诗文", text: `${section.poem.attribution}：${section.poem.lines.join("／")}；${section.poem.translation}` }] : []),
  ],
  title: normalize(`${story.title} ${section.title} ${section.poem?.title ?? ""}`),
  text: normalize([...section.paragraphs, section.interpretation ?? "", ...(section.poem?.lines ?? []), section.poem?.translation ?? ""].join(" ")),
})));

function excerptAround(text: string, gram: string | undefined, length: number): string {
  if (!gram || text.length <= length) return clip(text, length);
  const positions: number[] = [];
  let normalized = "";
  let offset = 0;
  for (const character of text) {
    const part = normalize(character);
    normalized += part;
    for (let index = 0; index < part.length; index++) positions.push(offset);
    offset += character.length;
  }
  const hit = normalized.indexOf(gram);
  const start = hit < 0 ? 0 : Math.max(0, positions[hit] - 80);
  return start ? `…${clip(text.slice(start), length - 1)}` : clip(text, length);
}

export function retrieveNarratives(rawQuery: string, context: RetrievalContext, limit: number, signal?: AbortSignal): RetrievalResult {
  signal?.throwIfAborted();
  const query = normalize(rawQuery.slice(0, 1000));
  const route = context.currentPage?.match(/^\/series\/([a-z0-9-]+)\/stories\/([a-z0-9-]+)\/?(?:#([a-z0-9-]+))?$/);
  const deictic = /^(?:(?:请|请问)?(?:这件事|此事|这个故事|这篇|它|当时|后来))?(?:有什么影响|有何影响|影响是什么|为什么|为何|详细经过|经过是什么|结果是什么|结局是什么|继续讲|继续)$/.test(query);
  if (query.length < 2 || /^\d+年?$/.test(query) || limit <= 0) return { chunks: [], evidence: [], excerptsForServerPrompt: [] };
  const cleaned = query.replace(/为什么|为何|怎么|如何|是什么|是谁|什么|请问|请介绍|介绍一下|介绍|我想了解|我想知道|讲一下|说说|是什么|有什么|影响|原因|结果/g, "");
  const grams = new Set<string>();
  const shortName = cleaned.length >= 2 && cleaned.length <= 3;
  for (let length = Math.min(8, cleaned.length); length >= (shortName ? cleaned.length : 4); length--) {
    for (let index = 0; index <= cleaned.length - length; index++) grams.add(cleaned.slice(index, index + length));
  }
  const phraseLength = (text: string) => {
    for (const gram of grams) if (text.includes(gram)) return gram.length;
    return 0;
  };
  const ranked = entries.map(entry => {
    signal?.throwIfAborted();
    const current = route?.[1] === entry.story.seriesId && route?.[2] === entry.story.slug;
    const titleHit = phraseLength(entry.title);
    const textHit = shortName ? 0 : phraseLength(entry.text);
    const score = deictic ? (current ? 1000 + Number(route?.[3] === entry.section.id) * 100 : 0)
      : titleHit ? 800 + titleHit * 10 + textHit * 10 + Number(current) * 20
      : textHit ? 400 + textHit * 10 + Number(current) * 20 : 0;
    return { ...entry, score, titleHit };
  }).filter(item => item.score > 0 && item.section.sourceIds.length > 0)
    .sort((a, b) => b.score - a.score || a.story.slug.localeCompare(b.story.slug));
  const matches = ranked.slice(0, Math.min(5, limit)).map(entry => {
    const field = entry.fields.map(field => ({ ...field, hit: phraseLength(normalize(field.text)) }))
      .sort((a, b) => b.hit - a.hit)[0];
    const gram = field?.hit ? [...grams].find(gram => normalize(field.text).includes(gram)) : undefined;
    return { ...entry, matched: { label: field?.label ?? "正文", text: excerptAround(field?.text ?? entry.section.paragraphs.join("\n"), gram, 300) } };
  });
  return {
    chunks: matches.map(({ story, section }) => ({
      id: `${story.slug}:${section.id}`, sourceId: `narrative:${story.seriesId}:${story.slug}:${section.id}`,
      people: [...story.personIds], dynasties: [], events: [...story.eventIds],
    })),
    evidence: matches.map(({ story, section, titleHit, matched }): RetrievedEvidence => {
      const sources = story.sources.filter(source => section.sourceIds.includes(source.id));
      const note = [section.interpretation, ...sources.map(source => source.note)].filter(Boolean).join("；");
      return {
        eventId: `${story.slug}:${section.id}`,
        sourceId: `narrative:${story.seriesId}:${story.slug}:${section.id}`,
        story: { seriesId: story.seriesId, slug: story.slug, sectionId: section.id, period: story.period },
        title: `${story.title} · ${section.title}`,
        summary: clip(section.paragraphs.join("\n"), 300),
        matchedEvidence: matched,
        sourceRefs: sources.map(source => `${source.title} ${source.url}`),
        marker: note || section.mode === "literary-tradition" ? "¹²³" : "¹²",
        disputedNote: note ? clip(`${section.mode === "literary-tradition" ? "文学流传；" : "解释与材料边界："}${note}`, 300) : undefined,
        matchKind: deictic ? "context" : titleHit ? "title" : "body", matchedQueryYears: [],
      };
    }),
    excerptsForServerPrompt: matches.map(({ story, section, matched }) => clip(
      `[故事 ${story.slug}#${section.id}] ${story.title} · ${section.title}（${story.period}）\n` +
      `材料层级：${section.mode === "literary-tradition" ? "文学流传，不能直接当作历史事实" : "史源叙事"}\n` +
      `命中节录（${matched.label}）：${matched.text}\n` +
      `解释：${clip(section.interpretation ?? "本节未另列解释", 160)}\n` +
      (section.poem ? `诗文（${section.poem.attribution}）：${clip(section.poem.lines.join("／"), 160)}\n译意：${clip(section.poem.translation, 100)}\n` : "") +
      `书目及边界：${clip(story.sources.filter(source => section.sourceIds.includes(source.id)).map(source => `${source.title}：${source.note}`).join("；"), 200)}`, 900)),
  };
}
