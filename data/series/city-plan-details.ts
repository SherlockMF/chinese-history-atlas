import type { Feature, LineString, Polygon } from "geojson";
import type { CityFeatureProperties, CityLayer, CityOverlay, CityPlace } from "./city-overlays";

type XY = [number, number];
type Plan = Pick<CityOverlay, "bounds" | "historicalBounds" | "comparisonLabel" | "features" | "places">;
type Shape = Feature<Polygon | LineString, CityFeatureProperties>;

// Coordinates describe generalized plan relationships, not excavated wall vectors.
// Normalized coordinates are traced from the cited plans; y increases southward.
function planBuilder(project: (x: number, y: number) => XY, source: string) {
  const features: Shape[] = [];
  const places: CityPlace[] = [];
  function shape(name: string, layer: CityLayer, points: XY[], kind = "", sources = [source], polygon = true) {
    const coordinates = points.map(([x, y]) => project(x, y));
    if (polygon) coordinates.push(coordinates[0]);
    features.push({ type: "Feature", properties: { name, layer, kind, sourceIds: sources }, geometry: polygon ? { type: "Polygon", coordinates: [coordinates] } : { type: "LineString", coordinates } });
  }
  function rect(name: string, layer: CityLayer, x: number, y: number, w: number, h: number, kind = "", sources = [source]) {
    shape(name, layer, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], kind, sources);
  }
  function line(name: string, layer: CityLayer, points: XY[], kind = "", sources = [source]) {
    shape(name, layer, points, kind, sources, false);
  }
  function place(id: string, name: string, x: number, y: number, layer: CityLayer, description: string, options: Partial<Pick<CityPlace, "kind" | "side" | "detail" | "sourceIds">> = {}) {
    places.push({ id, name, coordinates: project(x, y), layer, description, kind: "label", sourceIds: [source], ...options });
  }
  return { features, places, rect, line, shape, place };
}

const j = planBuilder((x, y) => [116.313 + x * 0.071 + y * 0.002, 39.901 - y * 0.047 - x * 0.001], "jin-plan");
j.shape("金中都外郭城", "extent", [[0.02, 0], [0.97, 0], [1, 0.06], [1, 0.97], [0.98, 1], [0, 1], [0, 0.03]], "wall");
j.rect("皇城", "zones", .255, .33, .54, .38, "imperial");
j.rect("宫城", "zones", .35, .33, .155, .315, "palace");
j.rect("内省与东宫所在区域", "zones", .358, .35, .13, .26, "palace-inner");
j.rect("太庙所在区域", "zones", .56, .63, .085, .06, "temple");
j.rect("六部所在区域", "zones", .30, .65, .06, .05, "office");
j.rect("仁政殿礼仪位置（示意）", "zones", .392, .446, .076, .027, "hall", ["jin-axis"]);
j.rect("大安殿礼仪位置（示意）", "zones", .38, .52, .10, .028, "hall", ["jin-axis"]);

