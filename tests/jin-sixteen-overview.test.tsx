import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { JinSixteenOverview } from "@/features/series/jin-sixteen-overview";
import { jinSixteenProfiles, politiesAtYear } from "@/data/series/jin-sixteen-kingdoms/polity-profiles";
import { jinSixteenGroups, jinSixteenNarratives } from "@/data/series/jin-sixteen-kingdoms/narratives";
import { getSeriesRepository } from "@/lib/repositories/series-repository";

describe("Sixteen Kingdoms comparative overview", () => {
  it("covers the traditional sixteen and records the Western Qin interruption", () => {
    expect(jinSixteenProfiles.map(item => item.polityId).sort()).toEqual(jinSixteenGroups.flatMap(group => [...group.polityIds]).sort());
    expect(politiesAtYear(399)).toContain("western-qin");
    expect(politiesAtYear(405)).not.toContain("western-qin");
    expect(politiesAtYear(409)).toContain("western-qin");
    for (const profile of jinSixteenProfiles) {
      expect(profile.capitalHistory.length).toBeGreaterThan(0);
      expect(profile.figures.length).toBeGreaterThan(0);
      expect(profile.sourceRefs.length).toBeGreaterThan(0);
    }
  });
  it("lets readers inspect a year, expand a polity and follow its sources and ending", async () => {
    const repo = getSeriesRepository(), id = "jin-sixteen-kingdoms";
    render(<JinSixteenOverview dynasties={await repo.getSeriesDynasties(id)} events={await repo.getSeriesEvents(id)} people={await repo.getSeriesPeople(id)} sequences={jinSixteenNarratives} />);
    const user = userEvent.setup();
    expect(screen.getByRole("region", { name: "十六国并立总览" })).toBeVisible();
    expect(screen.getAllByTestId("polity-time-row")).toHaveLength(16);
    expect(screen.getByTestId("polity-row-western-qin").querySelectorAll("[data-period]")).toHaveLength(2);
    await user.hover(screen.getByRole("button", { name: "西秦：385—400年" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("西秦 · 385—400年");
    await user.keyboard("{Escape}");
    await user.click(screen.getByRole("button", { name: "西秦：409—431年" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("西秦 · 409—431年");
    await user.selectOptions(screen.getByLabelText("对照年份"), "409");
    expect(screen.getByRole("region", { name: "409年同期政权" })).toHaveTextContent("西秦");
    await user.click(screen.getByRole("button", { name: "查看西秦档案" }));
    const profile = screen.getByRole("group", { name: "西秦档案" });
    expect(profile).toBeVisible();
    expect(profile).toHaveTextContent("400—409");
    expect(profile).toHaveTextContent("乞伏");
    expect(within(profile).getByRole("link", { name: /409.*乞伏乾归复建西秦/ })).toHaveAttribute("href", expect.stringContaining("/explore/jin-western-qin-restored"));
    expect(within(profile).getByRole("link", { name: /地图看兴亡/ })).toHaveAttribute("href", expect.stringContaining("sequence=three-qins&step=western-qin-founded"));
    expect(within(profile).getByRole("link", { name: /西秦与夏先后结束/ })).toHaveAttribute("href", expect.stringContaining("/explore/jin-western-qin-xia-fall"));
    expect(within(profile).getByText("史料依据")).toBeInTheDocument();
  });
});
