import type { MultiLineString, MultiPolygon, Polygon } from "geojson";
import geometry from "@/data/maps/expansion/geometry.json";
import labels from "@/data/maps/expansion/label-points.json";
import outlines from "@/data/maps/expansion/outlines.json";
import oldOutlines from "@/data/maps/northern-qi-zhou-sui/outlines.json";
import { mapSnapshots as northernSnapshots } from "@/data/series/northern-qi-zhou-sui/map-snapshots";
import type { HistoricalMapSnapshot } from "@/types/series";
import { withFullAtlas } from "@/data/maps/full-atlas";

const plates = {
  449: ["第四册", "04-17宋、魏时期全图.jpg"],
  497: ["第四册", "04-19齐、魏时期全图.jpg"],
  879: ["第五册", "05-80南诏.jpg"],
  1111: ["第六册", "06-3辽，北宋时期全图.jpg"],
  1142: ["第六册", "06-42金，南宋时期全图（一）.jpg"],
  1208: ["第六册", "06-44金，南宋时期全图（二）.jpg"],
} as const;
const scopeNote = "着色表示本专题主要政权在该年图集上的疆域概括；周边政权留白不表示无人统治。边地与属部并非均质的直接行政控制，天然海岸和湖泊仅作定位。";
const accuracyNote = "依据《中国历史地图集》原年图页的经纬网配准，概括重绘政治边界；保留主要转折，不代表精确测绘、州县界或逐年实际控制。";

function stage(seriesId: string, year: keyof typeof plates, polityId: string, label: string, note: string, capital: string, coordinate: [number, number]): HistoricalMapSnapshot {
  const key = String(year) as keyof typeof geometry;
  const [volume, fileLabel] = plates[year];
  const point = (labels[key] as Record<string, number[]>)[polityId];
  return {
    id: `${seriesId}-${year}`, seriesId, year, label, note, status: "ready",
    accuracyLevel: "approximate", accuracyNote, scopeNote,
    regions: [{ polityId, geometry: (geometry[key] as Record<string, Polygon | MultiPolygon>)[polityId], labelPoint: [point[0], point[1]], accuracyLevel: "approximate", note }],
    sources: [{ title: `《中国历史地图集》${volume} · ${fileLabel.replace(/\.jpg$/, "")}（${year}年）`, fileLabel, referenceYear: year, redistributable: false }],
    capitals: [{ name: capital, coordinate }],
    outlines: { [polityId]: (outlines[key] as Record<string, MultiLineString>)[polityId] },
  };
}

function southernStage(year: 546 | 572, polityId: string): HistoricalMapSnapshot {
  const original = northernSnapshots.find(s => s.year === year)!;
  const region = original.regions.find(r => r.polityId === polityId)!;
  const lines = oldOutlines[String(year) as "546" | "572"] as Record<string, MultiLineString>;
  return { ...original, id: `southern-dynasties-${year}`, seriesId: "southern-dynasties", scopeNote,
    label: year === 546 ? "南梁：侯景之乱前，仍据有巴蜀" : "南陈：573年北伐以前的江南格局",
    note: region.note, status: "ready", regions: [region],
    capitals: [{ name: "建康", coordinate: [118.8, 32.06] }], outlines: { [polityId]: lines[polityId] },
  };
}

