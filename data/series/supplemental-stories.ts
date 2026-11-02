import type { SeriesStory, StorySource } from "./series-stories";

const food: StorySource = { id: "sui-food", title: "《隋书》卷24《食货志》", url: "https://zh.wikisource.org/wiki/隋書/卷24", note: "核对户籍、输籍定样与赋役；制度规定和实际执行须分开理解。" };
const offices: StorySource = { id: "sui-local", title: "《隋书》卷28《百官下》", url: "https://zh.wikisource.org/wiki/隋書/卷28", note: "开皇省郡、州县设置与炀帝改制。" };
const jin: StorySource = { id: "jin-army", title: "《金史》卷44《兵志》", url: "https://zh.wikisource.org/wiki/金史/卷44", note: "猛安谋克的编制、军役和迁徙；不同阶段不能套用同一实际人数。" };
const xia: StorySource = { id: "xia-history", title: "《宋史》卷485《夏国上》", url: "https://zh.wikisource.org/wiki/宋史/卷485", note: "文字、军队及宋夏战争的记述。宋方记载具有观察立场，不是完整西夏军制档案。" };

export const supplementalStories: SeriesStory[] = [
  {
    id: "sui-daxing", narrativeSlug: "sui-capital-stores", seriesId: "northern-qi-zhou-sui", title: "大兴城：把国家秩序建成一座城", period: "582 起 · 隋大兴与唐长安",
    introduction: "隋朝建立后，首都并非简单住进汉长安的旧城。为什么另建新都？宫廷、官署和居民怎样被安排进同一座城？从大兴城再回看今天的西安。",
    layout: "flow", diagramLabel: "从选址到都城格局的阅读线索", diagramNote: "先看新都的功能，再看下方古今叠图。隋代初建与唐代增建分开，不能把大明宫画进582年的大兴城。",
    nodes: [
      { id: "site", label: "另择新址", caption: "582 · 营建", title: "旧城之外，规划新都", description: "隋在汉长安故城东南营建大兴城，宇文恺参与规划。旧城长期使用留下的空间和环境问题，与新王朝重建政治秩序的需要共同作用。新城是一项持续的营建工程，不能把开工之年理解为城内每一条街巷都已建成。", sourceIds: ["daxing-study", "sui-kai"], connection: "选址确定之后，问题转为：宫廷、官府与居民分别放在哪里？" },
      { id: "layers", label: "三重空间", caption: "宫城 · 皇城 · 外郭", title: "把统治与日常分区", description: "宫城位于城市北部，皇城在其南安排中央官署，外郭容纳里坊、市场等城市生活。贯通南北的轴线把宫门、皇城和外郭正南门联系起来。它既方便辨认方向，也把政治等级写进空间；不能把皇城与整座居民城市混为一谈。", sourceIds: ["daxing-study"], connection: "分区不只是一张平面图：坊与市决定居民怎样出行、买卖和接近官府。" },
      { id: "life", label: "坊、市与道路", caption: "秩序进入生活", title: "道路分割里坊，市场集中交易", description: "大兴城采用里坊布局，居住与交易有专门空间，主干道连接不同分区。唐长安继承这一基本格局，又经历宫殿、市场和生活方式的长期变化。讲解隋城时，应先抓住宫城、皇城、外郭的关系，而不把盛唐所有建筑和故事倒放回隋代。", sourceIds: ["daxing-study"] },
      { id: "today", label: "回到西安", caption: "遗址与今城", title: "今日城墙不是隋唐外郭城的全部", description: "隋唐都城范围远大于今天西安城墙围合的城区。明德门遗址帮助辨认外郭南端，朱雀门一带帮助辨认皇城南缘；今城墙、今道路与古代城市有继承也有错位。下方地图分别打开古城范围和现代地标，比直接把两幅图凭视觉重叠更容易理解。", sourceIds: ["daxing-study", "daxing-axis"] },
    ],
    transcripts: [{ file: "隋（上）_clean_v1.md", paragraphs: "P096–P103", line: 608 }],
    sources: [
      { id: "daxing-study", title: "宿白：隋唐长安城和洛阳城", url: "https://ygx.sxu.edu.cn/static/xzts/1/隋唐长安城和洛阳城_宿白.pdf", note: "都城平面、宫城皇城、道路与里坊的考古研究；隋唐各阶段须分别看待。" },
      { id: "sui-kai", title: "《隋书》卷68《宇文恺传》", url: "https://zh.wikisource.org/wiki/隋書/卷68", note: "参与新都营建与规划的文献记载。" },
      { id: "daxing-axis", title: "北京中轴线：古代中轴与隋唐长安", url: "https://www.bjaxiscloud.com.cn/mobile/history/axis/index.html", note: "宫城、外郭正南门与朱雀大街的空间联系。" },
    ],
  },
  {
    id: "sui-governance", narrativeSlug: "sui-offices-law", seriesId: "northern-qi-zhou-sui", title: "开皇治理：从一户人家到国家", period: "开皇年间 · 行政、赋役与法律",
    introduction: "中央官制回答谁来决策，地方行政和户籍则决定政令怎样到达一户人家。把这些环节连起来，才能理解开皇治理的运作。",
    layout: "flow", diagramLabel: "地方行政、户籍赋役、军役与法律的连接", diagramNote: "这是制度关系的阅读顺序，不是四项改革在同一年或依次完成。",
    nodes: [
      { id: "local", label: "州县直接相接", caption: "缩减层级", title: "地方行政：省去州县之间的郡", description: "开皇时期裁省郡一级，使州、县直接相接，同时调整地方官员的任用。地方上报人口、征发赋役与执行政令，由此有了较简化的行政通道。后来隋炀帝改州为郡，是另一个阶段，不能将两个时期的名称混用。", sourceIds: ["sui-local"], connection: "层级减少并不自动带来税粮：国家还需要知道谁住在哪里。" },
      { id: "register", label: "核户与定役", caption: "大索貌阅 · 输籍定样", title: "户籍：让人口进入征收依据", description: "大索貌阅核查人口与年龄等户籍信息；输籍定样制定户等与负担的标准，意在减少隐漏和任意征敛。对国家而言，户籍关系税粮与徭役；对民户而言，也关系是否继续依附豪强。清查增加的是登记人口，不能直接当作同等规模的自然增长。", sourceIds: ["sui-food"], connection: "同一户人家既生产又承担役务，下一步要看军役怎样与州县户籍相接。" },
      { id: "army", label: "军户与民籍", caption: "军役 · 土地 · 生产", title: "府兵：军役与地方生活相连", description: "隋将军人编入州县户籍，在承担军役的同时，也置于地方土地、生产与赋役安排之中。府兵并不是与民户完全隔绝的一群职业军人；但入籍也不意味着军事统属被取消。军队供给与民间生产，需要放在一起理解。", sourceIds: ["sui-food", "sui-local", "sui-military-register"] },
      { id: "law", label: "开皇律", caption: "581 制定 · 583 修订", title: "法律：约束刑罚，也规定办事程序", description: "隋初整理前代刑律，开皇三年再修《开皇律》，减省部分酷刑和条文，形成后世律典的重要基础。刑罚调整与死刑复奏等程序都属于治理的一部分。不过，成文法与皇帝实际用刑并不始终一致，不能概括成隋代已经彻底消除任意刑罚。", sourceIds: ["sui-law"] },
    ],
    transcripts: [{ file: "隋（上）_clean_v1.md", paragraphs: "P070–P095", line: 446 }], sources: [offices, food, { id: "sui-military-register", title: "《隋书》卷02《高祖纪下》", url: "https://zh.wikisource.org/wiki/隋書/卷02", note: "开皇十年五月：军人属州县，垦田籍帐与民同，军府统领依旧。" }, { id: "sui-law", title: "《隋书》卷25《刑法志》", url: "https://zh.wikisource.org/wiki/隋書/卷25", note: "制律、修律及用刑实践；不把规范写成始终兑现的事实。" }],
  },
  {
    id: "sui-selection", narrativeSlug: "sui-examinations", seriesId: "northern-qi-zhou-sui", title: "从门第评品到考试取士", period: "隋唐之际 · 选官制度的变化",
    introduction: "谁能成为官员，与国家怎样治理同样重要。隋代是选官制度转型的重要阶段，但成熟科举并不是一道诏令就全部建成的。",
    layout: "flow", diagramLabel: "选官制度逐步变化的线索", diagramNote: "并非所有旧渠道同时消失；考试、荐举及其他入仕途径长期交织。",
    nodes: [
      { id: "rank", label: "门第与评品", caption: "魏晋南北朝的背景", title: "九品中正：品第与家世的影响", description: "九品中正通过中正评定人物品第，长期实践中家世与门第影响很大。理解隋代变化，先要看官员资格由谁评价、由谁掌握，而不只是有没有考试。门第秩序也不会在制度改动之后立即消失。", sourceIds: ["selection-study"], connection: "从地方人物评品转向中央掌握选拔，是理解后续考试制度的关键。" },
      { id: "examination", label: "分科与考试", caption: "选拔权的重新组织", title: "考试逐渐成为一条入仕路径", description: "隋代废中正、加强中央选官，并出现与后世科举相联系的分科选拔和考试。它改变了选拔程序，但考试内容、举办办法以及进士科的创立时间，学界仍有讨论。这里把隋作为转型阶段，不将某一争议年份写成所有科举要素同时成熟的起点。", sourceIds: ["selection-study", "selection-overview"], connection: "新渠道是否能改变社会，还要看它怎样持续运行，而不只看制度名称。" },
      { id: "continuity", label: "唐以后发展", caption: "渠道扩大 · 门槛仍在", title: "读书、应试与做官逐渐相连", description: "唐以后，科目、贡举和考试程序继续发展，读书应试成为持续的入仕路径。教育资源、家族背景和荐举关系仍影响机会，不能把考试出现等同于所有人的起点已经平等。科举的社会影响，需要在长时段中观察。", sourceIds: ["selection-overview"] },
    ],
    transcripts: [{ file: "隋（中）_clean_v1.md", paragraphs: "P172–P180", line: 1052 }],
    sources: [{ id: "selection-study", title: "黄寿成：论隋文帝并未施行科举制度", url: "https://www.lhp.sdu.edu.cn/__local/F/06/E6/2DB63DC093968221D70432D4478_1C97B2A0_6E2FE2.pdf", note: "《文史哲》2020年第4期，第95–115页。本文代表起源争议中的一种论证，结合其他研究阅读。" }, { id: "selection-overview", title: "何忠礼：谈中国古代的科举制度", url: "https://www.cppcc.people.com.cn/n/2015/0706/c34948-27256864.html", note: "区分广义分科举人与狭义进士科举，介绍形成与发展的学术争议。" }],
  },
  {
    id: "jin-households", seriesId: "jin", title: "猛安谋克：从军队到一户人的生计", period: "12—13 世纪 · 迁徙与土地",
    introduction: "中都不只有宫殿和城门。随着人口迁居，军队编制、土地安排和家庭生计进入同一个问题：怎样让承担军役的人继续生活和生产？",
    layout: "flow", diagramLabel: "组织、迁徙、土地与供给的关系", diagramNote: "编制数量与实有人数不是一回事；各地、各时期的猛安谋克状况也不一致。",
    nodes: [
      { id: "organization", label: "组织军民", caption: "猛安与谋克", title: "一种同时涉及军役与社会组织的制度", description: "猛安谋克由女真社会的军事组织发展而来，承担军役，也组织所辖户口。金建立后将其编入国家制度，并随征服与迁徙扩展。其成员平时生活、生产，战时承担征发；不能把它只理解成战场上的一支骑兵部队。", sourceIds: ["jin-army", "jin-neac"], connection: "军民组织向南迁移之后，原来的谋生方式需要重新落到土地上。" },
      { id: "migration", label: "迁居与授田", caption: "华北 · 中都时代", title: "人口南迁，也带来土地重新安排", description: "猛安谋克户南迁屯驻，与国家安排土地、维持军役供给相联系。迁居不只意味着换一座都城，也意味着军户与原有居民、耕地和地方官府产生新的关系。把它与迁都中都并读，才能看见国家重心南移背后的社会变化。", sourceIds: ["jin-army", "jin-land"], event: { id: "jin-moves-zhongdu", year: 1153, title: "迁都中都" }, connection: "分得土地不等于一直拥有稳定收入，耕作、租佃和交易会继续改变处境。" },
      { id: "livelihood", label: "耕作与租佃", caption: "收入 · 负担", title: "土地与军役之间的张力", description: "《金史·食货志》记录猛安谋克土地的租佃、交易限制以及国家反复整顿。部分军户生活困难，并不能简单归结为一个族群变得懒惰；土地占有、生产方式、军役负担和地方关系共同影响家庭收入。", sourceIds: ["jin-land"], connection: "到战争和再迁徙发生时，原本已经紧张的供给关系会受到更大冲击。" },
      { id: "pressure", label: "战乱下的供给", caption: "1214 以后 · 河南", title: "迁都汴京：朝廷移动，供给也要重建", description: "蒙古战争使人口、土地与财政体系持续受损。金廷迁往汴京后，流入人口与驻军的安置、粮食和财政供给更加紧张。中都失守只是这场危机的一环；城市、军户和民户的遭遇，要与王朝后续二十年的战争一起看。", sourceIds: ["jin-land", "jin-late"], event: { id: "jin-moves-kaifeng", year: 1214, title: "迁都汴京" } },
    ],
    transcripts: [{ file: "金01_clean_v1.md", paragraphs: "P141–P154", line: 866 }, { file: "金03_clean_v1.md", paragraphs: "P253–P254", line: 1540 }],
    sources: [jin, { id: "jin-neac", title: "国家民委：满族历史沿革中的金代制度", url: "https://www.neac.gov.cn/seac/ztzl/201806/1066881.shtml", note: "猛安谋克的军政组织、成员生产和南迁屯驻。" }, { id: "jin-land", title: "《金史》卷46《食货志一》", url: "https://zh.wikisource.org/wiki/金史/卷46", note: "田制、猛安谋克户土地及河南时期的供给问题。" }, { id: "jin-late", title: "《金史》卷14《宣宗上》", url: "https://zh.wikisource.org/wiki/金史/卷14", note: "迁汴与战争背景。" }],
  },
  {
    id: "dali-faith", seriesId: "dali", title: "佛教、学问与王权", period: "大理国 · 寺院与朝廷",
    introduction: "六诏解释南诏怎样兴起，佛教与政治则打开大理国的另一面。寺院、学问和王室相互联系，却不是所有政治行为都能用信仰来解释。",
    layout: "network", diagramLabel: "王室、寺院与学问的关系", diagramNote: "关系示意。国王出家有具体个案，不能据此推出每位皇帝都自愿退位或寺院直接统治国家。",
    nodes: [
      { id: "court", label: "王室与信仰", caption: "护持 · 权威", title: "王室为什么与佛教如此紧密", description: "南诏、大理时期佛教兴盛，王室护持佛教，宗教活动也参与王权的表达。佛教图像、经卷与寺院，是理解这一联系的实物和文献线索。不过，段氏、高氏之间的权力变化仍有政治背景，不能全部化约成宗教故事。", sourceIds: ["dali-neac", "dali-history"], position: [50, 26] },
      { id: "learning", label: "释儒与学问", caption: "儒释合流", title: "僧人与儒学并非两个隔绝世界", description: "大理地区出现儒释合流的“释儒”现象。僧人所掌握的知识、文化声望与政治生活存在联系，不能套用今天宗教教育和普通教育完全分开的框架。逐字稿进一步谈到选官，但目前材料不足以复原一套全国统一、人人必须先出家的考试程序，因此不把这类推演画成制度事实。", sourceIds: ["dali-neac"], position: [25, 72] },
      { id: "abdication", label: "退位与出家", caption: "个案 · 皇位交接", title: "出家也是政治生涯的一种结局", description: "大理国史中记有段氏君主避位、出家等个案，段正严之后由段正兴继位。读到这样的交接，应分别追问在位者、继承者和权臣的关系。寺院可以成为退位后的归处，却不能据此认定出家都是主动追求清净，也不能把后来的文学人物当作史料。", sourceIds: ["dali-history"], position: [75, 72] },
    ],
    transcripts: [{ file: "大理（下）_clean_v1.md", paragraphs: "P057–P063、P073–P088", line: 362 }],
    sources: [{ id: "dali-neac", title: "国家民委：白族历史沿革", url: "https://www.neac.gov.cn/seac/ztzl/bz/lsyg.shtml", note: "南诏、大理佛教与儒释合流；不能据概述复原详细考试制度。" }, { id: "dali-history", title: "《南诏野史》（胡蔚本）", url: "https://zh.wikisource.org/wiki/南詔野史_(胡蔚本)", note: "后世编纂的大理国沿革与君主交接；须留意传本、年代与叙述的距离。" }],
  },
  {
    id: "song-government", seriesId: "southern-dynasties", title: "刘裕之后：门第、机要与地方", period: "东晋末至刘宋 · 权力怎样运转",
    introduction: "从战场进入朝廷，刘裕面对的是怎样一套既有权力关系？把皇帝的亲信、世家大族与地方户口放在一起，才能理解南朝政治为何不只是换一个国号。",
    layout: "network", diagramLabel: "皇权、机要官员与地方社会的关系", diagramNote: "三个侧面并存，不代表门阀在420年突然消失，也不代表寒人等同于今天的贫困人口。",
    nodes: [
      { id: "elite", label: "门第与皇权", caption: "既借重 · 也限制", title: "军事强人建立王朝，仍要面对士族", description: "刘裕凭军事和政治力量崛起，建立刘宋，但朝廷仍需要士族的声望、行政经验与社会关系。皇权加强并不意味着旧门第秩序立即消散。需要分别看清望职位、实际决策和军事权力掌握在谁手里。", sourceIds: ["song-emperor", "song-muzhi"], position: [50, 26], event: { id: "liu-song-founded", year: 420, title: "刘宋建立" } },
      { id: "secretariat", label: "亲信掌机要", caption: "任用 · 信息 · 决策", title: "刘穆之：实际办事的人有多重要", description: "刘穆之长期协助刘裕处理政务、军需与留守事务，是观察亲信参与中枢运作的具体人物。所谓寒人掌机要，重点在实际事务和信息通道的掌握，而不是低门第者取代全部高门士族。官名的高低，未必与实际影响力完全一致。", sourceIds: ["song-muzhi"], position: [25, 72] },
      { id: "local", label: "户口与地方", caption: "土断 · 赋役", title: "从侨籍转向按实际居地治理", description: "东晋以来侨州郡县与迁徙人口使户籍关系复杂。刘裕时期推行土断，将一部分侨寓人口按实际居地编入行政和赋役体系，同时保留例外。它关系国家掌握的人口与收入，也触动既有依附关系；不能简单说成把士族土地全部平均分给百姓。", sourceIds: ["song-emperor", "sui-food"], position: [75, 72] },
    ],
    transcripts: [{ file: "南朝01_clean_v1.md", paragraphs: "P130–P137", line: 800 }],
    sources: [{ id: "song-emperor", title: "《宋书》卷2《武帝中》", url: "https://zh.wikisource.org/wiki/宋書/卷2", note: "刘裕时期治理及土断相关记载。" }, { id: "song-muzhi", title: "《宋书》卷42《刘穆之传》", url: "https://zh.wikisource.org/wiki/宋書/卷42", note: "机要政务、留守与军需的个案；不将人物传记泛化为所有官员状况。" }, food],
  },
  {
    id: "xia-script-army", seriesId: "western-xia", title: "文字与军队：西夏如何组织国家", period: "11—12 世纪 · 建国与制度",
    introduction: "创制文字与建立军队，看起来一文一武，却都关系王朝怎样组织人群。文字进入译经、学校和律令，军队则依靠征发、骑兵与后勤共同作战。",
    layout: "flow", diagramLabel: "从文字使用到军队协作的线索", diagramNote: "文字不是把汉字逐一换个写法；军种称谓来自文献，不能据此复原每场战役的固定编成。",
    nodes: [
      { id: "script", label: "文字的创制", caption: "公文 · 典籍 · 认同", title: "有自己的文字，才能看见更多自己的记录", description: "元昊时期推广西夏文字，并用于公文、翻译和典籍。其外观受到汉字书写形式影响，但书写的是另一种语言，不能用汉字偏旁望文生义。把文字事件与后来的学校、法典连起来，就能看见制度运行怎样留下文献。", sourceIds: ["xia-history", "xia-script"], event: { id: "xia-script", year: 1036, title: "西夏文字创制与推广" }, connection: "从“有文字”走到“读懂文字”，需要能相互校读的实物。" },
      { id: "objects", label: "双语碑与释读", caption: "实物观读", title: "同一座碑的两种文字怎样帮助研究", description: "凉州重修护国寺感通塔碑分别以西夏文、汉文记述相关内容，为比较人名、纪年和文义提供线索。释读还需要字书、译经和其他文献互证，不是把两面文字按位置逐字替换。观察碑刻时，可以先找标题、纪年和人名，再比较两种文本的组织。", sourceIds: ["xia-stele"], connection: "这些文字后来也进入学校和法典；回到“学校、选官与法典”主题，可继续追踪用途。" },
      { id: "cavalry", label: "铁鹞子", caption: "精锐骑兵", title: "骑兵冲击力需要装备与配合", description: "宋方文献以铁鹞子称西夏精锐骑兵，强调其马匹、护具和冲击能力。精锐部队不是整支军队，战斗效果也受地形、指挥和补给影响。重装骑兵的存在，不能推成西夏每次战争都用相同阵形取胜。", sourceIds: ["xia-military"] },
      { id: "support", label: "擒生与协作", caption: "袭扰 · 步兵 · 后勤", title: "作战不只靠一支骑兵", description: "文献还记有擒生军等部伍，任务涉及袭扰和掳掠人口。西夏战争同时需要步兵、攻城和运输力量，并受城寨、地形与粮道制约。把军队看成分工合作的整体，更能理解宋夏战争为何常围绕边地城寨与补给展开。", sourceIds: ["xia-military"] },
    ],
    transcripts: [{ file: "西夏02_clean_v1.md", paragraphs: "P041–P046", line: 266 }],
    sources: [xia, { id: "xia-military", title: "《宋史》卷486《夏国下》", url: "https://zh.wikisource.org/wiki/宋史/卷486", note: "铁鹞子、擒生及军制的宋方记述。" }, { id: "xia-script", title: "故宫博物院：西夏文", url: "https://www.dpm.org.cn/lemmas/244482.html", note: "书写系统的性质与使用。" }, { id: "xia-stele", title: "宁夏大学西夏学研究院：凉州重修护国寺感通塔碑", url: "https://xixia.nxu.edu.cn/info/1111/2568.htm", note: "碑刻实物、文字与内容介绍，可前往查看原图；这里不生成仿造的西夏字。" }],
  },
  {
    id: "wei-capital-frontier", seriesId: "northern-wei", title: "从洛阳新都到北镇危机", period: "494—524 · 改革的不同处境",
    introduction: "迁都、改姓与六镇危机在年表上相邻，却不是一条“改革直接导致灭亡”的直线。沿朝廷和边镇两个视角，看同一国家内部不同的机会与压力。",
    layout: "flow", diagramLabel: "迁都、身份调整与北镇危机的连续阅读", diagramNote: "阅读线索不等于单因果链；各环节之间还隔着不同皇帝、地方条件和长期积累的问题。",
    nodes: [
      { id: "capital", label: "迁往洛阳", narrativeSlug: "xiaowen-luoyang", caption: "494 · 国家重心南移", title: "迁都改变的不只是都城位置", description: "孝文帝迁都洛阳，将朝廷及一部分贵族的生活重心移向中原。官署、礼仪、婚姻和资源分配都随着政治中心移动而调整。留在北部的军民并没有与迁居洛阳者获得完全相同的机会，空间变化因而也有社会层面的后果。", sourceIds: ["wei-annals"], event: { id: "wei-moves-luoyang", year: 494, title: "北魏迁都洛阳" }, connection: "新的都城需要新的身份秩序，接下来要看姓氏、语言和门第如何调整。" },
      { id: "identity", label: "重排身份", narrativeSlug: "xiaowen-luoyang", caption: "496 · 姓氏与门第", title: "文化改革也在重组统治精英", description: "皇室改拓跋为元，并调整贵族姓氏与姓族等级，语言、服饰和婚姻政策共同塑造洛阳朝廷的礼制生活。接受共同礼仪不意味着所有人的地位相同；改革也为贵族重新划分等第。文化变化与政治资源，需要一起观察。", sourceIds: ["wei-annals"], event: { id: "wei-surname-reform", year: 496, title: "改革姓族制度" }, connection: "把目光移回北方：边镇军民的供给、身份和治理问题，并不会因为新都的礼制建设而自动解决。" },
      { id: "frontier", label: "边镇危机", narrativeSlug: "six-garrisons", caption: "524 · 起事扩大", title: "六镇不是迁都的单一后果", description: "北镇军民面对身份地位、供给和地方治理等长期矛盾，又受到边地局势与灾荒等因素影响。524年起事扩大后，战争和人口迁徙推动新军事集团崛起。迁都提供了一部分背景，但不是迁都的单一后果，更不能把北魏分裂归结为一种文化选择。", sourceIds: ["wei-crisis"], event: { id: "wei-six-garrisons", year: 524, title: "六镇起事蔓延" } },
    ],
    transcripts: [{ file: "北魏05_clean_v1.md", paragraphs: "P118–P134", line: 728 }, { file: "北魏06_clean_v1.md", paragraphs: "P023–P029", line: 158 }],
    sources: [{ id: "wei-annals", title: "《魏书》卷7下《高祖纪下》", url: "https://zh.wikisource.org/wiki/魏書/卷7下", note: "迁都、改姓与礼制改革；不同措施分年颁行。" }, { id: "wei-crisis", title: "《魏书》卷9《肃宗纪》", url: "https://zh.wikisource.org/wiki/魏書/卷9", note: "北镇起事、战争与地方局势的年代线索。" }],
  },
];
