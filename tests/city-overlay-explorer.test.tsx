import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
vi.mock("next/dynamic", () => ({ default: () => function Canvas(props: { layers: Record<string, boolean>; opacity: number }) { return <output data-testid="map-state">{JSON.stringify(props)}</output>; } }));
import { CityOverlayExplorer } from "@/features/series/city-overlay-explorer";
import { cityOverlays } from "@/data/series/city-overlays";

describe("city overlay controls", () => {
  it("independently switches real basemap and historical layers", async () => {
    const user = userEvent.setup();
    render(<CityOverlayExplorer cityId="jin" />);
    expect(screen.getByRole("checkbox", { name: "现代街道底图" })).not.toBeChecked();
    await user.click(screen.getByRole("checkbox", { name: "历史城域" }));
    expect(screen.getByTestId("map-state")).toHaveTextContent('"extent":false');
    fireEvent.change(screen.getByRole("slider", { name: "历史层透明度" }), { target: { value: "30" } });
    expect(screen.getByTestId("map-state")).toHaveTextContent('"opacity":0.3');
    await user.click(screen.getByRole("button", { name: "只看现代" }));
    expect(screen.getByRole("checkbox", { name: "历史轴线" })).not.toBeChecked();
    await user.click(screen.getByRole("button", { name: "古今叠加" }));
    expect(screen.getByRole("checkbox", { name: "历史城域" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "历史轴线" })).toBeChecked();
    expect(screen.getByText(/概略复原.*测绘/)).toBeVisible();
    await user.click(screen.getByRole("button", { name: "城址对照" }));
    expect(screen.getByRole("checkbox", { name: "明清北京内外城" })).toBeChecked();
    await user.click(screen.getByRole("button", { name: "只看历史" }));
    expect(screen.getByRole("checkbox", { name: "城门与门名" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "明清北京内外城" })).not.toBeChecked();
  });
  it("opens historical place descriptions and enables their layer", async () => {
    const user = userEvent.setup();
    render(<CityOverlayExplorer cityId="daxing" />);
    await user.click(screen.getByRole("button", { name: "只看现代" }));
    await user.click(screen.getByText(/地点索引/));
    await user.click(screen.getByRole("button", { name: "利人市" }));
    expect(screen.getByRole("region", { name: "古今地点说明" })).toHaveTextContent("唐代改称西市");
    expect(screen.getByRole("checkbox", { name: "宫城 / 皇城 / 两市" })).toBeChecked();
    expect(screen.getByRole("button", { name: "只看现代" })).toHaveAttribute("aria-pressed", "false");
  });
  it("explains modern landmarks without treating them as ancient gates", async () => {
    const user = userEvent.setup();
    render(<CityOverlayExplorer cityId="daxing" />);
    await user.click(screen.getByRole("button", { name: "今朱雀门" }));
    expect(screen.getByRole("region", { name: "古今地点说明" })).toHaveTextContent("不等于");
  });
  it("keeps geographic overlays within their view and traces every feature", () => {
    for (const city of Object.values(cityOverlays)) {
      const [[west, south], [east, north]] = city.bounds;
      for (const feature of city.features.features) {
        expect(feature.properties.sourceIds.length).toBeGreaterThan(0);
        for (const sourceId of feature.properties.sourceIds) expect(city.sources.some(s => s.id === sourceId)).toBe(true);
        const coords = feature.geometry.type === "Polygon" ? feature.geometry.coordinates[0] : feature.geometry.coordinates;
        for (const [lng, lat] of coords) {
          expect(lng).toBeGreaterThanOrEqual(west); expect(lng).toBeLessThanOrEqual(east);
          expect(lat).toBeGreaterThanOrEqual(south); expect(lat).toBeLessThanOrEqual(north);
        }
      }
    }
  });
});
