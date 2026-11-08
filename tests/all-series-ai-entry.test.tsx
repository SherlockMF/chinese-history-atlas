import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SiteChrome } from "@/components/layout/site-chrome";
import { PersonExplorer } from "@/features/people/person-explorer";
import { historySeries } from "@/data/series";
import { getSeriesRepository } from "@/lib/repositories/series-repository";
import { useHistoryStore } from "@/features/history-state/history-store";

const route = vi.hoisted(() => ({ path: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => route.path }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
beforeEach(() => useHistoryStore.getState().reset({ currentYear: 936 }));
describe("all-series entries", () => {
  it.each(["/", "/series", ...historySeries.map(series => `/series/${series.slug}`)])("opens the history drawer at %s", async path => {
    route.path = path;
    render(<SiteChrome><p>内容</p></SiteChrome>);
    await userEvent.setup().click(screen.getByRole("button", { name: "问史 · 随时可问" }));
    expect(screen.getByRole("dialog", { name: "问史助手" })).toBeVisible();
    if (path === "/" || path === "/series") expect(screen.getByText("全站历史 · 站内资料检索")).toBeVisible();
  });
  it("sends a global question without stale selected entities", async () => {
    route.path = "/";
    useHistoryStore.getState().reset({ selectedPerson: "shi-jingtang", selectedEvent: "sixteen-prefectures-ceded" });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ answer: "暂无资料", provenance: "none", relatedPeople: [], relatedEvents: [], relatedYears: [], sources: [] })));
    render(<SiteChrome><p>首页</p></SiteChrome>);
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "问史 · 随时可问" }));
    await user.type(screen.getByLabelText("向问史提问"), "西夏建国");
    await user.click(screen.getByRole("button", { name: "发送问题" }));
    const body = JSON.parse(vi.mocked(fetch).mock.calls[0][1]!.body as string);
    expect(body.context.selectedPerson).toBeUndefined();
    expect(body.context.selectedEvent).toBeUndefined();
  });
  it.each(historySeries)("opens character dialogue in $title", async series => {
    const repository = getSeriesRepository();
    const people = await repository.getSeriesPeople(series.id);
    const person = people.find(item => item.id === series.featuredPersonId) ?? people[0];
    render(<PersonExplorer initialPersonId={person.id} people={people} dynasties={[]} relations={[]} series={series} />);
    await userEvent.setup().click(screen.getByRole("button", { name: `与${person.name}对话` }));
    expect(screen.getByRole("dialog", { name: `与${person.name}对话` })).toBeVisible();
  });
});
