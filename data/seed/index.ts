import { fiveDynastiesSeedData } from "./five-dynasties";
import { events } from "./events/index";
import { people } from "./people/index";
import { northernQiZhouSuiDynasties } from "./northern-qi-zhou-sui-dynasties";
import { northernQiZhouSuiLocations } from "./northern-qi-zhou-sui-locations";
import { northernQiZhouSuiPersonRelations } from "./northern-qi-zhou-sui-relations";
import { northernQiZhouSuiEvents } from "./events/northern-qi-zhou-sui";
import { deepFreeze } from "@/lib/deep-freeze";
import { expansionDynasties, expansionLocations, expansionRelations, expansionEvents } from "@/data/series/expansion";
import type { EventRelation, HistoryDataSet } from "@/types/history";

const newEventRelations: EventRelation[] = [...northernQiZhouSuiEvents, ...expansionEvents].flatMap((event) => event.consequenceEventIds.map((targetEventId) => ({
  id: `${event.id}-${targetEventId}`, sourceEventId: event.id, targetEventId, type: "consequence" as const,
  description: "按核验事件组织的前后联系；不表示唯一原因。",
  sourceRefs: [...new Set([...event.sourceRefs, ...events.find((item) => item.id === targetEventId)!.sourceRefs])],
  ...(event.contentOrigin === "historical-extension"
    ? { sourceEpisodes: [] as [], contentOrigin: "historical-extension" as const }
    : { sourceEpisodes: event.sourceEpisodes ?? [], contentOrigin: "mixed" as const }),
  verificationStatus: "reviewed" as const,
})));

export const seedData: HistoryDataSet = deepFreeze({
  dynasties: [...fiveDynastiesSeedData.dynasties, ...northernQiZhouSuiDynasties, ...expansionDynasties],
  people, events,
  locations: [...fiveDynastiesSeedData.locations, ...northernQiZhouSuiLocations, ...expansionLocations],
  personRelations: [...fiveDynastiesSeedData.personRelations, ...northernQiZhouSuiPersonRelations, ...expansionRelations],
  eventRelations: [...fiveDynastiesSeedData.eventRelations, ...newEventRelations],
  dynastySuccessions: fiveDynastiesSeedData.dynastySuccessions,
  regions: fiveDynastiesSeedData.regions,
});
export const { dynasties, locations, personRelations, eventRelations, dynastySuccessions, regions } = seedData;
export { people, events, fiveDynastiesSeedData };
