import { render, screen } from "@testing-library/react";
import { useEffect } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NarrativeAtlas } from "@/features/history-map/narrative-atlas";
import type { HistoricalMapSnapshot } from "@/types/series";
import type { MapNarrativeStep } from "@/types/map-narrative";
import type { MapLibreCanvasProps } from "@/features/history-map/atlas/maplibre-canvas";

const motion = vi.hoisted(() => ({ reduced: false, canvas: undefined as MapLibreCanvasProps | undefined }));
const projector = { revision: 1, project: ([x, y]: [number, number]): [number, number] => [(x - 100) * 20, (40 - y) * 20] };
vi.mock("framer-motion", () => ({ useReducedMotion: () => motion.reduced }));
vi.mock("next/dynamic", () => ({ default: () => function Canvas(props: MapLibreCanvasProps) {
  motion.canvas = props;
  const { onProjectorChange } = props;
  useEffect(() => { onProjectorChange(projector); }, [onProjectorChange]);
  return <div aria-label="mock map" />;
} }));
const snapshot: HistoricalMapSnapshot = { id: "281", seriesId: "jin", year: 281, label: "晋", note: "", accuracyNote: "", scopeNote: "", accuracyLevel: "approximate", status: "ready", sources: [], regions: [{ polityId: "jin", labelPoint: [110, 30], accuracyLevel: "approximate", note: "", geometry: { type: "Polygon", coordinates: [[[100, 20], [120, 20], [120, 40], [100, 20]]] } }] };
const step: MapNarrativeStep = { id: "route", year: 280, title: "行进", description: "行进", snapshotId: "281", sourceRefs: [], eventIds: [], routeKind: "campaign", cameraBounds: [[108, 28], [116, 34]], nodes: [
  { id: "a", name: "甲", coordinate: [110, 30] }, { id: "b", name: "乙", coordinate: [112, 31] }, { id: "c", name: "丙", coordinate: [114, 32] },
] };
const props = { snapshot, dynasties: [], step, onSelectPolity: vi.fn(), onSelectNode: vi.fn(), onInteract: vi.fn() };
beforeEach(() => { motion.reduced = false; motion.canvas = undefined; });

describe("narrative atlas choreography", () => {
  it("anchors panorama capital targets to their coordinates without displaced cards", () => {
    render(<NarrativeAtlas {...props} step={undefined} snapshot={{ ...snapshot, capitals: [{ name: "邺", coordinate: [114, 36] }, { name: "建康", coordinate: [115, 35] }] }} />);
    for (const [name, x, y] of [["邺", 280, 80], ["建康", 300, 100]] as const) {
      const target = screen.getByRole("button", { name: `查看地点：${name}` });
      expect(target).toHaveAttribute("data-map-capital", "true");
      expect(target).toHaveStyle({ left: `${x}px`, top: `${y}px` });
      expect(target).not.toHaveClass("narrative-map-node");
    }
  });
  it("keeps a partially revealed route and location focus when paused", () => {
    const { rerender } = render(<NarrativeAtlas {...props} playing elapsedMs={4500} />);
    expect(screen.getByRole("button", { name: "查看地点：乙" })).toHaveAttribute("data-node-state", "active");
    expect(screen.getByRole("button", { name: "查看地点：丙" })).toHaveAttribute("data-node-state", "upcoming");
    const lines = screen.getByTestId("narrative-route-reveal").querySelectorAll("line");
    expect(lines[0].style.strokeDashoffset).toBe("0");
    expect(lines[1].style.strokeDashoffset).toBe("100");
    const position = screen.getByTestId("narrative-traveller").getAttribute("style");
    rerender(<NarrativeAtlas {...props} playing={false} elapsedMs={4500} />);
    expect(screen.getByTestId("narrative-traveller")).toHaveAttribute("style", position);
    expect(motion.canvas?.cameraPlaying).toBe(false);
  });
  it("does not animate routes or camera with reduced motion", () => {
    motion.reduced = true;
    render(<NarrativeAtlas {...props} playing elapsedMs={4500} />);
    expect(screen.queryByTestId("narrative-traveller")).not.toBeInTheDocument();
    expect(screen.queryByTestId("narrative-route-reveal")).not.toBeInTheDocument();
    expect(motion.canvas?.viewBounds).toBe(step.cameraBounds);
    expect(motion.canvas?.reducedMotion).toBe(true);
  });
  it("highlights political locations without connecting them as a military route", () => {
    render(<NarrativeAtlas {...props} step={{ ...step, routeKind: "political" }} playing elapsedMs={4500} />);
    expect(screen.queryByTestId("narrative-route-reveal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("narrative-traveller")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "查看地点：乙" })).toHaveAttribute("data-node-state", "active");
  });
});
