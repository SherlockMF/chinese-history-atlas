"use client";

import { useEffect, useRef, useState } from "react";
import { Map as MapLibreMap, Marker, NavigationControl, addProtocol, setWorkerUrl } from "maplibre-gl";
import { Protocol } from "pmtiles";
import { createPhysicalBasemapLayers } from "./atlas/atlas-style";
import { PROTOMAPS_ARCHIVE_URL } from "./atlas/atlas-config";
import type { HistoricalLocation } from "@/types/history";

let protocol: Protocol | undefined;

export function LocationsCanvas({ locations, selectedId, activeIds, onSelect }: {
  locations: HistoricalLocation[];
  selectedId?: string;
  activeIds: string[];
  onSelect: (id: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const markers = useRef(new Map<string, HTMLButtonElement>());
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!container.current || !locations.length) return;
    if (!protocol) { protocol = new Protocol(); addProtocol("pmtiles", protocol.tile); }
    setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
    let map: MapLibreMap;
    const buttons = markers.current;
    try {
      map = new MapLibreMap({
        container: container.current,
        style: {
          version: 8,
          sources: { protomaps: { type: "vector", url: `pmtiles://${PROTOMAPS_ARCHIVE_URL}`, attribution: 'Protomaps · © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a> · Natural Earth' } },
          layers: createPhysicalBasemapLayers(),
        },
        center: [108, 35], zoom: 4, maxZoom: 7, minZoom: 2,
        maxBounds: [[65, 18], [136, 55]], cooperativeGestures: true,
      });
    } catch {
      // Keep the adjacent, fully usable place list when WebGL is unavailable.
      queueMicrotask(() => setError(true));
      return;
    }
    map.on("error", () => setError(true));
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    const xs = locations.map(p => p.longitude), ys = locations.map(p => p.latitude);
    map.fitBounds([[Math.min(...xs) - 1, Math.min(...ys) - 1], [Math.max(...xs) + 1, Math.max(...ys) + 1]], { padding: 55, duration: 0, maxZoom: 6 });
    for (const location of locations) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = location.name;
      button.setAttribute("aria-label", `地图地点：${location.name}`);
      button.className = "history-place-marker";
      button.addEventListener("click", () => onSelect(location.id));
      buttons.set(location.id, button);
      new Marker({ element: button, anchor: "bottom" }).setLngLat([location.longitude, location.latitude]).addTo(map);
    }
    const resize = new ResizeObserver(() => map.resize());
    resize.observe(container.current);
    return () => { resize.disconnect(); buttons.clear(); map.remove(); };
  }, [locations, onSelect]);
  useEffect(() => {
    for (const [id, button] of markers.current) {
      button.setAttribute("data-selected", String(id === selectedId));
      button.setAttribute("data-active", String(activeIds.includes(id)));
      button.setAttribute("aria-pressed", String(id === selectedId));
    }
  }, [selectedId, activeIds]);
  return <div className="relative h-[360px] sm:h-[480px]">
    <div ref={container} aria-label="可缩放的历史地点底图" className="h-full w-full bg-mist" />
    {error ? <p role="status" className="absolute bottom-10 left-3 right-3 rounded-lg bg-paper/95 p-3 text-xs leading-6">底图暂时无法显示。下方地点列表、年代与事件仍可使用。</p> : null}
  </div>;
}
