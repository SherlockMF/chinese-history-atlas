import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { JinSixteenHome } from "@/features/series/jin-sixteen-home";
import { jinSixteenConfig } from "@/data/series/jin-sixteen-kingdoms/config";
import { jinSixteenChapters, jinSixteenNarratives } from "@/data/series/jin-sixteen-kingdoms/narratives";
import { getSeriesRepository } from "@/lib/repositories/series-repository";

vi.mock("@/features/history-map/map-narrative-explorer", () => ({ MapNarrativeExplorer: () => <div>地图推演</div> }));

describe("Sixteen Kingdoms home", () => {
  it("opens at 304 and links its background and parallel court to separate topics", async () => {
    const repo = getSeriesRepository();
    render(<JinSixteenHome
      series={jinSixteenConfig} snapshots={await repo.getSeriesMapSnapshots(jinSixteenConfig.id)}
      dynasties={await repo.getSeriesDynasties(jinSixteenConfig.id)} events={await repo.getSeriesEvents(jinSixteenConfig.id)}
      people={await repo.getSeriesPeople(jinSixteenConfig.id)} readingPaths={await repo.getSeriesReadingPaths(jinSixteenConfig.id)}
      sequences={jinSixteenNarratives} chapters={jinSixteenChapters}
    />);
    expect(screen.getByRole("heading", { level: 1, name: "五胡十六国" })).toBeVisible();
    expect(screen.getByRole("link", { name: /从304年诸国兴起开始/ })).toHaveAttribute("href", "/series/jin-sixteen-kingdoms/map?year=304&sequence=two-zhaos&step=liu-yuan-founds-han");
    expect(screen.queryByRole("link", { name: /从西晋统一开始/ })).not.toBeInTheDocument();
    expect(screen.getByRole("complementary", { name: "时代前因与并行专题" })).toHaveTextContent("八王之乱始于291年");
    expect(screen.getByRole("link", { name: /进入西晋专题/ })).toHaveAttribute("href", "/series/western-jin");
    expect(screen.getByRole("link", { name: /进入东晋专题/ })).toHaveAttribute("href", "/series/eastern-jin");
    expect(screen.getByRole("link", { name: /01.*304—316/ })).toHaveAttribute("href", "/series/jin-sixteen-kingdoms/timeline?year=304");
    const mainlines = screen.getByRole("region", { name: "543211：十六国分组" });
    expect(within(mainlines).getAllByRole("heading", { level: 3 }).map(node => node.textContent)).toEqual(["五凉", "四燕", "三秦", "二赵", "一成", "一夏"]);
    expect(within(mainlines).getAllByRole("link")).toHaveLength(6);
    expect(mainlines).toHaveTextContent("前凉");
    expect(mainlines).toHaveTextContent("北燕");
    expect(mainlines).toHaveTextContent("西秦");
    expect(mainlines).toHaveTextContent("成汉");
    expect(mainlines).toHaveTextContent("夏");
    expect(mainlines).not.toHaveTextContent("晋末南渡");
    expect(mainlines).not.toHaveTextContent("桓温北伐");
    expect(mainlines).not.toHaveTextContent("刘裕北伐");
    expect(screen.getByRole("link", { name: /桓温北伐.*东晋/ })).toHaveAttribute("href", "/series/eastern-jin/map?year=347&sequence=huan-wen-expeditions&step=cheng-han");
    expect(screen.queryByRole("link", { name: /司马睿/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /王导/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /北魏如何收束北方/ })).toHaveAttribute("href", "/series/jin-sixteen-kingdoms/map?year=386&sequence=wei-unification&step=wei-founded");
  });
});
