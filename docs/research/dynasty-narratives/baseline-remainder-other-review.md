# 其他系列旧基线遗留38段：末轮逐段复核

日期：2026-10-11。作者自审及ROOT逐段独立交叉复核均完成。

## 范围与方法

以当前provisional coverage JSON筛选 baselineOnly=true、baselineVerdict为partial/not-covered，排除文件名以金或西夏开头者，实数为38段。亲读这38段全文；辨别老王、秦兄卖马等转写/上下文时另读邻段。逐段比较实际注册故事的正文、诗文与解释。未回听音频；未重新亲读全部6926段，也不把这一轮登记审计冒充全量音频核验。

旧baseline的40稿6926行、原sha和verdict保持不变。新增逐段结论位于[台账](baseline-remainder-other-review.json)，其independentReview为root-completed。本文列出的章节为真实实质承接处；所有非not-needed且有sectionIds的41个节锚均逐一验证该节transcripts确实包含对应file/P。跨篇已有内容只在note说明时，不能把它自动当成当前row的全覆盖。

## 实际改动

- nanzhao-names-frontiers#manzi-chao：按白居易原诗补入原段所朗诵的节选、译意、使者道路与战争伤痕；另读诗题旨及接见结尾。伤亡数字保留诗句性质，不作独立战役统计。
- liang-emperor-buddhism#temples-in-poetry：补杜牧四句原诗、译意及唐人回望南朝的材料层次。480不是实测名单，不凭此确定建康地域范围、梁朝全建或寒山寺归属。
- qi-founding-yongming#a-new-dynasty：依宋书本纪名单列八帝，明确420–479相距59年、首尾跨60年头。
- donghun-xiao-yan#another-abdication：依南齐书本纪名单列七帝，明确479–502首尾跨24年头。
- 其余14篇只新增实际承接节的精确P引用；未增写事件、心理、血统论或皇帝排名。两处补帝数的正文也含精确P。

## 判定统计

| assessment | 段数 |
| --- | ---: |
| partial | 13 |
| corrected | 10 |
| not-needed | 12 |
| covered | 2 |
| uncertain | 1 |

13个partial是如实保留的主张限制或部分承接，不与covered合计为100%。1个uncertain为大理下P003的七十二万平方公里：无正文锚，未采用；节目其他闲话不使这个面积主张自动消失。12个not-needed均附明确理由；它们没有计为正文采用。

## 原典实读与计数依据

