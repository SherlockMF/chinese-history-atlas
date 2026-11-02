import type { MultiLineString, MultiPolygon, Polygon } from "geojson";
import geometry from "@/data/maps/jin-sixteen-kingdoms/geometry.json";
import labels from "@/data/maps/jin-sixteen-kingdoms/label-points.json";
import outlines from "@/data/maps/jin-sixteen-kingdoms/outlines.json";
import metadata from "@/data/maps/jin-sixteen-kingdoms/metadata.json";
import fillBands from "@/data/maps/jin-sixteen-kingdoms/fill-bands.json";
import reconstructedOutlines from "@/data/maps/jin-sixteen-kingdoms/reconstructed-outlines.json";
import completion from "@/gis/jin-sixteen-kingdoms/completion-traces.json";
import { expansionMapSnapshots } from "@/data/series/expansion/map-snapshots";
import type { HistoricalMapSnapshot, SnapshotRegion } from "@/types/series";
import { jinKeyYearSnapshots } from "./key-year-snapshots";
import { jinContextPolityIds } from "./context-display";

const titles: Record<number, string> = {
  281: "灭吴次年：西晋统一后的格局", 327: "二赵争衡，东晋与成并立", 366: "前秦、前燕、前凉与东晋", 382: "淝水前夕：前秦与东晋", 395: "前秦瓦解后：诸国竞争与北魏兴起", 409: "河西诸凉、南北诸燕与秦魏夏",
};
const precision = "按《中国历史地图集》原年图页的经纬网独立配准、概括重绘，接触线共享。配准残差不等于历史疆界精度；不表示州县界、实测国界或逐日控制。";
const scope = "同年中原分界依据原图；327、366、395、409年的南方与缺口另据史料补绘。短虚线为原图概括分界，疏点线为补绘边缘；外围诸部只标大致位置，不填色或补画闭合国界，留白不表示无人统治。海岸与湖泊仅作定位。";

type Metadata = {
  fileLabel: string; note: string;
  regions: Record<string, { name: string; color: string; note: string; boundaryKind: "controlled" | "influence" }>;
  capitals: NonNullable<HistoricalMapSnapshot["capitals"]>;
  contextPlaces: NonNullable<HistoricalMapSnapshot["contextPlaces"]>;
};

const plates = Object.keys(geometry).map((yearKey): HistoricalMapSnapshot => {
  const year = Number(yearKey), key = yearKey as keyof typeof geometry;
  const data = metadata[key] as unknown as Metadata;
  const points = labels[key] as Record<string, number[]>;
  const bands = fillBands[key] as Record<string, NonNullable<SnapshotRegion["fillBands"]>>;
  // These source groups include northern peoples, not an independently bounded Dai/Wei realm.
  const mixedNorthernId = year === 366 ? "dai" : year === 395 ? "northern-wei" : undefined;
  const regions = Object.entries(geometry[key]).map(([polityId, shape]): SnapshotRegion => ({
    polityId, ...data.regions[polityId], geometry: shape as Polygon | MultiPolygon,
    displayMode: jinContextPolityIds.has(polityId) || polityId === mixedNorthernId ? "label-only" : undefined,
    fillBands: bands[polityId],
    labelPoint: [points[polityId][0], points[polityId][1]], accuracyLevel: "approximate",
  })) as [SnapshotRegion, ...SnapshotRegion[]];
  return {
    id: `jin-sixteen-kingdoms-${year}`, seriesId: "jin-sixteen-kingdoms", year,
    label: titles[year], note: data.note, accuracyNote: precision, scopeNote: scope,
    coverageNote: [327, 366, 395, 409].includes(year) ? "完整格局示意 · 短虚线：原图分界；疏点线：史料补绘。外围诸部只标名称。" : undefined,
    status: "ready", accuracyLevel: "approximate", regions,
    sources: [{ title: `《中国历史地图集》${year === 281 ? "第三册" : "第四册"} · ${data.fileLabel.replace(/\.jpg$/, "")}（${year}年）`, fileLabel: data.fileLabel, referenceYear: year, redistributable: false, note: data.note }, ...([327, 366, 395, 409].includes(year) ? completion.sources : [])],
    capitals: data.capitals, contextPlaces: data.contextPlaces,
    outlines: outlines[key] as Record<string, MultiLineString>,
    reconstructedOutlines: reconstructedOutlines[key] as Record<string, MultiLineString>,
  };
});

const epilogue = expansionMapSnapshots.find(snapshot => snapshot.seriesId === "northern-wei" && snapshot.year === 449)!;

/** 449 is an explicitly dated epilogue, never a replacement for 439 borders. */
export const jinSixteenSnapshots: HistoricalMapSnapshot[] = [
  ...[...plates, ...jinKeyYearSnapshots].sort((a, b) => a.year - b.year),
  { ...epilogue, id: "jin-sixteen-kingdoms-449", seriesId: "jin-sixteen-kingdoms", label: "尾声 · 449 年宋魏格局", note: "尾声采用449年宋魏全图，与北魏、南朝专题共享同一资料。距439年北魏统一北方已十年，不用本图冒充439年疆域。" },
];
