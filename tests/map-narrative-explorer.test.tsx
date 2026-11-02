import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSyncExternalStore } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MapNarrativeExplorer } from "@/features/history-map/map-narrative-explorer";
import type { MapNarrativeSequence } from "@/types/map-narrative";
import type { HistoricalMapSnapshot, HistorySeriesConfig } from "@/types/series";

const navigation = vi.hoisted(() => ({ query: "", listeners: new Set<() => void>() }));
vi.mock("next/navigation", () => ({
  usePathname: () => "/series/jin-sixteen-kingdoms/map",
  useSearchParams: () => new URLSearchParams(useSyncExternalStore(callback => { navigation.listeners.add(callback); return () => navigation.listeners.delete(callback); }, () => navigation.query, () => "")),
}));
vi.mock("@/features/history-map/narrative-atlas", () => ({ NarrativeAtlas: () => <div role="img" aria-label="测试地图" /> }));

const series = { id: "jin-sixteen-kingdoms", slug: "jin-sixteen-kingdoms", title: "两晋与十六国" } as HistorySeriesConfig;
const snapshots = [281, 382, 449].map<HistoricalMapSnapshot>(year => ({ id: `map-${year}`, seriesId: series.id, year, label: `${year}年格局`, note: "原图参考", scopeNote: "图幅范围", accuracyNote: "概括重绘", accuracyLevel: "approximate", regions: [{ polityId: "test-polity", name: "示例政权", accuracyLevel: "approximate", note: "测试", labelPoint: [112, 34], geometry: { type: "Polygon", coordinates: [[[110, 30], [115, 30], [115, 35], [110, 30]]] } }], status: "ready", sources: [] }));
const sequences: MapNarrativeSequence[] = [{ id: "fei", title: "前秦扩张与淝水", period: "382—383", description: "研究淝水转折", steps: [
  { id: "prepare", title: "战前准备", description: "前秦准备南下。", year: 382, snapshotId: "map-382", eventIds: [], routeKind: "campaign", nodes: [{ id: "changan", name: "长安", coordinate: [108.9, 34.2] }], sourceRefs: ["《晋书》 — https://zh.wikisource.org/wiki/晉書/卷114"] },
  { id: "battle", title: "淝水交战", description: "双方在淝水交战。", year: 383, snapshotId: "map-382", eventIds: [], routeKind: "campaign", nodes: [{ id: "shouyang", name: "寿阳", coordinate: [116.8, 32.6] }], sourceRefs: [] },
] }];
const props = { series, snapshots, sequences, dynasties: [], events: [], people: [] };

function setQuery(query: string) { navigation.query = query; navigation.listeners.forEach(callback => callback()); }
beforeEach(() => {
  navigation.query = "";
  vi.spyOn(window.history, "replaceState").mockImplementation((_data, _unused, url) => setQuery(new URL(String(url), "http://localhost").search.slice(1)));
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
});
afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); vi.unstubAllGlobals(); });