- [白居易《蛮子朝》](https://zh.wikisource.org/zh-hans/蠻子朝)：核节选及全文后半的寻阁劝朝见、宰相短暂奏对、题旨“刺将骄而相备位也”。文本页面附注与诗句本身不代替战役编年。
- [杜牧《江南春》](https://zh.wikisource.org/wiki/江南春)：核四句原诗、署名与樊川诗集收录标记；未采信把诗句当寺院调查的二手说明。
- [宋书本纪目录](https://zh.wikisource.org/zh-hans/宋書)与卷1、4、5、7网页帝纪开头，卷6、8、9、10的output/research-source-cache原文开头，核刘裕、义符、义隆、骏、子业、彧、昱、准八人；武帝上中下三卷为一人，刘劭列入二凶传而非此八帝名单。
- [南齐书本纪目录](https://zh.wikisource.org/zh-hans/南齊書)与output/research-source-cache/南齊書-卷1—8.txt各纪人物开头，核道成、赜、昭业、昭文、鸾、宝卷、宝融七人；高帝上下两卷为一人。并非从王朝年数倒算帝数。
- 对其他已实质存在内容，本轮所做的是原P与已经审过的正文之间的逐段语义定位，未声称重新通读每篇所列全部原典。各篇原典独立审查范围见既有cross-review与review文件。

## 逐段对照

| # | 原P | 原基线 | 新assessment | 实质定位/未采用理由 |
| ---: | --- | --- | --- | --- |
| 1 | 北齐_clean_v1.md P076 | partial | partial | gao-cheng#young-regent、#faces-and-judgments；高欢未称帝、高澄547接掌魏臣权力及相貌材料已实质写入；不能把数位亲属的形貌与才能概括为全家的智商遗传，精神病家族诊断未采用。 |
| 2 | 北齐_clean_v1.md P077 | not-covered | corrected | gao-yang#court-fear；正文已有暴行、酗酒与现代精神疾病诊断边界，纠正将北齐诸帝一律称精神病的讲述；混蛋排名与节目收束不是额外史实。 |
| 3 | 北魏03_clean_v1.md P154 | partial | partial | feng-regency#return-to-power、#farewell；冯太后掌政、改革决断及评价已写入；女性政治家最高排名不作史实，片尾魏碑提示另在wei-culture碑刻节承接。 |
| 4 | 北魏05_clean_v1.md P026 | not-covered | partial | wei-schools-law#school-gates、#punishment-in-steps；兴学和减刑实质已写，校正兴学始于冯氏、一次废尽酷刑的泛称；农牧用地关系另在wei-households#pasture，不以本篇两项当全段三项全用。 |
| 5 | 北魏05_clean_v1.md P029 | partial | partial | wei-households#salary、#debate、#limits；官俸、三长议与改革利益冲突已有具体事件；贵族全盘垄断与所有改制者遭害的概括不补成事实。 |
| 6 | 北魏05_clean_v1.md P030 | partial | partial | wei-households#debate、#limits；冯太后支持三长及改制作用已有实质；硬实力只作议论，不能由成功推出全国均田都足额落实或未遇反对。 |
| 7 | 北魏05_clean_v1.md P033 | partial | corrected | xiaowen-luoyang#moving-a-court、#clothes-and-speech；迁洛、服制与朝廷语言已有实质；正文限定不同对象、时段及执行阻力，不采用全体鲜卑在一刻彻底去鲜卑化的概括。 |
| 8 | 北魏05_clean_v1.md P157 | not-covered | not-needed | 孝文帝篇结束、下期讲亡国的串场，秦皇汉武唐宗宋祖排名和天命感叹不提供独立北魏事件。 |
| 9 | 北魏06_clean_v1.md P169 | not-covered | not-needed | 哭一哭、真男人和天人的即兴赞叹，无新的元子攸事迹；正文aftermath已有明确编辑评价，不以这些感叹增加采用量。 |
| 10 | 大理（上）_clean_v1.md P011 | partial | corrected | nanzhao-names-frontiers#manzi-chao；新节以白居易原诗核正诗题、巂州、牂牁等转写，节选至西洱河枯骨；六万卒和全军没为诗句，不作独立战役统计。 |
| 11 | 大理（上）_clean_v1.md P012 | not-covered | covered | nanzhao-names-frontiers#manzi-chao；西洱河箭孔刀痕满枯骨的末句、诗从使者道路回望战争的叙事效果已呈现；荷马史诗只是听者联想，不作体裁定论，也不采用现代听感证明不押韵。 |
| 12 | 大理（上）_clean_v1.md P014 | partial | corrected | nanzhao-names-frontiers#manzi-chao；正文区分唐人称名与今日评价、诗中的南诏与937年后的大理，不把蛮子当今人认可的族群称谓。 |
| 13 | 大理（下）_clean_v1.md P001 | partial | corrected | nanzhao-last-kings#usurpers；现有正文已写大长和、大天兴、大义宁到937大理的接续；因中原而覆灭不据一句开场断定因果，地方书纪年异文已有说明。 |
| 14 | 大理（下）_clean_v1.md P003 | not-covered | uncertain | 大部为卖早点、吉他等闲话；1208年峰值七十二万平方公里的现代面积说未获所读史籍支持，未采用为疆域数字，保留无正文锚待核候选，不因插话而抹去这个主张。 |
| 15 | 大理（下）_clean_v1.md P004 | partial | partial | duan-siping-founding#allies；937段思平建国、洱海政治中心已承接；1208统计和现代云南贵州缅甸老挝越南拼成的固定疆域未采用，羊苴咩城都城沿革亦不由此单段完全复原。 |
| 16 | 大理（下）_clean_v1.md P172 | partial | not-needed | 重述南宋时期并预告蒙古军来袭，未提供新战役动作；正文first/river及前文已承担相应年代，不重复计一次独立采用。 |
| 17 | 辽01_clean_v1.md P028 | partial | partial | shi-jingtang-khitan-bargain#land-for-help、#tent-and-tower；石敬瑭称臣父礼、外援和十六州代价已有实质；其余为倒回契丹起源的转场与代入笑话，未把主持人自述当年龄或割地对象。 |
| 18 | 南朝01_clean_v1.md P004 | not-covered | covered | liang-emperor-buddhism#temples-in-poetry；杜牧南朝四百八十寺已以完整原诗及唐人回望的语境呈现；麻将数字和预告刘裕不产生额外历史主张。 |
| 19 | 南朝01_clean_v1.md P143 | not-covered | not-needed | 老王有钱、孩子写字与精神财富是概括感叹；相邻P140–142讨论门阀与财富，不能凭老王二字补造王羲之王献之等具体作品故事。 |
| 20 | 南朝02_clean_v1.md P130 | partial | corrected | qi-founding-yongming#a-new-dynasty；420–479相距五十九年、首尾六十年头，以及按宋书本纪名单计八帝已写入；武帝三卷只计一人，刘劭的二凶传不混入该计法。北齐祸害辐射面、精神病发作的比较不作事实。 |
| 21 | 南朝02_clean_v1.md P131 | not-covered | not-needed | 主持人解释节目删去骇人情节、评论价值观，无新姓名事件；不能以高刺激概括创造未在这一段说出的宫廷故事。 |
| 22 | 南朝03_clean_v1.md P003 | partial | corrected | donghun-xiao-yan#another-abdication；正文明确479–502首尾跨二十四年，并依南齐书本纪姓名明列七帝，纠正二十七年口误；高帝上下两卷只计一人，平均在位年数不代替具体废立。 |
| 23 | 南朝03_clean_v1.md P147 | not-covered | not-needed | 比桀纣更残暴的排行榜与录节目天数属评语、串场，没有额外史事；具体杀戮和失去臣下支持已由本篇独立事件呈现。 |
| 24 | 南朝03_clean_v1.md P150 | not-covered | not-needed | 如果不是皇帝会怎样、家族混蛋孩子比例是反事实与道德感叹；没有可核的事件或统计，未以此作遗传论。 |
| 25 | 南朝04_clean_v1.md P002 | not-covered | partial | liang-emperor-buddhism#temples-in-poetry；补原诗及寺院记忆；诗不能证明寺院全在梁、寒山寺创建于梁或当然属于480名单。相关个寺创建仍须独立证据，不假称此段所有主张已证。 |
| 26 | 南朝04_clean_v1.md P003 | not-covered | corrected | liang-emperor-buddhism#temples-in-poetry；正文明确480不能当建康及近郊实测寺数，也不能直接算整个南朝规模；信仰规模不由一个诗数证明。僧众普遍不受皇帝约束的泛称未采用。 |
| 27 | 南朝04_clean_v1.md P004 | not-covered | partial | liang-emperor-buddhism#bodhidharma-story、#first-two-offerings、#last-two-offerings；正文已有达摩不以帝王造寺论功德的晚出故事，以及皇帝舍身、奉赎还宫的编年过程；南朝和尚一律说了算、北朝一律尊皇帝为佛的二分不作事实。 |
| 28 | 南朝05_clean_v1.md P144 | not-covered | partial | jiangling-fall#books-and-people、#balance；人口与军事动员损耗、被掠者和亲属离散已有具体承接；没有此段可核的总体人口数字，不推算人口锐减比例。节目结束串场不计采用。 |
| 29 | 南朝06_clean_v1.md P001 | partial | partial | chen-baxian-rise#northbound；侯景乱后的陈霸先北上勤王、与王僧辩协力已有实质；闻者惊心是感受，不能把梁亡各阶段压成一个事件。 |
| 30 | 南朝06_clean_v1.md P002 | partial | corrected | chen-baxian-rise#southern-campaign、#northbound、#unfinished-foundation；广州招兵、岭南起兵北上与557受禅建陈已写；陈霸先籍贯吴兴，不把部队南方起家写成皇帝生于广州，更不采用从未有岭南势力成功的绝对断言。 |
| 31 | 隋（上）_clean_v1.md P001 | not-covered | not-needed | 严肃史实与演义不同、举秦叔宝为例的开场提示，没有本段独立人物行动；不由知名度扩写一套新的隋唐演义故事。 |
| 32 | 隋（上）_clean_v1.md P002 | not-covered | not-needed | 续举尉迟恭、程咬金和疑似演义桥段，随后说明可能张冠李戴；无完整可核的事件，此处不根据秦兄卖马索武龙等转写补造台词或人物归属。 |
| 33 | 隋（上）_clean_v1.md P004 | not-covered | not-needed | 关公战秦琼作为日常语言例子及开始讲隋的串场，未提出两人真的交战；不需补成历史战役或另辟唐将生平。 |
| 34 | 隋（上）_clean_v1.md P005 | partial | partial | sui-conquers-chen#after-capture、#long-division；589年统一及此前分裂阶段已具体写入；二世而亡的简化在sui-jiangdu-coup#names-after-death已有不同末帝说明。秦始皇与杨坚高下不是此篇的史源结论。 |
| 35 | 隋（上）_clean_v1.md P006 | not-covered | not-needed | 杨坚不及秦始皇、杨广胜胡亥是未指定尺度的人物高下；没有新行为事迹，现有隋篇从治理、工程、战争和末局具体评价，不另添皇帝排行榜。 |
| 36 | 五代十国03_clean_v1.md P002 | not-covered | not-needed | 矛盾综合体与精神病的玩笑没有新的李存勖事件；不作现代临床诊断，也不拿北齐作家族病对照。 |
| 37 | 五代十国03_clean_v1.md P003 | not-covered | partial | later-tang-shu-and-mutiny#money-and-performers、#guo-death、#ye-mutiny；正文以军粮、伶官、诛功臣与兵变呈现后期问题，不写突然变坏的心理断言；早年战功已在潞州柏乡篇，不把前后半生各自绝对贤或恶当史实。 |
| 38 | 五代十国05_clean_v1.md P168 | partial | corrected | later-han-and-guo-wei-rise#yellow-flag；郭威称帝的黄旗撕披、拥呼南返已有实质，区别后来赵匡胤黄袍；末集预告和十国梳理感想不计独立采用。 |

## 原段全文（便于ROOT逐条对读）

### 1. 北齐_clean_v1.md P076

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北齐_clean_v1.md:480)

> 嗯，高欢病逝以后，高欢的儿子们陆续咱不能叫继位。因为他当时高欢没称帝嘛，就陆续接过了高欢权力的接力棒，才有了后来的北齐。嗯，他的这些儿子们绝大多数继承了高欢的智商和聊貌，咱呦也继承了我不是我啊，是基本上所有人都怀疑他们家遗传的精神病。哎呀，真的吗？

### 2. 北齐_clean_v1.md P077

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北齐_clean_v1.md:486)

> 真的哦就是从他的儿子高澄开始，中国历史上从未有过的混蛋，慌乱的王朝开始从未有过的如此密集的精神病皇帝陆续登场。行，那这样啊，那我就在这儿，我就替大家拍板了。好吧。因为今天咱们这节目呢就聊聊咱们这个北魏的后续讲到这儿。

### 3. 北魏03_clean_v1.md P154

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北魏03_clean_v1.md:948)

> 嗯，但如果我们对历史去了解的话，真正的幕后的推手不是孝文帝，是是个更喜魏的太后，嗯，这个人是北杰杰出的女政治家，甚甚至可以说是北北人认认里边。另中国性性文治家里最优秀的一个哎呦这么高评价啊啊，那这个人是谁呢？哎，那咱们下回再讲，我自己都会了啊，好家伙。好嘞，大家如果感兴趣呢，也可以看看这些字帖啊，上面有这些北魏啊，什么魏碑啊，非常非常的著名理直流传到现在咱们非多多人在临摹。

### 4. 北魏05_clean_v1.md P026

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北魏05_clean_v1.md:180)

