import type { HistoricalEvent, SourcedEntity } from "@/types/history";
import { person, place, polity, relation, type SeriesContent } from "../expansion/model";
import { easternJinConfig, easternJinEventIds, easternJinSharedEventIds, jinSixteenConfig, jinSixteenEventIds, jinSixteenSharedEventIds, westernJinConfig, westernJinEventIds, westernJinSharedEventIds } from "./config";

const jin = (volume: number, locator: string) => `《晋书》卷${volume} · ${locator} — https://zh.wikisource.org/wiki/晉書/卷${String(volume).padStart(3, "0")}`;
const tongjian = (volume: number, locator: string) => `《资治通鉴》卷${volume} · ${locator} — https://zh.wikisource.org/wiki/資治通鑑/卷${volume}`;
const wei = (volume: string, locator: string) => `《魏书》卷${volume} · ${locator} — https://zh.wikisource.org/wiki/魏書/卷${volume}`;
const song = (volume: number, locator: string) => `《宋书》卷${volume} · ${locator} — https://zh.wikisource.org/wiki/宋書/卷${volume}`;
const evidence = (...sourceRefs: string[]): SourcedEntity => ({ contentOrigin: "historical-extension", sourceEpisodes: [], verificationStatus: "reviewed", sourceRefs });

export const jinSixteenSources = {
  unification: jin(3, "武帝纪，泰始元年及太康元年"),
  wuCampaign: jin(42, "王濬传，伐吴出巴蜀、进建业"),
  hui: jin(4, "惠帝纪，元康与永康、永宁年间"),
  empress: jin(31, "惠贾皇后传"),
  collapse: jin(5, "怀帝、愍帝纪，永嘉五年、建兴四年"),
  yuan: jin(6, "元帝纪，永嘉元年、建武元年、大兴元年"),
  wangDao: jin(65, "王导传，徙镇建康与江左建政"),
  hanZhao: jin(101, "刘元海载记，建汉与晋末战局"),
  liuYao: jin(103, "刘曜载记，改号赵与石勒之战"),
  shiLe: jin(104, "石勒载记上，称赵王与襄国建政"),
  shiLeLater: jin(105, "石勒载记下，灭刘曜与据有北方"),
  shiHu: jin(107, "石季龙载记下，石氏内乱与冉闵"),
  cheng: jin(121, "李雄、李寿、李势载记"),
  liang: jin(86, "张轨、张寔、张茂、张骏、张重华、张玄靓、张天锡传"),
  yan: jin(109, "慕容皝载记"),
  yanJun: jin(110, "慕容儁载记，攻邺与称帝"),
  yanLater: jin(111, "慕容暐载记，枋头与前燕灭亡"),
  qinEarly: jin(112, "苻洪、苻健、苻生载记"),
  qinRise: jin(113, "苻坚载记上，建政、灭燕、取蜀及凉代"),
  fei: jin(114, "苻坚载记下，淝水与战后诸部起兵"),
  xie: jin(79, "谢安、谢玄传，北府军与淝水之战"),
  huan: jin(98, "桓温传，灭蜀与三次北伐"),
  yao: jin(116, "姚弋仲、姚襄、姚苌载记"),
  yaoXing: jin(117, "姚兴载记上"),
  liTe: jin(120, "李特、李流载记，流民入蜀与起兵"),
  zuTi: jin(62, "祖逖传，渡江北伐与经营河南"),
  sunLuQiao: jin(100, "孙恩、卢循、谯纵传"),
  qinEnd: jin(115, "苻丕、苻登载记，太元十九年前秦灭亡"),
  qiuChi: song(98, "氐胡传，杨氏仇池"),
  murong: jin(123, "慕容垂载记，复燕与灭西燕"),
  westernQin: jin(125, "乞伏国仁、乞伏乾归、乞伏炽磐、乞伏暮末载记"),
  laterLiang: jin(122, "吕光载记"),
  southernLiang: jin(126, "秃发乌孤、秃发利鹿孤、秃发傉檀载记"),
  northernLiang: jin(129, "沮渠蒙逊载记"),
  southernYan: jin(127, "慕容德、慕容超载记"),
  westernLiang: jin(87, "李玄盛传，李暠、李歆与李恂"),
  northernYan: jin(124, "慕容宝及后燕末局"),
  fengBa: jin(125, "冯跋载记"),
  xia: jin(130, "赫连勃勃载记，建夏、统万城与关中战事"),
  weiRise: wei("2", "太祖纪，登国元年、十年与天兴元年"),
  dai: wei("1", "序纪，拓跋猗卢与昭成帝"),
  weiUnification: wei("4上", "世祖纪，始光、神䴥与太延年间"),
  liuYuEarly: song(1, "武帝上，京口起兵与义熙五至六年伐南燕"),
  liuYuQin: song(2, "武帝中，义熙十二至十四年伐秦及撤军"),
  songFounding: song(3, "武帝下，永初元年代晋建宋"),
  suJun: jin(7, "成帝纪，咸和二至四年苏峻之乱"),
  northernYanEnd: tongjian(123, "宋文帝元嘉十三年，冯弘奔高丽"),
};
const s = jinSixteenSources;

const dynasties = [
  polity("western-jin", "西晋", 265, 316, "洛阳 → 长安", "#b58a51", "司马炎于265年代魏建晋，280年灭吴完成统一；宗王战争和地方军事集团的扩张后，洛阳、长安先后失守。", evidence(s.unification, s.collapse)),
  polity("eastern-jin", "东晋", 317, 420, "建康", "#b88d5a", "司马睿317年在建康称晋王、318年称帝，延续晋室。朝廷依靠士族与地方军队立足江南，420年被刘宋取代。", evidence(s.yuan, s.songFounding)),
  polity("han-zhao", "汉赵（前赵）", 304, 329, "平阳 → 长安", "#966951", "传统十六国之一。刘渊304年称汉王，刘曜319年改国号赵；与石勒的后赵须分别辨认。统治集团起于南匈奴，臣民构成多元。", evidence(s.hanZhao, s.liuYao)),
  polity("later-zhao", "后赵", 319, 351, "襄国 → 邺", "#886955", "传统十六国之一。石勒319年称赵王，329年灭汉赵；石虎继掌大权，349年后内乱加剧。石勒出自羯人背景，不代表全境居民的族属。", evidence(s.shiLe, s.shiLeLater, s.shiHu)),
  polity("cheng-han", "成汉", 304, 347, "成都", "#7f9063", "传统十六国之一。李雄304年称成都王、306年称帝建成，李寿338年改号汉。由流民军事力量进入蜀地建政，347年被桓温攻灭。", evidence(s.cheng, s.huan)),
  polity("former-liang", "前凉", 301, 376, "姑臧", "#b1985a", "传统十六国之一。张轨301年任凉州刺史是张氏据有河西的起点，其后形成世袭统治；长期奉晋正朔，376年降前秦。", evidence(s.liang, s.qinRise)),
  polity("former-yan", "前燕", 337, 370, "龙城 → 蓟 → 邺", "#79907f", "传统十六国之一。慕容皝337年称燕王，慕容儁352年称帝。以辽西为起点进入河北，370年被前秦消灭；统治家族出自慕容鲜卑。", evidence(s.yan, s.yanJun, s.yanLater, s.qinRise)),
  polity("former-qin", "前秦", 351, 394, "长安；后期辗转陇右", "#8f7256", "传统十六国之一。苻健351年称天王，苻坚时期兼并北方诸国；383年淝水败后分裂，残余政权延续至394年。统治家族有氐人背景。", evidence(s.qinEarly, s.qinRise, s.fei, jin(115, "苻丕、苻登载记"))),
  polity("later-yan", "后燕", 384, 407, "中山 → 龙城", "#6e8678", "传统十六国之一。慕容垂384年复建燕国，曾控制河北；参合陂战败和北魏进攻后退守辽西，407年高云取代慕容熙。", evidence(s.murong, s.northernYan, s.weiRise)),
  polity("later-qin", "后秦", 384, 417, "长安", "#a18563", "传统十六国之一。姚苌384年称秦王，姚兴时控制关中并支持佛经翻译；417年刘裕军入长安。姚氏出自羌人军事集团。", evidence(s.yao, s.yaoXing, s.liuYuQin)),
  polity("western-qin", "西秦", 385, 431, "勇士川 → 金城、苑川 → 枹罕", "#a89573", "传统十六国之一。乞伏氏在陇右建政，400年一度失国，409年恢复；431年被赫连定消灭，不能把385—431年视作连续独立统治。", evidence(s.westernQin, s.weiUnification)),
  polity("later-liang-sixteen", "后凉", 386, 403, "姑臧", "#93836a", "传统十六国之一。吕光西征归来据河西，386年独立建号；后期分裂为多个政权，403年吕隆向后秦交出姑臧。", evidence(s.laterLiang, s.yao)),
  polity("southern-liang-sixteen", "南凉", 397, 414, "廉川、乐都；一度据姑臧", "#89966c", "传统十六国之一。秃发氏397年建立政权，活动于青海东北与河西；414年被西秦消灭。与502年萧衍建立的南梁不同。", evidence(s.southernLiang, s.westernQin)),
  polity("southern-yan", "南燕", 398, 410, "滑台 → 广固", "#9a8765", "传统十六国之一。后燕失去河北后，慕容德398年在滑台称燕王，继而据山东广固；410年被刘裕攻灭。", evidence(s.southernYan, s.liuYuEarly)),
  polity("western-liang-sixteen", "西凉", 400, 421, "敦煌 → 酒泉", "#c0a06d", "传统十六国之一。李暠400年据敦煌建政，405年迁酒泉；420年李歆败亡，421年李恂守敦煌的余部被北凉消灭。", evidence(s.westernLiang, s.northernLiang)),
  polity("northern-liang", "北凉", 397, 439, "张掖 → 姑臧", "#938e64", "传统十六国之一。397年段业被拥立，401年沮渠蒙逊取代段业。439年姑臧政权降北魏；沮渠氏余部此后仍在高昌活动。", evidence(s.northernLiang, s.weiUnification)),
  polity("northern-yan", "北燕", 407, 436, "龙城", "#788f89", "传统十六国之一。通常从407年高云取代慕容熙算起，409年冯跋掌权；436年冯弘弃龙城奔高句丽。与前燕、后燕及南燕分别列示。", evidence(s.northernYan, s.fengBa, s.northernYanEnd)),
  polity("hu-xia", "夏（赫连夏）", 407, 431, "统万", "#ab836c", "传统十六国之一。赫连勃勃407年建立夏国，后营建统万城并争夺关中；北魏夺取都城后，赫连定转入陇右，431年被吐谷浑俘获。", evidence(s.xia, s.weiUnification)),
  polity("dai", "代", 315, 376, "盛乐", "#8c9b86", "相关政权，不在传统十六国名单中。拓跋猗卢315年受封代王，拓跋什翼犍时期以盛乐为中心；376年前秦攻代后旧有政权瓦解。", evidence(s.dai, s.qinRise)),
  polity("ran-wei", "冉魏", 350, 352, "邺", "#a37f75", "相关政权，不在传统十六国名单中。冉闵在后赵内乱中称帝，统治仅延续两年；其屠杀引发严重灾难，不能据此简化为单一族群的战争。", evidence(s.shiHu, s.yanJun)),
  polity("western-yan", "西燕", 384, 394, "长安 → 长子", "#998882", "相关政权，不在传统十六国名单中。前秦瓦解后慕容泓等起兵，随后历经内部争夺、东迁和定都长子；394年被慕容垂的后燕消灭。", evidence(s.fei, s.murong)),
  polity("qiao-shu", "谯蜀", 405, 413, "成都", "#a08069", "相关政权，不在传统十六国名单中。405年蜀中军队兵变，拥立谯纵，后据成都称王并向后秦称藩；413年刘裕遣朱龄石入蜀将其消灭。409年不能把成都直接画为东晋控制区。", evidence(s.sunLuQiao, s.liuYuEarly)),
  polity("qiu-chi", "仇池", 296, 443, "仇池、历城", "#a18c79", "相关政权，不在传统十六国名单中。杨氏在陇南建立的前仇池于371年被前秦攻灭；385年杨定回到陇右重建，后仇池延续到443年。296—443年不是连续独立统治；地图只概括核心据地，不将受晋秦册封等同直接归属。", evidence(s.qiuChi, jin(113, "苻坚灭仇池"), "《宋书》卷98 · 氐胡 — https://zh.wikisource.org/wiki/宋書/卷98")),
];

