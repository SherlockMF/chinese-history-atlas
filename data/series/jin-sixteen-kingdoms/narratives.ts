import type { MapNarrativeChapter, MapNarrativeNode, MapNarrativeSequence, MapNarrativeStep } from "@/types/map-narrative";
import { jinSixteenSources as s } from "./content";

export const jinSixteenChapters: MapNarrativeChapter[] = [
  { id: "jin-founding", title: "汉赵与成汉初起", period: "304—316", description: "刘渊、李雄如何建立新政权？从山西与巴蜀两线，读到西晋两京失守。", startYear: 304, endYear: 316 },
  { id: "jin-southward", title: "二赵争衡与诸国并立", period: "317—349", description: "汉赵与后赵争夺北方，前凉、前燕各自发展，江左晋廷同时立足。", startYear: 317, endYear: 349 },
  { id: "jin-contest", title: "后赵崩解与前秦兼并", period: "350—376", description: "后赵内乱如何改变北方？沿冉魏、前燕和前秦的兴亡，看兼并如何推进。", startYear: 350, endYear: 376 },
  { id: "jin-fei", title: "淝水与再分裂", period: "377—398", description: "前秦的优势为何没有维持？从淝水看诸国复起与慕容、拓跋之间的竞争。", startYear: 377, endYear: 398 },
  { id: "jin-north-south", title: "河西角逐与北方整合", period: "399—439", description: "分散的政权如何再次整合？看诸凉、秦夏的终局与北魏统一北方。", startYear: 399, endYear: 439 },
];

function node(id: string, name: string, coordinate: [number, number], locationId?: string, note?: string): MapNarrativeNode {
  return { id, name, coordinate, ...(locationId ? { locationId } : {}), ...(note ? { note } : {}) };
}
const point = {
  baidi: () => node("baidi", "白帝", [109.57, 31.05], "jin-baidi"),
  xiling: () => node("xiling", "西陵", [111.29, 30.7], undefined, "今湖北宜昌附近；只标经过区域，不复原古河道。"),
  wuchang: () => node("wuchang", "武昌（今鄂州）", [114.89, 30.4], "jin-wuchang"),
  jiankang: () => node("jiankang", "建康", [118.8, 32.06], "jiankang"),
  jianyeWu: () => node("jiankang", "建业", [118.8, 32.06], "jiankang", "280年吴都名建业，不能提前使用晋代的建邺或建康。"),
  jianyeJin: () => node("jiankang", "建邺", [118.8, 32.06], "jiankang", "282年分置建邺；313年改建康。"),
  luoyang: () => node("luoyang", "洛阳", [112.45, 34.62], "luoyang"),
  changan: () => node("changan", "长安", [108.94, 34.26], "changan"),
  guangling: () => node("guangling", "广陵／江淮", [119.43, 32.39], "jin-guangling"),
  jingkou: () => node("jingkou", "京口／江南", [119.45, 32.2], "jin-jingkou"),
  jiangling: () => node("jiangling", "江陵", [112.19, 30.35], "jiangling"),
  chengdu: () => node("chengdu", "成都", [104.07, 30.67], "chengdu"),
  xiangyang: () => node("xiangyang", "襄阳", [112.14, 32.04], "jin-xiangyang"),
  bashang: () => node("bashang", "灞上", [109.11, 34.28], "jin-bashang"),
  fangtou: () => node("fangtou", "枋头", [114.54, 35.63], "jin-fangtou"),
  ye: () => node("ye", "邺", [114.4, 36.3], "ye"),
  guzang: () => node("guzang", "姑臧", [102.6, 37.9], "guzang"),
  shengle: () => node("shengle", "盛乐", [111.8, 40.4], "shengle"),
  shouyang: () => node("shouyang", "寿阳", [116.78, 32.58], "jin-shouyang"),
  fei: () => node("fei-river", "淝水战区", [116.83, 32.51], "jin-fei-river-site", "仅为寿阳附近战区参照，具体渡口与战场范围不作精确定位。"),
  xiapi: () => node("xiapi", "下邳", [117.95, 34.3], "jin-xiapi"),
  linqu: () => node("linqu", "临朐", [118.54, 36.51], "jin-linqu"),
  guanggu: () => node("guanggu", "广固", [118.45, 36.73], "jin-guanggu"),
  huatai: () => node("huatai", "滑台", [114.52, 35.58], "jin-huatai"),
  tongguan: () => node("tongguan", "潼关", [110.25, 34.55], "jin-tongguan"),
  pingcheng: () => node("pingcheng", "平城", [113.3, 40.1], "pingcheng"),
  tongwan: () => node("tongwan", "统万", [108.86, 38.14], "jin-tongwan"),
  longcheng: () => node("longcheng", "龙城", [120.45, 41.58], "jin-longcheng"),
  xiangguo: () => node("xiangguo", "襄国", [114.5, 37.07], "jin-xiangguo"),
  changzi: () => node("changzi", "长子", [112.87, 36.12], "jin-changzi"),
  canhebei: () => node("canhebei", "参合陂一带", [112.75, 40.45], "jin-canhebei-site", "战区为区域参照，具体位置存在不同说法。"),
  zhangye: () => node("zhangye", "张掖", [100.45, 38.93], "jin-zhangye"),
  ledu: () => node("ledu", "乐都", [102.4, 36.48], "jin-ledu"),
  dunhuang: () => node("dunhuang", "敦煌", [94.66, 40.14], "jin-dunhuang"),
  jiuquan: () => node("jiuquan", "酒泉", [98.5, 39.73], "jin-jiuquan"),
};

function step(id: string, year: number, snapshotYear: number, title: string, description: string, eventIds: string[], nodes: MapNarrativeNode[], sourceRefs: string[], routeKind: MapNarrativeStep["routeKind"] = "campaign", cameraBounds?: MapNarrativeStep["cameraBounds"]): MapNarrativeStep {
  return { id, year, title, description, snapshotId: `jin-sixteen-kingdoms-${snapshotYear}`, eventIds, nodes, sourceRefs, routeKind, ...(cameraBounds ? { cameraBounds } : {}) };
}

