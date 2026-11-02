import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { JinCityExplorer } from "@/features/series/jin-city-explorer";

describe("JinCityExplorer", () => {
  it("explains city layers and opens the verified migration event", async () => {
    const user = userEvent.setup();
    render(<JinCityExplorer />);
    expect(screen.getByRole("heading", { name: "在今日北京，寻找金中都" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "皇城与宫城" }));
    const detail = screen.getByRole("region", { name: "所选地点说明" });
    expect(within(detail).getByRole("heading", { name: "皇城与宫城" })).toBeInTheDocument();
    expect(within(detail).getByText(/宣阳门/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /1153.*迁都燕京/ })).toHaveAttribute("href", "/explore/jin-moves-zhongdu?year=1153&series=jin");
  });

  it("switches views and distinguishes archaeological remains from reused names", async () => {
    const user = userEvent.setup();
    render(<JinCityExplorer />);
    await user.click(screen.getByRole("button", { name: "今日北京" }));
    await user.click(screen.getByRole("button", { name: "水关与凉水河" }));
    const detail = screen.getByRole("region", { name: "所选地点说明" });
    expect(within(detail).getByText("考古遗存")).toBeInTheDocument();
    expect(within(detail).getByRole("link", { name: /金元两代水关/ })).toHaveAttribute("href", "https://wwj.beijing.gov.cn/bjww/362760/362770/326091358/index.html");
    await user.click(screen.getByRole("button", { name: "景风门站" }));
    expect(within(detail).getByText("地名联系")).toBeInTheDocument();
    expect(within(detail).getByText(/站名不能当作城门遗址的精确坐标/)).toBeInTheDocument();
  });

  it("supports keyboard selection in the diagram and keeps gate positions schematic", async () => {
    const user = userEvent.setup();
    render(<JinCityExplorer />);
    const southGate = screen.getByRole("button", { name: "图中选择：南面三门" });
    southGate.focus();
    await user.keyboard("{Enter}");
    const detail = screen.getByRole("region", { name: "所选地点说明" });
    expect(within(detail).getByRole("heading", { name: "南面三门" })).toBeInTheDocument();
    expect(within(detail).getByText(/2024年.*端礼门/)).toBeInTheDocument();
    expect(screen.getByText(/结构示意，非测绘图/)).toBeInTheDocument();
    const water = screen.getByRole("button", { name: "图中选择：水系与园林" });
    water.focus();
    await user.keyboard(" ");
    expect(within(detail).getByRole("heading", { name: "水系与园林" })).toBeInTheDocument();
  });
});
