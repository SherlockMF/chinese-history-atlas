import { book, event, person, place, polity, relation, source, type SeriesContent } from "./model";
import { expansionConfig } from "./configs";

const l = (ep: string, locator: string, ...refs: string[]) => source("liao", `liao-${ep}`, ep === "06" ? "西辽" : `辽${ep}`, `${ep === "06" ? "西辽" : `辽${ep}`}_clean_v1.md · ${locator}`, ...refs);
const peace = book("遼史", "卷14", "统和二十二年宋辽议和");
const west = book("遼史", "卷30", "耶律大石与西辽诸帝");
const mongol = book("元史", "卷120", "曷思麦里传，随哲别击败屈出律");
const end = book("遼史", "卷29", "天祚皇帝末年");
const p = l("03", "澶渊之盟段", peace);
const people = [
  person("xiao-yanyan", "萧绰", ["liao"], ["承天皇太后"], ["regent"], "小字燕燕，辽景宗皇后、圣宗之母。景宗死后临朝，与韩德让等共同主持军政，经历宋辽战争与澶渊议和。", l("02", "P103、P124、P227", book("遼史", "卷71", "景宗睿智皇后")), 953, 1009),
  person("yelu-longxu", "耶律隆绪", ["liao"], ["辽圣宗"], ["ruler"], "982年即位，早期由萧太后临朝；统和年间与宋作战并缔结澶渊之盟，此后维持长期和议。", p, 972, 1031),
  person("han-derang", "韩德让", ["liao"], ["辽朝重臣"], ["official", "general"], "在景宗、圣宗朝担任要职，协助萧太后处理军政。政治作用有史可考，私生活传闻不能代替其履历。", l("03", "P006—P083", book("遼史", "卷82", "耶律隆运传")), 941, 1011),
  person("yelu-zongzhen", "耶律宗真", ["liao"], ["辽兴宗"], ["ruler"], "1031年继位，处理太后干政，与宋交涉增加岁币，并多次对西夏用兵。", l("04", "P004及增币段", book("遼史", "卷18", "兴宗本纪")), 1016, 1055),
  person("yelu-hongji", "耶律洪基", ["liao"], ["辽道宗"], ["ruler"], "1055年继位。统治后期耶律乙辛得势，皇后、太子相继受害，继承秩序遭到破坏。", l("04", "道宗与耶律乙辛段", book("遼史", "卷23", "道宗本纪")), 1032, 1101),
  person("yelu-yanxi", "耶律延禧", ["liao"], ["辽天祚帝"], ["ruler"], "1101年继位，面对女真起兵逐渐失去诸京与军队支持，1125年被金军俘获。", l("05", "天祚帝末局段", end), 1075, 1128),
  person("yelu-dashi", "耶律大石", ["liao", "western-liao"], ["西辽建立者"], ["ruler", "general"], "辽末率部西行，在中亚建立西辽。以虎思斡耳朵为中心，1141年在卡特万之战击败塞尔柱联军。", l("06", "P004起；西行、建国与会战段", west), 1087, 1143),
  person("xiao-tabuyan", "萧塔不烟", ["western-liao"], ["西辽感天皇后"], ["regent"], "耶律大石皇后，大石去世后临朝，延续西辽政权，后由其子耶律夷列继位。", l("06", "大石身后继承段", west)),
  person("kuchlug", "屈出律", ["western-liao"], ["乃蛮王子"], ["ruler"], "乃蛮败亡后进入西辽，1211年夺取实际权力；1218年被蒙古军击败，西辽统治终结。", l("06", "屈出律与西辽终局段", west, mongol)),
];
const events = [
  event({ id: "liao-shengzong-accession", title: "辽圣宗即位，萧太后临朝", startYear: 982, eventType: "succession", tracks: ["liao-song-peace"], personIds: ["xiao-yanyan", "yelu-longxu", "han-derang"], dynastyIds: ["liao"], locationIds: [], summary: "景宗去世，年幼的隆绪即位，萧太后主持军政。", background: "宋辽边境冲突未息，新君尚未成年。", process: "萧太后与韩德让等重臣稳定政局。", result: "形成太后临朝与大臣协助的政治格局。", impact: "此后辽能够集中资源应对宋朝北伐。" }, l("02", "P227及其后", book("遼史", "卷10", "圣宗本纪"))),
  event({ id: "liao-yongxi-campaign", title: "宋雍熙北伐失利", startYear: 986, eventType: "war", tracks: ["liao-song-peace"], personIds: ["xiao-yanyan", "yelu-longxu", "zhao-guangyi"], dynastyIds: ["liao", "northern-song"], locationIds: ["youzhou", "yunzhou"], summary: "宋军分路北伐，辽军反击，宋方未能收复燕云。", background: "宋廷希望利用辽主年幼之机改变北部边界。", process: "东路宋军在岐沟关失利，其他部队亦撤退，杨业兵败被俘后死去。", result: "辽保持对燕云主要地区的控制。", impact: "宋辽转入持续边境战争，最终走向议和。" }, l("03", "雍熙北伐与杨业段", book("遼史", "卷11", "统和四年"), book("宋史", "卷272", "杨业传"))),
  event({ id: "liao-chanyuan-treaty", title: "澶渊之盟", startYear: 1005, eventType: "political", tracks: ["liao-song-peace"], personIds: ["xiao-yanyan", "yelu-longxu", "han-derang"], dynastyIds: ["liao", "northern-song"], locationIds: ["chanzhou"], summary: "宋辽在澶州前线议和，建立长期盟约。", background: "1004年辽军南下，宋真宗抵达澶州，双方均有结束战事的需要。", process: "使者往返谈判，约定边境安排和宋向辽提供岁币。", result: "两国停止大规模战争，边境交往得到恢复。", impact: "盟约维系了一百余年的基本和平，不等于两国再无摩擦。", disputedNote: "传统纪年为景德元年十二月；换算公历已入1005年，故常见1004、1005两种标法。" }, p),
  event({ id: "liao-increased-payments", title: "宋辽交涉增币", startYear: 1042, eventType: "political", tracks: ["liao-song-peace"], personIds: ["yelu-zongzhen"], dynastyIds: ["liao", "northern-song"], locationIds: ["liao-nanjing"], summary: "辽利用宋夏战争压力与宋交涉，宋增加岁币。", background: "宋与西夏交战，辽试图调整对宋关系中的利益。", process: "双方围绕关南土地和岁币反复谈判。", result: "宋增加银绢，辽未通过这次交涉取得关南土地。", impact: "澶渊框架仍在，但盟约内的力量关系和条件可以变化。" }, l("04", "P065及增币段", book("遼史", "卷19", "重熙十一年"))),
  event({ id: "liao-crown-prince-killed", title: "皇太子耶律濬遇害", startYear: 1077, eventType: "political", tracks: ["liao-decline"], personIds: ["yelu-hongji"], dynastyIds: ["liao"], locationIds: ["liao-shangjing"], summary: "耶律乙辛构陷太子耶律濬，太子被废后遇害。", background: "道宗朝后期权臣与宫廷之间的斗争加剧。", process: "太子被诬谋反，先遭废黜，随后被杀。", result: "正常的皇位继承受到破坏。", impact: "未来的天祚帝是太子之子，宫廷斗争的后果延续到下一代。" }, l("04", "耶律乙辛构陷太子段", book("遼史", "卷110", "耶律乙辛传"))),
  event({ id: "liao-tianzuo-captured", title: "天祚帝被俘，辽朝结束", startYear: 1125, eventType: "collapse", tracks: ["liao-decline", "jin-rise"], personIds: ["yelu-yanxi"], dynastyIds: ["liao"], locationIds: ["yingzhou-shanxi"], summary: "金军俘获天祚帝，辽在北方的王朝统治告终。", background: "女真起兵后辽军连续失利，诸京相继失守。", process: "天祚帝辗转逃亡，最终在应州一带被俘。", result: "辽朝中央统治终结。", impact: "耶律大石西行建立的政权继续发展，不能把西辽也截断在1125年。" }, l("05", "天祚帝被俘段", end)),
  event({ id: "western-liao-founded", title: "耶律大石称帝，西辽建立", startYear: 1132, eventType: "founding", tracks: ["western-liao"], personIds: ["yelu-dashi"], dynastyIds: ["western-liao"], locationIds: ["balasagun"], summary: "耶律大石西行后称帝，延续辽的国号和统治传统。", background: "辽末局势瓦解，大石率部脱离天祚帝另寻立足点。", process: "西行集团在中亚发展势力，建立以虎思斡耳朵为中心的统治。", result: "西辽成为中亚重要政权。", impact: "西辽与当地各族政权之间兼有征服、朝贡与间接统治关系。", disputedNote: "西辽建国起算有1124年、1132年等口径；本条采用称帝节点。地点标示政权中心，非断言称帝礼在此举行。" }, l("05", "P192；西辽专集西行段", west)),
  event({ id: "western-liao-qatwan", title: "卡特万之战", startYear: 1141, eventType: "war", tracks: ["western-liao"], personIds: ["yelu-dashi"], dynastyIds: ["western-liao"], locationIds: ["samarkand"], summary: "西辽军在撒马尔罕附近击败塞尔柱苏丹桑贾尔的联军。", background: "西辽西进，介入喀喇汗政权与周边势力的冲突。", process: "大石率军与联军在卡特万会战。", result: "联军失败，西辽在中亚的影响扩大。", impact: "西辽取得区域霸权，但不意味着把所有地区变成同一套直接行政辖区。" }, l("06", "卡特万会战段", west)),
  event({ id: "western-liao-regency", title: "大石去世，萧塔不烟临朝", startYear: 1143, eventType: "succession", tracks: ["western-liao"], personIds: ["yelu-dashi", "xiao-tabuyan"], dynastyIds: ["western-liao"], locationIds: ["balasagun"], summary: "耶律大石去世后，皇后萧塔不烟摄政。", background: "西辽已经立足中亚，继承安排关系新政权的稳定。", process: "萧塔不烟临朝称制，继续统治。", result: "西辽没有随建立者去世而立即瓦解。", impact: "皇后摄政是西辽政治史的重要组成部分。" }, l("06", "西辽皇后摄政段", west)),
  event({ id: "western-liao-usurpation", title: "屈出律夺取西辽实权", startYear: 1211, eventType: "political", tracks: ["western-liao"], personIds: ["kuchlug"], dynastyIds: ["western-liao"], locationIds: ["balasagun"], summary: "进入西辽的乃蛮王子屈出律夺取统治权。", background: "蒙古扩张迫使草原势力西迁，西辽外部压力和内部冲突加剧。", process: "屈出律利用军力和宫廷关系控制西辽政权。", result: "耶律氏失去实权。", impact: "以政权实权转移计，1211年也是西辽史的重要终点口径。" }, l("06", "屈出律篡权段", west)),
  event({ id: "western-liao-falls", title: "蒙古灭屈出律，西辽终结", startYear: 1218, eventType: "collapse", tracks: ["western-liao"], personIds: ["kuchlug"], dynastyIds: ["western-liao"], locationIds: ["kashgar"], summary: "蒙古军西进击败屈出律，西辽统治最终终结。", background: "屈出律统治与地方社会的冲突削弱了其支持。", process: "哲别率蒙古军进入西辽地区，追击逃亡的屈出律。", result: "屈出律被杀，西辽旧地进入新的政治格局。", impact: "蒙古势力进一步进入中亚。", disputedNote: "地图标示喀什作为追击方向的地域参照，不精确标定屈出律被杀地点。" }, l("06", "西辽终局段", west, mongol)),
];

