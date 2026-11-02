import type { FeatureCollection, LineString, Polygon } from "geojson";
import { jinPlan, daxingPlan } from "./city-plan-details";

export type CityLayer = "modern" | "extent" | "zones" | "axis" | "landmarks" | "gates" | "streets" | "water" | "comparison";
export type CityLayers = Record<CityLayer, boolean>;
export type CityFeatureProperties = { name: string; layer: CityLayer; sourceIds: string[]; kind?: string };
export type CityPlace = { id: string; name: string; coordinates: [number, number]; description: string; sourceIds: string[]; layer: CityLayer; kind: "gate" | "label" | "site"; side?: "north" | "south" | "east" | "west"; detail?: boolean };
export type CityOverlay = {
  id: "jin" | "daxing";
  title: string;
  period: string;
  introduction: string;
  bounds: [[number, number], [number, number]];
  historicalBounds: [[number, number], [number, number]];
  comparisonLabel: string;
  places: CityPlace[];
  features: FeatureCollection<Polygon | LineString, CityFeatureProperties>;
  landmarks: { id: string; name: string; coordinates: [number, number]; description: string; sourceIds: string[]; labelOffset?: [number, number] }[];
  sources: { id: string; title: string; url: string; note: string }[];
  method: string;
};

export const cityOverlays: Record<"jin" | "daxing", CityOverlay> = {
  jin: {
    id: "jin", title: "金中都 × 今日北京", period: "1153—1215 · 都城与今城",
    introduction: "从十三座城门走进金中都：沿丰宜门—宣阳门—应天门读懂都城中轴，再叠上明清北京，比较两代城址的交叠与向东北的转移。点击门名和区域，可查看来历。",
    ...jinPlan,
    landmarks: [
      { id: "lotus", name: "莲花池公园", coordinates: [116.31, 39.891], labelOffset: [-25, -24], description: "这里是今天的莲花池公园位置参照。莲花池与金中都水源有关，但今日公园湖岸不等于金代水面；打开历史城域，可以比较水源与都城西侧的空间关系。", sourceIds: ["jin-water", "modern"] },
      { id: "south-station", name: "北京南站", coordinates: [116.3785, 39.8635], description: "现代铁路枢纽帮助辨认金中都城址东南部的城市环境。它是现代参照点，不是古代城门。史料所述城址东南角在车站以东四路通一带。", sourceIds: ["jin-range", "modern"] },
      { id: "palace-museum", name: "故宫（现代参照）", coordinates: [116.3907, 39.9163], description: "故宫位于金中都旧址的东北方。对照两处位置，可以直观看到金中都中轴不等于今日故宫中轴；元大都选址与明清北京的营建属于后续阶段。", sourceIds: ["jin-palace", "modern"] },
    ],
    sources: [
      { id: "jin-plan", title: "国家民委：金中都城复原图", url: "https://www.neac.gov.cn/seac/c103391/202211/1159788.shtml", note: "文内复原图用于城垣、宫城、道路和水系相对关系；经人工概括绘制矢量。图中的复原方案不等于各处均已发掘。" },
      { id: "jin-axis", title: "丰台史话：完颜亮兴建金中都（下）", url: "https://mp.visitbeijing.com.cn/a1/48AMJEpi3qr", note: "丰宜门—宣阳门—应天门—大安殿—仁政殿—拱辰门—通玄门的礼仪序列及商业、园林。" },
      { id: "jin-gates", title: "中国文艺网：金中都有多少个城门？", url: "https://www.cflac.org.cn/wenhua/guoxue/201308/t20130826_218319.html", note: "十三门的名称与分布：北四门，其余三面各三门；光泰门为后增，不将十三门都视为1153年同时建成。" },
      { id: "jin-watergate", title: "北京市文物局：金元水关遗址", url: "https://wwj.beijing.gov.cn/bjww/362760/362770/326091358/index.html", note: "南水关遗址及都城水利工程。" },
      { id: "beijing-walls", title: "北京市政府：明清北京城门", url: "https://www.beijing.gov.cn/renwen/sy/whkb/201903/t20190321_1865472.html", note: "内九外七城门体系。后世城墙按现今城址关系概括，用绿色图层与金中都区分；不是元大都城墙。" },
      { id: "jin-range", title: "北京旅游网：寻迹金中都——神秘的第十三门", url: "https://www.visitbeijing.com.cn/article/47QkJSz6FsO", note: "按文中黄亭子、翠花胡同、四路通、凤凰嘴等现代参照区域概括城域；不是从考古测绘图描出的城墙线。" },
      { id: "jin-palace", title: "中国历史研究院：金中都考古与复原研究", url: "https://hrczh.cass.cn/sxqy/kgx/202502/t20250228_5853285.shtml", note: "皇城、中轴关系与复原研究。功能区只画所在区域，不定位未确认的宫殿和门址。" },
      { id: "jin-water", title: "北京市文物局：历史文化名城保护规划", url: "https://wwj.beijing.gov.cn/bjww/362679/362686/622498/", note: "莲花池与历史城市水源的关系。" },
      { id: "jin-water-system", title: "北京市规自委：北京城河湖水系的演变", url: "https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/zxzt/mcbhdjt/yjnr/202106/t20210624_2420557.html", note: "蔡蕃关于莲花池—莲花河—宫苑水面—凉水河的说明及《北京历史地图集》水系示意。用于水源与流向关系，不能据此推出精确古湖岸。鱼藻池轮廓另依国家民委刊载复原图描绘。" },
      { id: "modern", title: "OpenStreetMap：北京现代参照", url: "https://www.openstreetmap.org/#map=13/39.883/116.353", note: "现代底图和概略地点参照，地标不作为古城的测量控制点。" },
    ],
    method: "红褐色为金中都，绿色为后世明清城址。金中都城垣、宫苑、水系和道路依据刊载复原图概括，再按现代地名关系人工定位；未经考古测绘控制点配准，不能用于寻找墙基。街线展示道路组织，宫殿名标示礼仪序列，均不宣称为实测建筑轮廓。历史水面与今日湖岸分开理解；光泰门为后增，本图展示金代发展后的格局。放大可查看宫门与殿宇标签。",
  },
  daxing: {
    id: "daxing", title: "隋大兴城 × 今日西安", period: "隋代格局 · 唐代继承 · 今日参照",
    introduction: "宫城居北、皇城在前，朱雀大街贯穿南北，两市分列东西。沿城门和街道读懂隋代大兴城，再打开后世西安城墙，看看今天的老城占了古都的哪一部分。",
    ...daxingPlan,
    landmarks: [
      { id: "mingde", name: "明德门遗址公园", coordinates: [108.935, 34.2065], description: "明德门是隋唐外郭城的正南门。这里用今日遗址公园作区域参照，观察古城向南延伸的尺度；公园展示边界与门址考古范围不能直接画等号。", sourceIds: ["daxing-plan", "modern"] },
      { id: "zhuque", name: "今朱雀门", coordinates: [108.935, 34.252], description: "今日西安城墙上的朱雀门不等于隋唐皇城朱雀门的原门洞。古门址位于今门附近的城墙下；现代开口、历史门址和古代大道应分别辨认。", sourceIds: ["daxing-plan", "modern"] },
      { id: "bell", name: "西安钟楼", coordinates: [108.9424, 34.2602], labelOffset: [40, -18], description: "钟楼是辨认今天西安中心区的现代参照。它属于后世城市格局，不能当成隋大兴城的中轴中心。打开朱雀轴线，可以比较两者在东西方向上的差别。", sourceIds: ["daxing-axis", "modern"] },
    ],
    sources: [
      { id: "daxing-grid", title: "《从中国首都计划史论唐代长安城》图5：隋大兴城", url: "https://bp.ntu.edu.tw/001/Upload/1352/ckfile/c4fe1014-2ac3-4e68-bb40-547b60db9f00.pdf", note: "1983年《建筑与城乡研究学报》，图5在PDF第14页（刊页325）。据图的宫城、皇城、两市、城门和街坊比例重绘；街坊作组织形式示意，不作为逐坊考古定位。" },
      { id: "daxing-archaeology", title: "社科院考古所：2023年度田野考古工作汇报（三）", url: "https://kaogu.cssn.cn/xwzx/bszx/bsdt/202402/t20240221_5948865.shtml", note: "安化门早期水渠、翻水坝和桥梁；晚期门址推断属唐永徽五年。对隋初南墙建成情况提供修正，地图以规划虚线表达。" },
      { id: "xian-walls", title: "OpenStreetMap：今西安城墙与老城", url: "https://www.openstreetmap.org/#map=14/34.266/108.944", note: "现代可辨认的明代西安城墙概略轮廓。绿色层属于后世，不将今城墙、钟楼或唐代增建宫殿倒置入隋代。" },
      { id: "daxing-plan", title: "宿白：隋唐长安城和洛阳城", url: "https://ygx.sxu.edu.cn/static/xzts/1/隋唐长安城和洛阳城_宿白.pdf", note: "功能分区与城址平面依据。当前地理层只概括范围，未将论文图版作测绘配准；不加入唐代大明宫和兴庆宫。" },
      { id: "daxing-axis", title: "北京中轴线：隋唐长安的城市轴线", url: "https://www.bjaxiscloud.com.cn/mobile/history/axis/index.html", note: "宫城、皇城与明德门的南北关系。" },
      { id: "modern", title: "OpenStreetMap：西安现代参照", url: "https://www.openstreetmap.org/#map=13/34.245/108.935", note: "现代道路与地标概略位置。地标参照不是遗址边界或导航入口。" },
    ],
    method: "依据隋大兴城计划略图重绘宫城、皇城、两市、南及东西主要城门与街道组织；保留隋代大兴门、利人市、都会市名称。规则里坊网格用于解释城市组织，不代表每一坊界都已考古定位。地理位置按现代遗址区域人工概括，尚未完成测绘配准。北侧禁苑不以普通市坊填充；不画唐代大明宫、兴庆宫。绿色为后世西安城墙。",
  },
};
