"use client";

import { useEffect, useRef, useState } from "react";
import { Map as MapLibreMap, Marker, NavigationControl, ScaleControl, setWorkerUrl } from "maplibre-gl";
import type { CityOverlay, CityLayers } from "@/data/series/city-overlays";
import { modernCityLayers, modernCitySource } from "./city-modern-style";

type Props = { city: CityOverlay; layers: CityLayers; opacity: number; selectedId: string; onSelect: (id: string) => void; resetKey: number; focusKey?: number };

export function CityOverlayCanvas({ city, layers, opacity, selectedId, onSelect, resetKey, focusKey = 0 }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markers = useRef(new Map<string, HTMLButtonElement>());
  const current = useRef({ layers, opacity, selectedId });
  const [status, setStatus] = useState<"loading" | "ready" | "tiles" | "webgl">("loading");
  const previousSelection = useRef(selectedId);

  useEffect(() => {
    current.current = { layers, opacity, selectedId };
    const map = mapRef.current;
    if (map?.getLayer("city-extent")) syncLayers(map, markers.current, current.current);
  }, [layers, opacity, selectedId]);

  useEffect(() => {
    if (!container.current) return;
    setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
    let map: MapLibreMap;
    try {
      map = new MapLibreMap({
        container: container.current,
        style: {
          version: 8,
          glyphs: `${window.location.origin}/maps/cities/fonts/{fontstack}/{range}.pbf`,
          sources: {
            modern: modernCitySource(city.id),
            history: { type: "geojson", data: city.features },
          },
          layers: [
            { id: "paper", type: "background", paint: { "background-color": "#f2efe6" } },
            ...modernCityLayers.map(layer => ({ ...layer, layout: { ...layer.layout, visibility: current.current.layers.modern ? "visible" as const : "none" as const } })),
            { id: "city-fill", type: "fill", source: "history", filter: ["==", "layer", "extent"], paint: { "fill-color": "#c0a579", "fill-opacity": 0.12 } },
            { id: "city-comparison-fill", type: "fill", source: "history", filter: ["==", "layer", "comparison"], paint: { "fill-color": "#7b9865", "fill-opacity": 0.12 } },
            { id: "city-wards", type: "fill", source: "history", filter: ["==", "kind", "ward"], paint: { "fill-color": "#bba984", "fill-opacity": 0.15 } },
            { id: "city-ward-lines", type: "line", source: "history", filter: ["==", "kind", "ward"], paint: { "line-color": "#b1a184", "line-width": 0.6 } },
            { id: "city-streets", type: "line", source: "history", filter: ["all", ["==", "layer", "streets"], ["==", "$type", "LineString"]], paint: { "line-color": "#a68c64", "line-width": ["case", ["==", ["get", "kind"], "minor"], 0.8, 1.6] } },
            { id: "city-zones", type: "fill", source: "history", filter: ["==", "layer", "zones"], paint: { "fill-color": ["match", ["get", "kind"], "palace", "#b46a43", "market", "#809579", "#c2a367"], "fill-opacity": 0.4 } },
            { id: "city-zone-lines", type: "line", source: "history", filter: ["==", "layer", "zones"], paint: { "line-color": "#866a31", "line-width": 1.5 } },
            { id: "city-water-fill", type: "fill", source: "history", filter: ["all", ["==", "layer", "water"], ["==", "$type", "Polygon"]], paint: { "fill-color": "#739da7", "fill-opacity": 0.6 } },
            { id: "city-water", type: "line", source: "history", filter: ["==", "layer", "water"], layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": "#4b8e9c", "line-width": 2.5 } },
            { id: "city-extent-casing", type: "line", source: "history", filter: ["==", "layer", "extent"], paint: { "line-color": "#f2efe6", "line-width": 7 } },
            { id: "city-extent", type: "line", source: "history", filter: ["==", "layer", "extent"], paint: { "line-color": "#914535", "line-width": 3.5, "line-dasharray": city.id === "daxing" ? [3, 1] : [20, .5] } },
            { id: "city-axis", type: "line", source: "history", filter: ["==", "layer", "axis"], paint: { "line-color": "#b54c37", "line-width": ["case", ["==", ["get", "kind"], "ceremonial"], 1.5, 3] } },
            { id: "city-comparison", type: "line", source: "history", filter: ["==", "layer", "comparison"], paint: { "line-color": "#466d4a", "line-width": 2.5 } },
          ],
        },
        bounds: current.current.layers.comparison ? city.bounds : city.historicalBounds, fitBoundsOptions: { padding: 45 }, minZoom: 10, maxZoom: 16,
        cooperativeGestures: true, attributionControl: { compact: false },
        localIdeographFontFamily: "Microsoft YaHei, sans-serif",
        dragRotate: false, touchPitch: false, maxPitch: 0,
      });
    } catch {
      queueMicrotask(() => setStatus("webgl"));
      return;
    }
    mapRef.current = map;
    map.touchZoomRotate.disableRotation();
    map.keyboard.disableRotation();
    const buttons = markers.current;
    let disposed = false;
    const timer = window.setTimeout(() => { if (!disposed) setStatus(s => s === "loading" ? "tiles" : s); }, 12000);
    map.addControl(new NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new ScaleControl({ unit: "metric" }), "bottom-left");
    map.on("style.load", () => syncLayers(map, buttons, current.current));
    map.on("zoom", () => syncMarkers(map, buttons, current.current));
    map.on("load", () => { if (!disposed) setStatus(s => s === "tiles" ? s : "ready"); });
    map.on("error", event => { if (!disposed && "sourceId" in event && event.sourceId === "modern") setStatus("tiles"); });
    map.on("sourcedata", event => {
      if (!disposed && event.sourceId === "modern" && event.isSourceLoaded && "tile" in event &&
        (event.tile as { state?: string } | undefined)?.state === "loaded") setStatus("ready");
    });
    for (const place of city.landmarks) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = place.name;
      button.setAttribute("aria-label", `地图地标：${place.name}`);
      button.className = "history-place-marker";
      button.dataset.layer = "landmarks";
      button.addEventListener("click", () => onSelect(place.id));
      buttons.set(place.id, button);
      new Marker({ element: button, anchor: "bottom", offset: place.labelOffset }).setLngLat(place.coordinates).addTo(map);
    }
    for (const place of city.places) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `city-plan-marker city-plan-marker--${place.kind}`;
      button.dataset.layer = place.layer;
      button.dataset.side = place.side ?? "center";
      button.dataset.detail = String(Boolean(place.detail));
      button.setAttribute("aria-label", `历史地点：${place.name}`);
      const label = document.createElement("span");
      label.textContent = place.name;
      button.append(label);
      button.addEventListener("click", () => onSelect(place.id));
      buttons.set(place.id, button);
      new Marker({ element: button, anchor: "center" }).setLngLat(place.coordinates).addTo(map);
    }
    syncMarkers(map, buttons, current.current);
    const resize = new ResizeObserver(() => map.resize());
    resize.observe(container.current);
    return () => {
      disposed = true; window.clearTimeout(timer); resize.disconnect(); buttons.clear(); map.remove(); mapRef.current = null;
    };
  }, [city, onSelect]);

  useEffect(() => { mapRef.current?.fitBounds(layers.comparison ? city.bounds : city.historicalBounds, { padding: 45, duration: 0 }); }, [city, resetKey, layers.comparison]);
  useEffect(() => {
    if (previousSelection.current === selectedId) return;
    previousSelection.current = selectedId;
    const place = city.places.find(p => p.id === selectedId);
    if (place?.detail) mapRef.current?.easeTo({ center: place.coordinates, zoom: 14.5, duration: 0 });
    const landmark = city.landmarks.find(p => p.id === selectedId);
    if (landmark) mapRef.current?.easeTo({ center: landmark.coordinates, zoom: 13.5, duration: 0 });
  }, [city, selectedId]);
  useEffect(() => {
    if (focusKey === 0) return;
    const coordinates = city.features.features.flatMap(feature =>
      feature.geometry.type === "Polygon" && ["palace", "imperial"].includes(feature.properties.kind ?? "") ? feature.geometry.coordinates[0] : []);
    mapRef.current?.fitBounds([
      [Math.min(...coordinates.map(p => p[0])), Math.min(...coordinates.map(p => p[1]))],
      [Math.max(...coordinates.map(p => p[0])), Math.max(...coordinates.map(p => p[1]))],
    ], { padding: 55, duration: 0 });
  }, [city, focusKey]);

  return <div className={`relative h-[480px] sm:h-[640px] ${layers.comparison ? "city-overlay-comparing" : ""}`}>
    <div ref={container} aria-label={`${city.title}可缩放地图`} className="h-full w-full" />
    {status === "loading" && layers.modern ? <p role="status" className="pointer-events-none absolute left-3 top-3 bg-paper/95 px-3 py-2 text-xs">正在加载本地街道底图…</p> : null}
    {status === "tiles" && layers.modern ? <p role="status" className="absolute bottom-16 left-3 right-14 bg-paper/95 p-3 text-xs leading-6">现代底图暂时无法完整加载。历史层和下方地点说明仍可使用；可关闭“现代街道底图”单独观察历史空间。</p> : null}
    {status === "webgl" ? <div role="status" className="absolute inset-0 flex flex-col items-center justify-center bg-mist/30 p-8 text-center"><p className="font-serif text-xl">此浏览器暂时无法打开交互地图</p><p className="mt-3 text-sm leading-7">可继续阅读下方地标、复原依据和城市格局图。</p><a href={city.sources.find(s => s.id === "modern")!.url} target="_blank" rel="noreferrer" className="mt-5 text-sm text-cinnabar underline">在 OpenStreetMap 查看现代区域 ↗</a></div> : null}
  </div>;
}