> 嗯，第一就是兴办学校，哎，重教育。哎，嗯，第二就是废酷刑。嗯，对，第三，用一个时髦点的词儿叫做退牧还耕哦，开展这个种植业。对啊，大力发展农业。

### 5. 北魏05_clean_v1.md P029

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北魏05_clean_v1.md:198)

> 因为那个时候可能也是因为整个权利啊比较分散嘛，或者说在这个贵族时代不接同他们的权利太大了啊，他们也也太富有了，所以要打破他们这这种东西。但是你在改的时候会遇到巨大的阻力。很多人是因为这种改革最后就被搞了，嗯，对吧？嗯，捎带的改变了北魏的公务员阶层，就我们所谓的官僚阶层嗯的这个奉薪制度啊，那么再往后来说，设立三长制或者说沿袭了三长制，嗯，重新在北魏的这个土地上设三长制后面都会讲到。

### 6. 北魏05_clean_v1.md P030

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北魏05_clean_v1.md:204)

> 好啊，这就是太和改制前期由冯太后嗯主导的一系列的改革真好。然后从这里边，我相信大家也可以嗅到一点点的味道。就是说如果能够实行这样的改革，那个时候冯太后手里的权利，包括他真正的实力是很强的对。对，如果你没有硬实力，嗯，你逼着人家这个熏田，人家谁听你的，没准就反了。

