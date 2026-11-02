import type { MultiLineString, MultiPolygon, Polygon } from "geojson";
import geometry from "./expansion/geometry.json";
import labels from "./expansion/label-points.json";
import outlines from "./expansion/outlines.json";
import northernGeometry from "./northern-qi-zhou-sui/geometry.json";
import northernLabels from "./northern-qi-zhou-sui/label-points.json";
import northernOutlines from "./northern-qi-zhou-sui/outlines.json";
import context from "./context/atlas-context.json";
import { northernQiZhouSuiDynasties } from "@/data/seed/northern-qi-zhou-sui-dynasties";
import type { HistoricalMapSnapshot, SnapshotMapSource, SnapshotRegion } from "@/types/series";

type Plate = {
  regions: SnapshotRegion[];
  places: NonNullable<HistoricalMapSnapshot["contextPlaces"]>;
  outlines: Record<string, MultiLineString>;
  supplementSources?: SnapshotMapSource[];
  supplementNote?: string;
};
const coreGeometry = { ...northernGeometry, ...geometry } as Record<string, Record<string, Polygon | MultiPolygon>>;
const coreLabels = { ...northernLabels, ...labels } as unknown as Record<string, Record<string, [number, number]>>;
const coreOutlines = { ...northernOutlines, ...outlines } as Record<string, Record<string, MultiLineString>>;
const neighbors = context as unknown as Record<string, Plate>;
// These composite background groups are not closed political territories.
const contextLabelIds = new Set([
  "rouran-northern-peoples", "western-states", "tuyuhun-plateau-peoples",
  "northeastern-peoples", "plateau-peoples", "turks-northern-western-peoples",
  "khitan-kumoxi", "wuji", "eastern-turks-northern-peoples", "western-turks-western-states",
  "shiwei", "mohe", "xi-tribe-northeast", "khitan", "xi-kumo", "southwestern-peoples",
  "tibetan-peoples", "yellow-head-uighurs", "kirghiz-northern-peoples", "mongolian-peoples",
]);
const datedCapitals: Record<number, NonNullable<HistoricalMapSnapshot["capitals"]>> = {
  449: [{ name: "平城", coordinate: [113.3, 40.1] }, { name: "建康", coordinate: [118.8, 32.06] }],
  497: [{ name: "洛阳", coordinate: [112.45, 34.62] }, { name: "建康", coordinate: [118.8, 32.06] }],
  546: [{ name: "邺", coordinate: [114.4, 36.3] }, { name: "长安", coordinate: [108.94, 34.26] }, { name: "建康", coordinate: [118.8, 32.06] }],
  572: [{ name: "邺", coordinate: [114.4, 36.3] }, { name: "长安", coordinate: [108.94, 34.26] }, { name: "建康", coordinate: [118.8, 32.06] }, { name: "江陵", coordinate: [112.2, 30.35] }],
  612: [{ name: "大兴", coordinate: [108.94, 34.26] }, { name: "东都洛阳", coordinate: [112.45, 34.62] }],
  1111: [{ name: "上京临潢府", coordinate: [119.38, 43.98] }, { name: "兴庆府", coordinate: [106.27, 38.47] }, { name: "羊苴咩城", coordinate: [100.16, 25.7] }, { name: "东京开封府", coordinate: [114.3, 34.8] }],
  1142: [{ name: "上京会宁府", coordinate: [126.98, 45.54] }, { name: "虎思斡耳朵", coordinate: [75.3, 42.8] }, { name: "兴庆府", coordinate: [106.27, 38.47] }, { name: "羊苴咩城", coordinate: [100.16, 25.7] }, { name: "临安府", coordinate: [120.15, 30.28] }],
  1208: [{ name: "中都大兴府", coordinate: [116.35, 39.88] }, { name: "虎思斡耳朵", coordinate: [75.3, 42.8] }, { name: "中兴府", coordinate: [106.27, 38.47] }, { name: "羊苴咩城", coordinate: [100.16, 25.7] }, { name: "临安府", coordinate: [120.15, 30.28] }],
};
const catalog: Record<string, { name: string; color: string; note: string }> = {
  ...Object.fromEntries(northernQiZhouSuiDynasties.map((d) => [d.id, { name: d.name, color: d.color, note: "依据本年图集概括重绘；相邻专题共享同一原年疆域，不能移用于其他年份。" }])),
  "northern-wei": { name: "北魏", color: "#816c53", note: "采用本年北魏疆域。449年都平城；497年已经迁都洛阳，两年的南界不同。" },
  "liu-song": { name: "刘宋", color: "#7c8460", note: "449年刘宋仍据有山东部分地区；尚未发生450年北伐及此后北魏南下。" },
  "southern-qi": { name: "南齐", color: "#9c725b", note: "497年南齐与北魏对峙；这里是萧氏南齐，不是550年建立的北齐。" },
  liao: { name: "辽", color: "#495a62", note: "1111年辽朝格局。北部属部的统属关系不同于州县直接治理，不将整片着色理解为均质行政控制。" },
  jin: { name: "金", color: "#a88345", note: "本年金朝疆域；1142年仍都上京，1208年已在中都时代。两年北界不同。" },
  "western-xia": { name: "西夏", color: "#b18a45", note: "本年图集所示河套与河西格局；边缘属部统属按原图概括，不以现代省界替代。" },
  "western-liao": { name: "西辽", color: "#677b70", note: "本年西辽及其属国、属部范围；不表示全部地区由虎思斡耳朵直接管理。" },
  "dali-kingdom": { name: "大理国", color: "#537a78", note: "采用本年大理疆域及外围属部，1111、1142、1208年分别依据各年图页，不挪用南诏范围。" },
  nanzhao: { name: "南诏", color: "#6f8468", note: "879年南诏分图所示范围，外围节度、属部与都城周边的治理程度有别。" },
};

