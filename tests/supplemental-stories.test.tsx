import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SeriesStoryExplorer } from "@/features/series/series-story-explorer";
import { getSeriesStories } from "@/data/series/series-stories";

describe("transcript gaps and connected reading", () => {
  it.each([
    ["northern-qi-zhou-sui", "sui-daxing", "sui-governance", "sui-selection"],
    ["jin", "jin-households"], ["dali", "dali-faith"],
    ["southern-dynasties", "song-government"], ["western-xia", "xia-script-army"],
    ["northern-wei", "wei-capital-frontier"],
  ])("covers the audited topics in %s", (seriesId, ...ids) => {
    const stories = getSeriesStories(seriesId);
    for (const id of ids) expect(stories.some(s => s.id === id)).toBe(true);
  });

  it("connects Wei reform to events and allows continuous reading", async () => {
    const user = userEvent.setup();
    render(<SeriesStoryExplorer seriesId="northern-wei" />);
    await user.click(screen.getByRole("button", { name: "从洛阳新都到北镇危机" }));
    expect(screen.getByRole("link", { name: /进入事件.*迁都/ })).toHaveAttribute("href", "/explore/wei-moves-luoyang?year=494&series=northern-wei");
    await user.click(screen.getByRole("button", { name: /下一节/ }));
    expect(screen.getByRole("region", { name: "图解说明" })).toHaveTextContent("姓氏");
    await user.click(screen.getByRole("button", { name: /下一节/ }));
    expect(screen.getByRole("region", { name: "图解说明" })).toHaveTextContent("不是迁都的单一后果");
    expect(screen.getByRole("button", { name: /下一节/ })).toBeDisabled();
  });
});
