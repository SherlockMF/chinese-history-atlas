import { book, event, person, polity, relation, source, type SeriesContent } from "./model";
import { expansionConfig } from "./configs";

const s = (ep: string, locator: string, ...refs: string[]) => source("southern-dynasties", `southern-${ep}`, `南朝${ep}`, `南朝${ep}_clean_v1.md · ${locator}`, ...refs);
const song = book("宋書", "卷3", "武帝下");
const wen = book("宋書", "卷5", "文帝纪");
const qi = book("南齊書", "卷1", "高帝上");
const liang = book("梁書", "卷02", "武帝中，天监元年即位");
const hou = book("梁書", "卷56", "侯景传");
const chen = book("陳書", "卷2", "高祖下");
const liuyu = s("01", "刘裕建宋段", song);
const h = s("05", "P003起侯景之乱主线", hou);
const people = [
  person("xiao-yan", "萧衍", ["southern-liang"], ["梁武帝"], ["ruler"], "502年代齐建梁，前期经营政治文化，晚年信任降将侯景，建康陷落后于549年去世。", s("04", "梁武帝前后期段；续南朝05", liang, book("梁書", "卷3", "武帝下")), 464, 549),
  person("liu-yu-song", "刘裕", ["liu-song"], ["宋武帝"], ["ruler", "general"], "由东晋将领崛起，通过北伐与平定内乱建立威望，420年代晋建宋。与南唐后主李煜不是同一人物。", liuyu, 363, 422),
  person("liu-yilong", "刘义隆", ["liu-song"], ["宋文帝"], ["ruler"], "424年即位，开启元嘉时期，后期北伐失败，453年被太子刘劭杀害。", s("02", "元嘉与刘劭段", wen), 407, 453),
  person("liu-shao-song", "刘劭", ["liu-song"], ["刘宋太子"], ["royal-family"], "宋文帝长子，453年发动宫廷政变杀父自立，旋被刘骏击败。", s("02", "刘劭弑父段", book("宋書", "卷99", "二凶传"))),
  person("xiao-daocheng", "萧道成", ["liu-song", "southern-qi"], ["齐高帝"], ["ruler", "general"], "刘宋末年掌握军政，479年代宋建齐。南齐与高洋建立的北齐属于不同政权。", s("03", "南齐建立段", qi), 427, 482),
  person("hou-jing", "侯景", ["eastern-wei", "southern-liang"], ["将领", "叛军首领"], ["general"], "原属北方军政集团，降梁后与梁廷关系破裂，548年起兵，次年攻陷建康，552年败亡。", h, 503, 552),
  person("xiao-yi", "萧绎", ["southern-liang"], ["梁元帝"], ["ruler"], "以江陵为基地参与平定侯景，552年称帝。554年西魏攻陷江陵，萧绎被杀。", s("05", "P107及萧绎段", book("梁書", "卷5", "元帝纪")), 508, 554),
  person("chen-baxian", "陈霸先", ["southern-liang", "chen"], ["陈武帝"], ["ruler", "general"], "在平定侯景之乱中崛起，随后控制建康，557年代梁建陈。", s("06", "P001—P021及陈朝建立段", chen), 503, 559),
  person("chen-xu", "陈顼", ["chen"], ["陈宣帝"], ["ruler"], "569年即位，整顿内政并发动对北齐的北伐。北周灭齐后陈的北方战局逆转。", s("06", "P075及北伐段", book("陳書", "卷5", "宣帝纪")), 530, 582),
  person("chen-qian", "陈蒨", ["chen"], ["陈文帝"], ["ruler"], "559年在侯安都等人拥立下即位，平定王琳与留异、陈宝应等地方势力，勤政节用，566年病逝。", s("06", "P038—P049陈蒨继位与治理段", book("陳書", "卷3", "世祖纪")), 522, 566),
  person("chen-bozong", "陈伯宗", ["chen"], ["陈废帝"], ["ruler"], "566年以太子即位，辅政的叔叔陈顼与顾命近臣相争，568年被废为临海王，570年去世。", s("06", "P066—P069废帝段", book("陳書", "卷4", "废帝纪")), 570),
  person("chen-shuling", "陈叔陵", ["chen"], ["始兴王"], ["royal-family"], "陈顼次子，长期掌地方军政，582年陈顼病重时以药刀行刺太子陈叔宝，败死于白杨路。", s("06", "P079—P087陈叔陵之变段", book("陳書", "卷36", "始兴王叔陵传")), 582),
  person("chen-shujian", "陈叔坚", ["chen"], ["长沙王"], ["royal-family"], "宫变中扼住陈叔陵救驾，陈叔宝养伤期间一度参与朝政，583年因骄纵被移出中枢。", s("06", "P083—P089叔坚救驾与去位段", book("陳書", "卷28", "长沙王叔坚传"))),
  person("zhang-lihua", "张丽华", ["chen"], ["张贵妃"], ["royal-family"], "陈叔宝宠妃，记忆强于常人，百官奏事经宦者与其传递整理，589年城破时与后主同匿井中被执。", s("06", "P088—P091张丽华段", book("陳書", "卷7", "后妃传")), 559, 589),
  person("wu-mingche", "吴明彻", ["chen"], ["南陈将领"], ["general"], "573年奉命北伐，攻取寿阳并俘杀王琳；578年吕梁退路被王轨以铁锁车轮截断，兵败被俘。", s("06", "P069—P078吴明彻北伐段", book("陳書", "卷9", "吴明彻传")), 514, 580),
  person("xiao-mohe", "萧摩诃", ["chen"], ["陈朝将领"], ["general"], "以骁勇著称，573年随吴明彻北伐阵斩齐军射手；589年建康之战请战被拒，出战被俘。", s("06", "吴明彻北伐与建康战段", book("陳書", "卷31", "萧摩诃传")), 532, 604),
  person("wang-sengbian", "王僧辩", ["southern-liang"], ["梁朝统帅"], ["general"], "与陈霸先同盟平定侯景，555年迫于北齐压力改立萧渊明，同年九月被陈霸先袭杀。", s("05", "P107起平乱与反攻段", book("梁書", "卷45", "王僧辩传"))),
  person("xiao-gang", "萧纲", ["southern-liang"], ["梁简文帝"], ["ruler"], "侯景控制台城后于549年被立为傀儡皇帝，551年遭废黜并被压杀，诗文与被囚题壁并存于记载。", s("05", "P115—P121简文帝段", book("梁書", "卷4", "简文帝纪")), 503, 551),
  person("yang-kan", "羊侃", ["southern-liang"], ["梁朝守城将领"], ["general"], "548年侯景渡江后主持台城防务，以火攻、器械应对和军纪稳住惊乱，十二月病逝于围城中。", s("05", "台城守御段", book("梁書", "卷39", "羊侃传")), 496, 548),
];
const events = [
  event({ id: "liu-song-founded", title: "刘裕代晋建宋", startYear: 420, eventType: "founding", tracks: ["southern-song"], personIds: ["liu-yu-song"], dynastyIds: ["liu-song"], locationIds: ["jinling"], summary: "刘裕接受东晋禅让，建立刘宋。", background: "刘裕以军事胜利控制东晋朝政，皇权更替条件逐步形成。", process: "东晋恭帝让位，刘裕称帝，改元永初。", result: "东晋结束，南朝宋开始。", impact: "南朝宋齐梁陈的政权序列由此开启。" }, liuyu),
  event({ id: "song-yuanjia-begins", title: "刘义隆即位，元嘉时期开始", startYear: 424, eventType: "succession", tracks: ["southern-song"], personIds: ["liu-yilong"], dynastyIds: ["liu-song"], locationIds: ["jinling"], summary: "少帝被废后，刘义隆自江陵入建康即位。", background: "刘裕去世后，顾命大臣与少帝发生权力冲突。", process: "大臣迎立宜都王刘义隆，改元元嘉。", result: "刘宋进入较长的稳定统治时期。", impact: "恢复政治秩序与后来北伐的成败，需要放在同一统治期内观察。" }, s("02", "P016—P024", wen)),
  event({ id: "song-yuanjia-war", title: "元嘉北伐失利，北魏南下", startYear: 450, eventType: "war", tracks: ["southern-song"], personIds: ["liu-yilong", "tuoba-tao"], dynastyIds: ["liu-song", "northern-wei"], locationIds: ["jinling"], summary: "刘宋北伐失败后，北魏军深入南方，进抵长江北岸。", background: "宋廷希望收复北方失地，但对军事态势判断失当。", process: "北伐各路受挫，魏军反击，推进至瓜步一带。", result: "刘宋北伐目标落空，沿途人民承受战争破坏。", impact: "元嘉后期的军事失败削弱朝廷威望。", disputedNote: "地图以建康为都城参照，魏军到达瓜步并不等于渡江攻陷建康。" }, s("02", "元嘉北伐段", wen, book("魏書", "卷4下", "太平真君十一年"))),
  event({ id: "song-liu-shao-coup", title: "刘劭弑父，刘宋陷入皇位战争", startYear: 453, eventType: "political", tracks: ["southern-song"], personIds: ["liu-yilong", "liu-shao-song"], dynastyIds: ["liu-song"], locationIds: ["jinling"], summary: "刘劭杀文帝自立，刘骏起兵，于新亭即位，随后攻入建康击败刘劭。", background: "太子与文帝之间的矛盾因巫蛊事发而激化。", process: "宫廷政变后，地方宗王调兵争夺皇位。", result: "刘劭败亡，皇位转入刘骏一支。", impact: "宗室拥有地方军事资源，使继承危机容易演变成内战。" }, s("02", "P073—P074及此前弑父段", wen, book("宋書", "卷99", "二凶传"))),
  event({ id: "southern-qi-founded", title: "萧道成代宋建齐", startYear: 479, eventType: "founding", tracks: ["southern-qi"], personIds: ["xiao-daocheng"], dynastyIds: ["liu-song", "southern-qi"], locationIds: ["jinling"], summary: "萧道成取代刘宋，建立南齐。", background: "刘宋后期宗室战争和皇权更替使将领掌权。", process: "萧道成控制朝廷后接受禅让。", result: "刘宋结束，南齐开始。", impact: "政权更替仍围绕建康展开，地方军权与皇位相互牵动。" }, s("03", "南齐开国段", book("南齊書", "卷2", "高帝下，建元元年"))),
  event({ id: "southern-liang-founded", title: "萧衍代齐建梁", startYear: 502, eventType: "founding", tracks: ["southern-liang"], personIds: ["xiao-yan"], dynastyIds: ["southern-qi", "southern-liang"], locationIds: ["jinling"], summary: "萧衍取代南齐，建立南梁。", background: "南齐末年皇室内斗与东昏侯统治激起军事反抗。", process: "萧衍起兵攻取建康，控制朝廷后称帝。", result: "南齐结束，梁朝开始。", impact: "梁初政治文化建设与晚年危机之间形成鲜明转折。" }, s("04", "梁朝建立段", liang)),
  event({ id: "hou-jing-rebellion", title: "侯景起兵反梁", startYear: 548, eventType: "war", tracks: ["southern-liang"], personIds: ["hou-jing", "xiao-yan"], dynastyIds: ["southern-liang"], locationIds: ["shouzhou", "jinling"], summary: "侯景从寿阳起兵，渡江围攻建康。", background: "侯景降梁后，梁与东魏重新接近，使其处境不安。", process: "侯景发动叛乱，迅速威胁梁朝都城。", result: "建康陷入围困，地方援军难以有效协同。", impact: "南梁政治与江南社会开始遭受持续破坏。", consequenceEventIds: ["liang-jiankang-falls"] }, h),
  event({ id: "liang-jiankang-falls", title: "建康陷落，梁武帝去世", startYear: 549, eventType: "war", tracks: ["southern-liang"], personIds: ["hou-jing", "xiao-yan"], dynastyIds: ["southern-liang"], locationIds: ["jinling"], summary: "侯景攻陷台城，萧衍被困后去世。", background: "长期围城造成城内饥困，援军未能解围。", process: "侯景控制皇帝与朝廷，梁武帝失去自由和实际权力。", result: "建康朝廷被叛军操纵。", impact: "各地宗王与将领的战争延续，首都陷落不等于梁朝立刻正式结束。", causeEventIds: ["hou-jing-rebellion"], consequenceEventIds: ["hou-jing-defeated"] }, h),
  event({ id: "hou-jing-defeated", title: "侯景败亡，萧绎称帝", startYear: 552, eventType: "war", tracks: ["southern-liang"], personIds: ["hou-jing", "xiao-yi", "chen-baxian"], dynastyIds: ["southern-liang"], locationIds: ["jinling", "jiangling"], summary: "王僧辩、陈霸先等击败侯景，萧绎在江陵称帝。", background: "梁的地方力量逐渐组织反攻。", process: "联军收复建康，侯景逃亡中被杀。", result: "叛军统治结束，但梁境内并未立即恢复统一。", impact: "陈霸先等将领崛起，江陵与建康的权力关系仍不稳定。", causeEventIds: ["liang-jiankang-falls"] }, s("05", "P107起反攻及结局段", hou, book("梁書", "卷5", "元帝纪"))),
  event({ id: "liang-jiangling-falls", title: "西魏攻陷江陵，梁元帝被杀", startYear: 554, eventType: "war", tracks: ["southern-liang"], personIds: ["xiao-yi", "yuwen-tai"], dynastyIds: ["southern-liang", "western-wei"], locationIds: ["jiangling"], summary: "西魏军攻取江陵，萧绎被杀。", background: "侯景之乱后梁的力量分散，萧氏内斗与北方干预交织。", process: "西魏军南下围攻江陵，梁廷未能保住都城。", result: "梁元帝朝廷覆灭，大量人口北迁。", impact: "江陵与建康进一步分离，为后梁和陈的出现提供背景。" }, s("05", "江陵与元帝结局段", book("梁書", "卷5", "承圣三年"))),
  event({ id: "southern-chen-founded", title: "陈霸先代梁建陈", startYear: 557, eventType: "founding", tracks: ["southern-chen"], personIds: ["chen-baxian"], dynastyIds: ["southern-liang", "chen"], locationIds: ["jinling"], summary: "陈霸先接受梁敬帝禅让，建立陈朝。", background: "侯景之乱与江陵陷落后，陈霸先控制建康。", process: "经过与王僧辩集团等力量的斗争，陈霸先取得皇位。", result: "梁的建康朝廷结束，陈朝建立。", impact: "陈的疆域与资源已不同于梁盛时，重建成为首要问题。" }, s("06", "陈朝建立段", chen)),
  event({ id: "chen-northern-campaign", title: "陈宣帝北伐，攻取淮南", startYear: 573, eventType: "war", tracks: ["southern-chen"], personIds: ["chen-xu"], dynastyIds: ["chen", "northern-qi"], locationIds: ["shouzhou"], summary: "吴明彻奉陈宣帝命北伐，攻取寿阳等地。", background: "北齐政局衰弱，陈廷试图收复江北地区。", process: "陈军向淮南推进，击败北齐守军。", result: "陈控制的江北区域扩大。", impact: "北周灭齐后，陈转而面对更强的北方对手。" }, s("06", "P075及北伐段", book("陳書", "卷5", "太建五年"))),
  event({ id: "chen-lvliang-defeat", title: "陈军吕梁战败", startYear: 578, eventType: "war", tracks: ["southern-chen"], personIds: ["chen-xu"], dynastyIds: ["chen", "northern-zhou"], locationIds: ["lvliang-chen"], summary: "陈军继续北进，在吕梁被北周军击败，吴明彻被俘。", background: "北周已灭北齐，北方军政力量重新整合。", process: "陈军在彭城附近作战，退路和水道受阻。", result: "陈损失重要将领与兵力。", impact: "北伐成果难以维持，南北力量差距进一步扩大。", disputedNote: "此处吕梁在今徐州附近，不是山西吕梁。" }, s("06", "北伐失利段", book("陳書", "卷9", "吴明彻传"))),
];
export const southernDynasties: SeriesContent = {
  config: expansionConfig("southern-dynasties"), introduction: "宋、齐、梁、陈都以建康为政治中心，却有不同的疆域、制度和难题。按四朝顺序阅读，也沿江陵、淮南和北方战线理解政权更替；589年隋灭陈与周齐隋专题共享同一记录。",
  dynasties: [polity("liu-song", "刘宋", 420, 479, "建康", "#7c8460", "刘裕代晋建立的南朝政权，元嘉时期长期经营内政与北伐，后期宗室内战不断。", liuyu), polity("southern-qi", "南齐", 479, 502, "建康", "#9c725b", "萧道成取代刘宋建立的短暂王朝，后期继承斗争激烈，最终被萧衍建立的梁取代。", s("03", "全篇主线", qi))], people, events,
  locations: [{ id: "lvliang-chen", name: "吕梁（徐州附近）", longitude: 117.44, latitude: 34.13, modernReference: "今江苏徐州东南一带；不是山西吕梁。坐标仅为区域参照。", ...s("06", "吕梁战事段", book("陳書", "卷9", "吴明彻传")), verificationStatus: "illustrative" }],
  relations: [relation("liu-yu-song", "liu-yilong", "family", "父子；宋武帝与宋文帝。", s("02", "文帝继位段", wen)), relation("liu-yilong", "liu-shao-song", "family", "父子；刘劭杀文帝后自立。", s("02", "弑父段", book("宋書", "卷99", "二凶传"))), relation("xiao-yan", "xiao-yi", "family", "父子；梁武帝与梁元帝。", s("05", "梁宗室段", book("梁書", "卷5", "元帝纪"))), relation("xiao-yan", "hou-jing", "enemy", "侯景起兵并攻陷梁都。", h), relation("chen-baxian", "hou-jing", "enemy", "陈霸先参与平定侯景。", h), relation("chen-xu", "chen-shubao", "family", "父子；陈宣帝与陈后主。", s("06", "陈后主继位段", book("陳書", "卷6", "后主纪")))],
  shared: { dynasties: ["northern-wei", "eastern-wei", "western-wei", "northern-qi", "northern-zhou", "southern-liang", "chen", "sui"], people: ["tuoba-tao", "yuwen-tai", "chen-shubao", "yang-jian", "yang-guang"], events: ["sui-conquers-chen"], locations: ["jinling", "jiangling", "shouzhou"] },
  readingPaths: [
    { id: "south-song-qi", title: "从刘宋开国到萧齐代宋", period: "420—479", description: "军功、托孤、宗室与皇位，读出南朝前期的权力结构。", eventIds: ["liu-song-founded", "song-yuanjia-begins", "song-yuanjia-war", "song-liu-shao-coup", "southern-qi-founded"] },
    { id: "south-liang-crisis", title: "梁武帝的盛世如何崩解", period: "502—554", description: "从梁的建立到侯景之乱，再到江陵陷落。", eventIds: ["southern-liang-founded", "hou-jing-rebellion", "liang-jiankang-falls", "hou-jing-defeated", "liang-jiangling-falls"] },
    { id: "south-chen-ending", title: "陈的重建、北伐与终局", period: "557—589", description: "江南的最后一个南朝如何面对北方重新统一。", eventIds: ["southern-chen-founded", "chen-northern-campaign", "chen-lvliang-defeat", "sui-conquers-chen"] },
  ],
};