const jinPeriodNarratives: MapNarrativeSequence[] = [
  {
    id: "jin-conquers-wu", title: "晋灭吴", period: "280", description: "沿王濬水军的几个已知节点东下，再看多路晋军如何汇向吴都。地图采用战后的281年，色块不表示开战时疆界。",
    steps: [
      step("upper-yangtze", 280, 281, "从巴蜀顺流而下", "王濬、唐彬所部从巴蜀出发，攻下丹杨等据点，再取西陵、荆门一带。本步连接白帝附近与西陵，表示上游进军方向；线段不复原长江古河道。", ["jin-conquers-wu"], [point.baidi(), point.xiling()], [s.wuCampaign], "campaign", [[108, 29.5], [113, 32.5]]),
      step("middle-yangtze", 280, 281, "打通中游，进抵武昌", "王濬军沿江东进，吴军沿线据点相继降服，抵达武昌。与此同时，杜预等其他晋军攻取江陵，形成多路协同；这里仅绘王濬军的节点。", ["jin-conquers-wu"], [point.xiling(), point.wuchang()], [s.wuCampaign, s.unification], "campaign", [[110, 29], [116, 32.5]]),
      step("jianye-surrenders", 280, 281, "建业投降，统一完成", "王濬继续东下，抵达建业石头城；孙皓投降，吴国结束。281年底图展示的是这一战之后的统一格局，不能据此认为进军沿途原已属晋。", ["jin-conquers-wu"], [point.wuchang(), point.jianyeWu()], [s.wuCampaign, s.unification], "campaign", [[113, 29], [120.5, 34]]),
    ],
  },
  {
    id: "jin-southward", title: "晋末南渡", period: "307—318", description: "把司马睿出镇、北方失陷与多批人口迁徙分开看。虚线只提示中原、江淮、江南之间的区域方向。",
    steps: [
      step("rui-at-jianye", 307, 281, "先有江左据点", "司马睿307年出镇建邺，王导协助联络江南名士。这发生在洛阳失陷之前；底图281年的西晋统一格局，仅作地理背景。", ["jin-rui-south"], [point.jianyeJin()], [s.yuan, s.wangDao], "political", [[115, 29], [121, 34]]),
      step("flight-after-luoyang", 311, 281, "洛阳陷落，迁徙加速", "洛阳失陷后，中原士族和军民分批避乱，部分群体经江淮进入江南。虚线只表示区域性南迁，并非某一支队伍的实际道路；也有经荆襄、入河西等其他方向。", ["jin-luoyang-falls", "jin-southward-migration"], [point.luoyang(), point.guangling(), point.jingkou()], [s.collapse, s.wangDao], "migration", [[110, 29], [121, 37]]),
      step("changan-lost", 316, 281, "北方晋廷失去最后都城", "长安因粮尽援绝而投降，西晋朝廷结束。此步只标事件地点，281年政治色块不代表316年疆域。", ["jin-changan-falls"], [point.changan()], [s.collapse], "political", [[106, 32], [112, 37]]),
      step("court-at-jiankang", 318, 327, "江南朝廷正式称帝", "司马睿317年称晋王，318年称帝。南渡士族与江南地方力量共同支撑建康朝廷；背景改为已整理的327年格局，比318年晚九年；其间国界变化不作连续插值动画。", ["jin-eastern-founded", "jin-southward-migration"], [point.jingkou(), point.jiankang()], [s.yuan, s.wangDao], "political", [[115, 29], [121, 34.5]]),
    ],
  },
  {
    id: "huan-wen-expeditions", title: "桓温北伐", period: "347—369", description: "从灭成汉积累军功，到关中、洛阳、枋头三次北伐。每次行动独立展示，不把它们连成一条远征路线。",
    steps: [
      step("cheng-han", 347, 347, "入蜀打开局面", "桓温从江陵率军入蜀，攻破成汉。两点只表示出发地与目标地，不表示直接翻越山地；347年阶段图补齐灭成汉后的东晋与北方诸国格局，接界为史料推定。", ["jin-huan-conquers-cheng"], [point.jiangling(), point.chengdu()], [s.huan, s.cheng], "campaign", [[102, 28.5], [114, 33.5]]),
      step("guanzhong", 354, 366, "抵达灞上，补给决定退兵", "据《晋书·桓温传》，军队从江陵出发，水军由襄阳进，至南乡后经淅川攻关中。此处连接主要经过区域与灞上终点；秦军清野使晋军未能取长安。", ["jin-huan-guanzhong"], [point.jiangling(), point.xiangyang(), node("nanxiang", "南乡、淅川一带", [111.49, 33.04], undefined, "史料记载途经区域，坐标仅作区域参照。"), point.bashang()], [s.huan], "campaign", [[107, 29], [114, 36]]),
      step("luoyang", 356, 366, "伊水获胜，进入洛阳", "第二次北伐中，桓温在伊水击败姚襄，进入洛阳并修复晋陵。只突出已知的战事与终点区域，不推定一条完整行军道路；收复并未带来长期稳固控制。", ["jin-huan-luoyang"], [node("yi-river", "伊水战区", [112.47, 34.52], undefined, "洛阳南侧伊水流域区域参照。"), point.luoyang()], [s.huan], "campaign", [[110.5, 33], [114, 36]]),
      step("fangtou", 369, 366, "枋头退败，燕秦关系改变", "第三次北伐推进至枋头后补给受阻，晋军撤退遭慕容垂追击。当前只标枋头战区，366年快照尚未表现369年战事；慕容垂随后奔秦，成为前燕衰落的一个转折。", ["jin-huan-fangtou"], [point.fangtou()], [s.huan, s.yanLater, s.murong], "campaign", [[111.5, 33.5], [117, 38]]),
    ],
  },
  {
    id: "former-qin-fei", title: "前秦扩张与淝水", period: "370—384", description: "先看前秦怎样取得河北、巴蜀、河西与代北，再看淝水战败如何引发政治分裂。",
    steps: [
      step("conquer-yan", 370, 366, "攻灭前燕，河北归秦", "前秦军队攻取邺，慕容暐投降。此步只突出目标城，不把关中至邺画成未经核实的直线行军道路；366年底图保留灭燕前的政治背景。", ["jin-qin-conquers-yan"], [point.ye()], [s.qinRise, s.yanLater], "campaign", [[110, 34], [117, 39]]),
      step("take-shu", 373, 366, "夺取巴蜀，取得上游", "前秦从东晋手中取得梁益地区，成都转入秦的控制。当前仍借366年快照辨认地理位置，事件地点提示变化，色块只在现成快照之间切换。", ["jin-qin-takes-shu"], [point.chengdu()], [s.qinRise], "campaign", [[101, 28], [108, 34]]),
      step("liang-and-dai", 376, 376, "灭凉破代，接近鼎盛", "前秦同年先后进攻前凉和代国。姑臧与盛乐分别属于两场行动，本步用政治节点并列表示成果，不将两地连接为同一支军队的路线；376年阶段图展示本年兼并后的连续格局，代北部众分领不等同全境直接控制。", ["jin-qin-liang-dai"], [point.guzang(), point.shengle()], [s.qinRise, s.liang, s.dai], "political", [[99, 34], [115, 43]]),
      step("xiangyang", 379, 382, "襄阳陷落，南征信心上升", "经过自378年开始的围攻，前秦于379年取得襄阳。秦控制了汉水要地，东晋则依靠江淮防线和北府军继续抵抗。", ["jin-qin-takes-xiangyang", "jin-northern-headquarters"], [point.xiangyang()], [s.qinRise, s.xie], "campaign", [[109, 29], [116, 35]]),
      step("fei-river", 383, 382, "寿阳对峙，淝水转折", "秦军先取寿阳，晋军在洛涧击败秦方前锋，继而在淝水对峙中取胜。这里只连接寿阳与淝水战区，不精确复原古河道、渡口或阵线；背景为战前一年的382年。", ["jin-fei-river"], [point.shouyang(), point.fei()], [s.fei, s.xie], "campaign", [[114.8, 30.9], [118.8, 34.1]]),
      step("fragmentation", 384, 395, "军事失败转为政权分裂", "慕容垂、姚苌及关中慕容诸部相继起兵，前秦开始瓦解。395年快照展示分裂进一步发展的结果，不能把其中所有政权的疆域当作384年现状。", ["jin-qin-fragments"], [point.changan(), node("zhongshan", "中山方向的后燕", [114.99, 38.52], "jin-zhongshan", "为后燕后来的政治中心，不代表384年起兵地点。")], [s.fei, s.yao, s.murong], "political", [[105, 32], [119, 41]]),
    ],
  },
  {
    id: "liu-yu-expeditions", title: "刘裕北伐", period: "409—420", description: "分别跟随灭南燕与伐后秦两次北伐，再看关中的丧失和刘宋建立；不把军事到达等同于长期控制。",
    steps: [
      step("north-to-linqu", 409, 409, "由江淮进入山东", "据《宋书·武帝纪》，刘裕水军从建康出发，经淮、泗至下邳，留船后转陆路，经大岘进至临朐。地图连线只按主要节点排序，不等于实际水陆道路。", ["jin-liu-yu-southern-yan"], [point.jiankang(), point.xiapi(), point.linqu()], [s.liuYuEarly], "campaign", [[115, 30], [121, 38]]),
      step("guanggu", 410, 410, "围攻广固，南燕结束", "临朐获胜后，晋军包围广固，次年攻破城池。410年阶段图展示广固失陷后的完整格局，南燕不再涂色；军事胜利不等于长期稳固统治。", ["jin-liu-yu-southern-yan"], [point.linqu(), point.guanggu()], [s.liuYuEarly, s.southernYan], "campaign", [[117.5, 35.7], [119.3, 37.5]]),
      step("luoyang-vanguard", 416, 409, "各路攻秦，先锋取得洛阳", "刘裕部署多路军队伐后秦，王镇恶等由淮北向许洛推进并取得洛阳。当前只突出洛阳这一共同目标，不将分路军队误连成一条行军队列；背景仍是409年。", ["jin-liu-yu-later-qin"], [point.luoyang()], [s.liuYuQin], "campaign", [[109, 32], [116, 37]]),
      step("yellow-river-west", 417, 417, "沿黄河向西，攻入长安", "刘裕本部水军由滑台一带溯黄河西行，在沿河与北魏军交战，晋军最终会攻潼关、长安。此步连接水路战役的主要节点，黄河曲折与入渭路线不作精确复原。", ["jin-liu-yu-later-qin"], [point.huatai(), point.tongguan(), point.changan()], [s.liuYuQin], "campaign", [[107, 32.5], [116, 37]]),
      step("guanzhong-loss", 418, 409, "得城之后，如何守住", "刘裕南返后留守将领内斗，夏军攻取长安。以单一节点提示控制权变化，409年背景地图尚无这一战果；此前北伐成功并不意味着建立了稳固统治。", ["jin-guanzhong-lost"], [point.changan()], [s.liuYuQin, s.xia], "political", [[106, 32], [112, 37]]),
      step("song-founded", 420, 409, "军功转为新王朝", "刘裕在建康代晋建宋，东晋结束。此事件与南朝专题共享；地图只是409年地理背景，449年的宋魏对峙另在尾声查看。", ["liu-song-founded"], [point.jiankang()], [s.songFounding], "political", [[115, 29], [122, 35]]),
    ],
  },
  {
    id: "wei-unification", title: "北魏统一北方", period: "386—439", description: "从拓跋珪建国和定都平城，到拓跋焘攻夏、北燕与北凉。后段借用409年背景，避免拼接未经整理的晚期疆域。",
    steps: [
      step("wei-founded", 386, 395, "拓跋珪复建政权", "拓跋珪386年即代王位后改称魏王，以盛乐一带为中心组织力量。背景395年已经是建国九年后的格局，不能将其范围前移到386年。", ["wei-founded"], [point.shengle()], [s.weiRise], "political", [[108, 37], [116, 43]]),
      step("pingcheng-capital", 398, 395, "迁都平城，建立新中心", "北魏在击败后燕、进入河北后，于398年迁都平城并称帝。盛乐与平城两个节点表示政治中心迁移，不绘制未经考订的迁都道路。", ["jin-canhebei", "wei-capital-pingcheng"], [point.shengle(), point.pingcheng()], [s.weiRise], "political", [[109, 37], [116, 43]]),
      step("tongwan", 427, 409, "攻取夏都统万", "拓跋焘427年攻取统万城，夏国余部仍继续活动。409年底图只提供各地区的参照，不代表427年的国界，也不把攻城当作夏国立即灭亡。", ["jin-wei-tongwan"], [point.tongwan()], [s.weiUnification], "campaign", [[105.5, 35], [112, 41]]),
      step("xia-and-western-qin", 431, 431, "陇右余局结束", "乞伏暮末退保南安，受夏军围攻后出降，西秦灭亡。赫连定随后被吐谷浑俘获，夏国终结。本步仅标南安所在的陇右区域，不把它画成北魏直接攻灭两国的路线。", ["jin-western-qin-xia-fall"], [node("nanan", "南安／陇右", [104.8, 34.9], "jin-nanan", "南安按陇西东南区域定位；不是此前西秦都城枹罕，古城位置不作精确复原。")], [s.westernQin, s.weiUnification], "political", [[101, 32], [109, 38]]),
      step("northern-yan", 436, 409, "北燕退场，辽西转入魏", "冯弘在北魏压力下弃龙城奔高句丽，北燕结束。只标龙城，不绘制未经考证的逃亡路线；背景仍是409年，不据此推断436年边界。", ["jin-northern-yan-falls"], [point.longcheng()], [s.weiUnification, s.northernYanEnd], "campaign", [[117, 39], [123, 44]]),
      step("northern-liang", 439, 439, "姑臧降魏，南北格局形成", "拓跋焘率军攻取姑臧，北凉主要政权结束，北方主要地区归于统一。此结局与北魏专题共享；沮渠氏余部在高昌的延续另作说明，449年宋魏图用作尾声。", ["wei-unifies-north"], [point.guzang()], [s.weiUnification], "campaign", [[99, 35], [107, 41]]),
    ],
  },
];

