import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HistoricalMap } from "@/features/history-map/historical-map";
import { northernWei } from "@/data/series/expansion/northern-wei";
import { southernDynasties } from "@/data/series/expansion/southern-dynasties";
import { getSeriesRepository } from "@/lib/repositories/series-repository";
import { useHistoryStore } from "@/features/history-state/history-store";
vi.mock("next/dynamic", () => ({ default: () => () => <div data-testid="map-canvas" /> }));

describe("historical location maps", () => {
  beforeEach(() => useHistoryStore.getState().reset({ series: northernWei.config, currentYear: 494 }));
  it("shows explicit place evidence and event links without a fake annual territory", async () => {
    const repo = getSeriesRepository();
    render(<HistoricalMap series={{ ...northernWei.config, mapMode: "locations" }} regions={[]} dynasties={await repo.getSeriesDynasties("northern-wei")} events={await repo.getSeriesEvents("northern-wei")} locations={await repo.getSeriesLocations("northern-wei")} />);
    expect(screen.getByRole("region", { name: "北魏历史地点地图" })).toBeVisible();
    expect(screen.getByText(/不表示历史疆界/)).toBeVisible();
    expect(screen.getAllByRole("link", { name: /494.*北魏迁都洛阳/ })[0]).toHaveAttribute("href", "/explore/wei-moves-luoyang?year=494&series=northern-wei");
    fireEvent.change(screen.getByRole("slider", { name: "地图年份" }), { target: { value: "486" } });
    expect(useHistoryStore.getState().currentYear).toBe(486);
    expect(screen.getAllByRole("link", { name: /486.*设立三长制/ })[0]).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: /选择地点.*姑臧/ }));
    expect(screen.getByRole("heading", { name: "姑臧" })).toBeVisible();
    expect(screen.getByRole("link", { name: /439.*北魏灭北凉/ })).toBeVisible();
  });
  it("explains nearby filtered events and lets readers restore the current year", async () => {
    const repo = getSeriesRepository();
    useHistoryStore.getState().reset({ series: southernDynasties.config, currentYear: 450, selectedDynasty: "northern-wei" });
    render(<HistoricalMap series={{ ...southernDynasties.config, mapMode: "locations" }} regions={[]} dynasties={await repo.getSeriesDynasties("southern-dynasties")} events={await repo.getSeriesEvents("southern-dynasties")} locations={await repo.getSeriesLocations("southern-dynasties")} />);
    fireEvent.change(screen.getByRole("slider", { name: "地图年份" }), { target: { value: "589" } });
    expect(screen.getByText(/所选政权在本站没有当年事件/)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "清除政权筛选" }));
    expect(screen.getByRole("heading", { name: "当年事件" })).toBeVisible();
    expect(useHistoryStore.getState().selectedDynasty).toBeUndefined();
  });
});
