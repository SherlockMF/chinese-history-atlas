import { supplementalStories } from "./supplemental-stories";

export type StorySource = {
  id: string;
  title: string;
  url: string;
  note: string;
};

export type StoryNode = {
  id: string;
  narrativeSlug?: string;
  label: string;
  caption: string;
  title: string;
  description: string;
  sourceIds: string[];
  position?: [number, number];
  connection?: string;
  event?: { id: string; year: number; title: string };
};

export type SeriesStory = {
  id: string;
  seriesId: string;
  narrativeSlug?: string;
  title: string;
  period: string;
  introduction: string;
  layout: "flow" | "city" | "network" | "lake" | "temple" | "offices" | "canal" | "livelihood";
  diagramLabel: string;
  diagramNote: string;
  nodes: StoryNode[];
  transcripts: { file: string; paragraphs: string; line: number }[];
  sources: StorySource[];
};

// Coordinates are percentages in original explanatory diagrams, never surveyed locations.
export const seriesStories: SeriesStory[] = [
  {
    id: "wei-households", seriesId: "northern-wei", narrativeSlug: "wei-households", title: "户籍、田地与官俸", period: "484—486 · 太和改革",
    introduction: "官员的俸禄、百姓的田地、基层的户籍，看似三件事，却共同关系到国家怎样征收与分配。沿三项改革，看见年表背后的日常治理。",
    layout: "flow", diagramLabel: "太和改革的三项制度", diagramNote: "按颁行先后排列。制度彼此关联，实际授田与征收仍受地方条件影响。",
    nodes: [
      { id: "salary", label: "班禄", caption: "484 · 供养官员", title: "班禄：官俸从哪里来", description: "《魏书·食货志》记载，太和八年按官品颁定俸禄，并增收户调中的帛与粟，作为官俸来源。班禄既是整顿官员收入，也改变了国家向民户征收的安排；不能把它理解成仅仅给官员一笔额外赏赐。", sourceIds: ["wei-food"] },
      { id: "land", label: "均田", caption: "485 · 授田与还田", title: "均田：田地怎样授还", description: "次年均田诏令按人口等条件规定受田，并区分需要归还的露田与可世业的桑田。诏令还专门处理地狭人多、老弱无田等情形。这是一套带条件的授田规则，并不等于把每家的全部土地平均分配。", sourceIds: ["wei-food"] },
      { id: "register", label: "三长", caption: "486 · 识别民户", title: "三长：从民户到赋役", description: "李冲建议五家设邻长，五邻设里长，五里设党长。《魏书》把改革针对的问题写为户籍隐漏、民户依附豪强。掌握户口、组织征役与照应孤老都进入基层职责，户籍因此成为连接民户和国家的重要环节。", sourceIds: ["wei-food"] },
    ],
    transcripts: [{ file: "北魏05_clean_v1.md", paragraphs: "P062–P066", line: 392 }, { file: "北魏05_clean_v1.md", paragraphs: "P073–P075", line: 458 }, { file: "北魏05_clean_v1.md", paragraphs: "P099–P108", line: 614 }],
    sources: [{ id: "wei-food", title: "《魏书》卷110《食货志》", url: "https://zh.wikisource.org/wiki/魏書/卷110", note: "太和八年班禄、九年均田及十年李冲三长议；在线古籍录文。" }],
  },
  {
    id: "liao-cities", seriesId: "liao", title: "双城与移动皇廷", period: "辽代 · 上京与四时捺钵",
    introduction: "上京有城墙、宫殿、市场，皇帝又随四时前往行营。固定的都城与移动的皇廷，共同构成辽朝的政治生活。",
    layout: "city", diagramLabel: "上京双城与城外行营的关系", diagramNote: "皇城在北、汉城在南。行营另作关系示意，不表示固定方位、距离或全年迁徙路线。",
    nodes: [
      { id: "imperial-city", label: "皇城", caption: "北部 · 宫殿与官署", title: "皇城：有宫殿，也有寺院", description: "皇城中包含宫城，考古已确认城门、道路与大型建筑院落。东向轴线体现了辽都规划的特点，同时也发现辽代南向建筑。皇城并非一片帐篷；它有长期营建、改建的城市空间。", sourceIds: ["liao-archaeology"], position: [31, 29] },
      { id: "han-city", label: "汉城", caption: "南部 · 贸易与作坊", title: "汉城：城市的经济空间", description: "汉城位于皇城南侧，是重要的经济与贸易区，文献记有市肆、作坊、馆驿和回鹘营等。两个城名不能简单当成严格的民族居住隔离线；市场、生产与往来人口同样是理解上京的入口。", sourceIds: ["liao-archaeology"], position: [31, 73] },
      { id: "seasonal-camp", label: "四时捺钵", caption: "行营 · 渔猎与政务", title: "捺钵：随四时而行的皇廷", description: "《辽史·营卫志》记载四时行在之所：春季渔猎，夏季避暑议事，秋冬另有活动与驻地。随行的臣僚也在行营办理国事。因此，只盯着五京，还看不全辽朝皇权活动的空间。", sourceIds: ["liao-camps", "liao-jade"], position: [77, 48] },
    ],
    transcripts: [{ file: "辽01_clean_v1.md", paragraphs: "P110–P114", line: 684 }, { file: "辽03_clean_v1.md", paragraphs: "P176", line: 1080 }],
    sources: [
      { id: "liao-archaeology", title: "中国社会科学网：辽上京遗址的考古发现", url: "https://www.cssn.cn/mzx/202306/t20230620_5654296.shtml", note: "皇城、汉城的布局与功能；宫城、东西轴线和南向建筑的考古证据。" },
      { id: "liao-camps", title: "《辽史》卷32《营卫志中》", url: "https://www.zhonghuashu.com/wiki/遼史/卷32", note: "四时行营、渔猎与议国事；古籍录文，不能推成历帝不变的路线。" },
      { id: "liao-jade", title: "中国国家博物馆：辽金元春水、秋山玉器初探", url: "https://www.chnmuseum.cn/yj/xscg/xslw/201812/t20181224_36421.shtml", note: "四时捺钵与春水、秋山题材的文化联系。" },
    ],
  },
  {
    id: "western-liao-rule", seriesId: "liao", title: "西辽的统治关系", period: "12 世纪 · 中亚",
    introduction: "同一片疆域色块之下，可能有直接治理的核心地区，也有保留本地统治者的属国。西辽在中亚建立的关系，需要分层来读。",
    layout: "network", diagramLabel: "西辽核心辖区与属国关系", diagramNote: "关系示意，不画国界；属国关系随时期变化，不代表所有地区始终具有相同地位。",
    nodes: [
      { id: "court", label: "王庭与核心", caption: "八剌沙衮周边", title: "王庭与核心辖区", description: "以八剌沙衮为中心的核心地区，与外围属国的治理方式不同。西迁的契丹人及同行群体主要聚居于核心地区，王庭在这里拥有更直接的控制。不能把辽朝的五京体系直接搬到中亚。", sourceIds: ["qara-study"], position: [50, 26] },
      { id: "local-rulers", label: "地方王朝", caption: "保留本地统治者", title: "属国：本地王朝继续存在", description: "研究指出，东西喀喇汗王朝、高昌回鹘等属国多保留原有统治者、称号和军队，西辽通常不在那里常驻军队。臣属关系与直接设官治理有所区别，也给地方势力留下了相当的自主空间。", sourceIds: ["qara-study"], position: [25, 72] },
      { id: "communities", label: "多种信仰", caption: "契丹与中亚社会", title: "统治者与居民的信仰并不相同", description: "契丹统治集团保留佛教与自身文化传统，治下人口则以穆斯林定居居民为主，另有其他信仰群体。学者将其通常采取的政策概括为宗教宽容；这不能推成所有时期毫无冲突，更不能套用现代权利制度。", sourceIds: ["qara-overview"], position: [75, 72] },
    ],
    transcripts: [{ file: "西辽_clean_v1.md", paragraphs: "P097、P108–P114", line: 606 }],
    sources: [
      { id: "qara-study", title: "Biran 等：西辽核心地区与间接治理（2023）", url: "https://www.cambridge.org/core/journals/journal-of-the-royal-asiatic-society/article/koktash-underground-mausoleum-in-northeastern-kyrgyzstan-the-firstever-identified-qara-khitai-elite-tomb/91F251DFB09E9FFFF230BDD774EC26A1", note: "《Journal of the Royal Asiatic Society》研究，历史背景部分区分核心辖区与属国；此处不展开墓葬内容。" },
      { id: "qara-overview", title: "Michal Biran：The Qara Khitai（2020）", url: "https://cris.huji.ac.il/en/publications/the-qara-khitai/", note: "《Oxford Research Encyclopedia of Asian History》作者所在大学收录的摘要，说明间接统治与宗教政策。" },
    ],
  },
  {
    id: "xia-learning", seriesId: "western-xia", title: "学校、选官与法典", period: "12 世纪 · 仁孝时期",
    introduction: "西夏文字之外，还有学校怎样育人、人才怎样进入官场、官民怎样面对律令。三种制度，让一个常被视为遥远的王朝显出具体的治理面貌。",
    layout: "flow", diagramLabel: "从培养人才到官员办事", diagramNote: "图示为阅读顺序。科举与世袭、议功议亲等选官方式长期并存。",
    nodes: [
      { id: "schools", label: "学校", caption: "培养与礼教", title: "学校：从国中到宫中", description: "《宋史·夏国下》记仁孝时期在国中设学校、宫中设小学，并有皇帝亲自训导的记载。学校既承担学习功能，也通过尊孔、释奠等活动传播礼教，教育与王朝的政治秩序相连。", sourceIds: ["xia-song-history", "xia-research"] },
      { id: "exams", label: "选官", caption: "考试与其他途径", title: "选官：科举增加了一条路径", description: "《宋史》记仁孝策试举人、设唱名之法。研究者提醒，首领世袭及议功议亲并未因此消失。科举为选官提供了新的渠道，但不能把西夏官僚来源简化成所有人都经过同一种考试。", sourceIds: ["xia-song-history", "xia-research"] },
      { id: "law", label: "律令", caption: "天盛年间 · 成文规则", title: "律令：文字进入治理日常", description: "仁孝天盛年间颁行《天盛改旧新定律令》。法典以西夏文保存，涉及官员和社会生活的规范，也吸收唐宋法律传统。将学校、选官与法典放在一起，可以看见文教建设如何连接官员的培养和行为要求。", sourceIds: ["xia-research"] },
    ],
    transcripts: [{ file: "西夏04_clean_v1.md", paragraphs: "P111–P112、P135–P138", line: 690 }],
    sources: [
      { id: "xia-song-history", title: "《宋史》卷486《夏国下》", url: "https://zh.wikisource.org/zh-hans/宋史/卷486", note: "仁孝建学、策举人、唱名及修律记载；本节不据有校勘问题的纪年断言科举始年。" },
      { id: "xia-research", title: "宁夏大学：杜建录谈西夏的教育、科举与法典", url: "https://www.nxu.edu.cn/info/1591/34396.htm", note: "2025 年学者访谈，解释制度并存与法典；转引年份存在差异，本节仅采用仁孝时期的制度事实。" },
    ],
  },
  {
    id: "dali-six", seriesId: "dali", title: "洱海周围的六诏", period: "7—8 世纪 · 南诏兴起之前",
    introduction: "“统一六诏”发生在怎样的地方？先认出洱海周边的几个地域中心，再看居南的蒙舍诏如何进入统一洱海地区的历史。",
    layout: "lake", diagramLabel: "洱海周边六诏的相对分布", diagramNote: "相对方位示意，不是疆界或测绘图；点位仅表达大致地域，距离不按比例。",
    nodes: [
      { id: "langqiong", label: "浪穹诏", caption: "今洱源北部", title: "浪穹诏：洱海以北", description: "大理州地方史资料将浪穹诏定位于今洱源县北部。它与邆赕、施浪同处洱海北侧的大区域，但不是同一个政权。图中把它们分开，是为了看清六诏名称背后的地域差别。", sourceIds: ["dali-local"], position: [23, 15] },
      { id: "tengdan", label: "邆赕诏", caption: "今洱源邓川", title: "邆赕诏：邓川一带", description: "邆赕诏的大致地域在今洱源县邓川一带，位于洱海北侧。不同史籍和现代录文可见“邓赕”“登赕”等写法，阅读时要注意异名，不要把几个写法误当作额外的诏。", sourceIds: ["dali-local"], position: [49, 25] },
      { id: "shilang", label: "施浪诏", caption: "今邓川南青索一带", title: "施浪诏：北部诸诏之一", description: "所用地方史资料将施浪诏置于邓川城南、青索一带。这里采用地域级提示，不把示意点当成已经考定的城址，也不根据一个点推导其统治边界。", sourceIds: ["dali-local"], position: [24, 38] },
      { id: "yuexi", label: "越析诏", caption: "今宾川境内", title: "越析诏：洱海东侧", description: "越析诏的大致地域在今宾川县境内，与主要分布在洱海北侧及巍山一带的诸诏形成空间区别。六诏并非沿同一条直线排列，山地与坝区构成了它们各自的活动环境。", sourceIds: ["dali-local"], position: [79, 47] },
      { id: "mengxi", label: "蒙嶲诏", caption: "今巍山北、漾濞一带", title: "蒙嶲诏：南部与西侧地域", description: "大理州地方史资料将蒙嶲诏置于今巍山县北部及漾濞县一带。它与蒙舍诏相邻，却是六诏中的另一支；不能因名称相近而将二者合并。", sourceIds: ["dali-local"], position: [25, 66] },
      { id: "mengshe", label: "蒙舍诏", caption: "今巍山南部", title: "蒙舍诏：由南而起", description: "蒙舍诏位于今巍山县南部，在六诏中居最南，因而又称南诏。8 世纪 30 年代，蒙舍诏在唐朝支持下整合洱海诸部，逐步形成统一洱海地区的政权。其兴起不是一夜之间完成的。", sourceIds: ["dali-local", "dali-neac"], position: [44, 87] },
    ],
    transcripts: [{ file: "大理（上）_clean_v1.md", paragraphs: "P035–P040", line: 234 }],
    sources: [
      { id: "dali-local", title: "大理州人民政府：隋唐时期", url: "https://www.dali.gov.cn/dlzrmzf/c101711/pc/content/1968886758421663744/content_1968886758421663744.html", note: "逐一列出六诏的大致现代地域；本图采用这些地域关系，不复原疆界。" },
      { id: "dali-neac", title: "国家民委：白族历史沿革", url: "https://www.neac.gov.cn/seac/ztzl/bz/lsyg.shtml", note: "蒙舍诏在洱海地区兴起、唐朝支持与区域整合；不将古代人群名直接等同现代民族。" },
    ],
  },
  {
    id: "jiankang-temples", seriesId: "southern-dynasties", title: "建康的寺院生活", period: "6 世纪 · 梁代",
    introduction: "寺院也是讲经、集会与政治仪式发生的地方。从梁武帝的舍身，到僧众的饮食规约，可以看到佛教怎样进入建康的公共生活。",
    layout: "temple", diagramLabel: "朝廷、同泰寺与僧俗生活的联系", diagramNote: "制度与活动关系示意，不复原同泰寺建筑平面；唐诗中的“四百八十寺”不作为寺院统计。",
    nodes: [
      { id: "offering", label: "舍身", caption: "朝廷与寺院", title: "舍身：一种公开的宗教仪式", description: "《梁书》记 527 年武帝到同泰寺舍身，随后还宫；529 年再记舍身及公卿奉赎。皇帝、官员与寺院都参与其中。这里的舍身应放在供养与宗教仪式中理解，不能等同于一般意义上的永久退位。", sourceIds: ["liang-annals"], position: [25, 30] },
      { id: "teaching", label: "讲经", caption: "集会与经典", title: "讲经：皇帝也走上讲席", description: "529 年同泰寺举行四部无遮大会；531 年梁武帝在同泰寺讲说《大般若涅槃经》。经典阐释与集会把僧俗大众联系起来，寺院因此不只是私人祈愿的空间，也承担公共宗教活动。", sourceIds: ["liang-annals", "liang-buddhism"], position: [75, 30] },
      { id: "food", label: "饮食", caption: "慈悲与规约", title: "饮食：从经义到僧众规约", description: "梁武帝的《断酒肉文》把不食酒肉与佛教慈悲观念联系起来，相关研究也讨论了它与《涅槃经》的关系。这让饮食成为宗教实践的一部分；不能由此推断梁代全体居民都吃素，或此前佛教中从无素食实践。", sourceIds: ["liang-buddhism"], position: [50, 77] },
    ],
    transcripts: [{ file: "南朝04_clean_v1.md", paragraphs: "P143–P147", line: 882 }],
    sources: [
      { id: "liang-annals", title: "《梁书》卷3《武帝纪下》", url: "https://zh.wikisource.org/wiki/梁書/卷03", note: "大通元年、中大通元年及三年的同泰寺活动；不换算赎金为现代币值。" },
      { id: "liang-buddhism", title: "张凯：梁武帝与般若学的复兴（2025）", url: "https://ccj.pku.edu.cn/Article/DownLoad?id=798500147761221&type=ArticleFile", note: "学术论文表一汇集《断酒肉文》与讲说《涅槃经》的史料；PDF。" },
    ],
  },
  {
    id: "sui-offices", narrativeSlug: "sui-offices-law", seriesId: "northern-qi-zhou-sui", title: "从北朝官制到隋", period: "北齐、北周至隋 · 制度沿革",
    introduction: "隋建立后改变北周六官，并吸收前代制度。熟悉的“三省六部”背后，是名称、分工和层级不断调整的过程。",
    layout: "offices", diagramLabel: "隋代中央机构的部分分工", diagramNote: "选取内史、门下、尚书三省说明分工。隋另有其他省、台、寺，官名和职责也有变化。",
    nodes: [
      { id: "draft", label: "内史省", caption: "诏令与机务", title: "内史：参与诏令与中枢事务", description: "隋的内史省设监、令、侍郎、舍人等官，处在诏令与中枢事务的重要位置。它与后世熟悉的中书省存在制度联系，但阅读隋代材料时，应保留当时的机构名称，不能把唐代官制原样前移。", sourceIds: ["sui-offices-source"] },
      { id: "review", label: "门下省", caption: "纳言与侍从", title: "门下：献纳与皇帝身边的事务", description: "《隋书》列门下省的纳言、黄门侍郎等官，也列出所统的尚食、尚药、符玺等局。它的职掌包含献纳及侍从等事务，远比一张现代化的“审核部门”标签复杂。", sourceIds: ["sui-offices-source"] },
      { id: "execute", label: "尚书省", caption: "六曹分司", title: "尚书：分曹处理众务", description: "隋初尚书省统吏部、礼部、兵部、都官、度支、工部六曹，分别处理官员、礼仪、军事、刑政、财政和工程等事务；名称后来还有改动。政务分工必须结合具体时期理解，不能认为一套官名从隋到清始终不变。", sourceIds: ["sui-offices-source"] },
    ],
    transcripts: [{ file: "隋（上）_clean_v1.md", paragraphs: "P059–P067", line: 384 }],
    sources: [{ id: "sui-offices-source", title: "《隋书》卷28《百官志下》", url: "https://zh.wikisource.org/wiki/隋書/卷28", note: "开篇叙隋改周六官，随后列五省与六曹、开皇和大业改制；图中六曹采用隋初名称。" }],
  },
  {
    id: "sui-canals", narrativeSlug: "sui-canals-capital", seriesId: "northern-qi-zhou-sui", title: "洛阳与运河", period: "隋大业年间 · 东都与南北水路",
    introduction: "从洛阳附近接入黄河，再向北或向东南延伸，运河把都城、地方与物资运输联系起来。工程利用旧有水道，也伴随大规模征役。",
    layout: "canal", diagramLabel: "隋代运河的水路关系", diagramNote: "水路关系示意，不按距离比例，也不套用元明清京杭大运河的直线走向。",
    nodes: [
      { id: "luoyang", label: "洛阳", caption: "营建东都", title: "洛阳：都城与水路相接", description: "605 年隋炀帝下令营建东京，并开通济渠。《隋书》同时记迁入居民与富商。都城营建和交通工程连在一起，使洛阳成为理解隋代水路体系的重要起点。", sourceIds: ["sui-canals-source"], position: [20, 44] },
      { id: "tongji", label: "通济渠", caption: "605 · 河、淮之间", title: "通济渠：连接洛阳与淮河方向", description: "《隋书》记通济渠西段引谷、洛水入黄河，东段自板渚引黄河水通淮。它连接的是多个水系与渠段，并非一条自洛阳笔直挖到江南的新河。史书同时记载征发大量男女民众施工。", sourceIds: ["sui-canals-source"], position: [57, 50] },
      { id: "yongji", label: "永济渠", caption: "608 · 北通涿郡", title: "永济渠：沿水路向北", description: "608 年开永济渠，《隋书》记其引沁水、南达黄河、北通涿郡。它利用并改造已有河道，将北方水运纳入更大的体系。渠段开通的年代与旧河道出现的年代，需要分开理解。", sourceIds: ["sui-canals-source", "canal-museum"], position: [54, 15] },
      { id: "south-water", label: "邗沟与江南河", caption: "淮、江及江南方向", title: "南段：连接既有的水路", description: "邗沟和江南河与通济渠、永济渠一起构成隋代运河体系，其中包含对前代水道的利用与整治。长距离联系的收益与兴建、运输所需的民力应同时观察，不能只用一次巡游解释全部工程。", sourceIds: ["canal-museum", "national-canal"], position: [76, 81] },
    ],
    transcripts: [{ file: "隋（中）_clean_v1.md", paragraphs: "P141–P170", line: 870 }],
    sources: [
      { id: "sui-canals-source", title: "《隋书》卷3《炀帝纪上》", url: "https://zh.wikisource.org/wiki/隋書/卷03", note: "大业元年东京与通济渠、大业四年永济渠的水路和征役记载。" },
      { id: "canal-museum", title: "聊城中国运河文化博物馆：隋代永济渠寻踪", url: "https://www.yunhebowuguan.cn/article/142/3.html", note: "说明永济渠与旧白沟的关系及隋代四大渠段；只采用历史渠段关系，不据此文复原精确路线。" },
      { id: "national-canal", title: "中国国家博物馆：舟楫千里——大运河文化展", url: "https://www.chnmuseum.cn/zl/lszl/lswh/202010/t20201030_247970.shtml", note: "区分隋唐大运河、京杭大运河与浙东运河的历史构成。" },
    ],
  },
  {
    id: "min-livelihood", seriesId: "five-dynasties", title: "闽地的港口、农田与学校", period: "唐末五代 · 王审知治闽时期",
    introduction: "十国的历史也发生在水田、港口和学舍里。以王审知治闽为例，看地方经营如何把农业、交通、贸易与人才联系起来。",
    layout: "livelihood", diagramLabel: "闽地经营的三个侧面", diagramNote: "主题关系示意；甘棠港的具体位置存在考证分歧，本图不标精确港址或虚构海外航线。",
    nodes: [
      { id: "fields", label: "农田与水利", caption: "劝农 · 灌溉", title: "农田：生产恢复需要具体措施", description: "福州地方志资料记王审知劝课农桑、招抚流民，并修浚福州西湖、兴修防潮灌溉设施。保境安民落实到地方生活，既涉及赋役，也涉及农田怎样获得水源和劳动力。", sourceIds: ["min-local"], position: [22, 26] },
      { id: "port", label: "港口与贸易", caption: "山海之间的往来", title: "港口：连接腹地与海上贸易", description: "地方史资料把疏通水陆交通、招徕外来商人与开辟甘棠港联系起来。港口依靠腹地供给，也连接外来货物。甘棠港具体所在仍有不同考证，因此这里展示经营关系，不把某一说当成唯一坐标。", sourceIds: ["min-local", "min-port"], position: [75, 51] },
      { id: "school", label: "学校与人才", caption: "兴学 · 招贤", title: "学校：安置文士与培养人才", description: "王审知接纳避乱入闽的文士，采纳翁承赞建议设四门学，并重视搜集书籍。人才进入地方治理、教育面向后续世代，使“兴学”具有超出一位统治者生涯的意义。", sourceIds: ["min-local"], position: [25, 77] },
    ],
    transcripts: [{ file: "五代十国05_clean_v1.md", paragraphs: "P151–P152", line: 1109 }],
    sources: [
      { id: "min-local", title: "福州市人民政府·方志委：“开闽王”王审知", url: "https://www.fuzhou.gov.cn/zgfzzt/zjrc/mdfc/mdrj/202111/t20211115_4242653.htm", note: "劝农、水利、交通、四门学与招贤的地方史资料。" },
      { id: "min-port", title: "福建党史方志网：甘棠港的位置与海外贸易", url: "https://www.fjdsfzw.org.cn/2024-03-19/content_138426.html", note: "明确指出甘棠港地理位置尚无定论；本图保留这一边界。" },
    ],
  },
];

seriesStories.push(...supplementalStories);

export function getSeriesStories(seriesId: string): SeriesStory[] {
  return seriesStories.filter((story) => story.seriesId === seriesId);
}