export const liao: SeriesContent = {
  config: expansionConfig("liao"), introduction: "从907年的契丹可汗到916年称帝，再从宋辽盟约读到西辽的中亚历史。前三个节点与五代专题共享同一事件记录；西辽单列轨道，区分1125年辽亡与1218年的终局。",
  dynasties: [polity("western-liao", "西辽", 1132, 1218, "虎思斡耳朵", "#677b70", "耶律大石西行后建立的中亚政权，延续辽号，建国称帝节点采用1132年。1211年耶律氏失去实权，1218年最终终结。", l("06", "全篇主线", west))],
  people, events,
  locations: [place("liao-shangjing", "辽上京", 119.4, 43.98, "今内蒙古巴林左旗林东镇一带", l("01", "契丹建都段", book("遼史", "卷37", "地理志"))), place("liao-nanjing", "辽南京", 116.35, 39.89, "今北京西南城区", p), place("chanzhou", "澶州", 115.03, 35.71, "今河南濮阳一带", p), place("balasagun", "虎思斡耳朵", 75.3, 42.75, "今吉尔吉斯斯坦托克马克附近八剌沙衮一带", l("06", "P048及政权中心段", west)), place("samarkand", "撒马尔罕", 66.97, 39.65, "今乌兹别克斯坦撒马尔罕；会战地点仅示意周边", l("06", "卡特万会战段", west)), place("kashgar", "喀什", 75.99, 39.47, "今新疆喀什", l("06", "终局段", west))],
  relations: [relation("xiao-yanyan", "yelu-longxu", "family", "母子；萧太后在圣宗年幼时临朝。", p), relation("xiao-yanyan", "han-derang", "political", "共同处理辽朝军政，不用传闻替代政治关系。", p), relation("yelu-longxu", "yelu-zongzhen", "family", "父子；辽圣宗与辽兴宗。", l("04", "P004", book("遼史", "卷18", "兴宗本纪"))), relation("yelu-zongzhen", "yelu-hongji", "family", "父子；辽兴宗与辽道宗。", l("04", "道宗即位段", book("遼史", "卷21", "道宗本纪"))), relation("yelu-dashi", "xiao-tabuyan", "family", "夫妻；大石去世后萧塔不烟临朝。", l("06", "继承段", west))],
  shared: { dynasties: ["liao", "northern-song"], people: ["yelu-abaoji", "shulu-ping", "yelu-deguang", "zhao-guangyi"], events: ["abaoyi-khagan", "liao-founded", "liao-destroys-balhae"], locations: ["youzhou", "yunzhou", "yingzhou-shanxi"] },
  readingPaths: [
    { id: "liao-origins", title: "契丹如何成为王朝", period: "907—982", description: "从可汗、皇帝到太后临朝，辨认辽的制度与继承。", eventIds: ["abaoyi-khagan", "liao-founded", "liao-destroys-balhae", "liao-shengzong-accession"] },
    { id: "liao-peace", title: "宋辽如何从战争走向盟约", period: "982—1042", description: "把雍熙北伐、澶渊议和与后来的增币放在同一条线上。", eventIds: ["liao-shengzong-accession", "liao-yongxi-campaign", "liao-chanyuan-treaty", "liao-increased-payments"] },
    { id: "liao-west", title: "辽亡以后，向西走", period: "1125—1218", description: "辽的终结没有结束契丹人的历史，继续读西辽的建立与更替。", eventIds: ["liao-tianzuo-captured", "western-liao-founded", "western-liao-qatwan", "western-liao-regency", "western-liao-usurpation", "western-liao-falls"] },
  ],
};
