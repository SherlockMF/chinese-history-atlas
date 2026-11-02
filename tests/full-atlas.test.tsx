import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { expansionMapSnapshots } from "@/data/series/expansion/map-snapshots";
import { mapSnapshots } from "@/data/series/northern-qi-zhou-sui/map-snapshots";
import { expansionConfigs } from "@/data/series/expansion/configs";
import { createSnapshotAtlas } from "@/features/history-map/atlas/snapshot-atlas";
import { SnapshotMap } from "@/features/history-map/snapshot-map";
import { useHistoryStore } from "@/features/history-state/history-store";
import { getSeriesRepository } from "@/lib/repositories/series-repository";

vi.mock("@/features/history-map/snapshot-atlas-map", () => ({ SnapshotAtlasMap: () => <div /> }));
const all = [...mapSnapshots, ...expansionMapSnapshots];

describe("same-year full atlas", () => {
  it("shares the whole plate between series without losing their initial selection", () => {
    for (const year of [449, 497, 546, 572, 1111, 1142, 1208]) {
      const snapshots = all.filter((s) => s.year === year);
      const byId = (index: number) => Object.fromEntries(snapshots[index].regions.map((r) => [r.polityId, r.geometry]));
      for (let i = 1; i < snapshots.length; i++) expect(byId(i)).toEqual(byId(0));
      const capitalNames = (index: number) => snapshots[index].capitals?.map((c) => c.name).sort();
      for (let i = 1; i < snapshots.length; i++) expect(capitalNames(i)).toEqual(capitalNames(0));
      expect(snapshots[0].regions.length).toBeGreaterThan(4);
    }
    expect(expansionMapSnapshots.find((s) => s.seriesId === "jin")?.regions[0]?.polityId).toBe("jin");
    expect(expansionMapSnapshots.find((s) => s.seriesId === "dali" && s.year === 1142)?.regions[0]?.polityId).toBe("dali-kingdom");
  });
  it("shows the right Song and northern neighbors for each year", () => {
    const ids = (year: number) => all.find((s) => s.year === year)!.regions.map((r) => r.polityId);
    expect(ids(1111)).toEqual(expect.arrayContaining(["northern-song", "liao", "western-xia", "dali-kingdom"]));
    expect(ids(1142)).toEqual(expect.arrayContaining(["southern-song", "jin", "western-liao", "mongolian-peoples"]));
    expect(ids(1142)).not.toContain("mongol");
    expect(ids(1208)).toContain("mongol");
    expect(ids(612)).toEqual(expect.arrayContaining(["sui", "eastern-turks-northern-peoples", "western-turks-western-states"]));
  });
  it("retains non-territorial labels separately from capitals and polity outlines", () => {
    const snapshot = all.find((s) => s.year === 612)!;
    const atlas = createSnapshotAtlas(snapshot, []);
    const labels = atlas.places.features.filter((f) => f.properties.placeKind === "landmark");
    expect(labels.length).toBe((snapshot.contextPlaces?.length ?? 0) + snapshot.regions.filter(region => region.displayMode === "label-only").length);
    expect(labels.some((f) => f.properties.name === "高句丽")).toBe(true);
    expect(atlas.realms.features.some((f) => f.properties.boundaryKind === "influence")).toBe(false);
    expect(atlas.outlines?.features.every((f) => Boolean(f.geometry))).toBe(true);
  });
  it("lets a map-only neighbor be read without adding it to the narrative filter", async () => {
    const series = expansionConfigs.find((s) => s.id === "jin")!;
    const dynasties = await getSeriesRepository().getSeriesDynasties(series.id);
    expect(dynasties.some((d) => d.id === "southern-song")).toBe(false);
    useHistoryStore.getState().reset({ series, currentYear: 1142 });
    const before = useHistoryStore.getState().selectedDynasty;
    render(<SnapshotMap series={series} snapshots={expansionMapSnapshots} dynasties={dynasties} />);
    fireEvent.click(screen.getByRole("button", { name: "南宋" }));
    expect(screen.getByRole("heading", { name: "南宋" })).toBeVisible();
    expect(useHistoryStore.getState().selectedDynasty).toBe(before);
    fireEvent.click(screen.getByText(/原图上的周边名称/));
    expect(screen.getByText("高丽", { exact: true })).toBeVisible();
  });
});