function syncLayers(map: MapLibreMap, markers: Map<string, HTMLButtonElement>, state: { layers: CityLayers; opacity: number; selectedId: string }) {
  const { layers, opacity, selectedId } = state;
  const groups = { modern: modernCityLayers.map(layer => layer.id), extent: ["city-fill", "city-extent", "city-extent-casing"], zones: ["city-zones", "city-zone-lines"], axis: ["city-axis"], streets: ["city-wards", "city-ward-lines", "city-streets"], water: ["city-water-fill", "city-water"], comparison: ["city-comparison-fill", "city-comparison"] };
  for (const [key, ids] of Object.entries(groups)) for (const id of ids) {
    if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", layers[key as keyof typeof groups] ? "visible" : "none");
  }
  map.setPaintProperty("city-fill", "fill-opacity", opacity * 0.15);
  map.setPaintProperty("city-zones", "fill-opacity", opacity * 0.55);
  map.setPaintProperty("city-water-fill", "fill-opacity", opacity * 0.65);
  map.setPaintProperty("city-comparison-fill", "fill-opacity", opacity * 0.12);
  map.setPaintProperty("city-wards", "fill-opacity", opacity * 0.22);
  for (const id of ["city-extent", "city-extent-casing", "city-zone-lines", "city-axis", "city-water", "city-streets", "city-ward-lines", "city-comparison"]) map.setPaintProperty(id, "line-opacity", opacity);
  syncMarkers(map, markers, { layers, opacity, selectedId });
}

function syncMarkers(map: MapLibreMap, markers: Map<string, HTMLButtonElement>, { layers, selectedId }: { layers: CityLayers; opacity: number; selectedId: string }) {
  for (const [id, button] of markers) {
    const layer = button.dataset.layer as keyof CityLayers;
    const detailVisible = button.dataset.detail !== "true" || map.getZoom() >= 13;
    // Dense palace labels belong in the close view; city names and gates stay legible at overview.
    button.style.display = layers[layer] && detailVisible ? "" : "none";
    button.setAttribute("data-selected", String(id === selectedId));
    button.setAttribute("aria-pressed", String(id === selectedId));
  }
}
