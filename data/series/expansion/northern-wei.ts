import { book, event, person, place, polity, relation, source, type SeriesContent } from "./model";
import { expansionConfig } from "./configs";

const w = (ep: string, locator: string, ...refs: string[]) => source("northern-wei", `northern-wei-${ep}`, `北魏${ep}`, `北魏${ep}_clean_v1.md · ${locator}`, ...refs);
const rise = book("魏書", "卷2", "登国元年、天兴元年");
const reform = book("魏書", "卷7上", "太和九年均田令");
const luoyang = book("魏書", "卷7下", "太和十年三长制、十七至二十年迁都改革");
const crisis = book("魏書", "卷9", "正光年间");
const feng = book("魏書", "卷13", "文明皇后冯氏");
const e = w("05", "P027、P100、P118；均田、三长与迁都", reform, luoyang);

const people = [
  person("yuan-hong", "元宏", ["northern-wei"], ["北魏孝文帝"], ["ruler"], "即拓跋宏。承接冯太后时期改革，迁都洛阳，推行服饰、语言与姓氏改革；其政策改变了北魏统治重心。", e, 467, 499),
  person("tuoba-gui", "拓跋珪", ["northern-wei"], ["北魏道武帝"], ["ruler"], "386年重建拓跋政权并改称魏王，398年迁都平城、称帝。其崛起与前秦崩解、后燕衰落相联系。", w("02", "P065、P124—P125", rise), 371, 409),
  person("tuoba-si", "拓跋嗣", ["northern-wei"], ["北魏明元帝"], ["ruler"], "409年即位，继续经营平城政权；晚年趁刘宋皇位交接进攻河南，扩大北魏在黄河流域的势力。", w("03", "明元帝与河南战事段", book("魏書", "卷3", "太宗纪")), 392, 423),
  person("tuoba-tao", "拓跋焘", ["northern-wei"], ["北魏太武帝"], ["ruler", "general"], "以连续征战削平北方诸政权，439年灭北凉，完成北方主要地区的统一；其晚年发生灭佛与宫廷危机。", w("03", "太武帝统一北方段", book("魏書", "卷4上", "太延五年"), book("魏書", "卷4下", "太平真君七年")), 408, 452),
  person("tuoba-jun", "拓跋濬", ["northern-wei"], ["北魏文成帝"], ["ruler"], "452年宫廷动荡后即位，恢复佛教，平城时期的云冈石窟营造在其朝展开。", w("04", "P006—P016；文成帝段", book("魏書", "卷5", "高宗纪")), 440, 465),
  person("empress-feng-wei", "冯太后", ["northern-wei"], ["文明太后"], ["regent"], "文成帝皇后，在献文帝、孝文帝时期参与并主导朝政。其执政时期推动俸禄、均田和三长制度。", w("04", "冯太后执政段；制度线索续见北魏05", feng, reform), 442, 490),
  person("li-chong-wei", "李冲", ["northern-wei"], ["北魏大臣"], ["official"], "参与孝文帝朝制度改革，建议设置三长以组织基层户籍，改变豪强荫附下的赋役征收。", w("05", "P100及其后三长制段", book("魏書", "卷53", "李冲传"))),
  person("erzhu-rong", "尔朱荣", ["northern-wei"], ["北魏军事强人"], ["general"], "528年率军入洛，拥立孝庄帝并制造河阴之变。530年被孝庄帝诛杀，其军事集团仍深刻影响北魏末局。", w("06", "尔朱荣、河阴之变段", book("魏書", "卷74", "尔朱荣传")), 493, 530),
];

