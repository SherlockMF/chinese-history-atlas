import { describe, expect, it } from "vitest";
import { LocalHistoryRetriever } from "@/lib/rag/local-history-retriever";
import { aiAnswerSchema } from "@/lib/ai/validate-answer";
import { POST } from "@/app/api/ai/route";

describe("sourced narrative retrieval", () => {
  it("finds short names in chapter titles without matching incidental body words", async () => {
    const result = await new LocalHistoryRetriever().retrieve("高欢", {});
    expect(result.evidence.some(item => item.story && item.title.includes("高欢"))).toBe(true);
    expect(result.evidence.filter(item => item.story).every(item => item.title.includes("高欢"))).toBe(true);
  });

  it.each(["高欢是谁", "请介绍高欢"])("recognizes a short name in natural question %s", async (query) => {
    const result = await new LocalHistoryRetriever().retrieve(query, {});
    expect(result.evidence.some(item => item.story && item.title.includes("高欢"))).toBe(true);
    expect(result.evidence.filter(item => item.story).every(item => item.title.includes("高欢"))).toBe(true);
  });

  it("ranks the matching section above a repeated whole-story title", async () => {
    const result = await new LocalHistoryRetriever().retrieve("胡沙虎军队回到宫门前 五千武卫军", {});
    expect(result.evidence[0]?.story).toMatchObject({ slug: "hushahu-court-coup", sectionId: "hawk-and-gates" });
  });

  it("includes the actual body hit even when it occurs after the opening excerpt", async () => {
    const result = await new LocalHistoryRetriever().retrieve("减省营造", {});
    const index = result.evidence.findIndex(item => item.story?.slug === "chen-palace-coup" && item.story.sectionId === "three-pavilions");
    expect(index).toBeGreaterThanOrEqual(0);
    expect(result.evidence[index].matchedEvidence?.text).toContain("减省营造");
    expect(result.excerptsForServerPrompt[index]).toContain("减省营造");
  });

  it("places the exact anchored section first for a deictic question", async () => {
    const result = await new LocalHistoryRetriever().retrieve("为什么", { currentPage: "/series/jin/stories/hushahu-court-coup#hawk-and-gates" });
    expect(result.evidence[0]?.story?.sectionId).toBe("hawk-and-gates");
  });

  it("finds a chapter outside the legacy event corpus without inventing a year", async () => {
    const result = await new LocalHistoryRetriever().retrieve("玉树后庭花", {});
    const evidence = result.evidence.find(item => item.story?.slug === "chen-palace-coup");
    expect(evidence).toBeDefined();
    expect(evidence?.sourceId).toMatch(/^narrative:/);
    expect(evidence?.year).toBeUndefined();
    expect(evidence?.sourceRefs.length).toBeGreaterThan(0);
    expect(result.excerptsForServerPrompt.join(" ")).toContain("玉树后庭花");
  });

  it("resolves a deictic question on the current story and preserves interpretation", async () => {
    const result = await new LocalHistoryRetriever().retrieve("这件事有什么影响", {
      currentPage: "/series/liao/stories/xiao-guanyin",
    });
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.evidence.every(item => item.story?.slug === "xiao-guanyin")).toBe(true);
    expect(result.excerptsForServerPrompt.join(" ")).toContain("解释");
  });

  it("uses the visible story instead of a retained timeline selection", async () => {
    const result = await new LocalHistoryRetriever().retrieve("这件事有什么影响", {
      currentPage: "/series/liao/stories/xiao-guanyin",
      selectedEvent: "sixteen-prefectures-ceded",
    });
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.evidence.every(item => item.story?.slug === "xiao-guanyin")).toBe(true);
  });

  it("returns no contextual story for a mismatched series", async () => {
    const result = await new LocalHistoryRetriever().retrieve("这件事有什么影响", {
      currentPage: "/series/jin/stories/xiao-guanyin",
    });
    expect(result.evidence).toEqual([]);
  });

  it("keeps legacy events available for person dialogues", async () => {
    const result = await new LocalHistoryRetriever({ includeNarratives: false }).retrieve("玉树后庭花", {});
    expect(result.evidence).toEqual([]);
  });

  it.each([
    "javascript:alert(1)", "https://evil.example/story", "//evil.example/story",
    "/series/jin/stories/../outside#x", "/series/jin/stories/a#x?redirect=https://evil.example",
    "/series/jin/stories/a%2f..%2fb#x", "/series/jin/stories/a#x\n",
  ])("rejects an unsafe narrative source href %s", (href) => {
    expect(aiAnswerSchema.safeParse({ answer: "说明", provenance: "knowledge-base", relatedPeople: [], relatedEvents: [], relatedYears: [], sources: [{ sourceId: "x", title: "来源", href }] }).success).toBe(false);
  });

  it("keeps the required client context year separate from undated story evidence", async () => {
    const response = await POST(new Request("http://localhost/api/ai", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "玉树后庭花", context: { currentPage: "/series/southern-dynasties/stories/chen-palace-coup" } }),
    }));
    expect(response.status).toBe(400);
  });

  it("carries chapter links and sources through the answer API", async () => {
    const response = await POST(new Request("http://localhost/api/ai", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "玉树后庭花", context: { currentYear: 587, currentPage: "/series/southern-dynasties/stories/chen-palace-coup" } }),
    }));
    const answer = await response.json();
    expect(response.status).toBe(200);
    expect(answer.provenance).toBe("knowledge-base");
    expect(answer.sources.some((source: { href?: string }) => source.href?.startsWith("/series/southern-dynasties/stories/chen-palace-coup#"))).toBe(true);
    expect(answer.relatedEvents).toEqual([]);
    expect(answer.relatedYears).toEqual([]);
    expect(answer.answer).not.toContain("undefined");
  });
});