// Only the main street pattern is generalized; no invented block names or count.
for (const x of [.23, .68, .79]) j.line("南北街道（复原示意）", "streets", [[x, .02], [x, .31]], "street");
for (const x of [.14, .23, .68, .79]) j.line("南部南北街道（复原示意）", "streets", [[x, .73], [x, .985]], "street");
for (const y of [.315, .48, .75, .88]) {
  if (y === .48) { j.line("西部街道", "streets", [[.015, y], [.25, y]]); j.line("东部街道", "streets", [[.80, y], [.985, y]]); }
  else j.line("东西干道（复原示意）", "streets", [[.02, y], [.98, y]], "street");
}
for (const y of [.80, .835, .92, .96]) j.line("旧城街巷组织（示意）", "streets", [[.02, y], [.425, y]], "minor");
j.line("通玄门—丰宜门中轴", "axis", [[.43, .005], [.43, .995]], "axis", ["jin-axis"]);
j.line("千步廊礼仪通道", "axis", [[.412, .645], [.412, .71]], "ceremonial", ["jin-axis"]);
j.line("千步廊礼仪通道", "axis", [[.448, .645], [.448, .71]], "ceremonial", ["jin-axis"]);
// Follow the published reconstruction's shoreline indentations and canal bends.
// Lotus Pond has a documented source location but no defensible Jin shoreline here.
j.shape("鱼藻池（据复原图描绘）", "water", [
  [.319,.526],[.328,.533],[.334,.542],[.337,.551],[.335,.559],
  [.328,.565],[.321,.568],[.320,.577],[.315,.584],[.310,.587],
  [.312,.594],[.305,.602],[.299,.610],[.286,.613],[.278,.609],
  [.274,.601],[.275,.591],[.279,.582],[.283,.577],[.289,.575],
  [.290,.582],[.296,.584],[.300,.579],[.299,.572],[.301,.563],
  [.309,.558],[.314,.551],[.315,.541],[.313,.533],
], "lake");
j.line("莲花池入城水道（据复原图概括）", "water", [
  [-.05,.215],[.015,.219],[.075,.224],[.126,.23],[.16,.239],
  [.181,.251],[.193,.269],[.2,.291],[.209,.31],[.225,.321],
  [.239,.332],[.243,.354],[.244,.42],[.245,.49],[.247,.55],
  [.247,.62],[.251,.682],[.255,.714],[.268,.732],[.30,.739],
  [.348,.745],[.39,.755],[.429,.78],[.468,.819],[.511,.855],
  [.549,.895],[.573,.937],[.591,.98],[.60,1.02],
], "channel", ["jin-plan", "jin-water-system"]);
j.line("鱼藻池与西部水道联系（示意）", "water", [[.247,.566],[.261,.57],[.274,.58],[.28,.59]], "channel", ["jin-plan", "jin-water-system"]);
j.place("jin-palace", "宫城", .43,.385,"zones","宫城位于全城中部偏西，处在皇城内。放大可沿应天门、大安殿与仁政殿阅读宫殿的南北序列。建筑位置为复原关系，不是实测殿基。", { sourceIds: ["jin-plan", "jin-axis"] });
j.place("jin-imperial", "皇城", .66,.58,"zones","皇城包围宫城及礼仪、官署空间。其南门宣阳门与宫城南门应天门由御道、千步廊联系，太庙在御道东侧。", { sourceIds: ["jin-plan", "jin-axis"] });
j.place("jin-city-name", "金中都", .15,.68,"extent","金中都位于今日北京老城西南一带。打开绿色的明清城址图层，可看到古都之间既有城址交叠，也有中心位置的迁移。", { sourceIds: ["jin-range", "jin-plan"] });
j.place("jin-fish", "鱼藻池", .302,.65,"water","金中都宫苑水面。轮廓依国家民委刊载的复原图，保留池岸的弯折、收窄与凹入关系；图像分辨率有限，这不是考古实测岸线，也不能与今日青年湖湖岸直接重合。莲花池来水入城，经宫苑水系向南水关排出。", { sourceIds: ["jin-plan", "jin-water-system"] });
j.place("jin-source", "莲花池水源", -.05,.18,"water","莲花池古称西湖，是金中都的重要水源。莲花河引水入城，联系宫苑水面，下游接凉水河。现有资料不足以确定金代湖岸，因此这里只标水源位置；打开现代底图可看今日湖面，两者不混作同一条岸线。", { kind: "site", sourceIds: ["jin-water-system", "jin-range"] });
j.place("jin-watergate", "南水关", .60,1.025,"water","南水关连接城内外水道。今辽金城垣博物馆展示南城墙水关遗址，是观察金中都水利工程的实物线索。地图标示概略区域。", { kind: "site", sourceIds: ["jin-plan", "jin-watergate"] });
j.place("jin-axis", "丰宜门大街", .43,.835,"axis","丰宜门通向皇城宣阳门的南北街道，是进入都城礼仪中心的路线。金中都轴线在今日故宫轴线以西。", { sourceIds: ["jin-axis"] });

