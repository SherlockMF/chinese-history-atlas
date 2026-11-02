import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { JinContemporaries } from "@/features/history-map/jin-contemporaries";
import { jinSixteenNarratives } from "@/data/series/jin-sixteen-kingdoms/narratives";
import { getSeriesRepository } from "@/lib/repositories/series-repository";

describe("Sixteen Kingdoms contemporaries", () => {
  it("compares the other five groups at the event year and dates each linked node", async () => {
    const dynasties = await getSeriesRepository().getSeriesDynasties("jin-sixteen-kingdoms");
    render(<JinContemporaries year={405} currentSequenceId="hexi-liang" sequences={jinSixteenNarratives} dynasties={dynasties} />);
    const region = screen.getByRole("complementary", { name: "405年同期对照" });
    expect(within(region).getAllByRole("heading", { level: 4 })).toHaveLength(5);
    const qins = within(region).getByTestId("contemporary-three-qins");
    expect(qins).toHaveTextContent("后秦");
    expect(qins).not.toHaveTextContent("西秦、");
    expect(qins).toHaveTextContent("409");
    expect(within(qins).getByRole("link", { name: /409.*后续节点/ })).toHaveAttribute("href", expect.stringContaining("step=western-qin-restored"));
    expect(region).toHaveTextContent("北魏");
    expect(region).toHaveTextContent("东晋");
  });
});
