import type { Narrative } from "@/types/narrative";
import { weiCultureSummary } from "./catalog";

export const weiCulture: Narrative = {
  ...weiCultureSummary,
  lead: "军书送到家中，木兰停下织机；战争结束，她却不要官职，只想回乡。读北魏，除了皇帝与战场，还可以从这首流传的歌辞出发，去看刻字的人、造像的人，以及沿着河流追问往事的人。只是诗、石刻与史书，各自保存着不同性质的记忆。",
  sections: [
    {
      id: "mulan", title: "打完仗以后，她想回家", mode: "literary-tradition",
      paragraphs: [
        "《木兰诗》的开头没有战鼓。家中传来叹息：征兵文书有父亲的名字，家里却没有能代他出征的长子。木兰决定自己去。歌辞接连写东市、西市、南市、北市，马匹、鞍具、缰绳和长鞭一样样备齐，一个家庭的难题由此变成远行。",
        "离家以后，诗反复写她听不见父母的呼唤。先是黄河水声，后来是胡骑的嘶鸣，距离由声音显现出来。到了战争本身，笔墨反而收紧：寒气、刁斗、铁衣，以及有人战死、有人多年后归来。诗没有交代一场可供复盘的具体战役，却让离别与生还都有了分量。",
        "受赏时，木兰没有顺着军功走向仕途。她请求回家，随后歌辞把篇幅交还给家人：父母出城相迎，姐姐整理妆容，弟弟忙着宰猪羊。她打开旧日房门，换回衣裳，整理头发；同行多年的伙伴这才惊讶，原来并肩作战的人是女子。末尾以奔跑的双兔作比，轻快地把辨认男女的问题留给读者。",
        "这首诗通常被放在北朝民歌传统中理解，但作者、具体创作年代及流传润饰过程并不清楚。《乐府诗集》收录的古辞只称木兰，没有交代花姓。诗中的可汗、天子与胡骑能引出对北方战争环境的讨论，却不足以确定某位北魏皇帝、某次柔然战役，更不能给木兰开出一份可靠的真人籍贯证明。",
      ],
      poem: {
        title: "《木兰诗》古辞节选",
        attribution: "据《乐府诗集》卷25所录古辞节选，作者不详；通常视为北朝民歌，具体年代及流传润饰未定。以下各组诗句并非连续全文。",
        lines: ["阿爷无大儿，木兰无长兄。愿为市鞍马，从此替爷征。", "朔气传金柝，寒光照铁衣。将军百战死，壮士十年归。", "木兰不用尚书郎，愿驰千里足，送儿还故乡。", "双兔傍地走，安能辨我是雄雌。"],
        translation: "编者释义：家中没有成年长子，木兰愿买好鞍马代父出征；经过寒夜与长久战事，她生还受赏，却愿乘快马回乡。两只兔子一道奔跑时，旁观者又怎样轻易分清雌雄？这里的十年、十二年等诗句不宜直接换算为精确服役年表。",
      },
      sourceIds: ["yuefu-25", "mulan-teaching"], transcripts: [{ file: "北魏01_clean_v1.md", start: 4, end: 5 }],
    },
    {
      id: "writing", title: "皇帝整字，不等于皇帝发明楷书", mode: "history",
      paragraphs: [
        "425年，太武帝朝廷制定文字，向各地颁行。《魏书》记新字千余，诏书的理由是流传久远、字形与字义出现讹误，希望重新立下规范。皇帝关心的，是让政治命令与书面表达有可以遵循的标准。",
        "这道诏书本身就说篆、隶、草、楷已经并行于世。因此，末尾的永为楷式应理解为成为规范，不能读成此时才发明楷书，也不能推出全国公文从此只准用一种字体。故宫所藏北凉安弘嵩写经仍可见隶楷之间的特点，提醒我们书体变化有自己的漫长过程。",
        "喜欢太武帝的雄健，或喜欢北朝刻字的气息，都是可以展开的阅读感受；要把唐代书法家的成就归到他一人的命令上，证据却不够。王朝政策、书写实践与后世学习之间，需要具体作品和传承材料来连接。",
      ],
      sourceIds: ["weishu-4a", "anhongsong"], transcripts: [{ file: "北魏01_clean_v1.md", start: 48, end: 48 }, { file: "北魏03_clean_v1.md", start: 151, end: 153 }],
    },
    {
      id: "inscriptions", title: "碑上的字，也留下了人的愿望", mode: "history",
      paragraphs: [
        "嘎仙洞石壁上的文字是北魏祭祖的记录，也是一件可以观察字形与刻写的作品。阅读刻石，内容与形体可以同时进入视野。碑刻的方整或古拙，并不只是一句某个民族天生如此能够解释的。",
        "今天谈魏碑，通常会涉及北朝的碑、墓志、造像题记与摩崖等刻石书迹，并非所有作品都出于北魏，也并非只有一副面貌。石材、书写者、刻工和用途各不相同，学习时要回到具体作品。",
        "龙门二十品便提供了一组这样的入口。它是后人选出的二十件北魏造像题记，名称定型于清代；其中十九件在古阳洞，一件在慈香窟。先看字，再读是谁为谁造像、求什么福报，就会发现石壁也保存着供养者想留下的话。书法史中的名品，同时属于当年的宗教生活。",
      ],
      sourceIds: ["gaxian", "weibei", "longmen-inscriptions"], transcripts: [{ file: "北魏01_clean_v1.md", start: 47, end: 48 }, { file: "北魏03_clean_v1.md", start: 151, end: 153 }, { file: "北魏06_clean_v1.md", start: 158, end: 158 }],
    },
    {
      id: "votive-image", title: "一件小造像，把年号留在身边", mode: "history",
      paragraphs: [
        "九州国立博物馆收藏着一尊弥勒佛立像，铭文纪年为太平真君四年，即443年。佛像双足站在莲座上，莲座下有四足床形底座。视线从像身往下移，便从佛的形貌转向了留下它的人。",
        "底座的文字留下施主为皇太子、父母及家族祈福的愿望。一件尺寸有限的铜像，把朝廷与家庭放进同一次供养中。它也让年号从帝王年表走到眼前：写下这个年份的人，希望愿望与造像一起长久保存。",
        "太平真君是北魏太武帝的年号；若读到太平真君十一年，对应的便是450年。辨认纪年之后，还可以继续读施主是谁、为谁发愿、希望得到怎样的福佑。帝王用来记年的几个字，就这样进入了一户人家的信仰生活。",
      ],
      sourceIds: ["miroku", "weishu-4b"], transcripts: [{ file: "北魏03_clean_v1.md", start: 97, end: 98 }],
    },
    {
      id: "caves", title: "从平城到洛阳，石窟跨过了王朝", mode: "history",
      paragraphs: [
        "把视线从小铜像移向山崖，云冈和龙门让北魏艺术留下更大的体量。云冈的主要开凿年代集中于五世纪中叶至六世纪初；龙门自五世纪后期开始营造，北魏与唐代都是重要阶段。北魏在两处石窟史中的位置很重，却不能把今天看到的全部洞窟与雕像都归到它的名下。",
        "迁都之后，政治中心改变，造像活动也在洛阳延续。观看时可以先辨一尊像所属的时代，再读它附近的题记：皇室的营造与不同供养者的发愿，给山崖留下了不同层次。仅用宏伟二字赞叹，便会错过一座石窟是怎样被许多人、在许多年间逐渐完成的。",
      ],
      sourceIds: ["yungang", "longmen", "longmen-inscriptions"], transcripts: [{ file: "北魏01_clean_v1.md", start: 3, end: 3 }, { file: "北魏06_clean_v1.md", start: 158, end: 158 }],
    },
    {
      id: "waterways", title: "沿水道读到另一种北魏", mode: "history",
      paragraphs: [
        "郦道元的《水经注》又换了一种组织世界的办法。《魏书》记他撰注《水经》四十卷。他以水道为线索，把沿途地理、城邑旧迹与相关记载联系起来，让读者顺着河流进入不同地方的历史。这里既有搜集来的文献，也有考察与见闻，不能把每一处描述都看成他亲自到过的旅行记录。",
        "木兰归乡的歌辞、供养者刻在石上的愿望、郦道元笔下相连的山川，使阅读王朝多了几种尺度。皇帝的命令会改变人的生活，人的惦念与观察也会留下自己的作品。读完政变与战争，再回来看这些文字，北魏便不只剩下一张君主更替表。",
      ],
      sourceIds: ["weishu-89", "lidaoyuan"], transcripts: [{ file: "北魏01_clean_v1.md", start: 3, end: 3 }],
    },
  ],
  sources: [
    { id: "yuefu-25", title: "《乐府诗集》卷25 · 木兰诗古辞", url: "https://zh.wikisource.org/zh-hans/樂府詩集/025卷", note: "按古辞叙事与字句节选，双兔取此版本正文；未将后列韦元甫续作中的青海、于阗等地点混入古辞。" },
    { id: "mulan-teaching", title: "香港教育局 ·《木兰诗》教学设计", url: "https://www.edb.gov.hk/attachment/tc/curriculum-development/kla/chi-edu/recommended-passages/teaching_design/TD_KS3_08.pdf", note: "核对作者、创作年代不详及北朝民歌背景；北魏与柔然的联系是解释可能，不能固定真人身份与战役。" },
    { id: "weishu-4a", title: "《魏书》卷4上 · 始光二年文字诏", url: "https://zh.wikisource.org/zh-hans/魏書/卷4上", note: "425年制定文字；诏书明说篆隶草楷并行，永为楷式指规范，不能据此认定太武帝创造楷书。" },
    { id: "anhongsong", title: "故宫博物院 · 安弘嵩隶楷书大智度论卷", url: "https://www.dpm.org.cn/collection/handwriting/231510.html", note: "北凉写经及隶楷演变的具体作品例证。" },
    { id: "gaxian", title: "鄂伦春自治旗政府 · 古老神奇的嘎仙洞", url: "https://www.elc.gov.cn/News/show/343304.html", note: "嘎仙洞北魏祝文与刻石；本节承接原稿的书法观感，祭祀经过另见族源篇。" },
    { id: "weibei", title: "故宫博物院 · 魏碑", url: "https://www.dpm.org.cn/lemmas/243540.html", note: "魏碑的时代范围、载体与书体概念；不将其缩成一位皇帝创制的字体。" },
    { id: "longmen-inscriptions", title: "豫台视窗 · 洛阳龙门石窟", url: "https://ytsc.rootinhenan.gov.cn/sitesources/ytsc/page_pc/hnly/zywh/article2e3e536f173e4a58ae57dc484166cd7c.html", note: "核对龙门二十品为清代选称的北魏造像题记、十九件与一件的分布。" },
    { id: "miroku", title: "九州国立博物馆 · 弥勒佛立像（e国宝）", url: "https://emuseum.nich.go.jp/detail?content_base_id=100014&content_part_id=0&content_pict_id=0&langId=zh&webView=", note: "太平真君四年（443）铜造像、四足床形底座与供养铭文；作为独立馆藏例证，不替原稿市场器物作鉴定。" },
    { id: "weishu-4b", title: "《魏书》卷4下 · 太平真君纪年", url: "https://zh.wikisource.org/zh-hans/魏書/卷4下", note: "太平真君为北魏世祖年号；十一年对应450年。年号归属按世祖本纪核定。" },
    { id: "yungang", title: "UNESCO · Yungang Grottoes", url: "https://whc.unesco.org/en/list/1039/", note: "核对云冈主要开凿年代与北魏艺术背景。" },
    { id: "longmen", title: "UNESCO · Longmen Grottoes", url: "https://whc.unesco.org/en/list/1003/", note: "以突出普遍价值说明中的五世纪后期起建及北魏、唐代阶段为据，不把全部龙门作品归于北魏。" },
    { id: "weishu-89", title: "《魏书》卷89 · 郦道元传", url: "https://zh.wikisource.org/zh-hans/魏書/卷89", note: "记郦道元撰注《水经》四十卷。" },
    { id: "lidaoyuan", title: "国家典籍博物馆 · 水经注", url: "https://www.nlc.cn/nmcb/jpww/gengu/20241009_2641449.shtml", note: "参考其文献搜集、地理考察与注水经的关系，未推定全部地点都曾亲历。" },
  ],
};
