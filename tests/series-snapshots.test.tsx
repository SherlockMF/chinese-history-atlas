import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { northernQiZhouSuiConfig as series } from "@/data/series/northern-qi-zhou-sui/config";
import { mapSnapshots } from "@/data/series/northern-qi-zhou-sui/map-snapshots";
import { resolveSeriesSnapshot } from "@/lib/history/series-snapshots";
import { SnapshotMap } from "@/features/history-map/snapshot-map";
import { useHistoryStore } from "@/features/history-state/history-store";
import { getSeriesRepository } from "@/lib/repositories/series-repository";
import { northernQiZhouSuiDynasties as dynasties } from "@/data/seed/northern-qi-zhou-sui-dynasties";
import { fiveDynastiesSeedData } from "@/data/seed/five-dynasties";
import type { HistoricalMapSnapshot } from "@/types/series";
import { findSeriesBySlug } from "@/data/series";

vi.mock("@/features/history-map/snapshot-atlas-map", () => ({
  SnapshotAtlasMap: ({ snapshot, onSelectPolity }: { snapshot: HistoricalMapSnapshot; onSelectPolity: (id: string) => void }) => <div role="region" aria-label={`${snapshot.year}年互动历史地图`}><button onClick={() => { const region = snapshot.regions[1]; if (region) onSelectPolity(region.polityId); }}>测试地图选择</button></div>,
}));

describe("series snapshot map", () => {
  beforeEach(() => useHistoryStore.getState().reset({ series, currentYear: 608 }));
  it("exposes three dated atlas maps through the repository", async () => {
    expect((await getSeriesRepository().getSeriesMapSnapshots(series.id)).map((s) => s.year)).toEqual([546, 572, 612]);
    for (const snapshot of mapSnapshots) {
      expect(snapshot.status).toBe("ready");
      expect(snapshot.accuracyLevel).toBe("approximate");
      expect(snapshot.sources.length).toBeGreaterThan(0);
      for (const region of snapshot.regions) {
        expect(dynasties.some((d) => d.id === region.polityId) || Boolean(region.name && region.color)).toBe(true);
        const polygons = region.geometry.type === "Polygon" ? [region.geometry.coordinates] : region.geometry.coordinates;
        for (const polygon of polygons) for (const ring of polygon) {
          expect(ring.length).toBeGreaterThanOrEqual(4);
          expect(ring[0]).toEqual(ring.at(-1));
          expect(ring.flat().every(Number.isFinite)).toBe(true);
        }
      }
    }
  });
  it("uses the latest preceding stage without interpolation", () => {
    expect(resolveSeriesSnapshot(mapSnapshots, 608)?.year).toBe(572);
    expect(resolveSeriesSnapshot([...mapSnapshots].reverse(), 534)?.year).toBe(546);
    expect(resolveSeriesSnapshot(mapSnapshots, 618)?.year).toBe(612);
    expect(resolveSeriesSnapshot([], 608)).toBeNull();
  });
  it("switches maps and distinguishes the selected year from the atlas year", () => {
    render(<SnapshotMap series={series} snapshots={mapSnapshots} dynasties={dynasties} />);
    expect(screen.getByRole("region", { name: "572年互动历史地图" })).toBeVisible();
    expect(screen.getByText(/不代表 608 年格局/)).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "612" }));
    expect(useHistoryStore.getState().currentYear).toBe(612);
    expect(screen.getByRole("button", { name: "612" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("region", { name: "612年互动历史地图" })).toBeVisible();
    fireEvent.change(screen.getByLabelText("地图年份"), { target: { value: "589" } });
    expect(screen.getByText(/不代表 589 年格局/)).toBeVisible();
    fireEvent.change(screen.getByLabelText("地图年份"), { target: { value: "534" } });
    expect(screen.getByText(/早于首个快照/)).toBeVisible();
  });
  it("handles empty data without a fabricated map", () => {
    render(<SnapshotMap series={series} snapshots={[]} dynasties={dynasties} />);
    expect(screen.getByText(/暂无阶段快照/)).toBeVisible();
    expect(screen.queryByTestId("snapshot-atlas")).not.toBeInTheDocument();
  });
  it("selects from the map or keyboard and clears stale selection after switching years", async () => {
    const events = await getSeriesRepository().getSeriesEvents(series.id);
    render(<SnapshotMap series={series} snapshots={mapSnapshots} dynasties={dynasties} events={events} />);
    fireEvent.click(screen.getByRole("button", { name: "测试地图选择" }));
    expect(screen.getByRole("button", { name: "北周" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "南陈" }));
    expect(screen.getByRole("link", { name: /589/ })).toHaveAttribute("href", "/explore/sui-conquers-chen?year=589&series=northern-qi-zhou-sui");
    fireEvent.focus(screen.getByRole("button", { name: "后梁（江陵）" }));
    expect(screen.getByRole("heading", { name: "后梁（江陵）" })).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "612" }));
    expect(screen.queryByRole("button", { name: "后梁（江陵）" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "隋" })).toHaveAttribute("aria-pressed", "true");
  });
  it("shows local sources as citations without broken download links", () => {
    render(<SnapshotMap series={series} snapshots={mapSnapshots} dynasties={dynasties} />);
    fireEvent.click(screen.getByText("图集年代与来源"));
    expect(screen.getByText(/04-23陈、齐、周时期全图/)).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /04-23/ })).not.toBeInTheDocument();
  });
  it("preserves the Five Dynasties annual data", async () => {
    expect(await getSeriesRepository().getSeriesRegions("five-dynasties")).toEqual(fiveDynastiesSeedData.regions);
    expect(await getSeriesRepository().getSeriesMapSnapshots("five-dynasties")).toEqual([]);
  });
  it("identifies shared reconstructions and initially selects the topic polity", async () => {
    const northern = findSeriesBySlug("northern-wei")!;
    const repo = getSeriesRepository();
    useHistoryStore.getState().reset({ series: northern, currentYear: 439 });
    render(<SnapshotMap series={northern} snapshots={await repo.getSeriesMapSnapshots(northern.id)} dynasties={await repo.getSeriesDynasties(northern.id)} />);
    expect(screen.getByRole("heading", { name: "439年 · 史料重建地图" })).toBeVisible();
    expect(screen.getByRole("button", { name: "北魏" })).toHaveAttribute("aria-pressed", "true");
  });
});
