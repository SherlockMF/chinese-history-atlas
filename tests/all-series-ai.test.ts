// @vitest-environment node
import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/ai/route";
import { historySeries } from "@/data/series";
import { seedData } from "@/data/seed";
import { getSeriesRepository } from "@/lib/repositories/series-repository";
import { LocalHistoryRetriever } from "@/lib/rag/local-history-retriever";
import { getPersonHistoryAnswer } from "@/lib/ai/person-history-answer";
import { buildPersonPrompt } from "@/lib/ai/persona";
import { personVoices } from "@/data/person-voices";

const signal = new AbortController().signal;
describe("all-series history access", () => {
  it.each(historySeries)("answers a sourced event from $title on its home and timeline", async series => {
    const event = (await getSeriesRepository().getSeriesEvents(series.id))[0];
    for (const page of [`/series/${series.slug}`, `/series/${series.slug}/timeline`, "/"]) {
      const response = await POST(new Request("http://localhost/api/ai", { method: "POST", body: JSON.stringify({
        message: event.title, context: { currentPage: page, currentYear: series.defaultYear },
      }) }));
      expect(response.status, page).toBe(200);
      const body = await response.json();
      expect(body.sources.some((source: { sourceId: string }) => source.sourceId === `history-event:${event.id}`), event.title).toBe(true);
      expect(body.sources.find((source: { sourceId: string }) => source.sourceId === `history-event:${event.id}`).href).toBe(`/explore/${event.id}`);
    }
  });
  it("retrieves years and contextual questions beyond the Five Dynasties", async () => {
    const retriever = new LocalHistoryRetriever();
    const byYear = await retriever.retrieve("1038年", { currentPage: "/" });
    expect(byYear.evidence.some(item => item.eventId === "xia-founded")).toBe(true);
    const byContext = await retriever.retrieve("为什么", { currentPage: "/explore/sui-conquers-chen" });
    expect(byContext.evidence[0]).toMatchObject({ eventId: "sui-conquers-chen", matchKind: "context" });
  });
  it("introduces every registered person with a personal creative voice and recorded facts", async () => {
    const voices = new Set<string>();
    for (const person of seedData.people) {
      expect(personVoices[person.id], person.name).toBeTruthy();
      const answer = await getPersonHistoryAnswer(person, "你是谁？", signal);
      expect(answer.answer).toContain(`我是${person.name}`);
      expect(answer.references).toEqual(person.sourceRefs);
      const prompt = buildPersonPrompt(person, "history");
      const voice = prompt.split("【表达方式 · 创作设定】\n")[1].split("\n")[0];
      expect(voice.length).toBeGreaterThan(15);
      voices.add(voice);
      expect(prompt).toContain(person.summary);
      expect(prompt).toContain("不能虚构");
    }
    expect(voices.size).toBe(seedData.people.length);
  });
  it("answers another period's dates without pretending the speaker witnessed it", async () => {
    const person = seedData.people.find(item => item.id === "shi-jingtang")!;
    const answer = await getPersonHistoryAnswer(person, "杨坚何时去世", signal);
    const subject = seedData.people.find(item => item.id === "yang-jian")!;
    expect(answer.answer).toContain(subject.deathYear === undefined ? "尚未录入" : String(subject.deathYear));
    expect(answer.answer).toContain("杨坚");
    expect(answer.references.length).toBeGreaterThan(0);
  });
});