### 7. 北魏05_clean_v1.md P033

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北魏05_clean_v1.md:222)

> 中原文明政权的核心统治地位啊，对，而且其实从大同嗯迁都洛阳，我们说他的轨迹盛乐平城嗯到洛阳是逐渐的去鲜卑化。对汉化的一个过程，的确我越来越向中原腹地靠近，然后我离我自己的草原大漠越来越远。嗯，那么就反映出来了两个阶层或者说两个利益集团博弈的一个输赢，然后更有著名的易服嗯嗯改语言。哎，所有的这个胡服全部去掉，改齐汉服。

### 8. 北魏05_clean_v1.md P157

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北魏05_clean_v1.md:966)

> 对哼，但是哎所以说各有命哈，历史上优秀的皇帝有很多，嗯，但真正说秦皇汉武，唐宗宋祖终归是少数中的少数了，是也得有天命哈。哎ok那行，非常非常波澜壮阔的北魏孝文帝的一生。嗯，我们在这期节目就讲完了。那接下来就是我们最后的一期节目啊，我们看看北魏这个朝代最终是如何落幕的。

### 9. 北魏06_clean_v1.md P169

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/北魏06_clean_v1.md:1038)

> 哎呀，好，跟你一起哭一哭哭一哭啊，哭一哭。咱们元子攸啊。哎呀，子攸真男人真不是一般人呐啊我觉得都不是真男人，是天天人啊，真是天人。