const events = [
  event({ id: "wei-founded", title: "拓跋珪复国，改称魏王", startYear: 386, eventType: "founding", tracks: ["wei-rise"], personIds: ["tuoba-gui"], dynastyIds: ["northern-wei"], locationIds: ["shengle"], summary: "拓跋珪即代王位后改称魏王，北魏由此起步。", background: "淝水之战后前秦瓦解，代北诸部重新组合。", process: "拓跋珪在牛川即位，移居盛乐，同年改称魏王。", result: "拓跋政权重新建立，开始向周边扩张。", impact: "386年建国与398年称帝是两个节点，不能合并。", consequenceEventIds: ["wei-capital-pingcheng"] }, w("02", "P065", rise)),
  event({ id: "wei-capital-pingcheng", title: "迁都平城，拓跋珪称帝", startYear: 398, eventType: "political", tracks: ["wei-rise"], personIds: ["tuoba-gui"], dynastyIds: ["northern-wei"], locationIds: ["pingcheng"], summary: "北魏把政治中心迁到平城，同年拓跋珪称帝。", background: "战胜后燕后，北魏需要组织新占领地区和迁入人口。", process: "营建都城、宗庙与国家礼制，改元天兴。", result: "平城成为北魏长期的都城。", impact: "军事联盟向定都、设官的王朝形态转变。", causeEventIds: ["wei-founded"] }, w("02", "P124—P125", rise)),
  event({ id: "wei-unifies-north", title: "北魏灭北凉，统一北方主要地区", startYear: 439, eventType: "war", tracks: ["wei-rise"], personIds: ["tuoba-tao"], dynastyIds: ["northern-wei"], locationIds: ["guzang"], summary: "拓跋焘攻取姑臧，北凉沮渠牧犍投降。", background: "北魏此前攻取夏都统万、迫使北燕退场；夏国余部最终于431年被吐谷浑击败。", process: "魏军进攻河西的北凉都城姑臧。", result: "北凉主要政权被消灭，北方格局趋于统一。", impact: "此后与刘宋南北对峙，河西人口与文化资源进一步流动。" }, w("03", "太武帝灭北凉段", book("魏書", "卷4上", "太延五年"))),
  event({ id: "wei-buddhism-suppression", title: "太武帝下令禁佛", startYear: 446, eventType: "political", tracks: ["wei-rise"], personIds: ["tuoba-tao"], dynastyIds: ["northern-wei"], locationIds: ["changan"], summary: "太武帝在长安事件后将打击佛教扩大为全国性命令。", background: "北魏朝廷内部存在对佛教资源及其政治影响的争论。", process: "朝廷下令毁寺、禁佛，对僧团实施严厉压制。", result: "北方佛教遭受严重打击。", impact: "文成帝即位后政策转变，显示宫廷与宗教的关系并非始终一致。" }, w("03", "太武帝灭佛段", book("魏書", "卷114", "释老志"))),
  event({ id: "wei-buddhism-restored", title: "文成帝即位，恢复佛教", startYear: 452, eventType: "succession", tracks: ["wei-rise"], personIds: ["tuoba-jun", "tuoba-tao"], dynastyIds: ["northern-wei"], locationIds: ["pingcheng"], summary: "太武帝死后的宫廷动乱结束，拓跋濬即位并恢复佛教。", background: "宗爱先后弑杀皇帝，北魏继承秩序遭到破坏。", process: "朝臣诛宗爱，迎立文成帝；朝廷解除佛教禁令。", result: "政局暂时稳定，寺院与僧团得以恢复。", impact: "为平城佛教艺术的发展提供了新的政治条件。" }, w("04", "P006—P016", book("魏書", "卷5", "兴安元年"), book("魏書", "卷114", "释老志"))),
  event({ id: "wei-feng-regency", title: "冯太后再次临朝", startYear: 476, eventType: "political", tracks: ["wei-reform"], personIds: ["empress-feng-wei", "yuan-hong"], dynastyIds: ["northern-wei"], locationIds: ["pingcheng"], summary: "献文帝死后，冯太后再次临朝，参与孝文帝前期政治。", background: "孝文帝年幼，皇室与太后之间的权力关系牵动朝政。", process: "冯太后掌握朝廷决策，持续整顿吏治与统治制度。", result: "形成太后主政、皇帝逐渐成长的政治格局。", impact: "太和改革有其前期积累，不能全部归于孝文帝迁都后的个人决策。" }, w("04", "P103及其后段", feng)),
  event({ id: "wei-equal-field", title: "颁行均田制", startYear: 485, eventType: "political", tracks: ["wei-reform"], personIds: ["yuan-hong", "empress-feng-wei"], dynastyIds: ["northern-wei"], locationIds: ["pingcheng"], summary: "北魏颁布均田令，规范授田、还田和农桑经营。", background: "战乱、流民与豪强荫附使国家掌握土地和人口面临困难。", process: "朝廷按身份、年龄等规定土地授受，并联系赋役管理。", result: "国家建立更有规则的土地与户口管理制度。", impact: "均田并非平均分尽全国土地，其制度影响延及后来的北朝与隋唐。", consequenceEventIds: ["wei-three-chiefs"] }, e),
  event({ id: "wei-three-chiefs", title: "设立三长制", startYear: 486, eventType: "political", tracks: ["wei-reform"], personIds: ["li-chong-wei", "yuan-hong", "empress-feng-wei"], dynastyIds: ["northern-wei"], locationIds: ["pingcheng"], summary: "以邻、里、党三长组织基层户籍，配合赋役征收。", background: "大量人口依附宗主，朝廷难以直接掌握户口。", process: "李冲提出方案，朝廷推行三长制。", result: "基层组织与户籍登记更直接地联系国家。", impact: "土地、户籍和赋役改革相互配合，但不能由制度文本推定各地完全一致实施。", causeEventIds: ["wei-equal-field"] }, e),
  event({ id: "wei-moves-luoyang", title: "北魏迁都洛阳", startYear: 494, eventType: "political", tracks: ["wei-reform"], personIds: ["yuan-hong"], dynastyIds: ["northern-wei"], locationIds: ["pingcheng", "luoyang"], summary: "继493年的迁都决策后，北魏朝廷迁入洛阳。", background: "孝文帝希望把政治中心更深入地置于中原。", process: "以南征展开迁都议程，营建洛阳并组织官民南迁。", result: "洛阳取代平城成为都城。", impact: "贵族、礼制和资源分配随之变化，南迁朝廷与北镇的距离扩大。", consequenceEventIds: ["wei-surname-reform"] }, w("05", "P118起迁都段", luoyang)),
  event({ id: "wei-surname-reform", title: "拓跋改姓元，改革姓族制度", startYear: 496, eventType: "political", tracks: ["wei-reform"], personIds: ["yuan-hong"], dynastyIds: ["northern-wei"], locationIds: ["luoyang"], summary: "皇室改姓元，鲜卑贵族姓氏与门第秩序重新调整。", background: "迁都后，孝文帝继续推动语言、服饰和官僚礼制改革。", process: "以诏令调整姓氏与姓族等级，鼓励贵族通婚。", result: "朝廷统治精英的文化表达和身份秩序发生变化。", impact: "改革不意味着族群差异瞬间消失，后续矛盾还受军事和经济因素影响。", causeEventIds: ["wei-moves-luoyang"] }, w("05", "迁都后的姓氏改革段", luoyang)),
  event({ id: "wei-six-garrisons", title: "六镇起事蔓延", startYear: 524, eventType: "war", tracks: ["wei-crisis"], personIds: [], dynastyIds: ["northern-wei"], locationIds: ["woye"], summary: "以沃野镇破六韩拔陵起事为重要节点，北镇动乱扩大。", background: "北镇军民地位、供给与边地治理长期积累矛盾。", process: "镇民起事波及多镇，朝廷调兵镇压，战乱与迁徙继续扩散。", result: "北魏军事和社会秩序遭到严重冲击。", impact: "新的军事集团崛起，成为此后东西分裂的重要背景。", disputedNote: "北镇危机有523年的前奏；本条524年专指沃野起事扩大的阶段。" }, w("06", "P024及北镇动乱段", crisis)),
  event({ id: "wei-heyin-massacre", title: "河阴之变", startYear: 528, eventType: "political", tracks: ["wei-crisis"], personIds: ["erzhu-rong"], dynastyIds: ["northern-wei"], locationIds: ["heyin"], summary: "尔朱荣入洛拥立孝庄帝，并在河阴大规模杀戮朝臣。", background: "孝明帝死后朝廷失去稳定的继承秩序，尔朱荣率军南下。", process: "尔朱荣控制皇帝与百官，以集会为名实施屠杀。", result: "洛阳中央官僚体系遭受重创，军人集团掌握大权。", impact: "北魏名义上的皇权与实际军权更加分离。", consequenceEventIds: ["wei-split-eastern-wei"] }, w("06", "尔朱荣与河阴之变段", book("魏書", "卷74", "尔朱荣传"))),
];

