import { book, event, person, place, polity, relation, source, type SeriesContent } from "./model";
import { expansionConfig } from "./configs";

const d = (ep: "上" | "下", locator: string, ...refs: string[]) => source("dali", ep === "上" ? "dali-01" : "dali-02", `大理史说（${ep}）`, `大理（${ep}）_clean_v1.md · ${locator}`, ...refs);
const tang = book("新唐書", "卷222上", "南诏上");
const tangLate = book("新唐書", "卷222中", "南诏续");
const yunnan = "李京《云南志略》云南总叙、段氏世系（旧地方志记载） — https://zh.wikisource.org/wiki/雲南志略";
const daliFounding = "云南省民族宗教事务委员会《段思平》· 937年建立大理国 — https://mzzj.yn.gov.cn/html/2002/yunnanlishiminzurenwu_0101/8266.html";
const mongol = book("元史", "卷004", "世祖本纪一，宪宗三年征大理");
const n = d("上", "P022、P067—P117", tang);
const later = d("下", "高氏、段氏更替段", yunnan);
const people = [
  person("duan-siping", "段思平", ["dali-kingdom"], ["大理国建立者"], ["ruler"], "937年推翻大义宁，建立段氏大理政权，以羊苴咩城为都。早期生平细节主要见于后世地方史记载。", d("上", "P189；续大理下开国段", yunnan, daliFounding)),
  person("piluoge", "皮逻阁", ["nanzhao"], ["南诏王"], ["ruler"], "蒙舍诏首领，统一洱海地区诸诏，738年获唐朝封云南王，为南诏兴起奠定基础。", n),
  person("geluofeng", "阁逻凤", ["nanzhao"], ["南诏王"], ["ruler"], "皮逻阁之子。其朝与唐发生天宝战争，转而联合吐蕃，并通过南诏德化碑陈述政治立场。", d("上", "P099—P117", tang)),
  person("yimouxun", "异牟寻", ["nanzhao"], ["南诏王"], ["ruler"], "阁逻凤之孙。794年转而与唐会盟，结束对吐蕃的依附关系，重新调整南诏外交。", d("上", "P117起唐蕃关系段", tang)),
  person("zheng-hui-nanzhao", "郑回", ["nanzhao"], ["清平官"], ["official"], "原为唐朝官员，进入南诏后长期参与政务和教育，在异牟寻转向与唐结盟的过程中发挥作用。", d("上", "P119及清平官段", tang)),
  person("zheng-maisi", "郑买嗣", ["dachanghe"], ["大长和建立者"], ["ruler"], "902年取代南诏蒙氏，建立大长和。此后洱海地区经历数次短暂政权更替，直至段氏建立大理。", d("上", "P178—P189", yunnan)),
  person("gao-shengtai", "高升泰", ["dali-kingdom", "dazhong"], ["大理权臣", "大中国建立者"], ["ruler", "official"], "高氏权臣，1094年取代段氏称帝；1096年去世后，高氏拥立段正淳恢复大理国号。", later),
  person("duan-zhengchun", "段正淳", ["dali-kingdom"], ["大理国君主"], ["ruler"], "段氏宗室，1096年在高氏支持下即位，恢复段氏王统。史实身份不同于小说中虚构的家族情节。", d("下", "P126起段正淳段；转写重复不作世系证据", yunnan)),
  person("duan-xingzhi", "段兴智", ["dali-kingdom"], ["大理国末主"], ["ruler"], "1253年蒙古攻取大理时的君主；其后被俘归附，段氏仍在蒙古、元的统治体系下管理地方。", d("下", "P180—P201", mongol, book("元史", "卷166", "信苴日传"))),
  person("kublai", "忽必烈", [], ["蒙古宗王", "后为元世祖"], ["ruler", "general"], "1253年奉蒙哥之命率军进攻大理，渡金沙江并攻取都城。此时尚未建立元朝，不应把战事称作元朝皇帝南征。", d("下", "P180—P196", mongol), 1215, 1294),
];
const events = [
  event({ id: "nanzhao-unifies", title: "皮逻阁统一六诏，获封云南王", startYear: 738, eventType: "founding", tracks: ["nanzhao-rise"], personIds: ["piluoge"], dynastyIds: ["nanzhao"], locationIds: ["taihe-dali"], summary: "蒙舍诏崛起并统一洱海地区，唐封皮逻阁为云南王。", background: "洱海诸诏处于唐、吐蕃等力量交错的地区。", process: "皮逻阁通过兼并和唐朝支持扩大统治。", result: "形成以洱海为核心的南诏政权。", impact: "南诏成为唐蕃之外影响西南格局的重要力量。", disputedNote: "火烧松明楼等故事属于传说叙事，不据此复原统一过程。" }, n),
  event({ id: "nanzhao-tianbao-first", title: "天宝战争：鲜于仲通攻南诏失利", startYear: 751, eventType: "war", tracks: ["nanzhao-rise"], personIds: ["geluofeng"], dynastyIds: ["nanzhao"], locationIds: ["taihe-dali"], summary: "唐军进攻南诏失败，南诏与吐蕃结盟。", background: "地方冲突和政治关系破裂，使唐与南诏走向战争。", process: "鲜于仲通率唐军南下，在洱海地区被击败。", result: "唐未能征服南诏，南诏转向吐蕃。", impact: "西南战争牵动唐帝国边疆战略。" }, d("上", "P099—P114", tang)),
  event({ id: "nanzhao-tianbao-second", title: "李宓再攻南诏，唐军再败", startYear: 754, eventType: "war", tracks: ["nanzhao-rise"], personIds: ["geluofeng"], dynastyIds: ["nanzhao"], locationIds: ["taihe-dali"], summary: "唐再派李宓出兵南诏，仍未能扭转战局。", background: "751年失利后，唐廷继续追求军事解决。", process: "唐军远征，面临战斗、疾病和补给困难。", result: "李宓军败，南诏守住核心地区。", impact: "连续战争加剧双方对立，不能把所有损失概括为同一次战役。" }, d("上", "天宝年间连续战争段", tang)),
  event({ id: "nanzhao-cangshan-oath", title: "苍山会盟，南诏重新联唐", startYear: 794, eventType: "political", tracks: ["nanzhao-rise"], personIds: ["yimouxun", "zheng-hui-nanzhao"], dynastyIds: ["nanzhao"], locationIds: ["cangshan"], summary: "异牟寻与唐使会盟，调整对吐蕃和唐的关系。", background: "吐蕃的征发压力与南诏自身利益发生冲突。", process: "双方沟通后在苍山会盟，南诏与唐重新建立合作。", result: "唐蕃南诏之间的力量平衡改变。", impact: "南诏外交并非固定依附一方，而是随局势调整。" }, d("上", "异牟寻、郑回与会盟段", tang)),
  event({ id: "nanzhao-chengdu-raid", title: "南诏军进入成都", startYear: 829, eventType: "war", tracks: ["nanzhao-transition"], personIds: [], dynastyIds: ["nanzhao"], locationIds: ["chengdu"], summary: "南诏军进攻剑南并进入成都外郭，掠取人口与工匠后撤退。", background: "唐西川防务松弛，南诏则处在对外扩张阶段。", process: "南诏军迅速推进至成都，造成严重破坏。", result: "大量人员与技术被带往南诏。", impact: "唐诏关系再度恶化，人口迁移也带来技术和文化流动。" }, d("上", "王嵯巅、成都战事段", tangLate)),
  event({ id: "nanzhao-falls", title: "郑买嗣代蒙氏，南诏结束", startYear: 902, eventType: "collapse", tracks: ["nanzhao-transition"], personIds: ["zheng-maisi"], dynastyIds: ["nanzhao", "dachanghe"], locationIds: ["yangjumie"], summary: "郑买嗣取代南诏蒙氏，建立大长和。", background: "南诏晚期宫廷权力集中于权臣，继承秩序不稳。", process: "郑氏夺取王位，改立新国号。", result: "南诏王统结束。", impact: "南诏并非直接变成段氏大理，中间还有大长和、大天兴、大义宁。" }, d("上", "P178—P189", yunnan)),
  event({ id: "dali-founded", title: "段思平建立大理国", startYear: 937, eventType: "founding", tracks: ["nanzhao-transition", "dali-kingdom"], personIds: ["duan-siping"], dynastyIds: ["dali-kingdom"], locationIds: ["yangjumie"], summary: "段思平推翻大义宁，建立大理国。", background: "南诏结束后的数十年间，洱海地区政权频繁更替。", process: "段氏联合地方力量夺取统治，以羊苴咩城为都。", result: "段氏大理王统开始。", impact: "大理继承南诏的部分政治文化资源，但不是同一王朝的简单改名。", disputedNote: "《云南志略》记作天福三年，与常用的937年存在一年差异；本条采用云南省民族宗教事务委员会人物资料所列937年，旧志仍作为世系材料列出。" }, d("上", "P189；下集开篇", yunnan, daliFounding)),
  event({ id: "dali-gao-usurpation", title: "高升泰代段氏，建立大中国", startYear: 1094, eventType: "political", tracks: ["dali-kingdom"], personIds: ["gao-shengtai"], dynastyIds: ["dali-kingdom", "dazhong"], locationIds: ["yangjumie"], summary: "高升泰取代段正明，短暂建立大中国。", background: "高氏在大理政治中长期掌握重要权力。", process: "段氏失去帝位，高升泰称帝。", result: "段氏王统短暂中断。", impact: "高氏与段氏之间的权力关系，是理解大理政治的重要线索。" }, later),
  event({ id: "dali-restored", title: "段正淳即位，恢复大理国", startYear: 1096, eventType: "founding", tracks: ["dali-kingdom"], personIds: ["duan-zhengchun", "gao-shengtai"], dynastyIds: ["dali-kingdom", "dazhong"], locationIds: ["yangjumie"], summary: "高升泰去世后，高氏拥立段正淳，恢复大理国号。", background: "高氏取代段氏未能形成稳定的新王统。", process: "高氏依照还政安排拥立段氏宗室。", result: "段氏恢复帝位，高氏继续保持重要影响。", impact: "“后理”延续的是段氏王统与高氏掌权相并存的格局。" }, d("下", "P126起；段正淳即位段", yunnan)),
  event({ id: "dali-mongol-conquest", title: "蒙古军攻取大理", startYear: 1253, eventType: "collapse", tracks: ["dali-kingdom"], personIds: ["duan-xingzhi", "kublai"], dynastyIds: ["dali-kingdom"], locationIds: ["jinsha-crossing", "yangjumie"], summary: "忽必烈率蒙古军渡金沙江，攻取大理都城。", background: "蒙古在与南宋的战争中寻求新的南方进路。", process: "蒙古军分路推进，突破山川与城防，段兴智逃走。", result: "大理独立王国的统治瓦解。", impact: "段氏后续仍参与地方治理；云南行省的设置是更晚的制度变化。", disputedNote: "本专题以1253年都城陷落为终点；段兴智被俘和归附发生在其后，不能压缩成同一事件，也不能把此年写成云南行省建立年。" }, d("下", "P180—P201；纠正P185、P188把行省设置前移的说法", mongol, book("元史", "卷166", "信苴日传"))),
];
export const dali: SeriesContent = {
  config: expansionConfig("dali"), introduction: "上篇讲南诏与唐蕃之间的选择，下篇讲段氏和高氏的权力关系。小说人物可以成为入口，历史判断仍需回到纪传、碑刻与地方史；对后世记载保留其材料局限。",
  dynasties: [polity("nanzhao", "南诏", 738, 902, "太和城 → 羊苴咩城", "#6f8468", "由蒙舍诏发展而来，统一洱海地区后成为西南强国，外交在唐、吐蕃之间不断调整。", n), polity("dachanghe", "大长和", 902, 928, "羊苴咩城", "#987b61", "郑氏取代蒙氏建立的政权，是南诏与大理之间的过渡之一。", d("上", "P187", yunnan)), polity("dali-kingdom", "大理国", 937, 1253, "羊苴咩城", "#537a78", "段氏建立的洱海政权，1094—1096年王统被高氏短暂取代；其后恢复段氏王统，高氏继续掌握重要权力。", later), polity("dazhong", "大中国", 1094, 1096, "羊苴咩城", "#a48f65", "高升泰建立的短暂政权，1096年高氏还政段氏。", later)], people, events,
  locations: [place("taihe-dali", "太和城", 100.2, 25.66, "今云南大理太和村一带", n), place("yangjumie", "羊苴咩城", 100.16, 25.69, "今云南大理古城及周边", later), place("cangshan", "苍山", 100.1, 25.71, "今大理苍山地区；会盟地点作区域参照", n), place("jinsha-crossing", "金沙江渡江区域", 99.95, 26.86, "今云南丽江西北金沙江一带；非精确渡口复原", d("下", "P182—P185", mongol))],
  relations: [relation("piluoge", "geluofeng", "family", "父子。", n), relation("geluofeng", "yimouxun", "family", "祖孙；中间一代凤伽异先卒。", d("上", "P032", tang)), relation("yimouxun", "zheng-hui-nanzhao", "ruler-subject", "郑回参与政务并支持与唐修好。", d("上", "P119及其后", tang)), relation("duan-xingzhi", "kublai", "enemy", "1253年蒙古进攻大理，段兴智抵抗后逃亡。", d("下", "P180—P196", mongol))],
  shared: { locations: ["chengdu"] },
  readingPaths: [
    { id: "dali-tang-tibet", title: "南诏如何在唐蕃之间选择", period: "738—829", description: "结盟、战争与再结盟，外交随利益和压力变化。", eventIds: ["nanzhao-unifies", "nanzhao-tianbao-first", "nanzhao-tianbao-second", "nanzhao-cangshan-oath", "nanzhao-chengdu-raid"] },
    { id: "dali-transitions", title: "南诏并不等于大理", period: "829—937", description: "从扩张到王统中断，再到段氏建立新政权。", eventIds: ["nanzhao-chengdu-raid", "nanzhao-falls", "dali-founded"] },
    { id: "dali-duan-gao", title: "段氏、高氏与蒙古南下", period: "937—1253", description: "王位与实权的分合，比武侠小说更能解释大理政治。", eventIds: ["dali-founded", "dali-gao-usurpation", "dali-restored", "dali-mongol-conquest"] },
  ],
};