describe("map narrative explorer", () => {
  it("restores a related narrative URL without adding it to the default choices", async () => {
    const user = userEvent.setup();
    navigation.query = "sequence=related-fei&step=battle&year=383";
    render(<MapNarrativeExplorer {...props} relatedSequences={[{ ...sequences[0], id: "related-fei", title: "关联淝水" }]} />);
    expect(screen.getByRole("heading", { name: "淝水交战" })).toBeVisible();
    expect(screen.getByLabelText("选择推演")).toHaveValue("related-fei");
    expect(screen.getByRole("option", { name: /关联淝水/ })).toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText("选择推演"), "fei");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(screen.queryByRole("option", { name: /关联淝水/ })).not.toBeInTheDocument();
  });
  it("shares and restores panorama polity selections through the URL", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<MapNarrativeExplorer {...props} />);
    await user.click(screen.getByRole("button", { name: "示例政权" }));
    expect(navigation.query).toContain("dynasty=test-polity");
    unmount();
    render(<MapNarrativeExplorer {...props} />);
    expect(screen.getByRole("heading", { name: "示例政权" })).toBeVisible();
    expect(screen.getByRole("button", { name: "示例政权" })).toHaveAttribute("aria-pressed", "true");
  });
  it("starts in the panorama, distinguishes the epilogue and lets readers enter a sequence", async () => {
    const user = userEvent.setup();
    render(<MapNarrativeExplorer {...props} />);
    expect(screen.getByRole("button", { name: "全景浏览" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("button", { name: /449.*尾声/ }));
    expect(screen.getByText(/统一后的局势/)).toBeVisible();
    await user.click(screen.getByRole("button", { name: "跟随推演" }));
    expect(screen.getByRole("heading", { name: "战前准备" })).toBeVisible();
    expect(screen.getByRole("button", { name: "开始播放" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "下一步" }));
    expect(screen.getByRole("heading", { name: "淝水交战" })).toBeVisible();
    expect(screen.getByText(/事件.*383.*背景地图.*382/)).toBeVisible();
    expect(navigation.query).toContain("step=battle");
  });
  it("restores an incoming step and clears narrative state on switching to panorama", async () => {
    navigation.query = "sequence=fei&step=battle&year=383";
    const user = userEvent.setup();
    render(<MapNarrativeExplorer {...props} />);
    expect(screen.getByRole("heading", { name: "淝水交战" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "全景浏览" }));
    expect(screen.queryByRole("heading", { name: "淝水交战" })).not.toBeInTheDocument();
    expect(navigation.query).not.toContain("sequence=");
  });
  it("plays only after an explicit action and stops at the last step", () => {
    vi.useFakeTimers();
    navigation.query = "sequence=fei&step=prepare";
    render(<MapNarrativeExplorer {...props} />);
    act(() => { vi.advanceTimersByTime(10000); });
    expect(screen.getByRole("heading", { name: "战前准备" })).toBeVisible();
    act(() => screen.getByRole("button", { name: "开始播放" }).click());
    act(() => { vi.advanceTimersByTime(9500); });
    expect(screen.getByRole("heading", { name: "淝水交战" })).toBeVisible();
    expect(screen.getByRole("button", { name: "暂停播放" })).toBeEnabled();
    act(() => { vi.advanceTimersByTime(9500); });
    expect(screen.getByRole("button", { name: "重新播放" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "下一步" })).toBeDisabled();
    expect(screen.getByText(/本组推演已结束/)).toBeVisible();
    act(() => screen.getByRole("button", { name: "重新播放" }).click());
    expect(screen.getByRole("heading", { name: "战前准备" })).toBeVisible();
    expect(screen.getByRole("button", { name: "暂停播放" })).toBeVisible();
  });

  it("explains autoplay and immediately shows countdown feedback that stops on pause", () => {
    vi.useFakeTimers();
    navigation.query = "sequence=fei&step=prepare";
    render(<MapNarrativeExplorer {...props} />);
    expect(screen.getByRole("button", { name: "开始播放" })).toHaveTextContent("自动推演");
    expect(screen.getByText(/每步约 8–14 秒/)).toBeVisible();
    act(() => screen.getByRole("button", { name: "开始播放" }).click());
    expect(screen.getByRole("status")).toHaveTextContent("正在自动推演");
    expect(screen.getByText(/9 秒后进入：淝水交战/)).toBeVisible();
    expect(screen.getByRole("progressbar", { name: "当前步骤播放进度" })).toHaveAttribute("aria-valuenow", "0");
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText(/8 秒后进入：淝水交战/)).toBeVisible();
    act(() => screen.getByRole("button", { name: "暂停播放" }).click());
    expect(screen.getByRole("status")).toHaveTextContent("已暂停");
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByRole("heading", { name: "战前准备" })).toBeVisible();
    expect(screen.getByRole("button", { name: "开始播放" })).toHaveTextContent("继续推演");
    act(() => screen.getByRole("button", { name: "开始播放" }).click());
    act(() => vi.advanceTimersByTime(7500));
    expect(screen.getByRole("heading", { name: "战前准备" })).toBeVisible();
    act(() => vi.advanceTimersByTime(500));
    expect(screen.getByRole("heading", { name: "淝水交战" })).toBeVisible();
  });
  it("pauses on leaving the page and clears progress on a manual step change", () => {
    vi.useFakeTimers();
    navigation.query = "sequence=fei&step=prepare";
    render(<MapNarrativeExplorer {...props} />);
    act(() => screen.getByRole("button", { name: "开始播放" }).click());
    act(() => vi.advanceTimersByTime(2400));
    vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(screen.getByRole("status")).toHaveTextContent("已暂停");
    act(() => vi.advanceTimersByTime(15000));
    expect(screen.getByRole("heading", { name: "战前准备" })).toBeVisible();
    act(() => screen.getByRole("button", { name: "下一步" }).click());
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "开始播放" })).toHaveTextContent("自动推演");
  });
});