const people = [
  person("sima-yan", "司马炎", ["western-jin"], ["晋武帝"], ["ruler"], "265年继承司马氏权力并代魏建晋，280年灭吴。他所建立的统一帝国仍面临宗室封建、继承安排和地方治理的问题。", evidence(s.unification), 236, 290),
  person("sima-rui", "司马睿", ["western-jin", "eastern-jin"], ["晋元帝"], ["ruler"], "原为琅邪王，307年出镇建邺。西晋灭亡后在江南重建朝廷，317年称晋王、318年称帝，借助王导等协调南北士族。", evidence(s.yuan, s.wangDao), 276, 323),
  person("liu-yuan", "刘渊", ["western-jin", "han-zhao"], ["汉赵建立者"], ["ruler"], "出身南匈奴贵族，曾参与西晋军政。304年乘宗王内战称汉王，以汉室继承叙事组织政权，308年称帝。", evidence(s.hanZhao), undefined, 310),
  person("li-xiong", "李雄", ["cheng-han"], ["成武帝"], ["ruler", "general"], "继承父辈流民军事集团在蜀地的力量，304年称成都王、306年称帝。其政治基础来自战乱中的移民与蜀地地方社会。", evidence(s.cheng), 274, 334),
  person("shi-le", "石勒", ["han-zhao", "later-zhao"], ["后赵建立者"], ["ruler", "general"], "从战乱中的被卖与流亡经历进入军事集团，曾属刘渊政权，319年称赵王，329年消灭刘曜势力，成为北方最强统治者之一。", evidence(s.shiLe, s.shiLeLater), 274, 333),
  person("ran-min", "冉闵", ["later-zhao", "ran-wei"], ["冉魏建立者"], ["ruler", "general"], "在石虎死后的后赵内乱中崛起，350年在邺称帝，352年被前燕俘杀。他下令实施的大规模屠杀是这一时期社会灾难的一部分。", evidence(s.shiHu, s.yanJun), undefined, 352),
  person("murong-huang", "慕容皝", ["former-yan"], ["前燕奠基者"], ["ruler"], "继承慕容廆在辽西的基础，337年称燕王，经营龙城并与周边势力交战，为前燕进入河北创造条件。", evidence(s.yan), 297, 348),
  person("murong-chui", "慕容垂", ["former-yan", "former-qin", "later-yan"], ["后燕建立者"], ["ruler", "general"], "曾为前燕将领，枋头获胜后因宫廷猜忌奔前秦；淝水战后复建后燕，394年灭西燕，396年去世。", evidence(s.yanLater, s.murong), 326, 396),
  person("fu-jian", "苻坚", ["former-qin"], ["前秦宣昭帝"], ["ruler"], "357年取代苻生执政，借重王猛治理并兼并北方诸国。383年大举攻晋在淝水失利，随后统治集团离散，385年被姚苌杀害。", evidence(s.qinRise, s.fei), 338, 385),
  person("xie-an", "谢安", ["eastern-jin"], ["东晋大臣"], ["official"], "由士族名士进入中枢，桓温死后成为朝廷重要主持者。淝水战时协调东晋军政，其声望与谢氏军事力量密切相连。", evidence(s.xie), 320, 385),
  person("xie-xuan", "谢玄", ["eastern-jin"], ["北府军将领"], ["general"], "谢安之侄，377年出镇广陵，招集刘牢之等组成北府劲旅。383年参与指挥淝水之战，战后向淮北、河南推进。", evidence(s.xie), 343, 388),
  person("huan-wen", "桓温", ["eastern-jin"], ["东晋权臣与北伐将领"], ["general", "regent"], "347年灭成汉，其后三次北伐，曾入关中、收复洛阳，369年在枋头失利。军事行动与其扩大朝廷权力的目标相互交织。", evidence(s.huan), 312, 373),
  person("yao-chang", "姚苌", ["former-qin", "later-qin"], ["后秦建立者"], ["ruler", "general"], "出自羌人姚氏军事集团，曾为苻坚部将。384年起兵建后秦，385年杀苻坚，逐步争取关中。", evidence(s.yao), 331, 393),
  person("helian-bobo", "赫连勃勃", ["later-qin", "hu-xia"], ["夏国建立者"], ["ruler", "general"], "本姓刘，出身铁弗部，曾依附后秦，407年建立夏国。413年营建统万城并改姓赫连，418年乘刘裕南返夺取长安。", evidence(s.xia), 381, 425),
  person("wang-dao", "王导", ["western-jin", "eastern-jin"], ["东晋大臣"], ["official"], "辅佐司马睿在江南建政，联络南渡士族与江南地方名门。其影响说明东晋的建立既依赖皇室，也依赖地方社会的合作。", evidence(s.wangDao), 276, 339),
  person("jia-nanfeng", "贾南风", ["western-jin"], ["晋惠帝皇后"], ["regent", "royal-family"], "晋惠帝皇后，291年参与清除杨骏并掌握朝廷，随后卷入宗王及太子继承斗争，300年被赵王司马伦废杀。", evidence(s.empress, s.hui), 257, 300),
];

const locations = [
  place("jiankang", "建康（吴称建业）", 118.8, 32.06, "今江苏南京；吴称建业，晋平吴后改秣陵，282年分置建邺，313年改建康；各史籍有业、邺异写", evidence(jin(15, "地理志下，丹阳郡建邺"), s.yuan, s.wuCampaign)),
  place("jin-pingyang", "平阳", 111.52, 36.09, "今山西临汾一带", evidence(s.hanZhao)),
  place("jin-xiangguo", "襄国", 114.5, 37.07, "今河北邢台一带", evidence(s.shiLe)),
  place("jin-longcheng", "龙城", 120.45, 41.58, "今辽宁朝阳一带", evidence(s.yan)),
  place("jin-xiangyang", "襄阳", 112.14, 32.04, "今湖北襄阳一带", evidence(s.huan, s.qinRise)),
  place("jin-baidi", "白帝", 109.57, 31.05, "今重庆奉节白帝城一带", evidence(s.wuCampaign)),
  place("jin-wuchang", "武昌（古鄂城）", 114.89, 30.4, "今湖北鄂州；不同于今武汉市武昌区", evidence(s.wuCampaign)),
  place("jin-jingkou", "京口", 119.45, 32.2, "今江苏镇江一带", evidence(s.liuYuEarly)),
  place("jin-guangling", "广陵", 119.43, 32.39, "今江苏扬州一带；东晋北府军的重要驻地", evidence(s.xie)),
  place("jin-shouyang", "寿阳（寿春）", 116.78, 32.58, "今安徽寿县古城一带", evidence(s.fei)),
  place("jin-fei-river-site", "淝水战区", 116.83, 32.51, "寿阳附近淝水流域；战场具体范围存在讨论，点位仅指区域", evidence(s.fei, s.xie)),
  place("jin-bashang", "灞上", 109.11, 34.28, "今陕西西安东部灞河附近区域", evidence(s.huan)),
  place("jin-fangtou", "枋头", 114.54, 35.63, "今河南浚县西南一带；古河道与营垒位置不能由现代点位精确还原", evidence(s.huan)),
  place("jin-guanggu", "广固", 118.45, 36.73, "今山东青州西北一带", evidence(s.southernYan, s.liuYuEarly)),
  place("jin-xiapi", "下邳", 117.95, 34.3, "今江苏睢宁古邳一带", evidence(s.liuYuEarly)),
  place("jin-linqu", "临朐", 118.54, 36.51, "今山东临朐一带", evidence(s.liuYuEarly)),
  place("jin-huatai", "滑台", 114.52, 35.58, "今河南滑县附近；古城位置为区域参照", evidence(s.southernYan, s.liuYuQin)),
  place("jin-tongguan", "潼关", 110.25, 34.55, "今陕西潼关北部黄河、渭河附近", evidence(s.liuYuQin)),
  place("jin-tongwan", "统万城", 108.86, 38.14, "今陕西靖边白城子一带", evidence(s.xia, s.weiUnification)),
  place("jin-dunhuang", "敦煌", 94.66, 40.14, "今甘肃敦煌一带", evidence(s.westernLiang)),
  place("jin-jiuquan", "酒泉", 98.5, 39.73, "今甘肃酒泉一带", evidence(s.westernLiang, s.northernLiang)),
  place("jin-zhangye", "张掖", 100.45, 38.93, "今甘肃张掖一带", evidence(s.northernLiang)),
  place("jin-nanan", "南安（陇右）", 104.8, 34.9, "431年乞伏暮末退保并向夏出降之地。按陇西东南区域定位，非枹罕；古城具体位置不作测绘精度承诺。", evidence(s.westernQin, tongjian(121, "宋文帝元嘉八年，夏围南安"))),
  place("jin-kuaiji", "会稽", 120.58, 30.0, "孙恩起事的重要地区，以今绍兴附近定位。", evidence(s.sunLuQiao)),
  place("jin-guangzhou", "广州（番禺）", 113.26, 23.13, "卢循404年据广州并受晋官号；410年北上，后败退。", evidence(s.sunLuQiao)),
  place("jin-fuhan", "枹罕", 103.21, 35.6, "今甘肃临夏一带", evidence(s.westernQin)),
  place("jin-yuanchuan", "苑川", 104.05, 35.82, "今甘肃榆中苑川河流域；西秦建政与复国的重要据点", evidence(s.westernQin)),
  place("jin-ledu", "乐都", 102.4, 36.48, "今青海海东乐都一带", evidence(s.southernLiang)),
  place("jin-zhongshan", "中山", 114.99, 38.52, "今河北定州一带", evidence(s.murong)),
  place("jin-changzi", "长子", 112.87, 36.12, "今山西长子一带", evidence(s.murong)),
  place("jin-canhebei-site", "参合陂（区域示意）", 112.75, 40.45, "今内蒙古凉城附近为常见说法，另有不同定位；不作遗址精确定位", evidence(s.weiRise)),
];

