import type { MultiPolygon, Polygon } from "geojson";
import geometry from "@/data/maps/northern-qi-zhou-sui/geometry.json";
import labels from "@/data/maps/northern-qi-zhou-sui/label-points.json";
import type { HistoricalMapSnapshot, SnapshotMapSource, SnapshotRegion } from "@/types/series";
import { fullAtlasScope, withFullAtlas } from "@/data/maps/full-atlas";

export const snapshotMapScope = fullAtlasScope;
const precision = "按《中国历史地图集》同年图页的经纬网配准、概括重绘，共享接触线；保留主要转折，不表示精确测绘、州县界或逐年实际控制。";

function atlasSource(fileLabel: string, referenceYear: number, volume: string): SnapshotMapSource {
  return { title: `《中国历史地图集》${volume} · ${fileLabel.replace(/\.jpg$/, "")}（${referenceYear}年）`, fileLabel, referenceYear, redistributable: false };
}
function region(year: keyof typeof geometry, polityId: string, note: string): SnapshotRegion {
  const point = (labels[year] as Record<string, number[]>)[polityId];
  return {
    polityId,
    geometry: (geometry[year] as Record<string, Polygon | MultiPolygon>)[polityId],
    labelPoint: [point[0], point[1]],
    note,
    accuracyLevel: "approximate",
  };
}
function ready(year: number, label: string, note: string, regions: [SnapshotRegion, ...SnapshotRegion[]], sources: SnapshotMapSource[]): HistoricalMapSnapshot {
  return { id: `northern-qi-zhou-sui-${year}`, seriesId: "northern-qi-zhou-sui", year, label, note, accuracyNote: precision, scopeNote: snapshotMapScope, accuracyLevel: "approximate", status: "ready", regions, sources };
}

export const mapSnapshots: HistoricalMapSnapshot[] = [
  ready(546, "两魏分立，南梁据有江南与巴蜀", "梁中大同元年、东魏武定四年、西魏大统十二年。此时北齐、北周尚未建立，地图保留东魏、西魏与梁的原年格局。", [
    region("546", "eastern-wei", "东魏以邺为都，据有河北、山东及中原东部；不能提前标作北齐。"),
    region("546", "western-wei", "西魏以长安为都，西连河西；本年巴蜀仍属梁，不能套用北周时期版图。"),
    region("546", "southern-liang", "梁都建康，疆域延及巴蜀、岭南与交州一带；按546年图表达，未将侯景之乱后的分裂倒填到本年。"),
  ], [atlasSource("04-21梁、东魏、西魏时期全图.jpg", 546, "第四册")]),
  ready(572, "陈、齐、周并立，江陵后梁依附北周", "陈太建四年、齐武平三年、周建德元年。北周据关陇与巴蜀，北齐据河北、山东和江淮部分地区，南陈据江南；尚未发生577年北周灭齐。", [
    region("572", "northern-qi", "北齐以邺为都，西与北周相接，南与陈对峙；采用572年全图及北齐分图核对。"),
    region("572", "northern-zhou", "北周以长安为都，疆域延及河西、巴蜀和西南；与齐的接触线按同年图页概括。"),
    region("572", "chen", "陈都建康，控制江南、岭南等地；本图早于573年陈取淮南，不借用后来的北伐范围。"),
    region("572", "western-liang", "江陵后梁依附北周，仍单独标示。与五代朱温所建后梁不同，小区域轮廓为图集尺度概括。"),
  ], [atlasSource("04-23陈、齐、周时期全图.jpg", 572, "第四册"), atlasSource("04-65齐.jpg", 572, "第四册"), atlasSource("04-67周.jpg", 572, "第四册")]),
  ready(612, "隋大业八年：统一后的帝国版图", "采用图集大业八年（612年）隋时期全图，展示统一后的典型疆域及西部扩展。此图不能代表581年建隋或589年灭陈时的疆域。", [
    region("612", "sui", "大兴、东都洛阳与南北诸郡所在的统一格局；西部依本年图集重绘。不将进军路线视为占领区，也不用于表示617年隋末各方实际控制。"),
  ], [atlasSource("05-3隋时期全图.jpg", 612, "第五册")]),
].map((snapshot) => withFullAtlas(snapshot));
