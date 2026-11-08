import { NextResponse } from "next/server";
import { z } from "zod";
import { narrativeCatalog } from "@/data/narratives/catalog";
import { findSeriesBySlug, getRouteSeries } from "@/data/series";

import { MockLlmProvider } from "@/lib/ai/mock-provider";
import { aiAnswerSchema } from "@/lib/ai/validate-answer";
import { HISTORY_MAX_YEAR, HISTORY_MIN_YEAR, isGlobalHistoryPage } from "@/lib/ai/history-scope";
import { LocalHistoryRetriever } from "@/lib/rag/local-history-retriever";
import type { RetrievedEvidence } from "@/types/ai";

const MAX_RETRIEVED_EXCERPTS = 5;
const MAX_RETRIEVED_EXCERPT_LENGTH = 900;
const MAX_RETRIEVED_TOTAL_LENGTH = 3600;
const MAX_EVIDENCE_ID_LENGTH = 100;
const MAX_EVIDENCE_TITLE_LENGTH = 120;
const MAX_EVIDENCE_SUMMARY_LENGTH = 300;
const MAX_EVIDENCE_LABEL_LENGTH = 20;
const MAX_EVIDENCE_TEXT_LENGTH = 300;
const MAX_EVIDENCE_SOURCE_REFS = 3;
const MAX_EVIDENCE_SOURCE_REF_LENGTH = 240;
const MAX_EVIDENCE_MARKER_LENGTH = 4;
const MAX_EVIDENCE_DISPUTE_LENGTH = 300;
const MAX_EVIDENCE_MATCHED_YEARS = 5;
const EVIDENCE_MATCH_KINDS: RetrievedEvidence["matchKind"][] = [
  "title",
  "entity",
  "year",
  "body",
  "context",
];
const SERVER_TIMEOUT_MS = 5_000;