type EventDraft = Omit<HistoricalEvent, keyof SourcedEntity | "tracks" | "causeEventIds" | "consequenceEventIds"> & { refs: string[]; causeEventIds?: string[]; consequenceEventIds?: string[]; disputedNote?: string };
function entry({ refs, ...draft }: EventDraft): HistoricalEvent {
  const year = draft.startYear;
  const track = year <= 303 ? "jin-order" : year <= 329 ? "jin-southward" : year <= 376 ? "jin-contest" : year <= 398 ? "jin-fei" : "jin-north-south";
  return { tracks: [track], causeEventIds: [], consequenceEventIds: [], ...draft, ...evidence(...refs) };
}

const events = [
  entry({ id: "jin-conquers-wu", title: "晋军多路灭吴，三国归于统一", startYear: 280, eventType: "war", personIds: ["sima-yan"], dynastyIds: ["western-jin"], locationIds: ["jin-baidi", "jiangling", "jin-wuchang", "jiankang"], summary: "西晋水陆诸军攻吴，孙皓在建业投降。", background: "晋已继承曹魏与蜀地资源，长江上游造船和荆州经营为攻吴准备条件。", process: "王濬等自巴蜀顺流东下，杜预攻江陵，其他晋军从北面推进，最终会向建业。", result: "吴国灭亡，魏蜀吴分立以来的局面结束。", impact: "统一使西晋拥有更广阔的财政与人口基础，但并未解决朝廷继承与地方权力问题。", refs: [s.unification, s.wuCampaign] }),
  entry({ id: "jin-hui-succeeds", title: "武帝去世，惠帝即位", startYear: 290, eventType: "succession", personIds: ["sima-yan", "jia-nanfeng"], dynastyIds: ["western-jin"], locationIds: ["luoyang"], summary: "司马炎去世，司马衷即位，辅政安排成为朝廷争端的焦点。", background: "统一之后的帝国需要完成第一次皇位交接，外戚与皇后家族争取权力。", process: "杨骏掌握辅政大权，贾皇后与其逐渐形成政治对立。", result: "惠帝朝的决策受到宫廷不同集团影响。", impact: "继承秩序的不稳为次年的宫廷政变埋下伏笔。", consequenceEventIds: ["jin-jia-coup"], refs: [s.unification, s.hui, s.empress] }),
  entry({ id: "jin-jia-coup", title: "贾后借宗王力量清除杨骏", startYear: 291, eventType: "political", personIds: ["jia-nanfeng"], dynastyIds: ["western-jin"], locationIds: ["luoyang"], summary: "贾皇后联络宗王发动政变，杨骏及其集团被清除。", background: "武帝去世后的辅政权争夺持续升级。", process: "宫廷借助楚王司马玮等人的军力杀杨骏，随后汝南王司马亮、司马玮也先后被杀。", result: "贾后掌握朝廷，宗王武力深度介入中枢。", impact: "291年的政变通常被列为八王之乱的开端，不能把其后多年内战视为同一场连续战役。", causeEventIds: ["jin-hui-succeeds"], consequenceEventIds: ["jin-jia-falls"], refs: [s.hui, s.empress] }),
  entry({ id: "jin-jia-falls", title: "太子遇害，贾后被废杀", startYear: 300, eventType: "political", personIds: ["jia-nanfeng"], dynastyIds: ["western-jin"], locationIds: ["luoyang"], summary: "贾后害死被废太子司马遹，赵王司马伦借机发动政变。", background: "皇后与太子之间的斗争使继承秩序进一步破裂。", process: "司马伦以讨伐贾后为名控制朝廷，贾后被废黜并杀害。", result: "中枢权力由皇后集团转入宗王及其亲信手中。", impact: "司马伦进一步谋求帝位，推动宗王战争扩大。", causeEventIds: ["jin-jia-coup"], consequenceEventIds: ["jin-princes-war"], refs: [s.hui, s.empress] }),
  entry({ id: "jin-princes-war", title: "宗王争夺皇帝，内战扩大", startYear: 301, endYear: 306, eventType: "war", personIds: [], dynastyIds: ["western-jin"], locationIds: ["luoyang", "ye", "changan"], summary: "司马伦篡位后，多位宗王先后起兵，皇帝在战争中被反复控制与迁徙。", background: "宫廷争权已与宗王掌握的地方兵力相结合。", process: "齐王、成都王、河间王、东海王等轮番介入，各军争夺洛阳及通往关中的道路。", result: "西晋中央力量与中原社会遭到持续消耗。", impact: "饥荒、流亡和地方武装增长，为刘渊、李雄等另建政权创造条件。", causeEventIds: ["jin-jia-falls"], consequenceEventIds: ["jin-han-zhao-founded", "jin-cheng-founded"], refs: [s.hui, tongjian(84, "惠帝太安、永兴年间")] }),
  entry({ id: "jin-li-te", title: "李特流民军在蜀地起兵", startYear: 301, endYear: 303, eventType: "war", personIds: ["li-xiong"], dynastyIds: ["western-jin","cheng-han"], locationIds: ["chengdu"], summary: "李特领导入蜀流民反抗遣返，蜀地冲突发展为持续战争。", background: "关陇饥荒与战乱推动人口入蜀，地方官府要求限期遣返，安置矛盾激化。", process: "李特聚众起兵，303年战死；李流、李雄继承其部众，继续争夺成都。", result: "流民军事集团成为改变巴蜀政局的主要力量。", impact: "成汉的建立有迁徙、安置与战争背景，不能从304年突然开始讲述。", consequenceEventIds: ["jin-cheng-founded"], refs: [s.liTe, s.cheng] }),
  entry({ id: "jin-han-zhao-founded", title: "刘渊称汉王", startYear: 304, eventType: "founding", personIds: ["liu-yuan"], dynastyIds: ["western-jin", "han-zhao"], locationIds: ["jin-pingyang"], summary: "刘渊脱离西晋宗王战争中的从属地位，建立汉政权。", background: "西晋内战使并州及周边的军事、人口组织失去稳定约束。", process: "刘渊被推举为大单于，继而在左国城称汉王，后以平阳为都。", result: "新的政治中心在山西兴起，汉赵纪年从304年开始。", impact: "其后军队进攻洛阳、长安，是西晋崩解的重要力量。", disputedNote: "地图地点用后来的都城平阳提示区域；304年称王地是左国城，不把二者等同。", causeEventIds: ["jin-princes-war"], consequenceEventIds: ["jin-luoyang-falls"], refs: [s.hanZhao] }),
  entry({ id: "jin-cheng-founded", title: "李雄据成都建立政权", startYear: 304, eventType: "founding", personIds: ["li-xiong"], dynastyIds: ["western-jin", "cheng-han"], locationIds: ["chengdu"], summary: "李雄在成都称王，蜀地脱离西晋中央的实际控制。", background: "进入蜀地的流民与地方官府冲突，李氏军事集团由此壮大。", process: "李雄攻入成都后称成都王，306年进一步称帝，国号成。", result: "成都成为独立政权的中心，形成后来的成汉。", impact: "西晋的分裂并不限于黄河流域，巴蜀也出现持久政权。", causeEventIds: ["jin-princes-war"], consequenceEventIds: ["jin-huan-conquers-cheng"], refs: [s.cheng] }),
  entry({ id: "jin-rui-south", title: "司马睿出镇建邺", startYear: 307, eventType: "political", personIds: ["sima-rui", "wang-dao"], dynastyIds: ["western-jin"], locationIds: ["jiankang"], summary: "琅邪王司马睿渡江出镇，王导协助其在江南争取支持。", background: "中原战争持续，江南成为晋室经营的新支点。", process: "司马睿以建邺为据点，王导联络顾荣、贺循等江南名士，逐步建立地方合作。", result: "江左形成延续晋室的政治核心。", impact: "出镇发生在洛阳失陷之前，东晋的建立有十余年的准备过程。", consequenceEventIds: ["jin-eastern-founded"], refs: [s.yuan, s.wangDao] }),
  entry({ id: "jin-luoyang-falls", title: "永嘉之乱：洛阳失陷", startYear: 311, eventType: "war", personIds: [], dynastyIds: ["western-jin", "han-zhao"], locationIds: ["luoyang"], summary: "汉赵军攻陷洛阳，晋怀帝被俘，西晋都城体系崩溃。", background: "宗王战争、灾荒和地方军事集团扩张使洛阳难以得到有效支援。", process: "刘曜、王弥等所部攻入洛阳，宫室遭到破坏，大量居民死伤或离散。", result: "西晋失去原有都城，残余朝廷后来在长安重建。", impact: "政治与人口的南迁加速，洛阳失陷成为理解晋末转折的关键节点。", causeEventIds: ["jin-han-zhao-founded"], consequenceEventIds: ["jin-southward-migration", "jin-changan-falls"], refs: [s.collapse, s.liuYao] }),
  entry({ id: "jin-southward-migration", title: "中原人口分批南迁", startYear: 311, endYear: 318, eventType: "political", personIds: ["wang-dao", "sima-rui"], dynastyIds: ["western-jin", "eastern-jin"], locationIds: ["luoyang", "jin-guangling", "jin-jingkou", "jiankang"], summary: "战乱中的士族、军民沿不同方向迁往江淮与江南。", background: "洛阳及周边秩序瓦解，南方相对稳定的据点吸引避乱人口。", process: "不同群体分别经江淮、荆襄等方向南下，朝廷与地方势力组织安置和侨置州郡。", result: "江南人口、军事资源与政治精英构成发生变化。", impact: "南迁推动东晋建政，也带来土地、户籍和地方利益的长期协调问题。", disputedNote: "311—318年是本条选取的集中观察段；迁徙并非一年完成，示意方向不代表所有人的实际路线。", causeEventIds: ["jin-luoyang-falls"], consequenceEventIds: ["jin-eastern-founded"], refs: [s.wangDao, s.yuan, jin(15, "地理志下，江南侨置州郡")] }),
  entry({ id: "jin-zu-ti", title: "祖逖渡江北伐，经营河南", startYear: 313, endYear: 321, eventType: "war", personIds: ["sima-rui"], dynastyIds: ["western-jin","eastern-jin","later-zhao"], locationIds: ["jin-jingkou","luoyang"], summary: "祖逖率流民部众渡江北进，逐步在河南建立军事据点。", background: "中原失序后，南迁军民仍希望返回故土，司马睿给予有限粮布与官号支持。", process: "祖逖自募军队、筹办兵器，联络地方力量，先后经营谯城、雍丘等地，与石勒势力相持。", result: "东晋在河南一度恢复部分影响，321年祖逖去世后局面难以维持。", impact: "北伐并非始于桓温，东晋建立前后已有依靠流民与地方合作的北进尝试。", disputedNote: "地点仅以江左起点及河南区域参照，不将洛阳标作祖逖攻占的城市。", refs: [s.zuTi, tongjian(88, "晋愍帝建兴元年，祖逖北伐")] }),
  entry({ id: "jin-liang-hereditary", title: "张氏世袭凉州，河西形成自立局面", startYear: 314, eventType: "succession", personIds: [], dynastyIds: ["western-jin", "former-liang"], locationIds: ["guzang"], summary: "张轨死后张寔继掌凉州，张氏统治逐渐世袭化。", background: "张轨自301年任凉州刺史，借河西相对稳定的条件保存地方秩序。", process: "张氏继续奉晋正朔，同时自行处理河西军政与继承。", result: "以姑臧为中心的区域政权延续下来。", impact: "前凉体现名义奉晋与实际地方自主可以同时存在。", refs: [s.liang] }),
  entry({ id: "jin-dai-founded", title: "拓跋猗卢受封代王", startYear: 315, eventType: "founding", personIds: [], dynastyIds: ["western-jin", "dai"], locationIds: ["shengle"], summary: "西晋封拓跋猗卢为代王，代国成为北方政治格局中的一支力量。", background: "并州晋军与拓跋部合作，对抗汉赵等势力。", process: "拓跋猗卢在既有部落联盟基础上取得代王封号，此后拓跋氏经历多次继承和重建。", result: "代国成为后来北魏追溯自身历史的重要前身。", impact: "传统十六国名单之外仍有重要政权，必须随实际历史纳入观察。", disputedNote: "盛乐代表代国后期的重要中心，不表示315年封王仪式在此举行。", refs: [s.dai] }),
  entry({ id: "jin-changan-falls", title: "长安失守，西晋结束", startYear: 316, eventType: "collapse", personIds: [], dynastyIds: ["western-jin", "han-zhao"], locationIds: ["changan"], summary: "刘曜围攻长安，晋愍帝在粮尽援绝后投降。", background: "洛阳陷落后，西晋在关中的重建缺乏足够资源与军队支撑。", process: "汉赵军持续围困长安，城内饥困，晋廷最终出降。", result: "西晋中央政权灭亡，帝室在北方失去立足点。", impact: "江南的司马睿集团成为晋室延续的主要中心。", causeEventIds: ["jin-luoyang-falls"], consequenceEventIds: ["jin-eastern-founded"], refs: [s.collapse] }),
  entry({ id: "jin-eastern-founded", title: "司马睿建立江左晋廷", startYear: 317, endYear: 318, eventType: "founding", personIds: ["sima-rui", "wang-dao"], dynastyIds: ["eastern-jin"], locationIds: ["jiankang"], summary: "司马睿317年称晋王，318年在建康称帝，东晋由此确立。", background: "西晋已失去长安，江左士族与地方力量需要共同认可的政治中心。", process: "王导等支持司马睿承接晋统，朝廷逐步组织官僚与军事体系。", result: "建康成为东晋都城，形成南方的长期政治中心。", impact: "东晋的皇权需要持续协调士族和地方军权，南北并立格局逐渐形成。", causeEventIds: ["jin-rui-south", "jin-changan-falls"], refs: [s.yuan, s.wangDao] }),
  entry({ id: "jin-two-zhaos", title: "刘曜改号赵，石勒另立后赵", startYear: 319, eventType: "founding", personIds: ["shi-le"], dynastyIds: ["han-zhao", "later-zhao"], locationIds: ["changan", "jin-xiangguo"], summary: "刘曜在关中改国号赵，石勒在襄国称赵王，形成二赵并立。", background: "刘氏政权经历内乱，石勒已在河北拥有独立的军事与行政基础。", process: "刘曜与石勒的从属关系破裂，双方分别经营关中与河北。", result: "史家用前赵、后赵区分同用赵国号的政权。", impact: "二赵之争将北方战争重点转向洛阳与黄河沿线。", consequenceEventIds: ["jin-zhao-unifies"], refs: [s.liuYao, s.shiLe] }),
  entry({ id: "jin-wang-dun", title: "王敦两次挑战建康朝廷", startYear: 322, endYear: 324, eventType: "war", personIds: ["sima-rui", "wang-dao"], dynastyIds: ["eastern-jin"], locationIds: ["jin-wuchang", "jiankang"], summary: "控制长江上游军力的王敦进攻建康，东晋初年的皇权与军权矛盾爆发。", background: "司马睿试图削弱王氏势力，而王敦握有荆江地区兵权。", process: "王敦322年攻入建康；324年其集团再度起兵，被明帝朝廷击败。", result: "王敦势力被清除，东晋朝廷渡过重大危机。", impact: "江上游军队与建康中枢的关系长期影响东晋政治。", refs: [jin(98, "王敦传"), s.wangDao] }),
  entry({ id: "jin-su-jun", title: "苏峻之乱，建康再陷战火", startYear: 327, endYear: 329, eventType: "war", personIds: ["wang-dao"], dynastyIds: ["eastern-jin"], locationIds: ["jiankang"], summary: "苏峻拒绝交出军权起兵，攻陷建康后被陶侃、温峤等联军击败。", background: "朝廷试图调离掌握流民军的苏峻，引发新的军政冲突。", process: "苏峻军控制幼帝与都城，地方援军沿长江集结反攻。", result: "叛军于329年被平定，建康受到严重破坏。", impact: "东晋恢复秩序依靠地方将领合作，中枢对军队的掌握仍有限。", refs: [s.suJun, s.wangDao] }),
  entry({ id: "jin-zhao-unifies", title: "石勒消灭刘曜势力", startYear: 329, eventType: "war", personIds: ["shi-le"], dynastyIds: ["han-zhao", "later-zhao"], locationIds: ["luoyang", "changan"], summary: "后赵继俘获刘曜后攻取关中，汉赵灭亡。", background: "二赵为争夺黄河流域相持，刘曜在328年洛阳战事中被俘。", process: "石勒军继续向西推进，击败刘曜继承者，控制长安及关中主要地区。", result: "后赵成为北方最强政权，二赵并立结束。", impact: "这种统一依赖军事征服与个人权威，继承危机仍会引发分裂。", causeEventIds: ["jin-two-zhaos"], consequenceEventIds: ["jin-zhao-collapse"], refs: [s.liuYao, s.shiLeLater] }),
  entry({ id: "jin-former-yan-founded", title: "慕容皝称燕王", startYear: 337, eventType: "founding", personIds: ["murong-huang"], dynastyIds: ["former-yan"], locationIds: ["jin-longcheng"], summary: "慕容皝在辽西称燕王，前燕进入新的建国阶段。", background: "慕容氏长期吸纳辽西人口与士人，在区域竞争中积累实力。", process: "慕容皝建立燕国官制，后来迁都龙城，持续经营辽西。", result: "慕容氏政权逐步具备向河北扩张的条件。", impact: "辽西与中原不是隔绝的两片区域，人口、军队和制度持续往来。", disputedNote: "337年称王与341年迁龙城为不同节点；地图以长期都城作区域参照。", consequenceEventIds: ["jin-yan-takes-ye"], refs: [s.yan] }),
  entry({ id: "jin-huan-conquers-cheng", title: "桓温入蜀，成汉灭亡", startYear: 347, eventType: "war", personIds: ["huan-wen"], dynastyIds: ["eastern-jin", "cheng-han"], locationIds: ["jiangling", "chengdu"], summary: "桓温率军自荆州入蜀，攻破成都后李势出降。", background: "成汉内部政局不稳，东晋荆州军队寻求向西拓展。", process: "桓温快速进军，突破蜀地防御并在成都附近获胜。", result: "成汉结束，巴蜀重新纳入东晋势力范围。", impact: "灭蜀军功显著提升桓温地位，为其后来北伐和掌权奠定基础。", causeEventIds: ["jin-cheng-founded"], consequenceEventIds: ["jin-huan-guanzhong"], refs: [s.cheng, s.huan] }),
  entry({ id: "jin-zhao-collapse", title: "石虎死后，后赵陷入内战", startYear: 349, endYear: 351, eventType: "collapse", personIds: ["ran-min"], dynastyIds: ["later-zhao", "ran-wei"], locationIds: ["ye", "jin-xiangguo"], summary: "石虎去世后，石氏诸子与军人集团争位，后赵迅速瓦解。", background: "后赵资源集中于皇帝及军队，继承安排缺乏稳定共识。", process: "宫廷杀戮和军事政变相继发生，冉闵控制邺，地方势力纷纷自立。", result: "后赵残余政权至351年覆灭，北方重新分裂。", impact: "前燕、前秦等势力借机进入中原和关中。", causeEventIds: ["jin-zhao-unifies"], consequenceEventIds: ["jin-ran-wei", "jin-former-qin-founded"], refs: [s.shiHu] }),
  entry({ id: "jin-ran-wei", title: "冉魏建立与邺城灾难", startYear: 350, endYear: 352, eventType: "war", personIds: ["ran-min"], dynastyIds: ["later-zhao", "ran-wei", "former-yan"], locationIds: ["ye"], summary: "冉闵在邺称帝，其统治在大规模杀戮与战争中仅维持两年。", background: "后赵崩解激化了军人集团、身份与生存资源之间的冲突。", process: "冉闵下令屠杀胡人及被认作胡人的居民，继而与石氏余部和前燕作战。", result: "352年冉闵被前燕俘杀，邺城随后被攻取。", impact: "这一过程造成深重的人口灾难，不能据政权名称把受害者与参战者简单分组。", causeEventIds: ["jin-zhao-collapse"], consequenceEventIds: ["jin-yan-takes-ye"], refs: [s.shiHu, s.yanJun] }),
  entry({ id: "jin-former-qin-founded", title: "苻健入主关中，建立前秦", startYear: 351, eventType: "founding", personIds: [], dynastyIds: ["former-qin"], locationIds: ["changan"], summary: "苻健利用后赵瓦解之机进入关中，在长安建立秦政权。", background: "关中地方力量重新组合，苻氏集团从河北西返。", process: "苻健控制长安，351年称天王，次年称帝。", result: "前秦成为关中新的政治中心。", impact: "关中的人口与地理条件后来支撑苻坚向东、西、北扩张。", causeEventIds: ["jin-zhao-collapse"], consequenceEventIds: ["jin-fu-jian-rules"], refs: [s.qinEarly] }),
  entry({ id: "jin-yan-takes-ye", title: "前燕攻取邺，进入中原", startYear: 352, eventType: "war", personIds: [], dynastyIds: ["former-yan", "ran-wei"], locationIds: ["ye"], summary: "前燕消灭冉魏，慕容儁同年称帝。", background: "后赵内战使河北缺乏稳定中心，前燕从辽西向南推进。", process: "燕军击败冉闵，继续围攻邺城，守军最终投降。", result: "河北主要地区转入前燕，随后政治重心南移。", impact: "前燕与关中的前秦、江南的东晋形成新的竞争格局。", causeEventIds: ["jin-former-yan-founded", "jin-ran-wei"], consequenceEventIds: ["jin-huan-fangtou"], refs: [s.yanJun] }),
  entry({ id: "jin-huan-guanzhong", title: "桓温北伐至灞上，缺粮撤军", startYear: 354, eventType: "war", personIds: ["huan-wen"], dynastyIds: ["eastern-jin", "former-qin"], locationIds: ["jiangling", "jin-xiangyang", "jin-bashang", "changan"], summary: "桓温攻入关中，抵达长安东侧的灞上，最终未能攻取长安。", background: "灭成汉后桓温权势上升，希望通过北伐进一步扩大影响。", process: "晋军由江陵、襄阳方向北进，经南乡、淅川攻关中；前秦坚守并清除田粮。", result: "晋军粮食不继，带部分居民撤回。", impact: "这一战体现远征补给的限制，前秦在压力下得以保存。", causeEventIds: ["jin-huan-conquers-cheng"], consequenceEventIds: ["jin-huan-luoyang"], refs: [s.huan] }),
  entry({ id: "jin-huan-luoyang", title: "桓温击败姚襄，收复洛阳", startYear: 356, eventType: "war", personIds: ["huan-wen"], dynastyIds: ["eastern-jin"], locationIds: ["luoyang"], summary: "桓温在伊水附近击败姚襄，进入洛阳修复晋陵。", background: "中原势力分散，洛阳地区控制权频繁变化。", process: "晋军沿水路与陆路北进，在伊水交战后进入洛阳，修缮陵墓并安置官员。", result: "东晋一度恢复对洛阳的控制，但难以长期稳固。", impact: "军事收复与稳定治理之间存在距离，洛阳此后仍多次易手。", causeEventIds: ["jin-huan-guanzhong"], refs: [s.huan] }),
  entry({ id: "jin-fu-jian-rules", title: "苻坚掌权，重整前秦", startYear: 357, eventType: "succession", personIds: ["fu-jian"], dynastyIds: ["former-qin"], locationIds: ["changan"], summary: "苻坚取代苻生，以天王身份执政，逐步重整关中政治。", background: "前秦宫廷内部不满苻生，苻氏统治仍面临内争。", process: "苻坚夺取权力，任用王猛等整顿吏治和军政。", result: "前秦中央资源得到集中，扩张能力增强。", impact: "其后的兼并依赖制度经营与军事胜利，不能只从淝水的结局倒推其统治。", causeEventIds: ["jin-former-qin-founded"], consequenceEventIds: ["jin-qin-conquers-yan"], refs: [s.qinRise] }),
  entry({ id: "jin-huan-fangtou", title: "桓温伐燕，在枋头退败", startYear: 369, eventType: "war", personIds: ["huan-wen", "murong-chui"], dynastyIds: ["eastern-jin", "former-yan", "former-qin"], locationIds: ["jin-fangtou"], summary: "桓温第三次北伐深入河南，缺粮撤退时被慕容垂追击。", background: "东晋试图利用前燕内部矛盾夺取河北，桓温也希望以战功加强政治地位。", process: "晋军推进至枋头，补给受阻后南撤，燕军与前秦援军加重其损失。", result: "北伐失败；慕容垂虽立战功，却在燕廷猜忌下投奔前秦。", impact: "前燕失去重要将领，前秦乘机准备东征。", causeEventIds: ["jin-yan-takes-ye"], consequenceEventIds: ["jin-qin-conquers-yan"], refs: [s.huan, s.yanLater, s.murong] }),
  entry({ id: "jin-qin-conquers-yan", title: "前秦攻灭前燕", startYear: 370, eventType: "war", personIds: ["fu-jian", "murong-chui"], dynastyIds: ["former-qin", "former-yan"], locationIds: ["changan", "ye"], summary: "王猛率秦军攻破邺城，前燕灭亡，前秦控制河北。", background: "前燕宫廷矛盾和369年的战争削弱了其统治。", process: "前秦进军洛阳、壶关等地，击败燕军主力，围攻并攻取邺城。", result: "前燕皇室与部分人口迁往关中，北方力量进一步集中。", impact: "前秦疆域迅速扩大，也需要整合新归附的军事和政治集团。", causeEventIds: ["jin-fu-jian-rules", "jin-huan-fangtou"], consequenceEventIds: ["jin-qin-takes-shu", "jin-qin-liang-dai"], refs: [s.qinRise, s.yanLater] }),
  entry({ id: "jin-qin-takes-shu", title: "前秦从东晋夺取梁益", startYear: 373, eventType: "war", personIds: ["fu-jian"], dynastyIds: ["former-qin", "eastern-jin"], locationIds: ["chengdu"], summary: "前秦攻取梁州、益州，巴蜀主要地区转入秦的控制。", background: "前秦灭燕后向其他方向扩张，东晋的西部防御承受压力。", process: "秦军从关中与汉中方向南下，晋方守军败退。", result: "东晋失去巴蜀重要地区，前秦取得长江上游战略位置。", impact: "上游水陆通道使前秦具备从多个方向进攻东晋的条件。", causeEventIds: ["jin-qin-conquers-yan"], consequenceEventIds: ["jin-fei-river"], refs: [s.qinRise] }),
  entry({ id: "jin-qin-liang-dai", title: "前秦灭前凉、破代，北方主要地区归一", startYear: 376, eventType: "war", personIds: ["fu-jian"], dynastyIds: ["former-qin", "former-liang", "dai"], locationIds: ["guzang", "shengle"], summary: "秦军先后迫使前凉降服、击破代国，北方主要政治中心集中到苻坚旗下。", background: "前秦已经控制关中、河北与巴蜀，继续清除西北和代北对手。", process: "军队攻入河西，张天锡投降；随后北进攻代，拓跋政权在内乱与进攻中瓦解。", result: "前秦达到空前规模，北方主要地区暂时统一。", impact: "各地原有军事集团并未消失，其整合程度决定了统一的稳定性。", causeEventIds: ["jin-qin-conquers-yan"], consequenceEventIds: ["jin-fei-river"], refs: [s.qinRise, s.liang, s.dai] }),
  entry({ id: "jin-northern-headquarters", title: "谢玄镇广陵，整合北府军", startYear: 377, eventType: "political", personIds: ["xie-an", "xie-xuan"], dynastyIds: ["eastern-jin"], locationIds: ["jin-guangling", "jin-jingkou"], summary: "谢玄负责江北军事，招集刘牢之等将领和劲勇之士。", background: "前秦扩张使东晋北方防线承受压力，朝廷需要更有效的军队组织。", process: "谢安推荐谢玄，后者在广陵训练和组织军队，形成北府军的重要基础。", result: "东晋获得一支能够应对北方攻势的精锐力量。", impact: "北府军在淝水之战及东晋晚期政治中持续发挥作用。", consequenceEventIds: ["jin-fei-river"], refs: [s.xie] }),
  entry({ id: "jin-qin-takes-xiangyang", title: "前秦攻下襄阳", startYear: 379, eventType: "war", personIds: ["fu-jian"], dynastyIds: ["former-qin", "eastern-jin"], locationIds: ["jin-xiangyang"], summary: "秦军经过长期围攻夺取襄阳，朱序被俘。", background: "襄阳位于汉水交通要地，是前秦南进和东晋防御的重要支点。", process: "前秦自378年起围城，晋方救援未能解围，次年城破。", result: "前秦控制汉水上的重要据点，东晋防线后退。", impact: "襄阳胜利增强苻坚的南征信心，但不能替代对东晋整体抵抗能力的判断。", consequenceEventIds: ["jin-fei-river"], refs: [s.qinRise, s.xie] }),
  entry({ id: "jin-fei-river", title: "淝水之战：前秦南征失败", startYear: 383, eventType: "war", personIds: ["fu-jian", "xie-an", "xie-xuan"], dynastyIds: ["former-qin", "eastern-jin"], locationIds: ["changan", "jin-shouyang", "jin-fei-river-site"], summary: "前秦大举南征，东晋军在寿阳附近击溃秦军，苻坚退回北方。", background: "前秦完成多轮兼并后，苻坚试图以军事优势消灭东晋，朝内对此意见分歧。", process: "秦军先取寿阳，晋军击败洛涧前锋；淝水对峙时秦军后退失序，晋军渡水进攻。", result: "苻融战死，苻坚败退，东晋保住江淮防线。", impact: "战败削弱前秦统治威望，原有集团陆续起兵，北方再次分裂。", disputedNote: "史书所述兵力有夸饰与统计口径差异；点位仅示淝水战区，不重建未经核实的渡口或逐日行军。", causeEventIds: ["jin-qin-liang-dai", "jin-northern-headquarters", "jin-qin-takes-xiangyang"], consequenceEventIds: ["jin-qin-fragments"], refs: [s.fei, s.xie, tongjian(105, "晋孝武帝太元八年")] }),
  entry({ id: "jin-qin-fragments", title: "后燕、后秦与西燕相继起兵", startYear: 384, eventType: "founding", personIds: ["fu-jian", "murong-chui", "yao-chang"], dynastyIds: ["former-qin", "later-yan", "later-qin", "western-yan"], locationIds: ["ye", "changan", "jin-zhongshan"], summary: "淝水战后，慕容垂、姚苌和关中的慕容诸部相继脱离前秦。", background: "前秦的统一包含大量新近归附集团，战败削弱了共同服从的基础。", process: "慕容垂在河北复燕，姚苌在关中另建秦政权，慕容泓等在关中起兵形成西燕。", result: "前秦失去对重要地区的控制，北方出现多个争夺中心。", impact: "后燕和西燕虽同属慕容势力，却相互竞争，不能合并为同一国家。", causeEventIds: ["jin-fei-river"], consequenceEventIds: ["jin-fu-jian-death", "jin-later-yan-conquers-western-yan"], refs: [s.fei, s.murong, s.yao] }),
  entry({ id: "jin-xie-xuan-north", title: "淝水之后，晋军进取淮北与河南", startYear: 384, endYear: 385, eventType: "war", personIds: ["xie-xuan","xie-an"], dynastyIds: ["eastern-jin","former-qin"], locationIds: ["jin-guangling","luoyang"], summary: "谢玄等乘前秦内乱向北推进，东晋重新取得淮北、河南部分地区。", background: "淝水败后前秦内部相继起兵，原有北方军事体系瓦解。", process: "谢玄派刘牢之等北进，并经营彭城及黄河以南的军事据点，其他晋军也乘机西进。", result: "东晋的北方防线推进，但部分成果此后又在燕、秦等国的竞争中丧失。", impact: "383年的胜利与其后数年的领土变化应分开说明，不能一场战役后瞬间更换疆界。", causeEventIds: ["jin-fei-river"], refs: [s.xie, jin(9, "孝武帝纪，太元九至十年")] }),
  entry({ id: "jin-fu-jian-death", title: "苻坚被杀，前秦中心崩溃", startYear: 385, eventType: "biographical", personIds: ["fu-jian", "yao-chang"], dynastyIds: ["former-qin", "later-qin", "western-yan"], locationIds: ["changan"], summary: "苻坚离开受围的长安后被姚苌俘杀，前秦残部另寻立足点。", background: "关中的慕容军与姚氏军先后起兵，长安粮食和军事形势恶化。", process: "苻坚出走五将山，被后秦部将俘获；姚苌未能迫其交出玉玺，最终将其杀害。", result: "苻坚的个人统治结束，但前秦残余政权并未同年完全灭亡。", impact: "北方重新分裂成为长期事实，关中的争夺仍将继续。", causeEventIds: ["jin-qin-fragments"], refs: [s.fei, s.yao] }),
  entry({ id: "jin-western-qin-founded", title: "乞伏氏建立西秦", startYear: 385, eventType: "founding", personIds: [], dynastyIds: ["western-qin", "former-qin"], locationIds: ["jin-fuhan"], summary: "乞伏国仁在陇右另建政权，西秦成为西北竞争的一方。", background: "前秦控制松动，使陇右地方军事集团有机会扩展自治。", process: "乞伏国仁统合部众，建号并组织官属，之后政权在苑川、金城与枹罕间经营。", result: "西秦在陇右形成持续活动的政治军事中心。", impact: "西秦与河西诸凉、后秦及夏国的关系连接着黄河上游与关中。", disputedNote: "枹罕用于提示西秦后期中心，385年的初建中心为勇士川，不作同址处理。", refs: [s.westernQin] }),
  entry({ id: "jin-later-liang-founded", title: "吕光归据河西，建立后凉", startYear: 386, eventType: "founding", personIds: [], dynastyIds: ["former-qin", "later-liang-sixteen"], locationIds: ["guzang"], summary: "前秦西征将领吕光回到河西后自立，后凉政权形成。", background: "吕光在西域作战期间，前秦已因淝水战败而瓦解。", process: "吕光回师控制姑臧，得知苻坚死讯后改元并建立独立统治。", result: "河西从前秦统一体系转入新的区域政权。", impact: "吕氏后期内争及地方分离，为南凉、北凉、西凉相继出现提供背景。", consequenceEventIds: ["jin-liang-splits"], refs: [s.laterLiang] }),
  entry({ id: "jin-later-yan-conquers-western-yan", title: "慕容垂灭西燕", startYear: 394, eventType: "war", personIds: ["murong-chui"], dynastyIds: ["later-yan", "western-yan"], locationIds: ["jin-zhongshan", "jin-changzi"], summary: "后燕攻取长子，西燕灭亡，慕容氏两支竞争告一段落。", background: "西燕由关中东迁后据有山西，与后燕争夺人口及政治号召力。", process: "慕容垂调动军队进入上党，击败慕容永并攻破其都城长子。", result: "后燕扩大到山西东南，西燕结束。", impact: "后燕随后转而与北魏争夺代北和河北的控制权。", causeEventIds: ["jin-qin-fragments"], consequenceEventIds: ["jin-canhebei"], refs: [s.murong] }),
  entry({ id: "jin-former-qin-falls", title: "苻登、苻崇先后败亡，前秦结束", startYear: 394, eventType: "collapse", personIds: [], dynastyIds: ["former-qin","later-qin","western-qin"], locationIds: ["changan","jin-fuhan"], summary: "苻登被姚兴击败并杀害，苻崇继位后又败于乞伏乾归，前秦最终灭亡。", background: "苻坚死后，前秦余部仍在关陇抵抗，国号并未在385年立即结束。", process: "姚兴消灭苻登主力，苻崇退守后试图借助杨定反攻，最终被西秦击败。", result: "前秦于394年结束，与同年灭亡的西燕是两条不同的历史线索。", impact: "395年地图不再显示前秦，需要这一步交代其残余政权的结局。", causeEventIds: ["jin-fu-jian-death"], refs: [s.qinEnd, s.yaoXing, s.westernQin] }),
  entry({ id: "jin-canhebei", title: "参合陂之战，后燕受挫", startYear: 395, eventType: "war", personIds: ["tuoba-gui", "murong-chui"], dynastyIds: ["northern-wei", "later-yan"], locationIds: ["jin-canhebei-site"], summary: "拓跋珪击败慕容宝率领的后燕军，燕魏力量对比发生转折。", background: "后燕与北魏关系破裂，后燕试图以大军压制拓跋势力。", process: "燕军北进后撤退，北魏追击并在参合陂附近突袭其营地。", result: "后燕遭受重大兵力损失，北魏获得南下优势。", impact: "慕容垂死后，北魏逐步夺取河北，后燕退向辽西。", disputedNote: "参合陂具体位置有异说，地图仅显示代北区域的一个说明性参照点。", causeEventIds: ["jin-later-yan-conquers-western-yan"], consequenceEventIds: ["wei-capital-pingcheng", "jin-southern-yan-founded"], refs: [s.weiRise, s.murong] }),
  entry({ id: "jin-liang-splits", title: "南凉、北凉脱离后凉", startYear: 397, eventType: "founding", personIds: [], dynastyIds: ["later-liang-sixteen", "southern-liang-sixteen", "northern-liang"], locationIds: ["jin-ledu", "jin-zhangye", "guzang"], summary: "秃发乌孤与段业分别建立政权，河西及其东南地区分裂加深。", background: "后凉战争和统治矛盾促使地方部众、将领寻求自立。", process: "秃发乌孤在河湟方向建南凉，段业在沮渠氏支持下据张掖建北凉。", result: "河西不再由单一政权控制，诸凉竞争展开。", impact: "区域内商路、绿洲农业和人口成为战争争夺的重要资源。", causeEventIds: ["jin-later-liang-founded"], refs: [s.southernLiang, s.northernLiang] }),
  entry({ id: "jin-southern-yan-founded", title: "慕容德南下，建立南燕", startYear: 398, eventType: "founding", personIds: [], dynastyIds: ["later-yan", "southern-yan", "northern-wei"], locationIds: ["jin-huatai", "jin-guanggu"], summary: "慕容德在滑台称燕王，随后进入山东，以广固为都。", background: "北魏进攻使后燕失去河北核心地区，慕容氏部分力量向南转移。", process: "慕容德率部离开邺城，先据滑台，次年夺取广固。", result: "南燕在山东立足，与辽西的后燕分别发展。", impact: "南燕成为东晋北方的邻敌，后来成为刘裕北伐的目标。", causeEventIds: ["jin-canhebei"], consequenceEventIds: ["jin-liu-yu-southern-yan"], refs: [s.southernYan] }),
  entry({ id: "jin-sun-en", title: "孙恩起兵，江南陷入动乱", startYear: 399, endYear: 402, eventType: "war", personIds: ["liu-yu-song"], dynastyIds: ["eastern-jin"], locationIds: ["jin-kuaiji","jiankang"], summary: "孙恩在浙东发动起事，军队多次由海上进攻江南，最终于402年败死。", background: "江南征发、地方矛盾与宗教组织的动员相交织，东晋朝廷的统治基础受到冲击。", process: "孙恩攻取会稽等地，与刘牢之、刘裕等晋军反复交战；失利后退向海上，余众后来由卢循领导。", result: "江南人口与经济受到严重破坏，孙恩死后战争仍未完全结束。", impact: "刘裕的崛起也来自南方长期战争，北伐不能脱离这一背景。", consequenceEventIds: ["jin-lu-xun"], refs: [s.sunLuQiao, s.liuYuEarly] }),
  entry({ id: "jin-western-liang-founded", title: "李暠据敦煌建立西凉", startYear: 400, eventType: "founding", personIds: [], dynastyIds: ["western-liang-sixteen", "northern-liang"], locationIds: ["jin-dunhuang", "jin-jiuquan"], summary: "李暠在敦煌建立西凉，河西西段出现新的政治中心。", background: "北凉内部竞争与河西东西段的地方利益使统治进一步分裂。", process: "地方人士推举李暠，西凉以敦煌为起点，405年迁都酒泉。", result: "北凉与西凉沿河西走廊展开长期竞争。", impact: "河西诸国虽地域较小，却参与人口安置、交通与文化传播。", consequenceEventIds: ["jin-western-liang-falls"], refs: [s.westernLiang, s.northernLiang] }),
  entry({ id: "jin-liu-yu-rises", title: "桓玄代晋，刘裕京口起兵", startYear: 403, endYear: 404, eventType: "war", personIds: ["liu-yu-song"], dynastyIds: ["eastern-jin"], locationIds: ["jin-jingkou", "jiankang"], summary: "桓玄403年代晋称帝，刘裕等404年从京口起兵恢复晋室。", background: "东晋中枢与荆州军权争夺长期延续，桓玄控制建康后取代皇帝。", process: "刘裕联络北府旧部，夺取京口并进军建康，桓玄败逃后被杀。", result: "晋室恢复，刘裕成为重要军事与政治领袖。", impact: "以恢复晋室起家的军人集团，最终通过北伐与整合权力建立刘宋。", consequenceEventIds: ["jin-liu-yu-southern-yan", "liu-song-founded"], refs: [s.liuYuEarly] }),
  entry({ id: "jin-later-liang-falls", title: "吕隆交出姑臧，后凉结束", startYear: 403, eventType: "collapse", personIds: [], dynastyIds: ["later-liang-sixteen","later-qin","northern-liang","southern-liang-sixteen"], locationIds: ["guzang","changan"], summary: "吕隆在诸凉攻逼下向后秦求援，并交出姑臧，后凉至此结束。", background: "后凉经过继承内斗，又受到南凉、北凉进攻，统治范围日益缩小。", process: "姚兴遣齐难入姑臧，吕隆及其宗族迁往长安，后秦接管当地军政。", result: "后凉消失，河西竞争转为后秦与南凉、北凉等势力之间的角逐。", impact: "后凉不能在397年诸凉分立时就从时间轴上无声消失。", causeEventIds: ["jin-liang-splits"], disputedNote: "年代依《资治通鉴》元兴二年（403）；《晋书》吕隆传末作元兴三年，属需校勘的纪年差异。", refs: [s.laterLiang, s.yaoXing, tongjian(113, "晋安帝元兴二年，吕隆降秦")] }),
  entry({ id: "jin-qiao-shu", title: "谯纵据蜀，成都脱离东晋控制", startYear: 405, eventType: "founding", personIds: [], dynastyIds: ["eastern-jin","qiao-shu","later-qin"], locationIds: ["chengdu"], summary: "蜀地军队兵变，拥立谯纵，形成以成都为中心的割据政权。", background: "桓玄败亡后，益州刺史毛璩调兵东下，部众因不愿远征而起事。", process: "叛军杀毛璩，谯纵被推为成都王，后来向后秦称藩，409年受姚兴封为蜀王。", result: "巴蜀在405—413年由谯纵集团实际统治。", impact: "409年格局必须把谯蜀单列；名义奉晋或受后秦册封都不等于东晋直接管辖。", consequenceEventIds: ["jin-qiao-shu-falls"], refs: [s.sunLuQiao, tongjian(115, "晋安帝义熙五年，姚兴册谯纵为蜀王")] }),
  entry({ id: "jin-xia-founded", title: "赫连勃勃建立夏国", startYear: 407, eventType: "founding", personIds: ["helian-bobo"], dynastyIds: ["later-qin", "hu-xia"], locationIds: ["jin-tongwan"], summary: "赫连勃勃脱离后秦建立夏国，在河套及陕北扩张。", background: "后秦与周边势力的关系变化，为铁弗部军事力量自立提供机会。", process: "赫连勃勃招集部众并袭击周边势力，后于413年起营建统万城。", result: "夏国成为威胁关中与北魏的重要政权。", impact: "其骑兵力量与统万城基地使北方统一过程增加新的竞争者。", disputedNote: "407年建国与413年营建统万城并非同一年；地图以其后都城提示区域。", consequenceEventIds: ["jin-guanzhong-lost", "jin-wei-tongwan"], refs: [s.xia] }),
  entry({ id: "jin-northern-yan-founded", title: "高云取代慕容熙，北燕开端", startYear: 407, eventType: "founding", personIds: [], dynastyIds: ["later-yan", "northern-yan"], locationIds: ["jin-longcheng"], summary: "辽西政变中慕容熙被杀，高云即位，通常以此作为北燕起点。", background: "后燕退守辽西后，宫廷冲突和繁重役使加剧统治危机。", process: "冯跋等拥立高云；409年高云被杀后，冯跋接掌政权。", result: "龙城仍是地区中心，统治家族与政治组织发生变动。", impact: "北燕延续到436年，其结局连接北魏东部扩张与高句丽。", disputedNote: "部分分期以409年冯跋即位为北燕起点；本专题采用常见的407年起算，并说明两节点。", consequenceEventIds: ["jin-northern-yan-falls"], refs: [s.northernYan, s.fengBa, tongjian(114, "晋安帝义熙三年")] }),
  entry({ id: "jin-liu-yu-southern-yan", title: "刘裕北伐，攻灭南燕", startYear: 409, endYear: 410, eventType: "war", personIds: ["liu-yu-song"], dynastyIds: ["eastern-jin", "southern-yan"], locationIds: ["jiankang", "jin-xiapi", "jin-linqu", "jin-guanggu"], summary: "刘裕率军进入山东，经过围城于410年攻破广固。", background: "南燕侵掠淮北，刘裕希望巩固威望并解除北方威胁。", process: "晋军自建康水路至下邳，转陆路过大岘，在临朐获胜后包围广固。", result: "南燕灭亡，山东转入东晋控制，战争与战后处置造成大量死伤。", impact: "北伐提高刘裕地位，但他仍须回师处理南方的军事危机。", causeEventIds: ["jin-southern-yan-founded", "jin-liu-yu-rises"], consequenceEventIds: ["jin-liu-yu-later-qin"], refs: [s.liuYuEarly, s.southernYan] }),
  entry({ id: "jin-western-qin-restored", title: "乞伏乾归复建西秦", startYear: 409, eventType: "founding", personIds: [], dynastyIds: ["western-qin","later-qin"], locationIds: ["jin-yuanchuan","jin-fuhan"], summary: "乞伏乾归离开后秦，重新称秦王，西秦在中断九年后恢复。", background: "西秦400年败于后秦后失去独立地位，乞伏氏仍保留部众和在陇右的基础。", process: "乞伏炽磐取得枹罕，乾归回到苑川，409年七月复称秦王并改元更始。", result: "陇右重新出现独立的西秦，409年地图采用复国后的格局。", impact: "政权存续不是一条毫无中断的色带，385—431年之间必须说明400—409年的失国期。", disputedNote: "复国纪年依《资治通鉴》义熙五年（409）；《晋书》乞伏乾归传所记义熙三年不能直接沿用。", refs: [s.westernQin, tongjian(115, "晋安帝义熙五年七月，乾归复即秦王位")] }),
  entry({ id: "jin-lu-xun", title: "卢循逼近建康，刘裕回师平定", startYear: 410, endYear: 411, eventType: "war", personIds: ["liu-yu-song"], dynastyIds: ["eastern-jin"], locationIds: ["jiankang","jin-guangzhou"], summary: "卢循、徐道覆乘刘裕北伐南燕进攻，逼近建康后被回师的晋军击败。", background: "孙恩死后卢循继领余众，曾据广州并接受东晋官号，直到410年再度大举起兵。", process: "叛军沿湘、赣和长江方向推进，晋军何无忌、刘毅先后失利；刘裕返建康组织防御并反攻，卢循次年败死。", result: "东晋解除建康危机，刘裕进一步整合南方军事力量。", impact: "灭南燕与伐后秦之间并非空白，南方战事影响了刘裕下一次北伐的条件。", causeEventIds: ["jin-sun-en","jin-liu-yu-southern-yan"], consequenceEventIds: ["jin-liu-yu-later-qin"], refs: [s.sunLuQiao, s.liuYuEarly] }),
  entry({ id: "jin-qiao-shu-falls", title: "朱龄石入蜀，谯纵政权结束", startYear: 413, eventType: "war", personIds: ["liu-yu-song"], dynastyIds: ["eastern-jin","qiao-shu"], locationIds: ["jiangling","jin-baidi","chengdu"], summary: "刘裕派朱龄石率军入蜀，晋军攻取成都，谯纵政权灭亡。", background: "刘裕平定南方主要对手后，转而收复长期脱离晋廷的巴蜀。", process: "朱龄石由江陵西进，经白帝入蜀，击败谯纵军并迫近成都，谯纵出逃后自杀。", result: "成都重新归入东晋，405年以来的谯蜀统治结束。", impact: "整合巴蜀是刘裕伐后秦以前稳定南方的重要环节。", causeEventIds: ["jin-qiao-shu","jin-lu-xun"], consequenceEventIds: ["jin-liu-yu-later-qin"], refs: [s.sunLuQiao, s.liuYuEarly] }),
  entry({ id: "jin-southern-liang-falls", title: "西秦攻取乐都，南凉结束", startYear: 414, eventType: "collapse", personIds: [], dynastyIds: ["western-qin","southern-liang-sixteen"], locationIds: ["jin-ledu","jin-fuhan"], summary: "乞伏炽磐乘秃发傉檀外出征战攻取乐都，南凉灭亡。", background: "南凉与邻国反复争夺河湟、河西，资源与军事力量不断消耗。", process: "傉檀出击乙弗时，西秦军围攻其都城乐都；城破后傉檀无力恢复统治，转而归降西秦。", result: "南凉于414年结束，傉檀被杀则是次年之事。", impact: "河西整合并不只有北凉扩张，西秦也曾吞并相邻政权。", causeEventIds: ["jin-liang-splits","jin-western-qin-restored"], refs: [s.southernLiang, s.westernQin, tongjian(116, "晋安帝义熙十年，南凉亡")] }),
  entry({ id: "jin-liu-yu-later-qin", title: "刘裕伐后秦，收复洛阳、长安", startYear: 416, endYear: 417, eventType: "war", personIds: ["liu-yu-song"], dynastyIds: ["eastern-jin", "later-qin", "northern-wei"], locationIds: ["jin-huatai", "luoyang", "jin-tongguan", "changan"], summary: "东晋多路北伐后秦，416年取洛阳，417年攻入长安。", background: "后秦姚兴去世后内部衰弱，刘裕已整合南方主要军事力量。", process: "王镇恶等先锋向洛阳推进，刘裕水军沿黄河西进，与北魏沿河军队发生冲突，诸军会攻关中。", result: "姚泓投降，后秦灭亡，东晋暂时控制关中。", impact: "远征的成功并未自动建立稳定统治，刘裕去留与后方政治左右关中局面。", causeEventIds: ["jin-liu-yu-southern-yan"], consequenceEventIds: ["jin-guanzhong-lost", "liu-song-founded"], refs: [s.liuYuQin, jin(119, "姚泓载记")] }),
  entry({ id: "jin-guanzhong-lost", title: "刘裕南返后，关中转入夏国", startYear: 418, eventType: "war", personIds: ["liu-yu-song", "helian-bobo"], dynastyIds: ["eastern-jin", "hu-xia"], locationIds: ["changan", "jin-tongwan"], summary: "刘裕南返后，留守诸将内斗，夏军攻取长安。", background: "刘穆之去世促使刘裕处理建康政局，关中由年幼的刘义真与将领留守。", process: "留守军队内部相互残杀并撤退，赫连勃勃乘机进攻。", result: "东晋北伐所得的关中迅速丧失，夏国声势扩大。", impact: "此事显示军事远征与长期行政、补给和指挥体系之间的差距。", causeEventIds: ["jin-liu-yu-later-qin", "jin-xia-founded"], consequenceEventIds: ["jin-wei-tongwan"], refs: [s.liuYuQin, s.xia] }),
  entry({ id: "jin-western-liang-falls", title: "北凉消灭西凉残部", startYear: 421, eventType: "war", personIds: [], dynastyIds: ["northern-liang", "western-liang-sixteen"], locationIds: ["jin-jiuquan", "jin-dunhuang"], summary: "北凉继420年击败李歆后，攻取李恂据守的敦煌。", background: "西凉与北凉围绕酒泉等地长期交战，李歆主动出兵后败亡。", process: "李恂在敦煌继续抵抗，沮渠蒙逊围城，最终攻取敦煌。", result: "西凉结束，北凉整合河西走廊的主要地区。", impact: "北凉将成为北魏统一北方时最后面对的河西政权。", causeEventIds: ["jin-western-liang-founded"], consequenceEventIds: ["wei-unifies-north"], refs: [s.westernLiang, s.northernLiang] }),
  entry({ id: "jin-wei-tongwan", title: "北魏攻取统万城", startYear: 427, eventType: "war", personIds: ["tuoba-tao"], dynastyIds: ["northern-wei", "hu-xia"], locationIds: ["pingcheng", "jin-tongwan"], summary: "拓跋焘进攻夏国都城，统万城被北魏攻取。", background: "赫连勃勃死后夏国发生继承争夺，北魏已由拓跋焘掌权。", process: "北魏以机动部队进攻统万，诱使守军出战后击败夏军并入城。", result: "夏国失去核心都城，赫连昌等继续抵抗。", impact: "攻取都城与政权完全结束不是同一节点，夏国余部在陇右延续到431年。", causeEventIds: ["jin-guanzhong-lost"], consequenceEventIds: ["jin-western-qin-xia-fall"], refs: [s.weiUnification] }),
  entry({ id: "jin-western-qin-xia-fall", title: "西秦与夏先后结束", startYear: 431, eventType: "collapse", personIds: [], dynastyIds: ["western-qin", "hu-xia", "northern-wei"], locationIds: ["jin-nanan"], summary: "赫连定消灭西秦后西进，被吐谷浑俘获，夏国也随之结束。", background: "北魏持续进攻使夏国余部西移，西秦同时受到邻国和内部危机挤压。", process: "赫连定围攻南安，乞伏暮末出降，西秦灭亡；夏军随后试图进一步进入河西，途中被吐谷浑慕璝击败。", result: "西秦与夏在同年先后灭亡，北方独立政权进一步减少。", impact: "北方整合不全是北魏直接攻灭对手，周边政权的行动也改变了格局。", causeEventIds: ["jin-wei-tongwan"], consequenceEventIds: ["wei-unifies-north"], refs: [s.westernQin, s.weiUnification] }),
  entry({ id: "jin-northern-yan-falls", title: "冯弘弃龙城，北燕结束", startYear: 436, eventType: "collapse", personIds: ["tuoba-tao"], dynastyIds: ["northern-wei", "northern-yan"], locationIds: ["jin-longcheng"], summary: "在北魏持续压力下，冯弘离开龙城投奔高句丽，北燕结束。", background: "北魏多次东征，北燕的土地与人口不断减少。", process: "高句丽军接应冯弘撤离，龙城及其周边转入北魏势力范围。", result: "辽西最后的独立燕国政权消失。", impact: "北魏得以将更多力量转向河西，最终于439年攻取姑臧。", causeEventIds: ["jin-northern-yan-founded"], consequenceEventIds: ["wei-unifies-north"], refs: [s.weiUnification, s.northernYanEnd] }),
];