### 10. 大理（上）_clean_v1.md P011

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/大理（上）_clean_v1.md:90)

> 这首诗呢叫满子朝蛮子蛮子啊啊子桃鹤曹见的朝哦，是白居易写的。嗯，好，来，咱们朗诵一下嗯，叫满子朝范邳舟溪渡绳桥，来自西周道路窑入界仙境蜀穿过蜀将收工，先表贺沉闻云南六兆瞒东联张科西联波、吐蕃的钵嗯六兆兴居出琐碎。何为一兆见强大开元皇帝虽圣神为蛮屈，将不来宾鲜于仲通。六万足蒸蛮一阵，全军没至今。

### 11. 大理（上）_clean_v1.md P012

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/大理（上）_clean_v1.md:96)

> 希尔河岸边剑恐刀痕，满枯骨。哇，这个感觉这跟我理解的传统的诗好像都不太一样，像荷马史诗一类的吧，对还真是好像记录一段很长的历史。对啊，其实这个也是白居易的一大功力。嗯，就是他非常擅长写这种叙事的啊，白描式的这种作品啊，甚至都不太在乎这个运了。

### 12. 大理（上）_clean_v1.md P014

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/大理（上）_clean_v1.md:108)

> 但我们要啊因为我们要客观的陈述这件事儿，今天这么说肯定是非常不合适的。对对对，然后就讲的人家在哪儿，然后怎么才能到这个所谓的中原来啊从这个什么川蜀过来，后来讲了还有一些故事。嗯，那这个诗其实是唐朝的时候，唐朝对于这个地方的记载。对，那在那个里面其实并没有大理这个词儿，对大理这个词出现的要更晚。

### 13. 大理（下）_clean_v1.md P001

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/大理（下）_clean_v1.md:30)

> 照这个国家，后来也是因为中原就是覆灭了。然后之后呢出现了很多的中间过渡的一些国家，都叫大什么什么大什么大字辈的一对各种存在时间都不长啊，有的什么一两年长的，有有过什么十几十几年啊。对，然后一直到我们上集节目，最后讲到了有一个姓段的人，哎，出场了。哎，那对我们开始讲到现在大理的历史，我们就从他这儿开始讲，好吧？

### 14. 大理（下）_clean_v1.md P003

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/大理（下）_clean_v1.md:42)

> 对啊，干嘛怎么做油炸油条子了，人家那不是这里狂的，都是是孩儿，这是卖早点的，不是啊，卖吉他的。嗯，对，这个这肯定烦死了。说不说呀，好好说，专家就听车听车的，我知道你们听的啊，故意说点这个干了的，吓死我了。哈哈，巅峰时候的疆域嗯大概是七十二万平方公里。

