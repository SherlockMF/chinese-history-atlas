import type { MapNarrativeStep } from "@/types/map-narrative";

export function narrativeDuration(step?: MapNarrativeStep): number {
  if (!step) return 8000;
  return Math.min(14000, Math.ceil((8000 + Math.max(0, step.nodes.length - 1) * 1400 + Math.min(1800, step.description.length * 8)) / 1000) * 1000);
}

export function narrativeFrame(step: MapNarrativeStep, elapsedMs: number) {
  const duration = narrativeDuration(step);
  const routeProgress = Math.min(1, Math.max(0, (elapsedMs - 1000) / (duration - 4000)));
  const phase = elapsedMs < 1000 ? "opening" : elapsedMs >= duration - 3000 ? "reading" : "moving";
  const count = step.nodes.length;
  const isRoute = step.routeKind !== "political" && count > 1;
  const activeIndex = count ? Math.min(count - 1, Math.floor(routeProgress * (isRoute ? count - 1 : count))) : -1;
  const focusIndex = isRoute && phase === "moving" ? Math.min(count - 1, activeIndex + 1) : activeIndex;
  const current = step.nodes[activeIndex]?.name ?? step.title;
  const next = step.nodes[focusIndex]?.name;
  const caption = phase === "opening" ? `展开局势 · ${step.year} 年` : phase === "reading" ? "停留阅读 · 回看本步变化" : isRoute ? `${current} → ${next}` : `聚焦 · ${current}`;
  return { phase, routeProgress, activeIndex, focusIndex, caption };
}

/** A restrained camera nudge that keeps every route node within the frame. */
export function narrativeFocusBounds(step: MapNarrativeStep, index: number): MapNarrativeStep["cameraBounds"] {
  const bounds = step.cameraBounds, node = step.nodes[index];
  if (!bounds || !node) return bounds;
  const [[west, south], [east, north]] = bounds;
  const width = east - west, height = north - south;
  const x = (west + east) / 2, y = (south + north) / 2;
  const center = [x + (node.coordinate[0] - x) * .16, y + (node.coordinate[1] - y) * .16];
  const coordinates = step.nodes.map(item => item.coordinate);
  return [
    [Math.min(center[0] - width * .46, ...coordinates.map(point => point[0] - width * .08)), Math.min(center[1] - height * .46, ...coordinates.map(point => point[1] - height * .08))],
    [Math.max(center[0] + width * .46, ...coordinates.map(point => point[0] + width * .08)), Math.max(center[1] + height * .46, ...coordinates.map(point => point[1] + height * .08))],
  ];
}