const jinPeriodContent: SeriesContent = {
  config: jinSixteenConfig,
  introduction: "304年，刘渊称汉王、李雄据成都建立政权。本专题以五胡十六国自身的建政、兼并与重组为主线，直到439年北魏统一北方主要地区。西晋内乱作为时代前因，东晋及后来的刘宋作为并行背景；十六国以外的重要政权也一并列示，政权颜色不代表居民族属。",
  dynasties,
  people,
  events,
  locations,
  relations: [
    relation("sima-rui", "wang-dao", "ruler-subject", "王导辅佐司马睿在江左建立朝廷，联络南北士族。", evidence(s.wangDao)),
    relation("sima-yan", "jia-nanfeng", "family", "司马炎之子司马衷娶贾南风为妻，二人为公媳关系。", evidence(s.empress)),
    relation("liu-yuan", "shi-le", "ruler-subject", "石勒曾接受刘渊政权官号，在其军事体系中扩张力量。", evidence(s.hanZhao, s.shiLe)),
    relation("murong-huang", "murong-chui", "family", "慕容皝与慕容垂为父子；慕容垂后来建立后燕。", evidence(s.murong)),
    relation("fu-jian", "murong-chui", "ruler-subject", "慕容垂369年奔秦后为苻坚效力，淝水战后离秦复燕。", evidence(s.qinRise, s.murong)),
    relation("fu-jian", "yao-chang", "enemy", "姚苌384年另建后秦，与苻坚交战，次年俘杀苻坚。", evidence(s.fei, s.yao)),
    relation("xie-an", "xie-xuan", "family", "谢安是谢玄的叔父，曾举荐谢玄主持江北军事。", evidence(s.xie)),
    relation("xie-an", "huan-wen", "political", "谢安曾入桓温幕府，后来在朝廷制衡其谋求最高权力的行动。", evidence(s.xie, s.huan)),
    relation("xie-xuan", "fu-jian", "enemy", "谢玄在383年参与指挥晋军，于淝水击败前秦南征军。", evidence(s.xie, s.fei)),
    relation("huan-wen", "murong-chui", "enemy", "369年桓温北伐前燕，慕容垂率军追击其撤军。", evidence(s.huan, s.murong)),
    relation("murong-chui", "tuoba-gui", "political", "后燕与拓跋珪的关系由合作转为竞争，395年燕魏在参合陂交战。", evidence(s.murong, s.weiRise)),
    relation("liu-yu-song", "helian-bobo", "enemy", "刘裕攻灭后秦后留下关中守军，赫连勃勃乘其南返夺取长安。", evidence(s.liuYuQin, s.xia)),
  ],
  shared: {
    dynasties: ["northern-wei", "liu-song"],
    people: ["tuoba-gui", "tuoba-tao", "liu-yu-song"],
    events: ["wei-founded", "wei-capital-pingcheng", "wei-unifies-north", "liu-song-founded"],
    locations: ["luoyang", "changan", "ye", "chengdu", "jiangling", "shengle", "pingcheng", "guzang", "jinling"],
  },
  readingPaths: [
    { id: "jin-unity-to-south", title: "二赵与前燕如何改变北方", period: "304—352", description: "从汉赵、成汉兴起到二赵争衡，再看后赵瓦解与前燕进入河北。", eventIds: ["jin-han-zhao-founded", "jin-cheng-founded", "jin-two-zhaos", "jin-zhao-unifies", "jin-former-yan-founded", "jin-zhao-collapse", "jin-ran-wei", "jin-yan-takes-ye"] },
    { id: "jin-qin-rise-fall", title: "前秦如何统一，又为何分裂", period: "349—398", description: "把前秦兼并、淝水、秦燕复起与燕魏竞争串在同一条线上。", eventIds: ["jin-zhao-collapse", "jin-former-qin-founded", "jin-fu-jian-rules", "jin-qin-conquers-yan", "jin-qin-liang-dai", "jin-fei-river", "jin-qin-fragments", "jin-fu-jian-death", "wei-founded", "jin-later-yan-conquers-western-yan", "jin-former-qin-falls", "jin-canhebei", "jin-southern-yan-founded", "wei-capital-pingcheng"] },
    { id: "jin-toward-north-south", title: "五凉与夏如何走向终局", period: "386—439", description: "沿五凉分立、夏国兴亡和北魏扩张，观察西北与北方格局如何收束。", eventIds: ["jin-later-liang-founded", "wei-founded", "jin-liang-splits", "jin-western-liang-founded", "jin-later-liang-falls", "jin-xia-founded", "jin-western-qin-restored", "jin-southern-liang-falls", "jin-guanzhong-lost", "jin-western-liang-falls", "jin-wei-tongwan", "jin-western-qin-xia-fall", "jin-northern-yan-falls", "wei-unifies-north"] },
  ],
};

