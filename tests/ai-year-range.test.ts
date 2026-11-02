import { describe, expect, it } from "vitest";

import { POST } from "@/app/api/ai/route";
import { aiAnswerSchema } from "@/lib/ai/validate-answer";

const requestForYear = (currentYear: number) =>
  new Request("http://localhost/api/ai", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      message: "这一年发生了什么？",
      context: { currentYear, currentPage: "/timeline" },
    }),
  });

const answerForYear = (year: number) => ({
  answer: "示例回答",
  provenance: "knowledge-base" as const,
  relatedPeople: [],
  relatedEvents: [],
  relatedYears: [year],
  sources: [],
});

describe("AI year range", () => {
  it("accepts a registered Western Xia story with its own series year", async () => {
    const response = await POST(new Request("http://localhost/api/ai", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "为什么", context: { currentYear: 1038, currentPage: "/series/western-xia/stories/xia-last-cities-two-endings#secret-version" } }),
    }));
    expect(response.status).toBe(200);
    const answer = await response.json();
    expect(answer.sources[0].href).toBe("/series/western-xia/stories/xia-last-cities-two-endings#secret-version");
    expect(answer.relatedYears).toEqual([]);
  });

  it.each([
    ["/series/western-xia/stories/missing", 1038],
    ["/series/jin/stories/xia-last-cities-two-endings", 1038],
    ["/series/western-xia/stories/xia-last-cities-two-endings", 1300],
    ["/series/western-xia/timeline", 1038],
  ])("does not expand the legacy year contract for %s at %i", async (currentPage, currentYear) => {
    const response = await POST(new Request("http://localhost/api/ai", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "为什么", context: { currentYear, currentPage } }),
    }));
    expect(response.status).toBe(400);
  });

  it.each([875, 979])("accepts request year %i", async (year) => {
    const response = await POST(requestForYear(year));

    expect(response.status).toBe(200);
  });

  it.each([874, 980])("rejects request year %i", async (year) => {
    const response = await POST(requestForYear(year));

    expect(response.status).toBe(400);
  });

  it.each([875, 979])("accepts answer year %i", (year) => {
    expect(aiAnswerSchema.safeParse(answerForYear(year)).success).toBe(true);
  });

  it.each([874, 980])("rejects answer year %i", (year) => {
    expect(aiAnswerSchema.safeParse(answerForYear(year)).success).toBe(false);
  });
});