### 15. 大理（下）_clean_v1.md P004

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/大理（下）_clean_v1.md:48)

> 嗯，哦这个统计的年代是公元一千两百零八年的时候，它的都城呢还在我们上次说的那个羊苴咩城，羊苴咩城。嗯嗯，它政治中心呢就在洱海一带，大概是包括今天的云南省贵州省的西南部、缅甸北部、老挝和越南的一部分地区。偶尔。那我们说大理是由一个姓段的同志建立的，嗯，这个人叫段思平。

### 16. 大理（下）_clean_v1.md P172

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/大理（下）_clean_v1.md:1056)

> 对对，怎么说一百多年，然后就结束了。国乐啊，等来了蒙古的军队啊，对蒙古军队打到大哪去了？因为这个时候历史已经发展到了南宋是对吧？因为我们我们说段誉时期已经是徽宗了，徽宗了，段誉在位都四十年嘛，所以历史已经发展到了南宋是。

### 17. 辽01_clean_v1.md P028

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/辽01_clean_v1.md:192)

> 嗯，但是我觉得从现在开始，我们不妨就倒回头。嗯，我们就聊聊这个契丹这个民族到底最开始是从哪儿，嗯嗯，对吧？他们一步一步怎么发展到，后来能够你就想割让，烟云十六说，凭什么割让，你不怎么不是割让给我呀啊，那会儿还没出生，那对这出生了就割让给呃，真的了。这不石敬瑭给我当儿子，我我不不不合适吗？

### 18. 南朝01_clean_v1.md P004

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝01_clean_v1.md:48)

> 首先就知道那句诗嘛，哎南朝四百八十寺哦，看着我眼睛就猜出这数来了，哎呀，好像眼睛里写着四百八十寺。对对对，一四七二五八一条线呃，打麻将的事儿。哎呀，对，这是一首诗嘛。然后当然还有南朝的一些著名的人物，比，比如我们上学的时候，我像最了解刘裕哎，是吧？

### 19. 南朝01_clean_v1.md P143

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝01_clean_v1.md:882)

> 嗯，当然我们也要说这个当时那个时代留下什么好东西了，嗯，那老王也有钱，孩子都能写字是吧？对对，流传到现在也是一笔财富啊，精神财富。对，这都可以变成出去。

### 20. 南朝02_clean_v1.md P130

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝02_clean_v1.md:804)

> 刘宋刘宋一共是五十九年八个皇帝。听起来啊我这还不如呵呵，还不如佩奇呢，这个这个是吧？你听着这北齐祸害的辐射面比较小啊，刘宋呢祸害的辐射面比较大，而且它完全没有下限。对啊，你北齐那帮人吧，他这精神病啊，对他他他他也不是老犯病啊，对他不犯病的时候他干点正事。

### 21. 南朝02_clean_v1.md P131

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝02_clean_v1.md:810)

> 而且咱们说了北齐的这些皇帝，除了后来的那个以外，嗯，之前他是有作为的这这你说那这些人都都已经都太不像话了，这个这太闻所未闻，闻所未闻啊。就是其实我们作为一个成年人，因为有时候这个节目小朋友会听，嗯，所以我跟活总我们在前期策划的时候，我们会把一些更害人听的东西就给隐去了。是是，但是这些事儿很好，找到这些资料，大家可以去看一看。我觉得他都不是精神病的问题，他都已经不在一个人的正常的价值观上面了。

### 22. 南朝03_clean_v1.md P003

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝03_clean_v1.md:42)

> 嗯，首先呢就是上一期我们讲到了啊，嗯当时这个宋是怎么被这个萧道成哎所取代啊。然后南齐的时间因为我也稍微做点功课了，他这个国家时间非常短。二十七年二十四年啊呃二十四年啊，给你面子火，总是特意照顾。我在录节目之前给我对了一下，说你算对了啊，结果我不出意外的又算错了，证明是不好记的，是不好记的这时间非常短，但是皇帝非常多，七个皇帝，我天四七二二八还不到四年，三年多就一个。

### 23. 南朝03_clean_v1.md P147

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝03_clean_v1.md:906)