const northernMainlines: MapNarrativeSequence[] = [
  {
    id: "sixteen-foundations", title: "汉赵、成汉兴起", period: "304—316", description: "从刘渊称汉王与李雄据蜀建政出发，观察两个新政治中心与西晋崩解。304年阶段图区分晋名义州郡体系、新建汉成据地及地方军政分据；后续步骤的背景年份另行标明。",
    steps: [
      step("liu-yuan-founds-han", 304, 304, "刘渊称汉王", "刘渊被推举为大单于，继而在左国城称汉王。地图以山西区域节点定位，不以其后来都城平阳替代304年的建政地点；304年完整阶段图补入晋名义州郡与周边背景，汉的初建和新取地区仍作概括，不据点位推定全并州稳定控制。", ["jin-han-zhao-founded"], [node("zuoguocheng", "左国城一带", [111.1, 37.5], undefined, "今山西离石附近的区域参照，不作古城精确定位。")], [s.hanZhao], "political", [[108, 34], [115, 40]]),
      step("li-xiong-founds-cheng", 304, 304, "李雄据蜀立国", "李雄继承李特、李流的流民军事力量，在成都称成都王，306年进一步称帝建成。蜀地新政权与刘渊的汉各自形成，并非同一场起兵或同一条进军路线。", ["jin-cheng-founded"], [point.chengdu()], [s.cheng, s.liTe], "political", [[101, 28], [108, 34]]),
      step("jin-capitals-fall", 316, 281, "两京相继失守，北方秩序重组", "311年汉赵军攻陷洛阳；316年长安晋廷因粮尽援绝投降，西晋结束。两个节点并列提示先后发生的政治变化，不复原军队路线；281年底图不代表此时控制范围。", ["jin-luoyang-falls", "jin-changan-falls"], [point.luoyang(), point.changan()], [s.collapse, s.liuYao], "political", [[106, 32], [116, 38]]),
    ],
  },
  {
    id: "two-zhaos", title: "二赵争衡与后赵崩解", period: "319—351", description: "从刘曜与石勒分立，到后赵兼并关中，再看继承危机如何使北方重新分裂。",
    steps: [
      step("two-courts", 319, 327, "同称赵国，各据一方", "刘曜改国号赵，在关中经营朝廷；石勒在襄国称赵王，双方从属关系破裂。长安与襄国并列表示两个政治中心，不连接为行军路线；背景327年已晚于建政八年。", ["jin-two-zhaos"], [point.changan(), point.xiangguo()], [s.liuYao, s.shiLe], "political", [[106, 32], [118, 40]]),
      step("later-zhao-prevails", 329, 327, "石勒灭汉赵，二赵并立结束", "刘曜328年在洛阳战事中被俘，后赵次年继续攻取关中，刘氏政权结束。这里并列洛阳与长安两个先后发生战事的地区；327年底图仍保留汉赵，不将其色块当作329年现状。", ["jin-zhao-unifies"], [point.luoyang(), point.changan()], [s.liuYao, s.shiLeLater], "political", [[106, 32], [116, 38]]),
      step("succession-crisis", 349, 366, "石虎死后，后赵陷入内战", "石虎去世后，石氏诸子和军人集团争位，冉闵控制邺，地方力量纷纷自立。后赵残余延续至351年，不能把349年的危机写成同年全部灭亡；366年底图展示后来分立的格局。", ["jin-zhao-collapse", "jin-ran-wei"], [point.ye(), point.xiangguo()], [s.shiHu, s.yanJun], "political", [[111, 34], [118, 40]]),
    ],
  },
  {
    id: "yan-successions", title: "诸燕兴亡与辽西、河北", period: "337—436", description: "从前燕进入河北，到后燕、西燕竞争及南燕、北燕分立。各燕分别列示，北燕的高云、冯氏也不能混作同一慕容王朝。",
    steps: [
      step("former-yan-founded", 337, 327, "慕容皝称燕王", "慕容皝在辽西称燕王，前燕进入新的建国阶段。龙城是后来341年迁入的都城，本步只以它提示辽西区域；327年底图早于称王十年，不代表337年的势力范围。", ["jin-former-yan-founded"], [point.longcheng()], [s.yan], "political", [[117, 39], [123, 44]]),
      step("yan-takes-ye", 352, 366, "前燕攻取邺，进入中原", "后赵崩解后，前燕击败冉闵、攻取邺，慕容儁同年称帝。河北主要地区转入前燕，其政治重心逐步南移；366年底图比本次战事晚十四年。", ["jin-yan-takes-ye", "jin-ran-wei"], [point.ye()], [s.yanJun, s.shiHu], "campaign", [[111, 34], [118, 40]]),
      step("former-yan-ends", 370, 366, "前秦攻取邺，前燕结束", "前秦军攻入邺，慕容暐投降，前燕政权结束。此处只标攻取目标，不复原未经核实的完整行军道路；366年背景仍保留前燕，不能当作370年战后的疆域。", ["jin-qin-conquers-yan"], [point.ye()], [s.qinRise, s.yanLater], "campaign", [[110, 34], [117, 39]]),
      step("yan-restorations", 384, 395, "前秦瓦解，后燕与西燕各自兴起", "前燕370年被前秦攻灭；淝水战后，慕容垂在河北复燕，关中的慕容诸部另起形成西燕。两支势力相互竞争，不能合为一国。中山提示后燕后来政治中心，不代表384年的起兵地点；背景为395年。", ["jin-qin-fragments"], [point.changan(), node("zhongshan", "中山一带", [114.99, 38.52], "jin-zhongshan", "后燕后来的政治中心，不代表384年起兵地点。")], [s.yanLater, s.fei, s.murong], "political", [[105, 32], [119, 41]]),
      step("western-yan-ends", 394, 394, "后燕攻取长子，西燕结束", "慕容垂调兵进入上党，击败慕容永并攻破长子，结束西燕。此处只标攻取目标，不推定完整进军道路；394年完整阶段图展示灭西燕后的格局，长子所在上党归后燕；青兖冬季争夺另列，不把全年理解为稳定不变的疆界。", ["jin-later-yan-conquers-western-yan"], [point.changzi()], [s.murong], "campaign", [[110, 34], [116, 39]]),
      step("canhebei-turn", 395, 395, "参合陂战败，燕魏力量转折", "慕容宝率军北进后撤退，拓跋珪追击并在参合陂附近袭击燕营，后燕损失重大。战区坐标存在争议，只作区域示意；不据本节点复原撤军和追击的实际道路。", ["jin-canhebei"], [point.canhebei()], [s.weiRise, s.murong], "campaign", [[109, 37], [116, 43]]),
      step("southern-yan-founded", 398, 395, "失去河北后，南燕另建中心", "后燕在北魏压力下失去河北，慕容德离开邺，在滑台称燕王，随后进入山东，以广固为都。滑台与广固表示先后政治中心，不把迁移画成未经核实的道路；395年背景早于南燕建政。", ["jin-southern-yan-founded"], [point.huatai(), point.guanggu()], [s.southernYan, s.weiRise], "political", [[112, 33], [121, 39]]),
      step("northern-yan-founded", 407, 409, "龙城易主，北燕形成", "辽西政变中慕容熙被杀，高云即位；409年高云被杀后，冯跋掌权。通常以407年作为北燕起点，不能因沿用燕号就把它与慕容氏后燕视作同一统治家族。背景为409年。", ["jin-northern-yan-founded"], [point.longcheng()], [s.northernYan, s.fengBa], "political", [[117, 39], [123, 44]]),
      step("southern-yan-ends", 410, 410, "广固被攻破，南燕结束", "刘裕军在409年临朐获胜后围攻广固，次年攻破城池，南燕结束。只标末期都城与战事，不将军事到达等同于此后长期稳固统治；410年阶段图展示灭南燕后的晋与北方诸国格局。", ["jin-liu-yu-southern-yan"], [point.guanggu()], [s.southernYan, s.liuYuEarly], "campaign", [[117, 35], [120, 39]]),
      step("northern-yan-ends", 436, 409, "冯弘离开龙城，北燕退场", "北魏持续进攻后，冯弘在高句丽接应下弃龙城东去，北燕结束。龙城只提示政权退出的地区，不绘逃亡道路；409年背景比此事早二十七年，不代表436年的疆界。", ["jin-northern-yan-falls"], [point.longcheng()], [s.northernYanEnd, s.weiUnification], "political", [[117, 39], [123, 44]]),
    ],
  },
  jinPeriodNarratives.find(sequence => sequence.id === "former-qin-fei")!,
  {
    id: "hexi-liang", title: "河西诸凉的分立与终局", period: "314—439", description: "以姑臧、张掖、乐都、敦煌和酒泉为线索，区分前凉、后凉、南凉、北凉与西凉，观察河西走廊的多次重组。",
    steps: [
      step("former-liang-hereditary", 314, 327, "张氏世袭凉州，前凉逐渐形成", "张轨301年任凉州刺史，314年去世后张寔继掌凉州，张氏统治逐渐世袭化。长期奉晋正朔与地方自主可以并存，不能套用一次称帝的建国模式。背景为327年。", ["jin-liang-hereditary"], [point.guzang()], [s.liang], "political", [[99, 35], [107, 41]]),
      step("qin-conquers-liang", 376, 376, "前凉降秦，河西转入前秦体系", "前秦进攻前凉，张天锡出降，姑臧的张氏政权结束。同年前秦也攻破代国，但属于另一场行动；本步只观察河西的变化。376年阶段图展示本年兼并后的连续格局，代北部众分领不等同全境直接控制。", ["jin-qin-liang-dai"], [point.guzang()], [s.liang, s.qinRise], "campaign", [[99, 35], [107, 41]]),
      step("later-liang-founded", 386, 382, "吕光归据河西，后凉兴起", "吕光回师河西、控制姑臧，得知苻坚死讯后改元并形成独立统治。前凉与后凉的统治集团和建立背景不同，不能只按凉号视为连续一朝。382年色块仍是前秦兼并后的背景。", ["jin-later-liang-founded"], [point.guzang()], [s.laterLiang, s.fei], "political", [[99, 35], [107, 41]]),
      step("liang-splits", 397, 395, "南凉、北凉分立", "秃发乌孤在河湟方向建立南凉，段业在沮渠氏支持下据张掖建立北凉。乐都用于提示南凉后来的中心，不作为397年建政地点；两个节点并列，不连接为同一支军队的路线。背景为395年。", ["jin-liang-splits"], [point.ledu(), point.zhangye()], [s.southernLiang, s.northernLiang], "political", [[97, 34], [106, 42]]),
      step("western-liang-founded", 400, 409, "西凉据敦煌，竞争向西展开", "李暠在敦煌被推举为主，建立西凉；405年迁都酒泉。敦煌和酒泉表示先后政治中心，不复原迁都道路。409年底图已经是迁都后的河西格局，不能前移为400年疆界。", ["jin-western-liang-founded"], [point.dunhuang(), point.jiuquan()], [s.westernLiang], "political", [[92, 37], [103, 43]]),
      step("later-liang-ends", 403, 409, "后凉交出姑臧，后秦介入河西", "吕隆在诸凉攻逼下向后秦求援，姚兴遣军入姑臧，吕氏迁往长安，后凉结束。后凉退出后，后秦与南凉、北凉继续角逐，本步不把三者合为一个凉国。背景409年晚于此事。", ["jin-later-liang-falls"], [point.guzang()], [s.laterLiang, s.yaoXing], "political", [[99, 35], [107, 41]]),
      step("southern-liang-ends", 414, 409, "西秦攻取乐都，南凉结束", "秃发傉檀外出征战时，乞伏炽磐围攻并取得乐都。傉檀归降西秦，南凉于414年结束；傉檀被杀是次年之事。409年背景尚保留南凉，不代表414年的控制范围。", ["jin-southern-liang-falls"], [point.ledu()], [s.southernLiang, s.westernQin], "campaign", [[100, 33], [107, 39]]),
      step("western-liang-ends", 421, 409, "北凉攻取敦煌，西凉残部结束", "沮渠蒙逊420年击败李歆后，李恂继续据守敦煌；北凉于421年攻取敦煌，西凉终结。酒泉与敦煌并列提示这一先后过程，不能将政权结束提前到420年。背景仍为409年。", ["jin-western-liang-falls"], [point.jiuquan(), point.dunhuang()], [s.westernLiang, s.northernLiang], "political", [[92, 37], [103, 43]]),
      step("northern-liang-ends", 439, 439, "姑臧降魏，河西主要政权收束", "北魏攻取姑臧，沮渠牧犍投降，北凉在河西的主要政权结束。沮渠氏余部此后仍在高昌活动，不能把439年写成所有沮渠势力同时消失。439年完整阶段图补入宋魏、仇池和周边；敦煌余部与张掖年末叛乱另列，不等同全河西当年皆已稳定归魏。", ["wei-unifies-north"], [point.guzang()], [s.northernLiang, s.weiUnification], "campaign", [[99, 35], [107, 41]]),
    ],
  },
  jinPeriodNarratives.find(sequence => sequence.id === "wei-unification")!,
];

