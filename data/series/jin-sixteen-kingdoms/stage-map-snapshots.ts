import type { MultiLineString, MultiPolygon, Polygon } from "geojson";
import scenes from "@/data/maps/jin-sixteen-kingdoms/stage-maps.json";
import type { HistoricalMapSnapshot, SnapshotMapSource, SnapshotRegion } from "@/types/series";
import { jinContextPolityIds } from "./context-display";

/** Full stage reconstructions retain their dated, refreshable snapshot IDs. */
export const jinStageSnapshots: HistoricalMapSnapshot[] = scenes.map(scene => {
  const outlines: Record<string, MultiLineString> = {};
  const reconstructedOutlines: Record<string, MultiLineString> = {};
  const regions = scene.regions.map((region): SnapshotRegion => {
    outlines[region.polityId] = { type: "MultiLineString", coordinates: [] };
    reconstructedOutlines[region.polityId] = region.outline as MultiLineString;
    return {
      polityId: region.polityId, name: region.name, color: region.color, note: region.note,
      geometry: region.geometry as Polygon | MultiPolygon,
      labelPoint: region.labelPoint as [number, number], accuracyLevel: "reconstructed",
      boundaryKind: region.boundaryKind as SnapshotRegion["boundaryKind"],
      displayMode: jinContextPolityIds.has(region.polityId) ? "label-only" : undefined,
      fillBands: region.fillBands as SnapshotRegion["fillBands"],
    };
  }) as [SnapshotRegion, ...SnapshotRegion[]];
  return {
    id: `jin-sixteen-kingdoms-${scene.year}`, seriesId: "jin-sixteen-kingdoms", year: scene.year,
    label: scene.label, note: scene.note, scopeNote: `${scene.scopeNote} 外围背景仅标大致位置名称，不填色或补画闭合国界；留白不表示无人统治。`, accuracyNote: scene.accuracyNote,
    coverageNote: "完整阶段格局示意 · 疏点线为推定接界；外围诸部只标名称，不表示疆界。",
    status: "ready", accuracyLevel: "reconstructed", regions, outlines, reconstructedOutlines,
    sources: (scene.sources as SnapshotMapSource[]).map(source => ({ ...source, redistributable: false })),
    capitals: scene.capitals.map(capital => ({ name: capital.name, coordinate: capital.coordinate as [number, number] })),
    contextPlaces: scene.contextPlaces.map(place => ({ ...place, coordinate: place.coordinate as [number, number] })),
  };
});