> 嗯，我觉得刚刚萧衍那句话，我听了觉得非常有道理，说这个萧宝卷嗯残暴超过商纣王。嗯，因为咱们这个上学，所有所有历史，人家都说什么什么暴如桀昼啊，这个好像中国历史上最残暴，最荒淫无道的就是这二位。但我听完咱们这个刘宋啊，我们刘宋啊，还有这个这个南齐啊、嗯这刘子毅啊和这个萧宝卷这二位好像比纣王还是要更野蛮一点儿。对，因为这里其实有这么一个问题，就是我们录节目嘛，我们可能是几天录完。

### 24. 南朝03_clean_v1.md P150

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝03_clean_v1.md:924)

> 嗯，他可能也可能会觉得哎，这个人如果他不当皇帝，那他可能不会像现在这样。但是我们可以反过来看，中国这么长的历史，有这么多的皇帝能做到这种程度的人也没有几个。对对吧？他们家其实含这种混蛋孩子的比例非常高。

### 25. 南朝04_clean_v1.md P002

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝04_clean_v1.md:36)

> 因为比如说那么我们熟悉的什么南朝四百八十寺，其实那都是在梁的时期是吧？很多都是。然后包括大家非常熟知的姑苏城外寒山寺，就是梁的时候盖的姑苏城外寒山寺，哎，就是啊姑苏城的夜店，哎呀，对吧？夜半钟声嘛，这我这那他人肯定也算是四百八十寺之一啊，嗯是不是？

### 26. 南朝04_clean_v1.md P003

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝04_clean_v1.md:42)

> 对，但其实南朝的这个寺庙嗯就是南梁啊，嗯寺庙确实非常多是吧，而且这四百八十寺可能纸的还就是建康城及其周边啊，还不算整个南朝的范围，嗯，巨多是吧？嗯，南京是吧？对，就当时的南京城嘛，其实跟他的整个南朝对佛教的推崇有关，是吧？而且我们在北魏的时候，其实聊到过嗯南朝的这些僧众啊，这些大法师啊不太拿皇上当回事。

### 27. 南朝04_clean_v1.md P004

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝04_clean_v1.md:48)

> 嗯，就是我说了，就你得听哦，这么牛啊。对，嗯，因为咱们不是讲过这个北朝的这些僧人是吧？啊，您就是当下的佛，哎，是对对对对，但是南朝的僧人就是我说了算，就我们当和尚的厉害。对啊，这么回事儿，你皇上也当和尚，对，回去了又来了。

### 28. 南朝05_clean_v1.md P144

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝05_clean_v1.md:888)

> 嗯，没法过了。我觉得，但是因为当时我我们聊这些东西，我也去看一些这个资料的，反正人口锐减呀，那那时候真是天下最圣苦。嗯，好，那咱们今天就把南梁的故事聊到这里了。好，我们南北朝南朝的故事，那就剩最后一集。

### 29. 南朝06_clean_v1.md P001

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝06_clean_v1.md:30)

> 大家好，我刘所，我小伙子，哎呀，你是很快啊，很快就到了最后一期节目了。我们这套南朝的节目最后一期，我们上期聊到了这个南梁的结束，南梁南梁结束。哎呀，其实想起来真是侯景之乱啊，不让闻者惊心。然后那个时候呢，南陈这边的主角儿陈霸先也已经冉冉升起。

### 30. 南朝06_clean_v1.md P002

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/南朝06_clean_v1.md:36)

> 哎，也很意外啊，是从一个广州那边过来的这个事例。嗯，最终这个大家也都知道啊，在历史当中他建立了南朝的最后一个朝代南陈。嗯，我当在上期节目还在说说呢，据我所知，我说这个哎呦广州那边的势力最后得到了所谓的这个大的政权之前就没怎么听说过啊。嗯，所以今天呢我们来好好聊一聊南陈的历史。

### 31. 隋（上）_clean_v1.md P001

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/隋（上）_clean_v1.md:30)

> 这个隋朝很多的故事，他未必和演绎的故事就那么像啊。对，因为其实隋唐演义可以说是一个几近家喻户晓的这么一个民间话本嘛，哎对吧？大量以评书啊，包括什么戏曲的形式存在。嗯，大家基本上都能说的出来啊，比如说什么秦叔宝嗯，是吧？

### 32. 隋（上）_clean_v1.md P002

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/隋（上）_clean_v1.md:36)