export const fullAtlasScope = "展示同一年原图上的主体与有据周边政权；外围诸部仅标大致位置名称，不填色或补画闭合国界，留白不表示无人统治。保留主体一侧有依据的接界，但不能理解为实测国界。海岸与湖泊作自然地理定位。";

/** Preserve the topical selection, while every series shows the same dated plate. */
export function withFullAtlas(snapshot: HistoricalMapSnapshot): HistoricalMapSnapshot {
  if (snapshot.status !== "ready") return snapshot;
  const year = String(snapshot.year);
  const plate = neighbors[year];
  if (!plate) return snapshot;
  const scope = fullAtlasScope + (plate.supplementNote ? " 西部图幅外名称的位置另参考通期资料，不据此绘制疆域。" : "");
  const selectedIds = new Set(snapshot.regions.map((r) => r.polityId));
  const otherCore: SnapshotRegion[] = Object.entries(coreGeometry[year]).filter(([id]) => !selectedIds.has(id)).map(([polityId, shape]) => ({
    polityId, geometry: shape, labelPoint: coreLabels[year][polityId], accuracyLevel: "approximate", ...catalog[polityId],
  }));
  return {
    ...snapshot,
    regions: [
      ...snapshot.regions.map((r) => ({ ...catalog[r.polityId], ...r })),
      ...otherCore, ...plate.regions.filter((r) => !selectedIds.has(r.polityId)).map((r) => ({
        ...r, displayMode: contextLabelIds.has(r.polityId) ? "label-only" as const : r.displayMode,
      })),
    ] as [SnapshotRegion, ...SnapshotRegion[]],
    contextPlaces: plate.places,
    capitals: [...new Map([...(snapshot.capitals ?? []), ...(datedCapitals[snapshot.year] ?? [])].map((capital) => [capital.name, capital])).values()],
    outlines: { ...coreOutlines[year], ...plate.outlines },
    sources: [...snapshot.sources, ...(plate.supplementSources ?? [])],
    scopeNote: snapshot.year === 879 ? "采用879年南诏区域图的完整轮廓，保留图内周边名称；这不是唐代全国全图。东缘已按原图外界重描，外围属部不表示均质的直接管辖。" : scope,
  };
}