export const jinSixteenGroups = [
  { count: 5, title: "五凉", sequenceId: "hexi-liang", polityIds: ["former-liang", "later-liang-sixteen", "southern-liang-sixteen", "northern-liang", "western-liang-sixteen"] },
  { count: 4, title: "四燕", sequenceId: "yan-successions", polityIds: ["former-yan", "later-yan", "southern-yan", "northern-yan"] },
  { count: 3, title: "三秦", sequenceId: "three-qins", polityIds: ["former-qin", "later-qin", "western-qin"] },
  { count: 2, title: "二赵", sequenceId: "two-zhaos", polityIds: ["han-zhao", "later-zhao"] },
  { count: 1, title: "一成", sequenceId: "cheng-han-rise-fall", polityIds: ["cheng-han"] },
  { count: 1, title: "一夏", sequenceId: "xia-rise-fall", polityIds: ["hu-xia"] },
] as const;

const foundations = northernMainlines.find(sequence => sequence.id === "sixteen-foundations")!;
const zhaos = northernMainlines.find(sequence => sequence.id === "two-zhaos")!;
const qinFei = jinPeriodNarratives.find(sequence => sequence.id === "former-qin-fei")!;
export const jinSixteenClosingNarrative = jinPeriodNarratives.find(sequence => sequence.id === "wei-unification")!;