const westernPeople = new Set(["sima-yan", "jia-nanfeng"]);
const westernRelations = jinPeriodContent.relations.filter(item => westernPeople.has(item.sourcePersonId) && westernPeople.has(item.targetPersonId));

export const jinSixteenKingdoms: SeriesContent = {
  ...jinPeriodContent,
  events: events.filter(event => jinSixteenEventIds.includes(event.id)),
  people: people.filter(person => !westernPeople.has(person.id)),
  relations: jinPeriodContent.relations.filter(item => !westernRelations.includes(item)),
  shared: { ...jinPeriodContent.shared, events: jinSixteenSharedEventIds },
};

const westernFounding = entry({
  id: "western-jin-founded", title: "司马炎代魏建晋", startYear: 265, eventType: "founding",
  personIds: ["sima-yan"], dynastyIds: ["western-jin"], locationIds: ["luoyang"],
  summary: "司马炎继承司马氏权力，接受曹魏禅让，在洛阳建立晋朝。",
  background: "司马氏已长期掌握曹魏朝政，灭蜀之后进一步巩固了政治和军事优势。",
  process: "司马昭去世后，司马炎继承晋王爵位，随后代魏称帝，改元泰始。",
  result: "曹魏结束，西晋建立，南方的吴国此时仍然存在。",
  impact: "新王朝继承魏蜀两地资源，为后来灭吴统一奠定基础。",
  consequenceEventIds: ["jin-conquers-wu"], refs: [s.unification],
});

