import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteHeader } from "@/components/layout/site-header";
import { AiDrawer } from "@/features/ai/ai-drawer";
import { useHistoryStore } from "@/features/history-state/history-store";
import { findSeriesBySlug } from "@/data/series";

const route = vi.hoisted(() => ({ path: "/series/western-xia/stories/xia-last-cities-two-endings" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.path }));

describe("asking from a narrative page", () => {
  beforeEach(() => {
    route.path = "/series/western-xia/stories/xia-last-cities-two-endings";
    useHistoryStore.getState().reset({ series: findSeriesBySlug("western-xia")!, routePrefix: "/series/western-xia", currentYear: 1038 });
  });
  afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

  it("opens the assistant from another series story without labelling it as the timeline year", async () => {
    render(<><SiteHeader /><AiDrawer /></>);
    await userEvent.setup().click(screen.getByRole("button", { name: "问史 · 随时可问" }));
    expect(screen.getByRole("dialog", { name: "问史助手" })).toBeVisible();
    expect(screen.getByText("当前故事 · 站内资料检索")).toBeVisible();
    expect(screen.queryByText(/当前上下文：1038年/)).not.toBeInTheDocument();
  });

  it("offers history retrieval on another series home", () => {
    route.path = "/series/western-xia";
    render(<SiteHeader />);
    expect(screen.getByRole("button", { name: /问史/ })).toBeVisible();
  });

  it("sends the story context and closes the assistant when following a chapter source", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      answer: "《秘史》记门外行礼时汗身体不适。", provenance: "knowledge-base", relatedPeople: [], relatedEvents: [], relatedYears: [],
      sources: [{ sourceId: "narrative:western-xia:xia-last-cities-two-endings:secret-version", title: "灭夏 · 门外行礼", href: "/series/western-xia/stories/xia-last-cities-two-endings#secret-version" }],
    }), { status: 200 })));
    render(<><SiteHeader /><AiDrawer /></>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "问史 · 随时可问" }));
    await user.type(screen.getByLabelText("向问史提问"), "门外行礼");
    await user.click(screen.getByRole("button", { name: "发送问题" }));
    expect(await screen.findByRole("link", { name: "灭夏 · 门外行礼" })).toHaveAttribute("href", "/series/western-xia/stories/xia-last-cities-two-endings#secret-version");
    const request = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
    expect(request.context).toMatchObject({ currentYear: 1038, currentPage: route.path });
    await user.click(screen.getByRole("link", { name: "灭夏 · 门外行礼" }));
    expect(screen.queryByRole("dialog", { name: "问史助手" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "问史 · 随时可问" })).not.toHaveFocus();
  });
});