export const jinSixteenNarratives: MapNarrativeSequence[] = [
  { ...northernMainlines.find(sequence => sequence.id === "hexi-liang")!, title: "五凉 · 河西诸国的分立与终局" },
  { ...northernMainlines.find(sequence => sequence.id === "yan-successions")!, title: "四燕 · 辽西与河北的兴亡" },
  {
    id: "three-qins", title: "三秦 · 关中与陇右的兴亡", period: "351—431", description: "前秦、后秦、西秦分别建立、竞争与结束。三秦并非连续相承的同一王朝，西秦的独立统治还经历400—409年的中断。",
    steps: [
      step("former-qin-founded", 351, 366, "苻健入主长安，前秦建立", "后赵瓦解后，苻健进入关中，在长安建立秦政权，351年称天王，次年称帝。366年背景比建政晚十五年，只供认识关中位置和后来并立格局。", ["jin-former-qin-founded"], [point.changan()], [s.qinEarly], "political", [[105, 32], [113, 38]]),
      step("fu-jian-rules", 357, 366, "苻坚掌权，重整前秦", "苻坚取代苻生，以天王身份执政，任用王猛等整顿吏治和军政。兼并能力来自持续经营，不能只由淝水战败倒推其统治；背景仍为366年。", ["jin-fu-jian-rules"], [point.changan()], [s.qinRise], "political", [[105, 32], [113, 38]]),
      ...qinFei.steps.filter(item => ["conquer-yan", "liang-and-dai", "fei-river", "fragmentation"].includes(item.id)),
      step("western-qin-founded", 385, 395, "乞伏氏另建西秦", "前秦控制松动后，乞伏国仁在陇右统合部众、建立西秦。节点只提示陇右区域，初建中心为勇士川，不把后来都城枹罕当作385年建政地点；395年底图比初建晚十年。", ["jin-western-qin-founded"], [node("longyou", "陇右一带", [104.05, 35.82], undefined, "陇右区域参照，不表示勇士川古城的精确位置。")], [s.westernQin], "political", [[101, 32], [109, 38]]),
      step("former-qin-ends", 394, 394, "前秦残部败亡，三秦竞争改局", "苻坚385年被杀后，前秦余部仍在关陇延续。394年苻登败于后秦，苻崇继位后又被西秦击败，前秦最终结束。节点仅提示关陇竞争区域，394年完整阶段图展示本年灭亡后的格局，前秦不再涂色；上邽姜乳据点与青兖争夺区分别说明。", ["jin-former-qin-falls"], [point.changan(), node("longyou", "陇右一带", [104.05, 35.82], undefined, "关陇竞争区域的参照，不复原苻登、苻崇各次战场。")], [s.qinEnd, s.yaoXing, s.westernQin], "political", [[101, 32], [113, 38]]),
      step("western-qin-restored", 409, 409, "西秦失国后复建", "西秦400年败于后秦，失去独立地位；乞伏氏仍保有部众。409年乞伏乾归回到苑川，复称秦王，西秦恢复。两段独立统治不能画作连续不变的疆域，当前快照采用复国后的409年格局。", ["jin-western-qin-restored"], [node("yuanchuan", "苑川", [104.05, 35.82], "jin-yuanchuan")], [s.westernQin], "political", [[101, 32], [109, 38]]),
      step("later-qin-ends", 417, 417, "晋军攻入长安，后秦结束", "刘裕部署多路军队伐后秦，晋军最终会攻潼关、长安，后秦结束。本步从后秦的终局观察关中变化，不把长安的军事易手当作永久稳定控制；417年阶段图补齐东晋南部与北方诸国，并标示本次攻取的关中，未提前使用418年夏国据关中的归属。", ["jin-liu-yu-later-qin"], [point.changan()], [s.liuYuQin, s.yaoXing], "campaign", [[105, 32], [113, 38]]),
      step("western-qin-ends", 431, 431, "西秦降夏，三秦全部退场", "乞伏暮末退保南安，受赫连定围攻后出降，西秦灭亡。三秦至此均已结束，但最后灭西秦的是夏军；夏国随后才因赫连定被吐谷浑俘获而终结。431年重建图取两国结束后的状态；战后陇右未考定区域留白。", ["jin-western-qin-xia-fall"], [node("nanan", "南安／陇右", [104.8, 34.9], "jin-nanan")], [s.westernQin, s.weiUnification], "political", [[101, 32], [109, 38]]),
    ],
  },
  { ...zhaos, title: "二赵 · 从刘渊建汉到后赵崩解", period: "304—351", steps: [foundations.steps[0], ...zhaos.steps] },
  {
    id: "cheng-han-rise-fall", title: "一成 · 成汉在巴蜀的兴亡", period: "304—347", description: "李雄以流民军事力量在成都立国，国号起初为成，338年李寿改号汉，史家合称成汉。沿成都看这一个传统十六国政权的兴亡。",
    steps: [
      foundations.steps[1],
      step("li-xiong-emperor", 306, 327, "李雄称帝，国号成", "李雄304年称成都王，306年进一步称帝，国号成。称王与称帝是先后两个节点，不应合写为同年发生；327年背景呈现的是建政二十余年后的并立格局。", ["jin-cheng-founded"], [point.chengdu()], [s.cheng], "political", [[101, 28], [108, 34]]),
      step("cheng-han-ends", 347, 347, "成都被攻破，成汉结束", "成汉内部政局不稳，桓温率晋军从荆州入蜀，攻破成都后李势出降，成汉结束。只标成都这一终局节点；347年阶段图补齐成汉结束后的东晋与北方格局，疆域接界仍为概括推定。", ["jin-huan-conquers-cheng"], [point.chengdu()], [s.cheng, s.huan], "campaign", [[101, 28], [108, 34]]),
    ],
  },
  {
    id: "xia-rise-fall", title: "一夏 · 统万、关中与陇右", period: "407—431", description: "赫连勃勃建夏、营统万，再取关中；北魏夺都后，夏国余部继续转战陇右。失都、亡国与最后势力退出分别叙述。",
    steps: [
      step("xia-founded", 407, 409, "赫连勃勃脱离后秦，建立夏国", "赫连勃勃在河套、陕北组织部众，脱离后秦建立夏国。统万城要到413年才开始营建，本步只以其后来所在地区提示活动区域，不把407年的建政与筑城混作同年。背景为409年。", ["jin-xia-founded"], [node("xia-region", "河套、陕北一带", [108.86, 38.14], undefined, "夏国活动区域参照；此时尚未营建统万城。")], [s.xia], "political", [[105, 35], [113, 42]]),
      step("tongwan-built", 413, 409, "营建统万，形成新的都城基地", "赫连勃勃于413年开始营建统万城，城址位于今陕西靖边一带。407年建国与413年筑城分别列示；409年背景早于营建，不将其地图标记当作当年已有都城的证据。", ["jin-xia-founded"], [point.tongwan()], [s.xia], "political", [[105, 35], [112, 41]]),
      step("xia-takes-changan", 418, 409, "夏军攻取长安，关中再易主", "刘裕南返后，晋军留守诸将内斗并撤退，赫连勃勃乘机攻取长安。夏国取得关中，不能将417年晋军灭后秦的战果视为长期稳定控制；409年背景尚未呈现此次易手。", ["jin-guanzhong-lost"], [point.changan()], [s.xia, s.liuYuQin], "campaign", [[105, 32], [113, 38]]),
      jinSixteenClosingNarrative.steps.find(item => item.id === "tongwan")!,
      { ...jinSixteenClosingNarrative.steps.find(item => item.id === "xia-and-western-qin")!, id: "xia-ends", title: "西秦亡于夏，夏国随后终结" },
    ],
  },
];

