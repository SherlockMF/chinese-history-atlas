import { liJingxunSite } from "./li-jingxun/config";
import type { HistoryEntityRef, HistorySiteConfig } from "@/types/site";

export const historySites: readonly HistorySiteConfig[] = [liJingxunSite,
  { id: "xu-xianxiu", archiveSlug: "xu-xianxiu", status: "planned", title: "徐显秀墓", description: "北齐的历史现场：从太原壁画墓继续认识北朝社会。", relatedPersonIds: [], relatedEventIds: ["northern-qi-founded", "northern-qi-falls"], relatedLocationIds: ["taiyuan"] },
  { id: "sima-jinlong", archiveSlug: "sima-jinlong", status: "planned", title: "司马金龙墓", description: "北魏平城的历史现场：漆屏风与墓葬材料连接北方社会和文化交流。", relatedPersonIds: [], relatedEventIds: ["wei-capital-pingcheng", "wei-moves-luoyang"], relatedLocationIds: ["pingcheng"] },
  { id: "yelu-yuzhi", archiveSlug: "yelu-yuzhi", status: "planned", title: "耶律羽之墓", description: "辽初的历史现场：从契丹贵族墓葬回看建国与区域往来。", relatedPersonIds: [], relatedEventIds: ["liao-founded", "liao-destroys-balhae"], relatedLocationIds: [] },
  { id: "fangshan-jinling", archiveSlug: "fangshan-jinling", status: "planned", title: "房山金陵", description: "金中都时代的历史现场：迁都之后，皇陵与王朝记忆也来到北京。", relatedPersonIds: ["wanyan-liang"], relatedEventIds: ["jin-moves-zhongdu"], relatedLocationIds: [] },
];

export function getSiteById(id: string) {
  return historySites.find(site => site.id === id) ?? null;
}

export function getSitesByIds(ids: readonly string[] = []) {
  return ids.map(id => {
    const site = getSiteById(id);
    if (!site) throw new Error(`Unknown history site: ${id}`);
    return site;
  });
}

export function getSitesForEntity(entity: HistoryEntityRef) {
  const key = { person: "relatedPersonIds", event: "relatedEventIds", location: "relatedLocationIds" } as const;
  return historySites.filter(site => site[key[entity.type]].includes(entity.id));
}

export function getArchiveHref(site: HistorySiteConfig) {
  return site.status === "planned" ? null : `/archive/${site.archiveSlug}`;
}
