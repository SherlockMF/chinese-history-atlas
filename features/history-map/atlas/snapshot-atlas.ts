import type { MultiLineString } from "geojson";
import boundaries from "@/data/maps/northern-qi-zhou-sui/boundaries.json";
import outlines from "@/data/maps/northern-qi-zhou-sui/outlines.json";
import type { Dynasty } from "@/types/history";
import type { HistoricalMapSnapshot } from "@/types/series";
import type { AtlasDataset } from "./atlas-types";

const capitals: Record<number, { name: string; coordinate: [number, number] }[]> = {
  546: [{ name: "邺", coordinate: [114.4, 36.3] }, { name: "长安", coordinate: [108.94, 34.26] }, { name: "建康", coordinate: [118.8, 32.06] }],
  572: [{ name: "邺", coordinate: [114.4, 36.3] }, { name: "长安", coordinate: [108.94, 34.26] }, { name: "建康", coordinate: [118.8, 32.06] }, { name: "江陵", coordinate: [112.2, 30.35] }],
  612: [{ name: "大兴", coordinate: [108.94, 34.26] }, { name: "东都洛阳", coordinate: [112.45, 34.62] }],
};

export function createSnapshotAtlas(snapshot: HistoricalMapSnapshot, dynasties: readonly Dynasty[]): AtlasDataset {
  const sources = snapshot.sources.map((source, index) => ({
    id: `${snapshot.id}-source-${index}`,
    title: source.title,
    reference: source.url ?? `local-only:${source.fileLabel}`,
    role: "georeference" as const,
    license: "本地图集仅用于参考；扫描影像不分发。",
    redistributable: source.redistributable ?? false,
    note: source.note ?? `${source.referenceYear ?? snapshot.year}年图页；${snapshot.accuracyNote}`,
  }));
  const sourceRefs = sources.map((source) => source.id);
  const year = String(snapshot.year) as keyof typeof boundaries;
  const hasAtlasLines = snapshot.seriesId === "northern-qi-zhou-sui" && year in boundaries;
  const territories = snapshot.regions.filter(region => region.displayMode !== "label-only");
  const contextRegions = snapshot.regions.filter(region => region.displayMode === "label-only");
  const contextIds = new Set(contextRegions.map(region => region.polityId));
  const atlas: AtlasDataset = {
    realms: { type: "FeatureCollection", features: territories.map((region) => {
      const dynasty = dynasties.find((item) => item.id === region.polityId);
      return {
        type: "Feature", geometry: region.geometry,
        properties: {
          id: `${snapshot.id}-${region.polityId}`, dynastyId: region.polityId,
          name: region.name ?? dynasty?.shortName ?? region.polityId, color: region.color ?? dynasty?.color,
          snapshotId: snapshot.id, validFromYear: snapshot.year, validToYearExclusive: snapshot.year + 1,
          boundaryKind: region.boundaryKind ?? "controlled", accuracyLevel: region.accuracyLevel, verificationStatus: "reviewed",
          sourceRefs, disputedNote: region.note,
          labelLongitude: region.labelPoint[0], labelLatitude: region.labelPoint[1],
        },
      };
    }) },
    disputed: { type: "FeatureCollection", features: [] },
    places: { type: "FeatureCollection", features: [...(snapshot.capitals ?? (snapshot.seriesId === "northern-qi-zhou-sui" ? capitals[snapshot.year] ?? [] : [])).map((capital, index) => ({
      type: "Feature" as const, geometry: { type: "Point" as const, coordinates: capital.coordinate },
      properties: { id: `${snapshot.id}-capital-${index}`, name: capital.name, placeKind: "capital" as const, sourceRefs },
    })), ...contextRegions.map(region => ({
      type: "Feature" as const, geometry: { type: "Point" as const, coordinates: region.labelPoint },
      properties: { id: `${snapshot.id}-context-${region.polityId}`, name: region.name ?? region.polityId, placeKind: "landmark" as const, sourceRefs },
    })), ...(snapshot.contextPlaces ?? []).map((place) => ({
      type: "Feature" as const, geometry: { type: "Point" as const, coordinates: place.coordinate },
      properties: { id: `${snapshot.id}-context-${place.id}`, name: place.name, placeKind: "landmark" as const, sourceRefs },
    }))] },
    boundaries: snapshot.outlines ? { type: "FeatureCollection", features: Object.entries(snapshot.outlines).filter(([id]) => !contextIds.has(id)).map(([id, geometry]) => ({ type: "Feature", geometry, properties: { id: `${snapshot.id}-${id}-boundaries`, accuracyLevel: snapshot.accuracyLevel, sourceRefs } })) } : hasAtlasLines ? { type: "FeatureCollection", features: [{ type: "Feature", geometry: boundaries[year] as MultiLineString, properties: { id: `${snapshot.id}-boundaries`, accuracyLevel: snapshot.accuracyLevel, sourceRefs } }] } : undefined,
    outlines: snapshot.outlines || hasAtlasLines ? { type: "FeatureCollection", features: territories.map((region) => ({
      type: "Feature", geometry: (snapshot.outlines ?? outlines[year] as Record<string, MultiLineString>)[region.polityId],
      properties: { id: `${snapshot.id}-${region.polityId}`, dynastyId: region.polityId, accuracyLevel: region.accuracyLevel, sourceRefs },
    })) } : undefined,
    sources, warnings: [],
  };
  if (snapshot.reconstructedOutlines && atlas.boundaries) {
    atlas.boundaries.features.push(...Object.entries(snapshot.reconstructedOutlines).filter(([id]) => !contextIds.has(id)).map(([id, geometry]) => ({
      type: "Feature" as const, geometry,
      properties: { id: `${snapshot.id}-${id}-supplement`, accuracyLevel: "illustrative" as const, sourceRefs, supplement: true },
    })));
    for (const feature of atlas.outlines?.features ?? []) {
      const supplement = snapshot.reconstructedOutlines[feature.properties.dynastyId ?? ""];
      if (supplement) {
        const lines = feature.geometry.type === "MultiLineString" ? feature.geometry.coordinates : [feature.geometry.coordinates];
        feature.geometry = { type: "MultiLineString", coordinates: [...lines, ...supplement.coordinates] };
      }
    }
  }
  if (territories.some(region => region.fillBands?.length)) {
    atlas.realmFills = { type: "FeatureCollection", features: atlas.realms.features.flatMap((feature, index) => {
      const bands = territories[index].fillBands;
      return bands?.length ? bands.map(band => ({ ...feature, geometry: band.geometry, properties: { ...feature.properties, coverageOpacity: band.opacity } })) : [feature];
    }) };
  }
  return atlas;
}