> 尉迟恭。对，为什么秦兄卖马索，武龙是程咬金？但其实他们这些人在历史上的原型嗯，不是跟大家熟悉的演绎故事一样，嗯，包括有一些人是不是被张冠李戴了。因为在准备这期节目的时候呢，胡总说说咱们聊聊隋朝吧。

### 33. 隋（上）_clean_v1.md P004

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/隋（上）_clean_v1.md:48)

> 嗯嗯，那咱们就聊聊隋好啊，其实我是会觉得虽然隋朝时间那么短，嗯，但是你包括像秦琼啊，嗯像程咬金啊，已经成为了中国人语言里边的不可缺少的一部分，是吧？对，这关公战秦琼就成了大家的非常日常的一种语言表达了。对，所以呢从今天开始啊，我们来好好聊一聊隋朝的故事，嗯，预计会聊不止一期。嗯嗯，那聊多少期我们开始来啊，嗯那我们从谁开始聊起呢？

### 34. 隋（上）_clean_v1.md P005

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/隋（上）_clean_v1.md:54)

> 咱还是要从这个开国皇帝聊起开国皇帝。隋朝呢其实大家会有一个印象啊，就是跟秦朝很像，嗯，对，结束了这个分裂的局面，形成一个大一统的王朝。嗯，二十二瓦[转写不清：疑似二世而亡]的确，但是有一个不一样的点，其实是在于说开国的皇帝，杨坚，隋朝开国皇帝是吧？对，来对秦始皇感觉还是有些比不上。

### 35. 隋（上）_clean_v1.md P006

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/隋（上）_clean_v1.md:60)

> 那是那就在我们的固有认知里面，你跟秦始皇那可怎么比对，你跟秦始皇比的都是谁？对啊，这汉武帝哎，是吧？秦皇汉武是那这个第二个皇帝杨广啊，嗯比胡亥呢又确实是强了，不是一星半点儿。哎，那杨广这个人其实在历史上还是颇有争议的啊。

### 36. 五代十国03_clean_v1.md P002

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/五代十国03_clean_v1.md:39)

> 如果没有北齐贤周，就是咱这历史节目录的的多了呀，大家容易比较是吧？我就会说这是一个中国历史上非常著名的矛盾综合体的皇帝啊。矛盾综合体说的挺客气，就精神病呗，是吧？是这意思吗？

### 37. 五代十国03_clean_v1.md P003

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/五代十国03_clean_v1.md:45)

> 不是不是，他还不是精神病，不是跟高洋他们家人不一样啊，不一样啊。对，高洋他们家人脑子有病啊，这不是，这是脑子进水哦。嗨嗨，是啊，前半生简直是一代贤君，嗯，后半简直是一代混蛋哦。哦，是吗？

### 38. 五代十国05_clean_v1.md P168

[原稿定位](D:/OPC/小宇宙待开发/_source-materials/transcripts/cleaned/dynasty/五代十国05_clean_v1.md:1236)

> 后周郭威称帝以后，嗯，黄袍加身是吧，跟大家熟悉的黄袍加身，又是怎样的故事？留到最后一集再说了。哎呀，真不容易啊，这前前后后的啊，这的好多事儿，又又前又后，又难的啊。但是我觉得刚刚刘所这么一梳理，至少对于十国我基本上有一概念了啊，我大概知道都是哪儿，然后发生过什么事情。

## 验证

- 38段唯一集合与原provisional筛选结果相同；无漏行、重行。
- 41个非空section锚均有实际正文、精确file/P且sourceIds可解析；唯一空锚uncertain保留候选性质。
- 本次涉及的18篇TS文件ESLint运行退出0；tsc --noEmit运行退出0。
- narratives.test.ts实际运行247项，其中246通过；唯一失败为并行修改中的xiao-guanyin-supplement标题与catalog标题不同，已报ROOT处理。未改该篇或catalog，未把此轮称为全量测试通过。
- 最终coverage尚未重写；ROOT待旧辽与金夏50段独立交叉全部完成后统一授权重跑。

## ROOT独立收口

逐读以上38原段全文和对应41个实质节锚，另亲读两首原诗全文、本纪目录及南齐书各帝纪人物开头。诗句、译意、题旨及所列帝数符合所读材料；480未假作统计，六万全没未假作战役确数。政策实质、人物评价及串场判断与正文相符。大理面积仍是未采用的无锚uncertain；保留13 partial具体边界。独立精确锚复检41个全部有效。原音频未回听。