const jinGates: [string, number, number, CityPlace["side"]][] = [
  ["会城门", .205,0,"north"],["通玄门", .43,0,"north"],["崇智门", .685,0,"north"],["光泰门", .87,0,"north"],
  ["端礼门", .23,1,"south"],["丰宜门", .43,1,"south"],["景风门", .70,1,"south"],
  ["彰义门", 0,.31,"west"],["颢华门", 0,.49,"west"],["丽泽门", 0,.89,"west"],
  ["施仁门", 1,.34,"east"],["宣曜门", 1,.51,"east"],["阳春门", 1,.89,"east"],
];
for (const [name,x,y,side] of jinGates) j.place(`jin-${name}`,name,x,y,"gates", `${name}是金中都${{north:"北",south:"南",east:"东",west:"西"}[side!]}城墙的城门。${name === "光泰门" ? "北墙原三门，光泰门为后增，因此金代发展后的全城共有十三门。" : name === "丰宜门" || name === "通玄门" ? "位于都城南北礼仪轴线上，可沿轴线对照宫城与皇城。" : "名称沿用、现代路名与原门址应分开理解；图中位置依据复原图概括。"}`, {kind:"gate",side,sourceIds:["jin-gates","jin-plan"]});
for (const [name,y] of [["拱辰门",.33],["仁政殿",.46],["大安殿",.535],["应天门",.645],["宣阳门",.71]] as const) j.place(`jin-${name}`,name,.43,y,"zones",`${name}位于金中都礼仪中轴的宫城、皇城序列中。这里表达文献记载的南北关系，建筑轮廓与精确门址仍应以考古资料为准。`,{kind:name.endsWith("门")?"gate":"site",detail:true,sourceIds:["jin-axis"]});
j.place("jin-temple","太庙",.602,.66,"zones","太庙位于御道东侧，体现都城礼制中的祖庙布局。图上为功能区域示意。",{detail:true,sourceIds:["jin-axis"]});
j.place("jin-offices","六部",.325,.675,"zones","御道西侧设有官署空间，与东侧太庙一起组织皇城南部的礼仪与行政区域。",{detail:true,sourceIds:["jin-axis"]});

// Later city coordinates are independently tied to today's Beijing, not stretched
// from the Jin diagram. The Ming/Qing comparison includes the 1553 outer city.
function geographicArea(builder: ReturnType<typeof planBuilder>, name: string, points: XY[], source: string) {
  builder.features.push({type:"Feature",properties:{name,layer:"comparison",sourceIds:[source],kind:"later-wall"},geometry:{type:"Polygon",coordinates:[[...points,points[0]]]}});
}
geographicArea(j,"明清北京内城",[[116.348,39.899],[116.348,39.934],[116.361,39.944],[116.428,39.944],[116.429,39.901]],"beijing-walls");
geographicArea(j,"明清北京外城",[[116.343,39.899],[116.435,39.901],[116.435,39.875],[116.430,39.870],[116.346,39.869]],"beijing-walls");
geographicArea(j,"紫禁城",[[116.384,39.912],[116.384,39.921],[116.395,39.921],[116.395,39.912]],"beijing-walls");
const laterBeijing: [string,number,number,CityPlace["side"]][] = [
  ["德胜门",116.373,39.944,"north"],["安定门",116.402,39.944,"north"],
  ["西直门",116.348,39.934,"west"],["阜成门",116.348,39.923,"west"],
  ["东直门",116.428,39.936,"east"],["朝阳门",116.4285,39.922,"east"],
  ["宣武门",116.368,39.8995,"south"],["正阳门",116.390,39.900,"south"],["崇文门",116.411,39.9005,"south"],
  ["西便门",116.345,39.899,"north"],["东便门",116.433,39.901,"north"],
  ["广安门",116.344,39.889,"west"],["广渠门",116.435,39.890,"east"],
  ["右安门",116.357,39.8692,"south"],["永定门",116.392,39.8696,"south"],["左安门",116.423,39.870,"south"],
];
for(const [name,lng,lat,side] of laterBeijing) j.places.push({id:`later-${name}`,name,coordinates:[lng,lat],layer:"comparison",kind:"gate",side,sourceIds:["beijing-walls"],description:`${name}属于明清北京城门体系，绿色标记与金中都十三门分属不同时代。对照两城可看出金中都旧址与明清外城西部交叠，城市中心逐渐转向东北。${name === "广安门" ? "明代初名广宁门，清代改称广安门，不是金中都的同名城门。" : "门名位置按现今老城地理关系概括。"}`});
j.places.push({id:"beijing-inner",name:"明清北京内城",coordinates:[116.405,39.932],layer:"comparison",kind:"label",sourceIds:["beijing-walls"],description:"明清内城位于金中都东北方，承续并改造元大都的部分城址；这里画的是明清城墙，不是元代全城范围。"},{id:"beijing-outer",name:"明清北京外城",coordinates:[116.414,39.881],layer:"comparison",kind:"label",sourceIds:["beijing-walls"],description:"明嘉靖时期增筑外城，位于内城之南。其西部与金中都城址部分交叠，体现不同年代都城在同一地面的叠压。"},{id:"beijing-palace",name:"紫禁城",coordinates:[116.39,39.9165],layer:"comparison",kind:"label",sourceIds:["beijing-walls"],description:"明清宫城所在位置，在金中都宫城东北方。两条都城中轴并不重合。"});

