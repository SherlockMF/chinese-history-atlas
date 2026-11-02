import type { MultiLineString, MultiPolygon, Polygon } from "geojson";

export type SnapshotAccuracy = "illustrative" | "approximate" | "reconstructed";
/** Independent of annual HistoricalRegion; coordinates are longitude/latitude. */
export type SnapshotRegion = {
  polityId: string;
  /** Map-only neighbors need not be part of a series' narrative dynasty list. */
  name?: string;
  color?: string;
  boundaryKind?: "controlled" | "influence";
  /** Peripheral context: retain evidence geometry, render only its location name. */
  displayMode?: "label-only";
  geometry: Polygon | MultiPolygon;
  /** Display-only fade at an open source extent; does not extend territory. */
  fillBands?: { geometry: Polygon | MultiPolygon; opacity: number }[];
  /** Text placement only, not a capital or surveyed location. */
  labelPoint: [number, number];
  accuracyLevel: SnapshotAccuracy;
  note: string;
};
export type SnapshotMapSource = {
  title: string;
  url?: string;
  fileLabel?: string;
  referenceYear?: number;
  /** Period-wide evidence must not be presented as an exact-year atlas plate. */
  note?: string;
  redistributable?: boolean;
};

export type HistoricalMapSnapshot = {
  id: string;
  seriesId: string;
  year: number;
  label: string;
  note: string;
  accuracyNote: string;
  scopeNote: string;
  /** Visible on the map when a source covers only part of a region. */
  coverageNote?: string;
  accuracyLevel: SnapshotAccuracy;
  sources: SnapshotMapSource[];
  capitals?: { name: string; coordinate: [number, number] }[];
  /** Source labels without a defensible enclosing frontier; not capital points. */
  contextPlaces?: { id: string; name: string; coordinate: [number, number]; note: string }[];
  outlines?: Record<string, MultiLineString>;
  /** Supplemental perimeters, separate from traced same-year boundaries. */
  reconstructedOutlines?: Record<string, MultiLineString>;
} & ({ status: "ready"; regions: [SnapshotRegion, ...SnapshotRegion[]] } | { status: "pending"; regions: [] });

export type NarrativeTrackConfig = {
  id: string;
  label: string;
  description: string;
};

export type HistorySeriesConfig = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  featuredPersonId?: string;
  featuredEventId?: string;
  relatedSiteIds?: readonly string[];
  polityGroups?: readonly SeriesPolityGroup[];
  timelineMinYear: number;
  timelineMaxYear: number;
  mapMinYear?: number;
  mapMaxYear?: number;
  defaultYear: number;
  mapMode: "annual" | "snapshot" | "locations";
  cityOverlayId?: "jin" | "daxing";
  trackIds: readonly string[];
  tracks: readonly NarrativeTrackConfig[];
  prehistory?: { trackId: string; endYear: number; label: string; mainLabel: string };
};

/** Series-specific groups such as Five Dynasties / Ten Kingdoms. */
export type SeriesPolityGroup = {
  id: string;
  label: string;
  dynastyIds: readonly string[];
};

export type SourceEpisodeRef = {
  sourceSeriesId: string;
  episodeId: string;
  title?: string;
  locator?: string;
};

export type SeriesReadingPath = {
  id: string;
  title: string;
  period: string;
  description: string;
  eventIds: readonly string[];
};
