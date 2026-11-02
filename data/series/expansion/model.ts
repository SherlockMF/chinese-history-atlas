import type { Dynasty, HistoricalEvent, HistoricalLocation, Person, PersonRelation, SourcedEntity } from "@/types/history";
import type { HistorySeriesConfig, SeriesReadingPath, SourceEpisodeRef } from "@/types/series";

export type SeriesContent = {
  config: HistorySeriesConfig;
  introduction: string;
  dynasties: Dynasty[];
  people: Person[];
  events: HistoricalEvent[];
  locations: HistoricalLocation[];
  relations: PersonRelation[];
  readingPaths: SeriesReadingPath[];
  shared?: { dynasties?: string[]; people?: string[]; events?: string[]; locations?: string[]; personRelations?: string[] };
};

export function source(series: string, episode: string, title: string, locator: string, ...refs: string[]): SourcedEntity {
  const sourceEpisodes: SourceEpisodeRef[] = [{ sourceSeriesId: series, episodeId: episode, title, locator }];
  return { contentOrigin: "mixed", verificationStatus: "reviewed", sourceEpisodes, sourceRefs: refs };
}

export function book(title: string, chapter: string, note: string) {
  const width = title === "元史" ? 3 : title === "梁書" ? 2 : 0;
  const page = width ? chapter.replace(/^卷(\d+)$/, (_, number: string) => `卷${number.padStart(width, "0")}`) : chapter;
  return `《${title}》${chapter} · ${note} — https://zh.wikisource.org/wiki/${title}/${page}`;
}

export function polity(id: string, name: string, startYear: number, endYear: number, capital: string, color: string, summary: string, evidence: SourcedEntity): Dynasty {
  return { id, name, shortName: name, startYear, endYear, capital, color, summary, displayRole: "core", predecessorIds: [], successorIds: [], rulerPeriods: [], ...evidence };
}

export function person(id: string, name: string, dynastyIds: string[], roles: string[], roleCategories: Person["roleCategories"], summary: string, evidence: SourcedEntity, birthYear?: number, deathYear?: number): Person {
  return { id, name, dynastyIds, roles, roleCategories, summary, biography: summary, ...evidence, ...(birthYear === undefined ? {} : { birthYear }), ...(deathYear === undefined ? {} : { deathYear }) };
}

export function place(id: string, name: string, longitude: number, latitude: number, modernReference: string, evidence: SourcedEntity): HistoricalLocation {
  return { id, name, longitude, latitude, modernReference: `${modernReference}；坐标为区域参照，不是遗址测绘定位。`, ...evidence, verificationStatus: "illustrative" };
}

type EventInput = Pick<HistoricalEvent, "id" | "title" | "startYear" | "eventType" | "tracks" | "personIds" | "dynastyIds" | "locationIds" | "summary" | "background" | "process" | "result" | "impact"> & Partial<Pick<HistoricalEvent, "endYear" | "disputedNote" | "causeEventIds" | "consequenceEventIds">>;
export function event(input: EventInput, evidence: SourcedEntity): HistoricalEvent {
  return { causeEventIds: [], consequenceEventIds: [], ...input, ...evidence };
}

export function relation(sourcePersonId: string, targetPersonId: string, type: PersonRelation["type"], description: string, evidence: SourcedEntity): PersonRelation {
  return { id: `${sourcePersonId}-${targetPersonId}-${type}`, sourcePersonId, targetPersonId, type, description: type === "family" ? description : `${description}本条关系起止年份未详。`, ...evidence };
}
