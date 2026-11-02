import { findSeriesBySlug, historySeries } from "@/data/series";
import { seedData, fiveDynastiesSeedData } from "@/data/seed";
import { northernQiZhouSuiEntityIds } from "@/data/series/northern-qi-zhou-sui/entity-ids";
import { mapSnapshots } from "@/data/series/northern-qi-zhou-sui/map-snapshots";
import { readingPaths as oldPaths } from "@/data/series/five-dynasties/reading-paths";
import { readingPaths as newPaths } from "@/data/series/northern-qi-zhou-sui/reading-paths";
import { expansionContent } from "@/data/series/expansion";
import { expansionMapSnapshots } from "@/data/series/expansion/map-snapshots";
import { jinSixteenSnapshots } from "@/data/series/jin-sixteen-kingdoms/map-snapshots";
import { expansionEventIds } from "@/data/series/expansion/event-ids";
import type { Dynasty, Person, HistoricalEvent, HistoricalLocation, HistoricalRegion, PersonRelation } from "@/types/history";
import type { HistorySeriesConfig, HistoricalMapSnapshot, SeriesReadingPath } from "@/types/series";

export interface HistorySeriesRepository {
  getSeriesMapSnapshots(seriesId: string): Promise<HistoricalMapSnapshot[]>;
  getSeriesBySlug(slug: string): Promise<HistorySeriesConfig | null>;
  getSeriesDynasties(seriesId: string): Promise<Dynasty[]>;
  getSeriesPeople(seriesId: string): Promise<Person[]>;
  getSeriesEvents(seriesId: string): Promise<HistoricalEvent[]>;
  getSeriesLocations(seriesId: string): Promise<HistoricalLocation[]>;
  getSeriesRegions(seriesId: string): Promise<HistoricalRegion[]>;
  getSeriesPersonRelations(seriesId: string): Promise<PersonRelation[]>;
  getSeriesReadingPaths(seriesId: string): Promise<readonly SeriesReadingPath[]>;
}

type Selector = Record<"dynasties" | "people" | "events" | "locations" | "personRelations", readonly string[]>;
const ids = (entities: readonly { id: string }[]) => entities.map(({ id }) => id);
const selectors: Record<string, Selector> = {
  "five-dynasties": { dynasties: ids(fiveDynastiesSeedData.dynasties), people: ids(fiveDynastiesSeedData.people), events: ids(fiveDynastiesSeedData.events), locations: ids(fiveDynastiesSeedData.locations), personRelations: ids(fiveDynastiesSeedData.personRelations) },
  "northern-qi-zhou-sui": northernQiZhouSuiEntityIds,
  ...Object.fromEntries(expansionContent.map(content => [content.config.id, {
    dynasties: [...ids(content.dynasties), ...content.shared?.dynasties ?? []],
    people: [...ids(content.people), ...content.shared?.people ?? []],
    events: [...ids(content.events), ...content.shared?.events ?? []],
    locations: [...ids(content.locations), ...content.shared?.locations ?? []],
    personRelations: [...ids(content.relations), ...content.shared?.personRelations ?? []],
  }])),
};
const paths: Record<string, readonly SeriesReadingPath[]> = { "five-dynasties": oldPaths, "northern-qi-zhou-sui": newPaths, ...Object.fromEntries(expansionContent.map(content => [content.config.id, content.readingPaths])) };
function select<T extends { id: string }>(seriesId: string, key: keyof Selector, entities: T[]) {
  const selectedIds = new Set(selectors[seriesId]?.[key] ?? []);
  return entities.filter(({ id }) => selectedIds.has(id));
}

export async function getSeriesBySlug(slug: string) { return findSeriesBySlug(slug); }
export function getEventSeries(eventId: string, preferredSlug?: string) {
  const preferred = preferredSlug ? findSeriesBySlug(preferredSlug) : null;
  if (preferred && selectors[preferred.id]?.events.includes(eventId)) return preferred;
  const owner = historySeries.find(series => expansionEventIds[series.id]?.includes(eventId));
  if (owner) return owner;
  return historySeries.find((series) => selectors[series.id]?.events.includes(eventId)) ?? null;
}
const repository: HistorySeriesRepository = {
  async getSeriesMapSnapshots(id) {
    const own = [...mapSnapshots, ...expansionMapSnapshots, ...jinSixteenSnapshots].filter(snapshot => snapshot.seriesId === id);
    const sharedPeriods: Record<string, readonly [number, number]> = {
      "western-jin": [265, 316], "eastern-jin": [317, 420],
      "northern-wei": [386, 534], "southern-dynasties": [420, 589],
    };
    const period = sharedPeriods[id];
    if (!period) return own;
    // Route identity belongs to the topic; the dated geography and evidence are shared.
    const shared = jinSixteenSnapshots.filter(snapshot => snapshot.year >= period[0] && snapshot.year <= period[1] && !own.some(item => item.year === snapshot.year))
      .map(snapshot => ({ ...snapshot, id: snapshot.id.replace("jin-sixteen-kingdoms", id), seriesId: id }));
    return [...own, ...shared].sort((a, b) => a.year - b.year);
  },
  getSeriesBySlug,
  async getSeriesDynasties(id) { return select(id, "dynasties", seedData.dynasties); },
  async getSeriesPeople(id) { return select(id, "people", seedData.people); },
  async getSeriesEvents(id) { return select(id, "events", seedData.events); },
  async getSeriesLocations(id) { return select(id, "locations", seedData.locations); },
  async getSeriesRegions(id) {
    const dynastyIds = new Set(selectors[id]?.dynasties ?? []);
    return seedData.regions.filter((region) => dynastyIds.has(region.dynastyId));
  },
  async getSeriesPersonRelations(id) { return select(id, "personRelations", seedData.personRelations); },
  async getSeriesReadingPaths(id) { return paths[id] ?? []; },
};
export function getSeriesRepository() { return repository; }
