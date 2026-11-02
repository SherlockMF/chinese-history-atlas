import { northernQiZhouSuiEntityIds } from "./northern-qi-zhou-sui/entity-ids";
import { fiveDynastiesConfig } from "./five-dynasties/config";
import { northernQiZhouSuiConfig } from "./northern-qi-zhou-sui/config";
import { expansionConfigs } from "./expansion/configs";
import { expansionEventIds } from "./expansion/event-ids";
import { easternJinSharedEventIds, jinSixteenSharedEventIds, westernJinSharedEventIds } from "./jin-sixteen-kingdoms/config";

export const historySeries = [fiveDynastiesConfig, northernQiZhouSuiConfig, ...expansionConfigs] as const;

export function findSeriesBySlug(slug: string) {
  return historySeries.find((series) => series.slug === slug) ?? null;
}

const sharedEventIds: Record<string, readonly string[]> = {
  "jin-sixteen-kingdoms": jinSixteenSharedEventIds,
  "western-jin": westernJinSharedEventIds,
  "eastern-jin": easternJinSharedEventIds,
  "northern-wei": ["wei-split-eastern-wei"],
  jin: ["liao-tianzuo-captured"],
  liao: ["abaoyi-khagan", "liao-founded", "liao-destroys-balhae"],
  "southern-dynasties": ["sui-conquers-chen"],
};

export function getRouteSeries(pathname: string, preferredSlug?: string | null) {
  const eventId = /^\/explore\/([^/]+)(?:\/|$)/.exec(pathname)?.[1];
  const preferred = preferredSlug ? findSeriesBySlug(preferredSlug) : null;
  if (eventId && preferred && (
    expansionEventIds[preferred.id]?.includes(eventId) || sharedEventIds[preferred.id]?.includes(eventId) ||
    (preferred.id === northernQiZhouSuiConfig.id && (northernQiZhouSuiEntityIds.events as readonly string[]).includes(eventId))
  )) return preferred;
  if (eventId && (northernQiZhouSuiEntityIds.events as readonly string[]).includes(eventId)) return northernQiZhouSuiConfig;
  if (eventId) {
    const series = expansionConfigs.find(item => expansionEventIds[item.id]?.includes(eventId));
    if (series) return series;
  }
  const slug = /^\/series\/([^/]+)(?:\/|$)/.exec(pathname)?.[1];
  return (slug ? findSeriesBySlug(slug) : null) ?? fiveDynastiesConfig;
}
