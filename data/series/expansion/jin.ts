import { book, event, person, place, polity, relation, source, type SeriesContent } from "./model";
import { expansionConfig } from "./configs";

const j = (ep: string, locator: string, ...refs: string[]) => source("jin", `jin-${ep}`, `金与金中都${ep}`, `金${ep}_clean_v1.md · ${locator}`, ...refs);
const founder = book("金史", "卷2", "太祖本纪");
const taizong = book("金史", "卷3", "太宗本纪");
const capital = book("金史", "卷5", "海陵本纪");
const shizong = book("金史", "卷6", "世宗本纪");
const ending = book("金史", "卷18", "哀宗本纪下");
const early = j("01", "女真建国、辽金更替背景段；参辽05 P046", founder, taizong);
const c = j("01", "P072—P101；迁都与城市营建", capital);
const late = j("03", "哀宗、蒙古战争与蔡州段", book("金史", "卷17", "天兴元年三峰山战事"), ending);
const people = [
  person("wanyan-liang", "完颜亮", ["jin"], ["海陵王"], ["ruler"], "1149年夺位，1153年迁都燕京并改为中都，推动政治中心南移；1161年南征失败，死于军中政变。", c, 1122, 1161),
  person("wanyan-aguda", "完颜阿骨打", ["jin"], ["金太祖"], ["ruler", "general"], "1114年率女真起兵反辽，1115年称帝建金。连续获胜使金迅速成为北方主要力量。", early, 1068, 1123),
  person("wanyan-wuqimai", "完颜吴乞买", ["jin"], ["金太宗"], ["ruler"], "阿骨打之弟，1123年即位，其朝灭辽并攻破北宋都城开封。", early, 1075, 1135),
  person("wanyan-dading", "完颜雍", ["jin"], ["金世宗"], ["ruler"], "1161年在辽阳即位，年号大定。结束海陵时期的战争危机，整顿政治并与宋恢复和议。", j("02", "世宗与大定段", shizong), 1123, 1189),
  person("wanyan-jing", "完颜璟", ["jin"], ["金章宗"], ["ruler"], "1189年继位，朝廷文化和制度继续发展；其后期经历宋金战争与泰和和议。", j("02", "P034及章宗段", book("金史", "卷9", "章宗本纪")), 1168, 1208),
  person("wanyan-xun", "完颜珣", ["jin"], ["金宣宗"], ["ruler"], "1213年即位，次年迁都汴京。金朝失去中都后，仍在黄河以南维持统治。", j("02", "迁汴与中都失守段", book("金史", "卷14", "宣宗本纪")), 1163, 1224),
  person("wanyan-shouxu", "完颜守绪", ["jin"], ["金哀宗"], ["ruler"], "1224年即位，努力维系衰局，汴京受围后转移蔡州；1234年城破时自尽。", late, 1198, 1234),
  person("zhang-hao-jin", "张浩", ["jin"], ["金朝大臣"], ["official"], "渤海人，参与金朝政务与燕京宫室营建。中都的建设依靠多族官员、工匠与劳役组织。", j("01", "P101及营建段", book("金史", "卷83", "张浩传")), undefined, 1163),
];
const events = [
  event({ id: "jin-rebellion", title: "阿骨打起兵反辽", startYear: 1114, eventType: "war", tracks: ["jin-rise"], personIds: ["wanyan-aguda"], dynastyIds: ["liao", "jin"], locationIds: ["ningjiang"], summary: "女真军攻取宁江州，辽金力量对比开始迅速变化。", background: "辽与女真诸部之间的征发、贸易与权力关系日益紧张。", process: "阿骨打组织兵力反辽，取得关键战果。", result: "女真起兵由地方冲突升级为对辽的全面挑战。", impact: "为翌年建立金朝准备了军事与政治基础。", consequenceEventIds: ["jin-founded"] }, early),
  event({ id: "jin-founded", title: "阿骨打称帝建金", startYear: 1115, eventType: "founding", tracks: ["jin-rise"], personIds: ["wanyan-aguda"], dynastyIds: ["jin"], locationIds: ["jin-shangjing"], summary: "阿骨打称帝，建立金朝，改元收国。", background: "女真军队在反辽战争中扩大控制。", process: "建立皇帝名号和国家制度，继续对辽作战。", result: "金朝成为东北亚新的政治中心。", impact: "辽、宋与女真之间的关系被彻底改写。", causeEventIds: ["jin-rebellion"] }, early),
  event({ id: "jin-jingkang", title: "靖康之变，北宋覆亡", startYear: 1127, eventType: "collapse", tracks: ["jin-rise"], personIds: ["wanyan-wuqimai"], dynastyIds: ["jin", "northern-song"], locationIds: ["kaifeng"], summary: "金军攻陷开封后俘虏宋徽、钦二帝，北宋结束。", background: "宋金围绕燕云和边境发生冲突，金军两度南下。", process: "开封被围，宋廷议和失败，皇室与大量人员被押往北方。", result: "北宋都城和中央朝廷被摧毁。", impact: "赵构随后在南方重建宋政权，宋金对峙由此展开。" }, j("01", "金朝前期背景；参辽05靖康段", taizong)),
  event({ id: "jin-shaoxing-treaty", title: "宋金达成绍兴和议", startYear: 1141, eventType: "political", tracks: ["jin-zhongdu"], personIds: [], dynastyIds: ["jin"], locationIds: ["huaishui"], summary: "宋金通过和议确定新的疆界与政治关系。", background: "多年战争后，双方都在调整军事与外交选择。", process: "使者议定条件，和议于次年进一步落实。", result: "形成以淮河及西部相关界线为基础的对峙格局。", impact: "宋金关系进入新的阶段，后来隆兴和议又调整了部分条件。", disputedNote: "本条记录1141年议定节点，不把1142年的执行和确认混作同一天。" }, j("02", "宋金和战背景段", book("金史", "卷4", "皇统元年"))),
  event({ id: "jin-moves-zhongdu", title: "迁都燕京，改为中都", startYear: 1153, eventType: "political", tracks: ["jin-zhongdu"], personIds: ["wanyan-liang", "zhang-hao-jin"], dynastyIds: ["jin"], locationIds: ["jin-shangjing", "jin-zhongdu"], summary: "完颜亮迁都燕京，燕京由陪都转变为王朝首都。", background: "金朝统治地域向南扩展，海陵王意图调整统治中心。", process: "扩建宫城和都城，组织工匠与物资，迁移朝廷。", result: "中都成为金朝政治中心。", impact: "北京城市史进入新的阶段，城市营建也带来巨大的劳役负担。" }, c),
  event({ id: "jin-hailing-southern-war", title: "海陵南征失败，世宗即位", startYear: 1161, eventType: "war", tracks: ["jin-zhongdu"], personIds: ["wanyan-liang", "wanyan-dading"], dynastyIds: ["jin"], locationIds: ["caishi", "liaoyang"], summary: "金军南征受挫，完颜雍在辽阳即位，完颜亮在军中被杀。", background: "大规模征发激化矛盾，南征并未迅速取得预期胜利。", process: "采石等战事阻滞渡江，后方出现新皇帝，军中发生政变。", result: "海陵统治结束，世宗逐步接管政权。", impact: "金朝转向恢复秩序和重建宋金关系。" }, j("02", "P021及海陵南征段", capital, shizong)),
  event({ id: "jin-longxing-treaty", title: "隆兴和议", startYear: 1164, eventType: "political", tracks: ["jin-zhongdu"], personIds: ["wanyan-dading"], dynastyIds: ["jin"], locationIds: ["huaishui"], summary: "宋金再度议和，调整两国名分和岁币条件。", background: "海陵南征与宋方北伐之后，双方都未能打破基本格局。", process: "宋金通过使节往返重建和议。", result: "大规模战争暂告结束。", impact: "世宗时期获得较稳定的外部环境，但对峙并未消失。" }, j("02", "世宗和议段", book("金史", "卷6", "大定四年"))),
  event({ id: "jin-mongol-invasion", title: "蒙古大举攻金", startYear: 1211, eventType: "war", tracks: ["jin-collapse"], personIds: [], dynastyIds: ["jin"], locationIds: ["yehuling"], summary: "蒙古军大举攻金，野狐岭一线的战败暴露金军防御危机。", background: "草原力量重新整合，金与蒙古的旧有关系破裂。", process: "蒙古军突破北部防线，向华北腹地推进。", result: "金朝失去军事主动权。", impact: "中都受到越来越大的压力，最终促成迁都。" }, j("02", "蒙古南下与野狐岭段", book("金史", "卷13", "大安三年"))),
  event({ id: "jin-moves-kaifeng", title: "金宣宗迁都汴京", startYear: 1214, eventType: "political", tracks: ["jin-collapse"], personIds: ["wanyan-xun"], dynastyIds: ["jin"], locationIds: ["jin-zhongdu", "kaifeng"], summary: "金廷离开中都，迁往汴京。", background: "蒙古军逼近中都，金廷在议和后谋求南迁避险。", process: "皇帝和朝廷南下，将中都留给守军。", result: "政治中心移到黄河以南。", impact: "迁都并未阻止蒙古继续进攻，中都次年失守。", consequenceEventIds: ["jin-zhongdu-falls"] }, j("02", "迁汴段", book("金史", "卷14", "贞祐二年"))),
  event({ id: "jin-zhongdu-falls", title: "中都陷落", startYear: 1215, eventType: "war", tracks: ["jin-collapse"], personIds: ["wanyan-xun"], dynastyIds: ["jin"], locationIds: ["jin-zhongdu"], summary: "蒙古军攻取中都，金失去经营数十年的北方都城。", background: "迁都后中都孤立，长期围困造成严重困境。", process: "守城体系瓦解，蒙古军进入中都。", result: "中都失守，城市遭到破坏。", impact: "金朝仍以汴京为中心延续，不能把1215年当作金亡之年。", causeEventIds: ["jin-moves-kaifeng"] }, j("02", "中都火毁段", book("金史", "卷14", "贞祐三年"))),
  event({ id: "jin-sanfengshan", title: "三峰山之战，金主力受重创", startYear: 1232, eventType: "war", tracks: ["jin-collapse"], personIds: ["wanyan-shouxu"], dynastyIds: ["jin"], locationIds: ["sanfengshan"], summary: "金军在三峰山战败，主要野战力量受到毁灭性打击。", background: "蒙古分路进攻，金军需要阻止敌军进入河南腹地。", process: "双方在钧州附近交战，金军困于严寒、补给和包围。", result: "金朝失去大量精锐，汴京面临围攻。", impact: "此后金廷不断转移，回旋空间急剧缩小。", consequenceEventIds: ["jin-caizhou-falls"] }, late),
  event({ id: "jin-caizhou-falls", title: "蔡州城破，金朝灭亡", startYear: 1234, eventType: "collapse", tracks: ["jin-collapse"], personIds: ["wanyan-shouxu"], dynastyIds: ["jin"], locationIds: ["caizhou"], summary: "宋蒙联军攻破蔡州，金哀宗自尽，金朝结束。", background: "汴京失守后，金廷辗转退至蔡州。", process: "蔡州陷入包围与饥困，城破前哀宗传位完颜承麟，旋即自尽。", result: "金的最后朝廷覆灭。", impact: "宋金长期对峙结束，南宋直接面对蒙古。", causeEventIds: ["jin-sanfengshan"] }, late),
];
export const jin: SeriesContent = {
  config: expansionConfig("jin"), introduction: "金中都是本专题的中心，但不是全部。先看女真建国与宋辽格局的瓦解，再读迁都、治理和蒙古战争，分清中都失守与金朝灭亡之间的十九年。",
  dynasties: [polity("jin", "金", 1115, 1234, "上京 → 中都 → 汴京", "#a88345", "完颜氏建立的王朝，先后灭辽与北宋；迁都中都后统治重心南移，蒙古战争中再迁汴京，1234年亡于蔡州。", early)], people, events,
  locations: [place("ningjiang", "宁江州", 124.8, 45.2, "今吉林松原一带", early), place("jin-shangjing", "金上京", 126.98, 45.54, "今黑龙江哈尔滨阿城", early), place("jin-zhongdu", "金中都", 116.35, 39.87, "今北京西南城区", c), place("huaishui", "淮河", 117.4, 32.9, "淮河中游区域参照；不是整条国界", j("02", "宋金对峙段", shizong)), place("caishi", "采石", 118.47, 31.68, "今安徽马鞍山采石矶一带", c), place("liaoyang", "辽阳", 123.17, 41.27, "今辽宁辽阳", j("02", "世宗即位段", shizong)), place("yehuling", "野狐岭", 114.65, 41.02, "今河北张家口万全一带", j("02", "野狐岭段", book("金史", "卷13", "大安三年"))), place("sanfengshan", "三峰山", 113.47, 34.16, "今河南禹州附近", late), place("caizhou", "蔡州", 114.02, 33.02, "今河南汝南", late)],
  relations: [relation("wanyan-aguda", "wanyan-wuqimai", "family", "兄弟；太宗继太祖即位。", early), relation("wanyan-liang", "zhang-hao-jin", "ruler-subject", "张浩参与中都营建。", c), relation("wanyan-liang", "wanyan-dading", "political", "海陵南征时，完颜雍在辽阳即位，形成权力竞争。", j("02", "海陵与世宗段", capital, shizong)), relation("wanyan-dading", "wanyan-jing", "family", "祖孙；章宗继世宗即位。", j("02", "P034及章宗继位段", book("金史", "卷9", "章宗本纪"))), relation("wanyan-xun", "wanyan-shouxu", "family", "父子；宣宗与哀宗。", late)],
  shared: { events: ["liao-tianzuo-captured"], people: ["yelu-yanxi"], dynasties: ["liao", "northern-song"], locations: ["yingzhou-shanxi", "kaifeng"] },
  readingPaths: [
    { id: "jin-rise-path", title: "女真如何改变宋辽格局", period: "1114—1127", description: "从反辽到建国，再到北宋覆亡。", eventIds: ["jin-rebellion", "jin-founded", "liao-tianzuo-captured", "jin-jingkang"] },
    { id: "jin-capital-path", title: "中都与王朝重心的南移", period: "1141—1164", description: "都城建设、南征和议，一起塑造中都时代。", eventIds: ["jin-shaoxing-treaty", "jin-moves-zhongdu", "jin-hailing-southern-war", "jin-longxing-treaty"] },
    { id: "jin-last-path", title: "从中都危局到蔡州终局", period: "1211—1234", description: "不把一座城市的失守等同于一个王朝的消失。", eventIds: ["jin-mongol-invasion", "jin-moves-kaifeng", "jin-zhongdu-falls", "jin-sanfengshan", "jin-caizhou-falls"] },
  ],
};
