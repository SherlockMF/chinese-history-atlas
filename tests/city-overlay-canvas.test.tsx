import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { cityOverlays } from "@/data/series/city-overlays";
import { CityOverlayCanvas } from "@/features/series/city-overlay-canvas";

const mock = vi.hoisted(() => {
  const handlers = new Map<string, (event?: unknown) => void>();
  const instance = { touchZoomRotate: { disableRotation: vi.fn() }, keyboard: { disableRotation: vi.fn() }, addControl: vi.fn(), fitBounds: vi.fn(), easeTo: vi.fn(), getZoom: vi.fn(() => 12), getLayer: vi.fn(() => ({})), setLayoutProperty: vi.fn(), setPaintProperty: vi.fn(), resize: vi.fn(), remove: vi.fn(), on: vi.fn((name: string, handler: (event?: unknown) => void) => handlers.set(name, handler)) };
  return { handlers, instance, construct: vi.fn(), markers: [] as HTMLButtonElement[] };
});
vi.mock("maplibre-gl", () => ({
  Map: mock.construct, setWorkerUrl: vi.fn(), NavigationControl: class {}, ScaleControl: class {},
  Marker: class { constructor({ element }: { element: HTMLButtonElement }) { mock.markers.push(element); } setLngLat() { return this; } addTo() { return this; } },
}));
const props = { city: cityOverlays.jin, layers: { modern: true, extent: true, zones: true, axis: true, landmarks: true, gates: true, streets: true, water: true, comparison: false }, opacity: 0.7, selectedId: "lotus", onSelect: vi.fn(), resetKey: 0 };
beforeEach(() => {
  mock.handlers.clear(); vi.clearAllMocks();
  mock.markers.length = 0; mock.instance.getZoom.mockReturnValue(12);
  mock.construct.mockImplementation(function () { return mock.instance; });
  vi.stubGlobal("ResizeObserver", class { observe() {} disconnect() {} });
});
describe("city map lifecycle", () => {
  it("recovers the warning when raster tiles load after a network failure", () => {
    render(<CityOverlayCanvas {...props} />);
    act(() => mock.handlers.get("error")?.({ sourceId: "modern" }));
    expect(screen.getByRole("status")).toHaveTextContent("无法完整加载");
    act(() => mock.handlers.get("sourcedata")?.({ sourceId: "modern", isSourceLoaded: true, tile: { state: "loaded" } }));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
  it("updates layers without remounting and cleans up the map", () => {
    const { rerender, unmount } = render(<CityOverlayCanvas {...props} />);
    act(() => mock.handlers.get("style.load")?.());
    rerender(<CityOverlayCanvas {...props} layers={{ ...props.layers, extent: false }} opacity={0.3} />);
    expect(mock.instance.setLayoutProperty).toHaveBeenCalledWith("city-extent", "visibility", "none");
    expect(mock.instance.setPaintProperty).toHaveBeenCalledWith("city-axis", "line-opacity", 0.3);
    expect(mock.construct).toHaveBeenCalledTimes(1);
    expect(mock.construct).toHaveBeenCalledWith(expect.objectContaining({ dragRotate: false, touchPitch: false, maxPitch: 0 }));
    expect(mock.instance.touchZoomRotate.disableRotation).toHaveBeenCalledOnce();
    expect(mock.instance.keyboard.disableRotation).toHaveBeenCalledOnce();
    unmount(); expect(mock.instance.remove).toHaveBeenCalledTimes(1);
  });
  it("offers a usable link and explanation if WebGL is unavailable", async () => {
    mock.construct.mockImplementationOnce(function () { throw new Error("WebGL unavailable"); });
    render(<CityOverlayCanvas {...props} />);
    expect(await screen.findByText("此浏览器暂时无法打开交互地图")).toBeVisible();
    expect(screen.getByRole("link", { name: /OpenStreetMap/ })).toHaveAttribute("href", expect.stringContaining("openstreetmap.org"));
  });
  it("keeps historical labels when modern landmarks are off and reveals palace details on zoom", () => {
    const { rerender } = render(<CityOverlayCanvas {...props} layers={{ ...props.layers, landmarks: false }} />);
    const gate = mock.markers.find(b => b.textContent === "丰宜门")!;
    const palaceGate = mock.markers.find(b => b.textContent === "应天门")!;
    expect(gate.style.display).toBe("");
    expect(palaceGate.style.display).toBe("none");
    expect(mock.markers.find(b => b.textContent === "莲花池公园")!.style.display).toBe("none");
    act(() => { mock.instance.getZoom.mockReturnValue(14.5); mock.handlers.get("zoom")?.(); });
    expect(palaceGate.style.display).toBe("");
    palaceGate.click(); expect(props.onSelect).toHaveBeenCalledWith("jin-应天门");
    rerender(<CityOverlayCanvas {...props} layers={{ ...props.layers, gates: false, comparison: true }} />);
    expect(gate.style.display).toBe("none");
    expect(mock.markers.find(b => b.textContent === "正阳门")!.style.display).toBe("");
    expect(mock.instance.fitBounds).toHaveBeenLastCalledWith(cityOverlays.jin.bounds, expect.any(Object));
  });
  it("centers modern landmarks that lie beyond the historical city overview", () => {
    const { rerender } = render(<CityOverlayCanvas {...props} />);
    rerender(<CityOverlayCanvas {...props} selectedId="palace-museum" />);
    expect(mock.instance.easeTo).toHaveBeenCalledWith(expect.objectContaining({ center: [116.3907, 39.9163] }));
  });
});
