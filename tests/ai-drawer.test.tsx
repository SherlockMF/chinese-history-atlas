import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { AiSuggestionChips } from "@/features/ai/ai-suggestion-chips";
import { AiMessage } from "@/features/ai/ai-message";
import { useHistoryStore } from "@/features/history-state/history-store";
import type { AiAnswer } from "@/types/ai";

const answer: AiAnswer = {
  answer: "示例回答",
  provenance: "knowledge-base",
  relatedPeople: ["shi-jingtang"],
  relatedEvents: ["founding-later-jin"],
  relatedYears: [936],
  sources: [],
};

describe("AiSuggestionChips", () => {
  beforeEach(() => useHistoryStore.getState().reset({ currentYear: 923 }));

  it("navigates from a related year chip", async () => {
    const user = userEvent.setup();
    render(<AiSuggestionChips answer={answer} />);

    await user.click(screen.getByRole("button", { name: "936年" }));

    expect(useHistoryStore.getState().currentYear).toBe(936);
  });

  it("updates selected person and event from suggestions", async () => {
    const user = userEvent.setup();
    render(<AiSuggestionChips answer={answer} />);

    await user.click(screen.getByRole("button", { name: "石敬瑭" }));
    await user.click(screen.getByRole("button", { name: "后晋建立" }));

    expect(useHistoryStore.getState()).toMatchObject({
      selectedPerson: "shi-jingtang",
      selectedEvent: "founding-later-jin",
    });
  });

  it("links cross-period events by their source title without clamping their year", () => {
    render(<AiSuggestionChips answer={{ ...answer, relatedPeople: [], relatedEvents: ["xia-founded"], relatedYears: [1038], sources: [{ sourceId: "history-event:xia-founded", title: "西夏建立", href: "/explore/xia-founded" }] }} />);
    expect(screen.getByRole("link", { name: "西夏建立" })).toHaveAttribute("href", "/explore/xia-founded");
    expect(screen.queryByRole("button", { name: "1038年" })).not.toBeInTheDocument();
    expect(useHistoryStore.getState().currentYear).toBe(923);
  });

  it("does not apply a topic timeline year on the global home", () => {
    render(<AiSuggestionChips answer={answer} globalPage />);
    expect(screen.getByText("936年")).toBeVisible();
    expect(screen.queryByRole("button", { name: "936年" })).not.toBeInTheDocument();
  });
});

describe("AiMessage narrative sources", () => {
  it("links a sourced answer back to its story chapter", () => {
    render(<AiMessage answer={{ ...answer, relatedPeople: [], relatedEvents: [], relatedYears: [], sources: [{ sourceId: "narrative:liao:xiao-guanyin:poems", title: "萧观音 · 诗文", href: "/series/liao/stories/xiao-guanyin#poems" }] }} />);
    expect(screen.getByRole("link", { name: "萧观音 · 诗文" })).toHaveAttribute("href", "/series/liao/stories/xiao-guanyin#poems");
  });
});