export const jinSixteenRelatedNarratives = [
  ...jinPeriodNarratives.filter(sequence => ["jin-southward", "huan-wen-expeditions", "liu-yu-expeditions"].includes(sequence.id)),
  foundations, qinFei, jinSixteenClosingNarrative,
];

function narrativesForSeries(seriesId: string, sequences: MapNarrativeSequence[]) {
  return sequences.map(sequence => ({ ...sequence, steps: sequence.steps.map(step => ({ ...step, snapshotId: step.snapshotId.replace("jin-sixteen-kingdoms", seriesId) })) }));
}

const westernJinNarratives: MapNarrativeSequence[] = [
  jinPeriodNarratives.find(sequence => sequence.id === "jin-conquers-wu")!,
  {
    id: "jin-eight-princes", title: "八王之乱", period: "291—306", description: "从洛阳宫廷政变，到宗王动员地方军队，再看惠帝被转移与迎还。八王之乱分阶段展开，并非八位宗王同时参加的一场战役。",
    steps: [
      step("palace-coup", 291, 281, "宫廷政变，宗王军力进入中枢", "贾后借楚王司马玮等人的力量清除杨骏，司马亮、司马玮随后也被杀。权力争夺集中在洛阳，本步只标都城，不将宗王封号画成独立国界；281年背景是内乱前的统一格局。", ["jin-jia-coup"], [point.luoyang()], [s.hui, s.empress], "political", [[110, 33], [115, 37]]),
      step("jia-falls", 300, 281, "贾后被废，司马伦控制朝廷", "太子司马遹遇害后，赵王司马伦以讨贾后为名夺权，贾后被废杀。此处标的是洛阳朝廷的权力变化，不是太子遇害地点；291年至300年之间也不能视为持续不断的会战。背景仍为281年。", ["jin-jia-falls"], [point.luoyang()], [s.hui, s.empress], "political", [[110, 33], [115, 37]]),
      step("princes-mobilize", 301, 281, "篡位引发起兵，地方军队争夺朝廷", "司马伦篡位后，齐王司马冏起兵，成都王司马颖、河间王司马颙等响应。洛阳、邺、关中分别提示朝廷与宗王军事据点；司马伦败亡、惠帝复位，宗王间的争权仍未结束。这些节点不连成同一支军队的路线，背景为281年。", ["jin-princes-war"], [point.luoyang(), point.ye(), point.changan()], [s.hui], "political", [[107, 32], [117, 38]]),
      step("emperor-displaced", 304, 304, "惠帝辗转邺、洛阳与长安", "争战中，惠帝先落入司马颖控制，随后回洛阳，又被张方挟往长安。节点按这一先后排列，只说明皇帝所在与权力重心的变化，不复原道路。304年阶段图展示同期大势，不能用其中的晋色块判断各宗王的实际控制范围。", ["jin-princes-war"], [point.ye(), point.luoyang(), point.changan()], [s.hui], "political", [[107, 32], [117, 38]]),
      step("return-to-luoyang", 306, 304, "惠帝返回洛阳，内乱留下衰弱的晋廷", "东海王司马越一方取得优势，惠帝从长安返回洛阳。宗王大战告一段落，朝廷与地方秩序却已严重受损，不能把迎还皇帝等同于恢复统一控制。背景为304年参考图，不代表306年的疆界。", ["jin-princes-war"], [point.changan(), point.luoyang()], [s.hui], "political", [[107, 32], [115, 37]]),
    ],
  },
  {
    id: "jin-capitals-fall", title: "两京失守", period: "304—316", description: "先看内乱中的新政权兴起，再分别看洛阳与长安失守。洛阳陷落后，西晋在关中仍有延续，不能把311年直接写成西晋灭亡。",
    steps: [
      step("new-regimes", 304, 304, "内乱之外，山西与巴蜀另建政权", "刘渊在离石称汉王，李雄在成都称成都王，两地分别形成新的政治中心。304年阶段图为概括格局，节点表示建政位置，不表示两者联合进军，也不把以后扩张的范围提前归入本年。", ["jin-han-zhao-founded", "jin-cheng-founded"], [node("lishi", "离石", [111.13, 37.52], undefined, "今山西吕梁离石一带，作为建政区域参照。"), point.chengdu()], [s.hanZhao, s.cheng], "political", [[102, 28], [115, 40]]),
      step("luoyang-falls", 311, 304, "洛阳陷落，怀帝被俘", "汉军攻入洛阳，晋怀帝被俘，朝廷遭到重创。此后晋室在关中继续组织朝廷，313年愍帝在长安即位；这并非怀帝带着原朝廷迁都。地图只突出洛阳，背景304年早于此次失陷。", ["jin-luoyang-falls"], [point.luoyang()], [s.collapse], "campaign", [[110, 33], [115, 37]]),
      step("changan-falls", 316, 304, "长安粮尽出降，西晋朝廷结束", "刘曜围攻长安，晋愍帝在粮尽援绝后投降，西晋中央政权结束。洛阳与长安是相隔五年的两次失守，不是一条连续攻城路线；背景仍采用304年参考图，色块不表示316年双方控制区。", ["jin-changan-falls"], [point.changan()], [s.collapse], "campaign", [[106, 32], [112, 37]]),
    ],
  },
  {
    id: "jin-southward", title: "晋末南渡", period: "307—316", description: "司马睿先在江左建立据点，北方战乱再推动多批人口南迁。西晋导览讲到316年，以江南据点承接后来的东晋建政。",
    steps: [
      step("rui-at-jianye", 307, 304, "洛阳失陷前，司马睿已出镇建邺", "司马睿307年出镇建邺，王导协助联络江南名士。江左据点先于311年洛阳失陷形成，南渡不能全部解释成西晋灭亡后的行动。此时地名仍为建邺，背景采用304年参考图。", ["jin-rui-south"], [point.jianyeJin()], [s.yuan, s.wangDao], "political", [[115, 29], [121, 34]]),
      step("flight-after-luoyang", 311, 304, "军民分批避乱，江淮成为南迁通道", "洛阳失陷后，部分士族和军民经江淮进入江南，另有经荆襄、入河西等方向。虚线连接中原、江淮与江南的区域参照，表示多批迁徙的大致方向，不是一支队伍的真实道路；304年背景不代表311年疆域。", ["jin-luoyang-falls", "jin-southward-migration"], [point.luoyang(), point.guangling(), point.jingkou()], [s.collapse, s.wangDao], "migration", [[110, 29], [121, 37]]),
      step("jiangnan-continuity", 316, 304, "北方晋廷结束，江南据点仍在延续", "长安失守时，司马睿经营的江南据点仍在，南渡人口与当地名门共同影响江左政治。此处使用313年后改称的建康。后续是317年称晋王、318年称帝，不能提前写为316年；背景304年仅供地理参照。", ["jin-changan-falls", "jin-southward-migration"], [point.jiankang()], [s.collapse, s.yuan, s.wangDao], "political", [[115, 29], [121, 34.5]]),
    ],
  },
];

export const jinNarrativesBySeries: Record<string, MapNarrativeSequence[]> = {
  "jin-sixteen-kingdoms": [...jinSixteenNarratives, ...jinSixteenRelatedNarratives],
  "western-jin": narrativesForSeries("western-jin", westernJinNarratives),
  "eastern-jin": narrativesForSeries("eastern-jin", jinPeriodNarratives.filter(sequence => ["huan-wen-expeditions", "former-qin-fei", "liu-yu-expeditions"].includes(sequence.id))),
};
