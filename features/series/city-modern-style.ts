import type { LayerSpecification } from "maplibre-gl";

// Bounded OpenFreeMap / ODbL snapshots are served locally because the browser's
// external tile connections are unreliable. See public/maps/cities/manifest.json.
export const modernCitySource = (cityId: "jin" | "daxing") => ({
  type: "vector" as const,
  tiles: [`${typeof window === "undefined" ? "" : window.location.origin}/maps/cities/${cityId}/{z}/{x}/{y}.pbf`],
  minzoom: 10,
  maxzoom: 14,
  bounds: cityId === "jin" ? [116.29, 39.84, 116.455, 39.958] as [number,number,number,number] : [108.858, 34.190, 109.01, 34.30] as [number,number,number,number],
  attribution: '<a href="https://openfreemap.org/">OpenFreeMap</a> · © <a href="https://www.openmaptiles.org/">OpenMapTiles</a> · © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
});
export const modernCityLayers: LayerSpecification[] = [
  { id: "modern-landuse", type: "fill", source: "modern", "source-layer": "landuse", paint: { "fill-color": "#deddd5", "fill-opacity": .45 } },
  { id: "modern-park", type: "fill", source: "modern", "source-layer": "park", paint: { "fill-color": "#ced7bd", "fill-opacity": .55 } },
  { id: "modern-water", type: "fill", source: "modern", "source-layer": "water", paint: { "fill-color": "#a9c5cc", "fill-opacity": .75 } },
  { id: "modern-waterway", type: "line", source: "modern", "source-layer": "waterway", paint: { "line-color": "#99bcc6", "line-width": 1.5 } },
  { id: "modern-buildings", type: "fill", source: "modern", "source-layer": "building", minzoom: 13, paint: { "fill-color": "#bbb9ae", "fill-opacity": .4 } },
  { id: "modern-road-casing", type: "line", source: "modern", "source-layer": "transportation", filter: ["!in", "class", "rail", "transit"], paint: { "line-color": "#bebbb0", "line-width": ["interpolate", ["linear"], ["zoom"], 10, .8, 16, 7] } },
  { id: "modern-roads", type: "line", source: "modern", "source-layer": "transportation", filter: ["!in", "class", "rail", "transit"], paint: { "line-color": "#fffdf5", "line-width": ["interpolate", ["linear"], ["zoom"], 10, .3, 16, 5] } },
  { id: "modern-major-roads", type: "line", source: "modern", "source-layer": "transportation", filter: ["in", "class", "motorway", "trunk", "primary"], paint: { "line-color": "#e2cda0", "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 16, 5] } },
  { id: "modern-rail", type: "line", source: "modern", "source-layer": "transportation", filter: ["in", "class", "rail"], paint: { "line-color": "#9c9a90", "line-width": 1.5, "line-dasharray": [3, 2] } },
  { id: "modern-road-labels", type: "symbol", source: "modern", "source-layer": "transportation_name", minzoom: 11, layout: { "symbol-placement": "line", "symbol-spacing": 250, "text-field": ["coalesce", ["get", "name:zh"], ["get", "name"]], "text-font": ["Noto Sans Regular"], "text-size": 11 }, paint: { "text-color": "#6f716a", "text-halo-color": "#f7f5ed", "text-halo-width": 1.5 } },
  { id: "modern-place-labels", type: "symbol", source: "modern", "source-layer": "place", minzoom: 11, layout: { "text-field": ["coalesce", ["get", "name:zh"], ["get", "name"]], "text-font": ["Noto Sans Regular"], "text-size": 12, "text-max-width": 7 }, paint: { "text-color": "#646e67", "text-halo-color": "#f7f5ed", "text-halo-width": 1.5 } },
];