export const northernWei: SeriesContent = {
  config: expansionConfig("northern-wei"), introduction: "从386年拓跋珪复国到534年东西分裂，沿建国、改革和危机三条线索阅读。迁都不是一瞬间的决定，汉化也不能独自解释一个王朝的兴亡。",
  dynasties: [polity("northern-wei", "北魏", 386, 534, "盛乐 → 平城 → 洛阳", "#816c53", "拓跋氏建立的北方王朝，439年统一北方主要地区；太和改革后迁都洛阳，末期军政危机中分裂。", e)],
  people, events,
  locations: [place("shengle", "盛乐", 111.8, 40.4, "今内蒙古和林格尔一带", w("02", "P065", rise)), place("pingcheng", "平城", 113.3, 40.1, "今山西大同", e), place("guzang", "姑臧", 102.6, 37.9, "今甘肃武威", w("03", "灭北凉段", book("魏書", "卷4上", "太延五年"))), place("woye", "沃野镇", 108.1, 41.1, "河套地区；仅示意其区域", w("06", "六镇段", crisis)), place("heyin", "河阴", 113.4, 34.9, "今河南荥阳北黄河沿岸一带", w("06", "河阴之变段", book("魏書", "卷74", "尔朱荣传")))],
  relations: [relation("tuoba-gui", "tuoba-si", "family", "父子；道武帝与明元帝。", w("03", "皇位继承段", book("魏書", "卷3", "太宗纪"))), relation("tuoba-si", "tuoba-tao", "family", "父子；明元帝与太武帝。", w("03", "太武帝继位段", book("魏書", "卷4上", "世祖纪"))), relation("empress-feng-wei", "yuan-hong", "political", "冯太后临朝，抚育并影响孝文帝前期政治。", w("04", "冯太后执政段", feng)), relation("yuan-hong", "li-chong-wei", "ruler-subject", "李冲参与太和改革。", e)],
  shared: { dynasties: ["eastern-wei", "western-wei"], people: ["gao-huan", "yuwen-tai"], events: ["wei-split-eastern-wei"], locations: ["luoyang", "changan", "ye"] },
  readingPaths: [
    { id: "wei-building", title: "拓跋如何建立北魏", period: "386—452", description: "从复国、定都到统一北方，读出战争与王朝建设的关系。", eventIds: ["wei-founded", "wei-capital-pingcheng", "wei-unifies-north", "wei-buddhism-suppression", "wei-buddhism-restored"] },
    { id: "wei-changing", title: "改革如何改变国家", period: "476—496", description: "把冯太后、均田、三长和迁都放在连续的制度变化中。", eventIds: ["wei-feng-regency", "wei-equal-field", "wei-three-chiefs", "wei-moves-luoyang", "wei-surname-reform"] },
    { id: "wei-breaking", title: "从迁都走向东西分裂", period: "494—534", description: "制度变化、北镇危机与军事强人的兴起，并非一条单因果链。", eventIds: ["wei-moves-luoyang", "wei-six-garrisons", "wei-heyin-massacre", "wei-split-eastern-wei"] },
  ],
};