function sharedPeriodEntities(eventIds: readonly string[], ownedPeople: ReadonlySet<string> = new Set()) {
  const selectedPeople = new Set(events.filter(event => eventIds.includes(event.id)).flatMap(event => event.personIds));
  return {
    dynasties: [...dynasties.map(item => item.id), ...jinPeriodContent.shared!.dynasties!],
    people: [...selectedPeople].filter(id => !ownedPeople.has(id)),
    locations: [...locations.map(item => item.id), ...jinPeriodContent.shared!.locations!],
    personRelations: jinPeriodContent.relations.filter(item => selectedPeople.has(item.sourcePersonId) && selectedPeople.has(item.targetPersonId) && !westernRelations.includes(item)).map(item => item.id),
  };
}

export const westernJin: SeriesContent = {
  config: westernJinConfig,
  introduction: "265年司马炎代魏建晋，280年灭吴完成统一。291年宫廷政变开启八王之乱，宗王内战随后不断扩大；304年汉赵、成汉兴起，311年洛阳失陷，316年长安投降。本专题沿西晋朝廷的统一、内乱与崩解展开，地方新政权的后续发展转入五胡十六国专题。现有地图为281年统一后的格局，只作其他年份事件的地理参照。",
  dynasties: [], people: people.filter(person => westernPeople.has(person.id)),
  events: [westernFounding, ...events.filter(event => westernJinEventIds.includes(event.id))],
  locations: [], relations: westernRelations,
  shared: { ...sharedPeriodEntities([...westernJinEventIds, ...westernJinSharedEventIds], westernPeople), events: westernJinSharedEventIds },
  readingPaths: [
    { id: "western-jin-unification", title: "从代魏到统一", period: "265—290", description: "沿建国、灭吴与皇位交接，认识西晋的统一及其隐忧。", eventIds: ["western-jin-founded", "jin-conquers-wu", "jin-hui-succeeds"] },
    { id: "western-jin-princes", title: "八王之乱如何扩大", period: "291—306", description: "从291年宫廷政变到宗王战争，区分内乱的不同阶段。", eventIds: ["jin-jia-coup", "jin-jia-falls", "jin-princes-war"] },
    { id: "western-jin-collapse", title: "两京失守与南渡", period: "304—316", description: "新政权兴起与晋廷崩解同时发生，南渡也并非一次完成。", eventIds: ["jin-han-zhao-founded", "jin-cheng-founded", "jin-rui-south", "jin-luoyang-falls", "jin-southward-migration", "jin-changan-falls"] },
  ],
};