export const jinPlan: Plan = { bounds:[[116.296,39.845],[116.448,39.951]], historicalBounds:[[116.302,39.848],[116.397,39.908]],comparisonLabel:"明清北京内外城",features:{type:"FeatureCollection",features:j.features},places:j.places };

const d = planBuilder((x,y)=>[108.881+x*.107,34.282-y*.075],"daxing-grid");
d.rect("大兴城规划外郭", "extent",0,0,1,1,"planned-wall");
d.rect("宫城 · 大兴宫","zones",.35,0,.315,.17,"palace");
d.rect("皇城 · 百官衙署","zones",.35,.17,.315,.23,"imperial");
d.rect("利人市","zones",.12,.405,.115,.135,"market");
d.rect("都会市","zones",.78,.405,.11,.135,"market");
// Street spacing follows fig. 5. Gaps at the two markets preserve their larger plots.
const columns=[0,.12,.235,.35,.445,.5,.555,.665,.78,.89,1];
const rows=[0,.09,.17,.29,.4,.47,.54,.605,.67,.735,.8,.865,.93,1];
for(let i=0;i<columns.length-1;i++) for(let k=0;k<rows.length-1;k++) {
  const x=columns[i], y=rows[k], w=columns[i+1]-x, h=rows[k+1]-y;
  if(x>=.35&&x<.665&&y<.4) continue;
  if((x===.12||x===.78)&&y>=.4&&y<.54) continue;
  d.rect("里坊组织（示意）","streets",x+.006,y+.006,w-.012,h-.012,"ward");
}
for(const x of columns.slice(1,-1)) {
  if(x>=.35&&x<=.665) d.line("纵向街道（示意）","streets",[[x,.40],[x,1]],"street");
  else d.line("纵向街道（示意）","streets",[[x,0],[x,1]],"street");
}
for(const y of [.17,.4,.67]) {
  if(y===.17){d.line("开远门大街","streets",[[0,y],[.35,y]],"avenue");d.line("通化门大街","streets",[[.665,y],[1,y]],"avenue");}
  else d.line("东西向主要街道","streets",[[0,y],[1,y]],"avenue");
}
d.line("朱雀大街","axis",[[.5,.4],[.5,1]],"axis");
d.line("大兴宫—皇城中轴","axis",[[.5,.02],[.5,.4]],"ceremonial");
d.line("南界早期水渠（考古区域示意）","water",[[.25,.988],[.35,.988],[.42,.988]],"channel",["daxing-archaeology"]);
d.place("daxing-palace","宫城 · 大兴宫",.5,.075,"zones","宫城位于都城北部中间，是皇帝居住与朝会的核心区域。隋称大兴宫，唐代沿用后改称太极宫；大明宫不属于隋大兴城初建格局。");
d.place("daxing-imperial","皇城 · 百官衙署",.5,.285,"zones","皇城位于宫城之南，用于中央官署与国家礼仪。宫城、皇城和居民里坊有明确的空间分区，朱雀门外才进入外郭街坊。",{sourceIds:["daxing-grid","daxing-plan"]});
d.place("daxing-west-market","利人市",.1775,.4725,"zones","隋代利人市位于皇城西南侧，唐代改称西市。它与东面的都会市分置城内两侧，市场街区比普通里坊更大。",{kind:"site"});
d.place("daxing-east-market","都会市",.835,.4725,"zones","隋代都会市位于皇城东南侧，唐代改称东市。两市并非紧贴宫城背后的单一市场，而是嵌入外郭街坊。",{kind:"site"});
d.place("daxing-avenue","朱雀大街",.5,.72,"axis","朱雀大街连接皇城朱雀门与外郭正南明德门，分隔城市东西两侧。今日朱雀路一线有助于辨认其大体方向，不能将现代道路边线当作古代街缘。");
d.place("daxing-wards","里坊街区",.18,.75,"streets","城内以纵横道路划分里坊，居民活动和市场受到门禁及行政管理。图中的规则网格解释其组织方式，不标注未经核实的逐坊名称和测绘边界。");
d.place("daxing-canal","隋初南界水渠",.335,1.075,"water","2023年度考古工作报告指出：安化门遗址早期为东西向水渠，带翻水坝和桥梁；晚期门址推断建于唐永徽五年。故不能把复原图上的规划外郭当作隋初全部建成的实测城墙。",{kind:"site",sourceIds:["daxing-archaeology"]});
const suiGates:[string,number,number,CityPlace["side"]][]=[
  ["开远门",0,.17,"west"],["金光门",0,.4,"west"],["延平门",0,.67,"west"],
  ["通化门",1,.17,"east"],["春明门",1,.4,"east"],["延兴门",1,.67,"east"],
  ["安化门",.35,1,"south"],["明德门",.5,1,"south"],["启夏门",.665,1,"south"],
];
for(const [name,x,y,side] of suiGates) d.place(`daxing-${name}`,name,x,y,"gates",`${name}在隋唐都城规划中位于${{west:"西",east:"东",south:"南",north:"北"}[side!]}侧，通向城内主要街道。${name==="安化门"?"考古发掘的晚期门址推断为唐永徽五年所建，早期是水渠和桥梁；图示门位不表示隋初城门已全部筑成。":name==="明德门"?"它是外郭正南门，与朱雀大街、皇城朱雀门相联系。可打开现代参照，比较明德门遗址公园与今城墙相距的尺度。":"这里采用规划略图中的门名与相对位置；具体筑造年代及门址以考古研究为准。"}`,{kind:"gate",side,sourceIds:name==="安化门"?["daxing-grid","daxing-archaeology"]:["daxing-grid"]});
d.place("daxing-daxingmen","大兴门",.5,.17,"zones","隋大兴宫南面的正门，位于宫城与皇城之间；唐代改称承天门。本图采用隋代名称。",{kind:"gate"});
d.place("daxing-zhuquemen","朱雀门",.5,.4,"zones","皇城南面正门，向南连接朱雀大街。古代门址与今日西安城墙上开放通行的朱雀门门洞不能直接等同。",{kind:"gate"});
d.place("daxing-sheji","太社",.41,.35,"zones","规划略图在皇城南部西侧标有太社，东侧对应太庙，形成礼仪空间的东西分置。",{detail:true});
d.place("daxing-temple","太庙",.59,.35,"zones","规划略图在皇城南部东侧标有太庙，与西侧太社相对；此处只表示功能位置，不复原具体殿宇。",{detail:true});
geographicArea(d,"后世西安城墙",[[108.918,34.251],[108.918,34.277],[108.961,34.277],[108.961,34.251]],"xian-walls");
for(const [name,lng,lat] of [["安定门",108.918,34.260],["长乐门",108.961,34.259],["永宁门",108.94,34.251],["安远门",108.94,34.277]] as const) d.places.push({id:`later-${name}`,name,coordinates:[lng,lat],kind:"gate",layer:"comparison",sourceIds:["xian-walls"],description:`${name}属于后世西安城墙，绿色层帮助比较今老城与隋唐都城的范围。不能把明代城门名称或城墙范围用于说明隋大兴城。`});
d.places.push({id:"xian-walls",name:"后世西安城墙",coordinates:[108.939,34.273],kind:"label",layer:"comparison",sourceIds:["xian-walls"],description:"今天西安城墙围合的范围只占隋唐都城的一部分；其西墙与南墙一带与隋唐皇城西、南边界具有承续关系，东、北侧又有后世扩建。"});

export const daxingPlan: Plan={bounds:[[108.868,34.198],[109.001,34.292]],historicalBounds:[[108.874,34.201],[108.995,34.288]],comparisonLabel:"后世西安城墙",features:{type:"FeatureCollection",features:d.features},places:d.places};
