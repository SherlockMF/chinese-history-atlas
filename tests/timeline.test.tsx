import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { westernJinConfig } from "@/data/series/jin-sixteen-kingdoms/config";

import { events } from "@/data/seed";
import { useHistoryStore } from "@/features/history-state/history-store";
import { Timeline } from "@/features/timeline/timeline";

describe("Timeline", () => {
  beforeEach(() => useHistoryStore.getState().reset({ currentYear: 923 }));

  it("does not repeat the 884 incident throughout the later feud", () => {
    useHistoryStore.getState().setCurrentYear(893);
    render(<Timeline events={events} />);
    expect(screen.queryByRole("link", { name: /上源驿之变/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /王潮、王审知取得福州/ })).toBeVisible();
    expect(screen.getByRole("button", { name: "选择885—890年，暂无收录事件" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "选择893年，有历史事件" })).toHaveAttribute("aria-current", "date");
    expect(screen.getByRole("button", { name: "选择894—895年，暂无收录事件" })).toBeInTheDocument();
  });

  it("marks ongoing events and preserves the browsing year in detail links", () => {
    useHistoryStore.getState().setCurrentYear(902);
    render(<Timeline events={events.filter(event => event.id === "zhu-wen-controls-court")} />);
    expect(screen.getByRole("button", { name: "选择902年，有历史事件" })).toHaveAttribute("aria-current", "date");
    expect(screen.getByRole("link", { name: /查看朱温控制唐廷详情/ })).toHaveAttribute("href", "/explore/zhu-wen-controls-court?year=902");
    expect(screen.getByText("901—903 年 · 持续中")).toBeVisible();
  });

  it("changes the shared year and opens an event", async () => {
    const user = userEvent.setup();
    render(<Timeline events={events} />);

    await user.selectOptions(screen.getByLabelText("直接选择年份"), "936");

    expect(useHistoryStore.getState().currentYear).toBe(936);
    expect(screen.getByRole("link", { name: /后晋建立/ })).toHaveAttribute(
      "href",
      "/explore/founding-later-jin?year=936",
    );
  });

  it("keeps empty ranges on the track but disables the dropdown when no event is recorded", async () => {
    const user = userEvent.setup();
    render(<Timeline events={[]} />);

    expect(screen.getByLabelText("直接选择年份")).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "选择924—979年，暂无收录事件" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "这一年暂无收录事件",
    );
    expect(useHistoryStore.getState().currentYear).toBe(924);
  });

  it("shows the active historical period across the 907 boundary", () => {
    render(<Timeline events={events} />);

    expect(screen.getByText("五代十国主体")).toBeVisible();
    expect(screen.getByLabelText("875至979年时间轨")).toBeInTheDocument();

    act(() => useHistoryStore.getState().setCurrentYear(884));

    expect(screen.getByText("唐末前史")).toBeVisible();
  });

  it("keeps the full timeline range available after filtering", async () => {
    const user = userEvent.setup();
    render(<Timeline events={events} />);

    await user.click(screen.getByRole("button", { name: "宋初统一" }));
    await user.selectOptions(screen.getByLabelText("直接选择年份"), "875");

    expect(useHistoryStore.getState().currentYear).toBe(875);
    expect(screen.getByLabelText("875至979年时间轨")).toBeInTheDocument();
  });

  it("labels a reference map with its actual year when the timeline year has no independent plate", () => {
    useHistoryStore.getState().reset({ series: westernJinConfig, currentYear: 281 });
    render(<Timeline series={westernJinConfig} events={[]} mapYears={[281, 304]} />);
    expect(screen.getByRole("link", { name: /281 年 · 对应年代地图示意/ })).toHaveAttribute("href", "/series/western-jin/map?year=281");
    act(() => useHistoryStore.getState().setCurrentYear(282));
    expect(screen.queryByRole("link", { name: /对应年代地图示意/ })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /参考 281 年地图示意（非本年）/ })).toHaveAttribute("href", "/series/western-jin/map?year=281");
    act(() => useHistoryStore.getState().setCurrentYear(280));
    expect(screen.getByRole("link", { name: /参考 281 年地图示意（非本年）/ })).toHaveAttribute("href", "/series/western-jin/map?year=281");
    expect(useHistoryStore.getState().currentYear).toBe(280);
    expect(screen.getByRole("button", { name: "播放历史" })).toBeDisabled();
  });

  it("lists only event years in the dropdown while retaining empty intervals on the track", async () => {
    const records = [265, 280, 290, 300].map(year => ({ ...events[0], id: `jin-${year}`, startYear: year, endYear: year, tracks: ["jin-order"] }));
    useHistoryStore.getState().reset({ series: westernJinConfig, currentYear: 280 });
    render(<Timeline series={westernJinConfig} events={records} mapYears={[281]} />);
    const selector = screen.getByLabelText("直接选择年份");
    expect([...selector.querySelectorAll("option:not([hidden])")].map(option => option.getAttribute("value"))).toEqual(["265", "280", "290", "300"]);
    expect(screen.getByRole("button", { name: "选择281—289年，暂无收录事件" })).toBeVisible();
    await userEvent.click(screen.getByRole("button", { name: "选择281—289年，暂无收录事件" }));
    expect(useHistoryStore.getState().currentYear).toBe(281);
    expect(selector).toHaveValue("");
    expect(selector.querySelector('option[value="281"]')).toBeNull();
    await userEvent.selectOptions(selector, "290");
    expect(useHistoryStore.getState().currentYear).toBe(290);
  });

  it("plays only recorded years and can restart from the last event", async () => {
    vi.useFakeTimers();
    try {
      const records = [923, 936, 960].map((year, index) => ({ ...events.find(event => event.id === "founding-later-jin")!, id: `play-${index}`, startYear: year, endYear: year }));
      render(<Timeline events={records} />);
      act(() => screen.getByRole("button", { name: "播放历史" }).click());
      act(() => vi.advanceTimersByTime(1200));
      expect(useHistoryStore.getState().currentYear).toBe(936);
      act(() => vi.advanceTimersByTime(1200));
      expect(useHistoryStore.getState().currentYear).toBe(960);
      expect(useHistoryStore.getState().isPlaying).toBe(false);
      act(() => screen.getByRole("button", { name: "播放历史" }).click());
      expect(useHistoryStore.getState().currentYear).toBe(923);
    } finally { vi.useRealTimers(); }
  });
});