const requestSchema = z.object({
  message: z.string().trim().min(1).max(1000),
  context: z.object({
    currentYear: z.number().int(),
    selectedDynasty: z.string().optional(),
    selectedPerson: z.string().optional(),
    selectedEvent: z.string().optional(),
    currentPage: z.string().max(200),
  }).superRefine((context, validation) => {
    const route = context.currentPage.match(/^\/series\/([a-z0-9-]+)\/stories\/([a-z0-9-]+)\/?(?:#[a-z0-9-]+)?$/);
    const slug = context.currentPage.match(/^\/series\/([^/]+)/)?.[1];
    const series = slug ? findSeriesBySlug(slug) : getRouteSeries(context.currentPage);
    if (!series || (route && !narrativeCatalog.some(story => story.seriesId === series.id && story.slug === route[2]))) {
      validation.addIssue({ code: "custom", path: ["currentPage"], message: "Unknown history series or story" });
      return;
    }
    const global = isGlobalHistoryPage(context.currentPage);
    const minimum = global ? HISTORY_MIN_YEAR : series.timelineMinYear;
    const maximum = global ? HISTORY_MAX_YEAR : series.timelineMaxYear;
    if (context.currentYear < minimum || context.currentYear > maximum) {
      validation.addIssue({ code: "custom", path: ["currentYear"], message: "Current year is outside the supported series range" });
    }
  }),
  allowGeneralKnowledge: z.boolean().optional(),
});

function boundRetrievedExcerpts(excerpts: string[]): string[] {
  const bounded: string[] = [];
  let remaining = MAX_RETRIEVED_TOTAL_LENGTH;

  for (const excerpt of excerpts.slice(0, MAX_RETRIEVED_EXCERPTS)) {
    if (remaining <= 0) break;
    const next = excerpt.slice(
      0,
      Math.min(MAX_RETRIEVED_EXCERPT_LENGTH, remaining),
    );
    if (!next) continue;
    bounded.push(next);
    remaining -= next.length;
  }

  return bounded;
}

function boundRetrievedEvidence(
  evidence: RetrievedEvidence[],
): RetrievedEvidence[] {
  return evidence.slice(0, MAX_RETRIEVED_EXCERPTS).flatMap((item) => {
    const eventId = item.eventId.trim().slice(0, MAX_EVIDENCE_ID_LENGTH);
    const title = item.title.trim().slice(0, MAX_EVIDENCE_TITLE_LENGTH);
    const summary = item.summary.trim().slice(0, MAX_EVIDENCE_SUMMARY_LENGTH);
    const sourceRefs = item.sourceRefs
      .map((source) =>
        source.trim().slice(0, MAX_EVIDENCE_SOURCE_REF_LENGTH),
      )
      .filter(Boolean)
      .slice(0, MAX_EVIDENCE_SOURCE_REFS);
    const matchKind = EVIDENCE_MATCH_KINDS.includes(item.matchKind)
      ? item.matchKind
      : undefined;
    const matchedQueryYears = [
      ...new Set(
        item.matchedQueryYears.filter(
          (year) =>
            Number.isInteger(year) &&
            year >= HISTORY_MIN_YEAR &&
            year <= HISTORY_MAX_YEAR,
        ),
      ),
    ].slice(0, MAX_EVIDENCE_MATCHED_YEARS);
    if (!eventId || !title || !summary || !sourceRefs.length || !matchKind) {
      return [];
    }

    const matchedLabel = item.matchedEvidence?.label
      .trim()
      .slice(0, MAX_EVIDENCE_LABEL_LENGTH);
    const matchedText = item.matchedEvidence?.text
      .trim()
      .slice(0, MAX_EVIDENCE_TEXT_LENGTH);
    const story = item.story && [item.story.seriesId, item.story.slug, item.story.sectionId].every(value => /^[a-z0-9-]{1,80}$/.test(value))
      ? { ...item.story, period: item.story.period.slice(0, 100) } : undefined;
    return [
      {
        eventId,
        sourceId: story ? `narrative:${story.seriesId}:${story.slug}:${story.sectionId}` : `history-event:${eventId}`,
        ...(story ? { story } : {}),
        title,
        year: item.year,
        summary,
        matchedEvidence:
          matchedLabel && matchedText
            ? { label: matchedLabel, text: matchedText }
            : undefined,
        sourceRefs,
        marker: item.marker.slice(0, MAX_EVIDENCE_MARKER_LENGTH),
        disputedNote:
          item.disputedNote
            ?.trim()
            .slice(0, MAX_EVIDENCE_DISPUTE_LENGTH) || undefined,
        matchKind,
        matchedQueryYears,
      },
    ];
  });
}

function abortError(signal: AbortSignal): unknown {
  return signal.reason ?? new DOMException("Request aborted", "AbortError");
}

function abortable<T>(promise: Promise<T>, signal: AbortSignal): Promise<T> {
  if (signal.aborted) return Promise.reject(abortError(signal));

  return new Promise<T>((resolve, reject) => {
    const onAbort = () => {
      cleanup();
      reject(abortError(signal));
    };
    const cleanup = () => signal.removeEventListener("abort", onAbort);
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => {
        cleanup();
        resolve(value);
      },
      (error) => {
        cleanup();
        reject(error);
      },
    );
  });
}

export async function POST(request: Request) {
  const controller = new AbortController();
  const onRequestAbort = () => controller.abort(request.signal.reason);
  if (request.signal.aborted) onRequestAbort();
  else request.signal.addEventListener("abort", onRequestAbort, { once: true });
  const timeout = setTimeout(
    () => controller.abort(new Error("AI request timed out")),
    SERVER_TIMEOUT_MS,
  );

  try {
    controller.signal.throwIfAborted();
    let input: z.infer<typeof requestSchema>;
    try {
      input = requestSchema.parse(
        await abortable(request.json(), controller.signal),
      );
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof SyntaxError) {
        return NextResponse.json(
          { code: "INVALID_REQUEST", message: "请求内容不完整" },
          { status: 400 },
        );
      }
      throw error;
    }
    const retrieval = await new LocalHistoryRetriever().retrieve(
      input.message,
      input.context,
      MAX_RETRIEVED_EXCERPTS,
      controller.signal,
    );
    const answer = await abortable(
      new MockLlmProvider().generateAnswer({
        ...input,
        retrievedExcerpts: boundRetrievedExcerpts(
          retrieval.excerptsForServerPrompt,
        ),
        retrievedEvidence: boundRetrievedEvidence(retrieval.evidence),
        signal: controller.signal,
      }),
      controller.signal,
    );
    return NextResponse.json(aiAnswerSchema.parse(answer));
  } catch {
    return NextResponse.json(
      {
        code: "PROVIDER_UNAVAILABLE",
        message: "问史暂时不可用",
      },
      { status: 503 },
    );
  } finally {
    clearTimeout(timeout);
    request.signal.removeEventListener("abort", onRequestAbort);
  }
}