export const easternJin: SeriesContent = {
  config: easternJinConfig,
  introduction: "317年司马睿在建康称晋王，318年称帝，江南朝廷在南渡士族与地方社会的合作中重建。本专题以江左建政、门阀政治、北府军和北伐为主线，到420年刘裕代晋建宋结束。北方诸国作为同时代背景，相关战争与五胡十六国专题共享事件与史料。地图保留327、366、382、395、409年的实际资料年代，不作逐年疆界推算。",
  dynasties: [], people: [], events: events.filter(event => easternJinEventIds.includes(event.id)), locations: [], relations: [],
  shared: { ...sharedPeriodEntities([...easternJinEventIds, ...easternJinSharedEventIds]), events: easternJinSharedEventIds },
  readingPaths: [
    { id: "eastern-jin-court", title: "江左朝廷如何立足", period: "317—328", description: "从司马睿建政到王敦、苏峻之乱，观察皇室与地方军事力量。", eventIds: ["jin-eastern-founded", "jin-wang-dun", "jin-su-jun"] },
    { id: "eastern-jin-expeditions", title: "桓温北伐与淝水防线", period: "347—384", description: "从桓温的北伐转向北府军与淝水战后反攻。", eventIds: ["jin-huan-conquers-cheng", "jin-huan-guanzhong", "jin-huan-luoyang", "jin-huan-fangtou", "jin-northern-headquarters", "jin-fei-river", "jin-xie-xuan-north"] },
    { id: "eastern-jin-liu-yu", title: "从东晋末局到刘宋", period: "399—420", description: "孙恩卢循、刘裕兴起与北伐，共同改变江南的权力格局。", eventIds: ["jin-sun-en", "jin-liu-yu-rises", "jin-lu-xun", "jin-liu-yu-southern-yan", "jin-liu-yu-later-qin", "jin-guanzhong-lost", "liu-song-founded"] },
  ],
};