export const expansionMapSnapshots: HistoricalMapSnapshot[] = [
  stage("northern-wei", 449, "northern-wei", "太平真君十年：北方统一后的北魏", "采用449年图。都城在平城；北魏与刘宋相接，刘宋此时仍据有山东部分地区，不能套用497年的南界。", "平城", [113.3, 40.1]),
  stage("northern-wei", 497, "northern-wei", "太和二十一年：迁都洛阳后的北魏", "采用497年图，已在494年迁都之后；北魏南界较449年推进，与南齐对峙。不是386年开国或534年分裂时的版图。", "洛阳", [112.45, 34.62]),
  stage("liao", 1111, "liao", "天庆元年：女真起兵以前的辽", "采用1111年图，展示五京与北方边地的辽朝格局。北部属部的统属关系不同于州县直接治理；不能用于表示947年南下后的占领范围。", "上京临潢府", [119.38, 43.98]),
  stage("liao", 1142, "western-liao", "卡特万之战后的西辽", "采用1142年图，耶律大石已在中亚立足。疆域包含图集所示属国、属部范围，不等于所有地区由虎思斡耳朵直接管理；与已于1125年灭亡的辽朝分开标示。", "虎思斡耳朵", [75.3, 42.8]),
  stage("liao", 1208, "western-liao", "屈出律夺权以前的西辽", "采用1208年图，此时蒙古已经兴起，西辽北部格局与1142年不同。不能将1211年夺权或1218年灭亡后的形势倒填到本图。", "虎思斡耳朵", [75.3, 42.8]),
  stage("jin", 1142, "jin", "皇统二年：宋金和议后的金", "采用1142年图，金仍以上京会宁府为都；南界反映绍兴和议形成的格局，中都尚未成为首都。", "上京会宁府", [126.98, 45.54]),
  stage("jin", 1208, "jin", "泰和八年：中都时代的金", "采用1208年图，政治中心已经南迁中都，北部边界也与1142年不同。此图早于1214年迁汴与1215年中都失守。", "中都大兴府", [116.35, 39.88]),
  stage("western-xia", 1111, "western-xia", "贞观十一年：宋辽之间的西夏", "采用1111年图，西夏以兴庆府为都，横贯河套与河西。不能代表1038年称帝之初的全部边界。", "兴庆府", [106.27, 38.47]),
  stage("western-xia", 1142, "western-xia", "仁宗时期：金朝兴起后的西夏", "采用1142年图。西夏东邻已经从辽、北宋变为金；西部与西辽相关地区相接，边地统属依图集概括。", "兴庆府", [106.27, 38.47]),
  stage("western-xia", 1208, "western-xia", "蒙古压力下的西夏", "采用1208年图，都城依原图标为中兴府，位于蒙古多次进攻时期。此为图集典型疆域，不把军队进攻路线当作永久占领范围，也不代替1227年亡国时的战局。", "中兴府", [106.27, 38.47]),
  stage("dali", 879, "nanzhao", "乾符六年：南诏与节度、属部地带", "采用879年南诏分图。南诏都城为阳苴咩城，图示范围包括外围属部，不能理解为各地均设有同样的直属行政机构。东缘以原分图图框为限，不把截断处视为精确国界；不代表738年初兴时的势力。", "阳苴咩城", [100.16, 25.7]),
  stage("dali", 1111, "dali-kingdom", "段氏复国后的大理", "采用1111年图，段氏已经恢复大理国号。图示外围部族统属与都城周边治理有别，不按现代云南省界描绘。", "羊苴咩城", [100.16, 25.7]),
  stage("dali", 1142, "dali-kingdom", "南宋初期的大理", "采用1142年图，展示大理与周边政治势力相接的范围；不把南诏879年的疆域移用到大理。", "羊苴咩城", [100.16, 25.7]),
  stage("dali", 1208, "dali-kingdom", "蒙古南征以前的大理", "采用1208年图，南部属部范围与前两幅原年图存在差别；不能视作1253年蒙古征服过程的逐日战局。", "羊苴咩城", [100.16, 25.7]),
  stage("southern-dynasties", 449, "liu-song", "元嘉二十六年：北伐前的刘宋", "采用449年图，刘宋都建康，仍据山东部分地区。此时尚未发生450年的北伐及其后的北魏南下，不提前挪用后期疆界。", "建康", [118.8, 32.06]),
  stage("southern-dynasties", 497, "southern-qi", "建武四年：南齐与北魏对峙", "采用497年图，南齐继承江南政权，北方疆界较刘宋元嘉时期后退；这是南齐，不是550年建立的北齐。", "建康", [118.8, 32.06]),
  southernStage(546, "southern-liang"),
  southernStage(572, "chen"),
].map((snapshot) => withFullAtlas(snapshot));
