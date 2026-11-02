import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SnapshotHeroMap } from "@/features/home/snapshot-hero-map";
import { historySeries } from "@/data/series";
import { getSeriesRepository } from "@/lib/repositories/series-repository";
import { resolveSeriesSnapshot } from "@/lib/history/series-snapshots";

describe("series homepage overview", () => {
  it.each(historySeries.filter(s => s.mapMode === "snapshot"))("renders the full dated plate for $title", async series => {
    const snapshots = await getSeriesRepository().getSeriesMapSnapshots(series.id);
    const snapshot = resolveSeriesSnapshot(snapshots, series.defaultYear)!;
    const { container } = render(<SnapshotHeroMap year={series.defaultYear} series={series} snapshots={snapshots} routePrefix={`/series/${series.slug}`} />);
    expect(screen.getByRole("img", { name: `${snapshot.year} 年${series.title}及周边形势总图` })).toBeInTheDocument();
    expect(container.querySelectorAll("[data-polity]")).toHaveLength(snapshot.regions.filter(region => region.displayMode !== "label-only").length);
    for (const region of snapshot.regions.filter(region => region.displayMode === "label-only")) {
      expect(container.querySelector(`[data-polity="${region.polityId}"]`)).toBeNull();
      expect(container.querySelector("svg")).toHaveTextContent(region.name!);
    }
    expect(container.querySelectorAll("svg text")).toHaveLength(snapshot.regions.length + (snapshot.contextPlaces?.length ?? 0));
    expect(screen.getByRole("link", { name: `查看 ${snapshot.year} 年完整地图` })).toHaveAttribute("href", `/series/${series.slug}/map?year=${snapshot.year}`);
    for (const path of container.querySelectorAll("path")) expect(path.getAttribute("d")).not.toMatch(/NaN|Infinity/);
    if (series.defaultYear !== snapshot.year) expect(screen.getByText(`所选 ${series.defaultYear} 年暂无独立图，展示 ${snapshot.year} 年图集。`)).toBeVisible();
  });
  it("changes the map plate when the chosen year crosses a known stage", async () => {
    const series = historySeries.find(s => s.id === "jin")!;
    const snapshots = await getSeriesRepository().getSeriesMapSnapshots(series.id);
    const { rerender } = render(<SnapshotHeroMap year={1142} series={series} snapshots={snapshots} routePrefix="/series/jin" />);
    expect(screen.getByRole("img")).toHaveAccessibleName("1142 年金与金中都及周边形势总图");
    rerender(<SnapshotHeroMap year={1208} series={series} snapshots={snapshots} routePrefix="/series/jin" />);
    expect(screen.getByRole("img")).toHaveAccessibleName("1208 年金与金中都及周边形势总图");
  });
});
