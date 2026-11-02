# 逐字稿补写逐项计划

<!-- latest-state-2026-10-11:start -->
## 2026-10-11 最新状态

当前实际注册244篇；本轮从156篇增加的88篇正文、逐P台账与独立交叉复核全部完成，共2624条新增审查记录。记录数不是去重原段数，也不表示所有口述命题进入正文。

既有南朝S01—S30、五代W01—W05、金J03—J07/J09与陈和尚回补的独立核查已登记；[S29补充复核](cross-review-s29.md)13条记录已冻结。旧辽L06—L33全部28篇、775条完成二次独立核查，L34的22条亦完成，见[旧辽复核](cross-review-old-liao.md)及[L21—L33复核](cross-review-old-liao-l21-l33.md)。

仅沿旧基线的88段partial/not-covered已补核并独审关闭：其他38段见[复核报告](baseline-remainder-other-review.md)，金/西夏50段见[独立复核](baseline-remainder-jin-xia-independent.md)。最后57个review-not-covered原段也已逐段研究处理、补入有据内容并完成独审：北朝15段为3 corrected、2 partial、10未采用，见[北组独审](final-unadopted-north-independent.md)；南朝/隋/大理/金28段为1 covered、3 corrected、4 partial、20未采用，见[南组独审](final-unadopted-south-other-independent.md)；辽五代14段完成实际补充，并处理辽03 P006的竞争记录及3个旧空锚，见[辽五代独审](final-unadopted-liao-wudai-independent.md)。30条最终not-covered全有research-closed理由，保留不采用判定，不靠更换assessment清零。review及manifest递归检查显式independentReview:pending为0；部分旧台账没有该字段，其独审依据保留在method与独立报告，不能把字段缺省当作新完成证明。

[全量覆盖登记审计](coverage-reconciliation-2026-10-11.md)按冻结数据重跑final、expected-stories 244，退出0。40稿、6926段原始sha/verdict保持不变；246个审查文件含多故事pilot与补充台账，6704条全部历史/当前记录、6672条最新记录、6618个唯一原段。合并结果：covered 1835、corrected 1824、partial 2432、not-needed 331、uncertain 151、not-covered 30、mixed 15；baseline-only 308（covered 38、corrected 6、not-needed 264），无仅沿基线的partial/not-covered。追加实质或部分采用6106段；完整/校正且无竞争未解记录3659段。仍含uncertain的152段、36条空正文锚候选warning如实保留；文件及逐段hash差异0、登记errors 0。脚本的unresolved表示采用边界，并不把已有research-closed的未采用内容再算作未执行写作任务。

只有正文范围引用而没有任何review的3段、未获对应section审查的790个引用对均不自动算采用；52条未注册旧别名草稿审查排除。baseline-only的38个covered没有伪称为本轮新增覆盖；多个partial不升级。本次是登记审计，没有重新语义复读全部6926段，也未回听音频。无证心理、医学化评价、拟对白、未明数字与转写候选按实际证据处理；事实类苑卷77旧链接本轮403的限度见辽五代独审报告，不称已重新亲读该失效链接。

最新全部代码（含SSR深章节修复、刘裕363—421纪年和AI来源点击关闭抽屉）已通过生产build、tsc与定向ESLint，均退出0；全量Vitest 112文件/1174项通过。244个故事HTTP 200、实际初始h1与section检查错误0；检索244篇/1442节/1686 context checks通过，8个不安全链接被拒绝。46项E2E在SSR修复后全部通过，运行早于最后纪年及AI来源关闭修改；最后两项随后通过完整1174测试、20项定向检查和新生产浏览器实查，没有把46项测试说成覆盖这两项最后改动。额外CLI曾发现的初始深章节URL问题已修复，原46项测试没有因此失败。新release-review会话首次打开#six-rulers，hash正确、top 112.375；问史答案来源点击后抽屉消失、hash保留、top 112.375且无横向溢出，393×851直接打开同样正确定位。最终验收全部收口，证据见[最终验证报告](final-verification-2026-10-11.md)。跨系列故事问史及真实章节来源链已接入，旧五代纯事件问答年份边界保留，见[检索独审](cross-review-retrieval.md)。

未注册旧草稿shulu-regency、yelu-bei-sea、yelu-deguang-kaifeng保留文件及旧manifest，不重复计数。后文旧日期、批次数和当时状态保留为历史记录，最新进度以上述状态及当前逐P台账为准。
<!-- latest-state-2026-10-11:end -->


历史阶段说明：2026-10-03。以40篇、6,926段既有审计为范围；本表是补写队列，不是覆盖完成表。各项依次经过原段阅读、史料校读、正文、逐段回查和页面验收。一个故事可以分成数节；独立支线过多时再拆篇，不机械地每段建一页。

## 本轮顺序

| 顺序 | 状态 | 故事 | 原稿范围 | 要补的内容 | 验收 |
|---|---|---|---|---|---|
| 01 | 正文与验收完成；9段部分承接 | 河阴：拥立之后，为何又想废掉皇帝 | 北魏06 P044–P076 | 高欢献策、铸像择君、百官被围、皇帝传话、称帝争论、谢罪与宗室南奔；529年洛阳易手作后果衔接 | 33段分别回查：13实质、11校正、9部分；记录见 `heyin-review.json` |
| 02／BW37 | 正文与验收完成；余项见台账 | 两位拥立者，两座朝廷 | 北魏06 P134–P145；北齐 P019–P032 | 高欢废立、元修西奔与东西分裂；割血赠贺拔岳、对梁战事及北齐交叉来源已回补 | 26段回查：17校正、6实质、2部分、1插话；见 `wei-split-review.json` |
| 03 | 回补与验收完成 | 元昭业拦马进谏与九锡试探 | 北魏06 P083–P084；P090 | 已核《魏书》元昭业条并补进谏与慰勉；九锡九类及汉末前例补入原篇 | 3段校正承接，独立复核通过；未将眼神暗示、保护彼此的对白当成史实；记录见 `north-wei-review.json` |
| 04／BW01 | 正文与验收完成；9段部分承接 | 从嘎仙洞回望：鲜卑与拓跋的来路 | 北魏01 P012–P033、P035–P046 | 族称与部落、迁徙记忆、李敞祭祖和祝文；限制单线血统与地名推断 | 34段回查：8实质、17校正、9部分；见 `xianbei-origins-review.json` |
| 05／BW02 | 正文与验收完成；1段部分承接 | 诗里的木兰，石上的北魏 | 北魏01 P003–P005、P047–P048；北魏03 P097–P098、P151–P153；北魏06 P158 | 木兰歌辞、碑刻书法、石窟造像纪年及郦道元；不把传说人物写成确定籍贯 | 11段回查：3实质、7校正、1部分；见 `wei-culture-review.json`，未具名市场器物仍待核 |
| 06／BW03 | 正文与验收完成；6段部分承接 | 拓跋力微：一匹马与两场丧事 | 北魏01 P049–P076 | 赠马、拒半部与联姻、长川经营、杀妻诱二子、兼并与归附；说明追尊、补佚及祖源材料层次 | 28段回查：11实质、11校正、6部分；见 `tuoba-liwei-review.json` |
| 07／BW04 | 正文与验收完成；6段部分承接 | 沙漠汗之死：归途上的飞鸟 | 北魏01 P077–P103 | 留质、两次归途、卫瓘金锦离间、阴馆弹鸟、塞南遇害、库贤磨斧与部众离散 | 27段回查：5实质、16校正、6部分；见 `shamohan-review.json` |
| 08／BW05 | 正文与验收完成；2段部分承接 | 从三部分治到代王 | 北魏01 P104–P111 | 详见分表与各篇分节正文 | 8段回查：0实质、6校正、2部分；见 `dai-kings-review.json` |
| 09／BW06 | 正文与验收完成；2段部分承接 | 代国的继承危机：一拜之后，父子成仇 | 北魏01 P112–P131 | 详见分表与各篇分节正文 | 20段回查：6实质、12校正、2部分；见 `dai-succession-review.json` |
| 10／BW07 | 正文与验收完成；4段部分承接 | 什翼犍：城墙、婚约与诸部 | 北魏01 P132–P136；北魏02 P008–P027 | 详见分表与各篇分节正文 | 25段回查：9实质、12校正、4部分；见 `shiyijian-review.json` |
| 11／BW08 | 正文与验收完成；6段部分承接 | 代国覆亡后，谁留下了拓跋珪 | 北魏02 P002–P007、P028–P057 | 详见分表与各篇分节正文 | 36段回查：10实质、20校正、6部分；见 `dai-fall-review.json` |
| 12／BW09 | 正文与验收完成；3段部分承接 | 拓跋珪复国：逃亡的人怎样重新聚众 | 北魏02 P058–P081 | 详见分表与各篇分节正文 | 24段回查：6实质、14校正、3部分、1插话；见 `tuoba-gui-restoration-review.json` |
| 13／BW10 | 正文与验收完成；3段部分承接 | 参合陂：归途上的败军与被杀的降卒 | 北魏02 P082–P105 | 详见分表与各篇分节正文 | 24段回查：3实质、18校正、3部分；见 `canhe-slope-review.json` |
| 14／BW11 | 正文与验收完成；4段部分承接 | 中山城下：参合陂的后果回来了 | 北魏02 P106–P124 | 详见分表与各篇分节正文 | 19段回查：7实质、8校正、4部分；见 `zhongshan-campaign-review.json` |
| 15／BW12 | 正文与验收完成；6段部分承接 | 国号为何是魏：一个旧名与新的天下 | 北魏01 P007–P011；北魏02 P125–P134；北魏03 P003–P004 | 详见分表与各篇分节正文 | 17段回查：4实质、7校正、6部分；见 `wei-name-review.json` |
| 16／BW13 | 正文与验收完成；5段部分承接 | 天安殿的最后一夜 | 北魏03 P006–P019 | 详见分表与各篇分节正文 | 14段回查：2实质、7校正、5部分；见 `tuoba-gui-last-night-review.json` |
| 17／BW14 | 正文与验收完成；7段部分承接 | 储君有了，母亲为何不能留下 | 北魏03 P020–P030、P051；北魏05 P004–P008；北魏06 P012–P016 | 详见分表与各篇分节正文 | 22段回查：3实质、12校正、7部分；见 `wei-mothers-review.json` |
| 18／BW15 | 正文与验收完成；8段部分承接 | 明元帝：长城以北，黄河以南 | 北魏03 P031–P050、P052、P055、P057–P060 | 详见分表与各篇分节正文 | 26段回查：5实质、13校正、8部分；见 `mingyuan-frontiers-review.json` |
| 19／BW16 | 正文与验收完成；3段部分承接 | 太武帝与柔然：追进大漠之后 | 北魏03 P061–P074、P084–P094 | 详见分表与各篇分节正文 | 25段回查：5实质、17校正、3部分；见 `taiwu-rouran-review.json` |
| 20／BW17 | 正文与验收完成 | 统万城：两次进军与没有立刻结束的夏国 | 北魏03 P075–P083 | 详见分表与各篇分节正文 | 9段回查：2实质、7校正、0部分；见 `tongwan-siege-review.json` |
| 21／BW18 | 正文与验收完成；5段部分承接 | 元嘉北伐：滑台、瓜步与佛狸祠 | 北魏03 P053–P054、P096–P113 | 详见分表与各篇分节正文 | 20段回查：3实质、12校正、5部分；见 `yuanjia-campaigns-review.json` |
| 22／BW19 | 正文与验收完成；7段部分承接 | 从礼佛到灭佛：长安寺院里的转折 | 北魏03 P117–P132 | 详见分表与各篇分节正文 | 16段回查：2实质、7校正、7部分；见 `wei-buddhism-review.json` |
| 23／BW20 | 正文与验收完成；1段部分承接 | 国史之狱：刻在石上的危险 | 北魏03 P114–P116、P133–P144 | 详见分表与各篇分节正文 | 15段回查：4实质、10校正、1部分；见 `cui-hao-review.json` |
| 24／BW21 | 正文与验收完成；余项见台账 | 宗爱之乱：一年之内，两次弑君 | 详见北朝分表 | 详见分节正文及独立复核 | 25段：9部分、9校正、7实质；见 `zong-ai-review.json` |
| 25／BW22 | 正文与验收完成；余项见台账 | 冯氏入宫：从罪臣之女到皇后 | 详见北朝分表 | 详见分节正文及独立复核 | 40段：13部分、12校正、12待核、1插话、2实质；见 `feng-enters-palace-review.json` |
| 26／BW23 | 正文与验收完成；余项见台账 | 冯太后第一次临朝：乙浑倒下之后 | 详见北朝分表 | 详见分节正文及独立复核 | 20段：10校正、4部分、2插话、4实质；见 `feng-first-regency-review.json` |
| 27／BW24 | 正文与验收完成；余项见台账 | 献文帝：让出皇位以后 | 详见北朝分表 | 详见分节正文及独立复核 | 24段：10部分、3实质、7校正、3未承接、1插话；见 `xianwen-abdication-review.json` |
| 28／BW25 | 正文与验收完成；余项见台账 | 冯太后掌政：抚育、猜忌与太和改制 | 详见北朝分表 | 详见分节正文及独立复核 | 54段：24校正、21部分、4待核、5实质；见 `feng-regency-review.json` |
| 29／BW26 | 正文与验收完成；余项见台账 | 书声与刑书：太和改革的两道门 | 详见北朝分表 | 详见分节正文及独立复核 | 17段：8部分、7校正、2实质；见 `wei-schools-law-review.json` |
| 30／BW27–30 | 正文与验收完成；余项见台账 | 户籍、田地与官俸：改革怎样落到乡里 | 详见北朝分表 | 详见分节正文及独立复核 | 57段：19部分、21校正、10实质、7未承接；见 `wei-households-review.json` |

| 31／BW31 | 正文与验收完成；余项见台账 | 离开平城：孝文帝的洛阳新局 | 北魏05 P112–P134 | 降爵、五德与正统、南征迁都策略、服饰语言姓氏的执行细节 | 23段回查：11校正、8部分、4实质；见 `xiaowen-luoyang-review.json` |
| 32／BW32 | 正文与验收完成；余项见台账 | 太子想回平城：元恂的废立与死亡 | 北魏05 P135–P143 | 拒绝新服与语言、欲返平城、杀高道悦、废储与被杀 | 9段回查：8校正、1部分；见 `yuan-xun-review.json` |
| 33／BW33 | 正文与验收完成；余项见台账 | 孝文帝南征：没有等到的统一 | 北魏05 P144–P147 | 新野攻守、南齐将领归降、礼不伐丧、病中作战；姓名与年代先核 | 4段回查：2部分、2校正；见 `xiaowen-southern-campaigns-review.json` |
| 34／BW34 | 正文与验收完成；余项见台账 | 北魏改革之后：改变留下了什么 | 北魏05 P148–P156；北魏06 P147–P164 | 制度延续、贵族利益、汉化与衰亡的非单因关系；作为专题结语增补 | 27段回查：6实质、12部分、8校正、1待核；见 `wei-reform-legacy-review.json` |
| 35／BW35 | 正文与验收完成；余项见台账 | 宣武帝以后：胡太后与继承危机 | 北魏06 P003–P022、P030–P043；北魏03 P005 | 宗室经营与贪腐、胡氏掌权、孝明赈恤及母子冲突、短暂立女婴 | 35段回查：6实质、7部分、21校正、1插话；见 `xuanwu-empress-hu-review.json` |
| 36／BW36 | 正文与验收完成；余项见台账 | 六镇：从守边到起兵 | 北魏06 P023–P029；北齐 P003–P006 | 镇民处境、财政与供给、柔然介入、军事集团兴起；增补既有北镇故事 | 11段回查：6校正、2部分、3实质；见 `six-garrisons-review.json` |
| 37／BQ01 | 正文与验收完成；余项见台账 | 高欢与宇文泰：两条起家的路 | 北齐 P007–P018、P079–P081 | 六镇背景、娄昭君与婚姻资源、尔朱集团经历、双方各据一方 | 15段回查：3实质、9校正、2部分、1插话；见 `gao-huan-yuwen-tai-review.json` |
| 38／BQ02 | 正文与验收完成；余项见台账 | 小关之战：为什么先打窦泰 | 北齐 P033–P043 | 东魏三路部署、西魏决策、集中攻击窦泰及战果 | 11段回查：8校正、1实质、2部分；见 `xiaoguan-battle-review.json` |
| 39／BQ03 | 正文与验收完成；余项见台账 | 沙苑之战：芦苇中的鼓声 | 北齐 P044–P057 | 行军、地形、火攻争论、骑兵冲击、李虎杨忠及力量变化 | 14段回查：9校正、3部分、2实质；见 `shayuan-battle-review.json` |
| 40／BQ04 | 正文与验收完成；余项见台账 | 河桥之战：赢了一阵，守不住全局 | 北齐 P058–P075 | 宇文泰脱险、侯景撤军、高敖曹遇害、万俟洛、后续两战概述；纠正高澄等混名 | 18段回查：12校正、5部分、1实质；见 `heqiao-battle-review.json` |
| 41／BQ05 | 正文与验收完成；余项见台账 | 高澄：酒席、地道与厨刀 | 北齐 P082–P101 | 吏治与权力、元善见受辱及密谋、兰京刺杀、高氏继承 | 20段回查：14校正、3部分、3实质；见 `gao-cheng-review.json` |
| 42／BQ06 | 正文与验收完成；余项见台账 | 高洋：建齐之后 | 北齐 P102–P123 | 建齐、早期施政与北征、宫廷暴行、元氏处置；不沿用“遗传精神病”诊断 | 22段回查：13校正、8部分、1实质；见 `gao-yang-review.json` |
| 43／BQ07–08 | 正文与验收完成；余项见台账 | 北齐的两次托孤与一部律 | 北齐 P124–P130 | 托孤、废杀高殷、娄昭君作用、再次托付皇位 | 8段回查：2部分、3实质、3校正；见 `qi-succession-law-review.json` |
| 44／BQ09 | 正文与验收完成；余项见台账 | 高湛：宫廷里的权力与伤害 | 北齐 P132–P144 | 重臣清除、李祖娥遭遇、和士开胡氏、高百年等宗室被杀与退位 | 13段回查：5校正、3实质、5部分；见 `gao-zhan-review.json` |
| 45／BQ10 | 正文与验收完成；余项见台账 | 高纬：身边的人与亡国的诗 | 北齐 P145–P157 | 宠臣、冯小怜、兰陵王、李商隐诗典；人物及诗歌不等于战争因果 | 13段回查：6校正、2实质、3部分、1插话、1待核；见 `gao-wei-poems-review.json` |

进入第06项前，对既有九篇及277段做了复查，修正三处叙事顺序，补核陈和尚碑文与赞语，并将三条没有实质承接的记录降为未承接。详见 [九篇复查记录](recheck-2026-09-30.md)。这些缺口继续留在下方已有故事回补项。

## 后续全量队列

下列四张分表共253个补写／回补工作项，涵盖全部40篇原稿。每项列出故事题、原稿文件、精确P范围、要补的情节与状态。它们不是253篇新文章：跨篇重复将合并，部分内容补入已有故事或专题。范围已定位，史实与引文仍在执行该项时校读；“候选”不等于已确认史实，“回补”也不等于整篇重写。

| 执行顺序 | 分表 | 具体内容示例 |
|---|---|---|
| 1 | [北魏、北齐、北周与隋：87项](queue-north-sui.md) | 沙漠汗之死、代国父子相争、参合陂、崔浩国史之狱、冯太后与献文帝、元恂废储；小关、沙苑、河桥；高澄遇刺、高洋、高湛与李祖娥；杨坚代周、废太子、江都政变；《木兰诗》、佛狸祠、《无向辽东浪死歌》与杨广诗歌 |
| 2 | [南朝与五代十国：60项](queue-south-wudai.md) | 刘裕北伐与入蜀、刘劭弑父、萧子响、侯景与台城、江陵陷落；朱温、李存勖与伶人、庄宗之死、石敬瑭、契丹南下、后周与南唐；诗文和人物评论分别安排 |
| 3 | [辽与西辽：52项](queue-liao.md) | 阿保机与诸弟、断腕与继承、耶律倍诗文、横渡之约、火神淀宫变；高梁河、雍熙北伐与澶渊；重元之乱、萧观音回补、天祚末路、耶律大石西行与卡特万 |
| 4 | [金、西夏、大理：54项](queue-jin-xia-dali.md) | 完颜亮迁都与宫城、李师儿、野狐岭、胡沙虎、三峰山、蔡州；继迁起家、元昊宫廷、野利兄弟、梁太后、五路伐夏与永乐城、任得敬；南诏战争、段思平、杨义贞、高氏与大理末年 |

BW01–37、BQ01–10、BZ01–04、SU01–10和SM01–15、SL01–11的首轮正文、逐段复核及页面验收已完成。南朝S01—S21、辽L01—L05、金J01—J02正文与独立交叉复核已接入，本轮新增和修改页面待合批验收。当前107篇、2512条记录、2499个唯一原段。三个子代理继续全部剩余队列；partial、not-covered、uncertain继续保留，不能因文章存在便视作整段全部使用。

每项依次完成五步：①复读指定原段，列出实质情节；②校读可追溯史料，标明演绎和争议；③补入已有篇或写成新篇并接入口；④逐段回查，记录实质、校正、部分和仍缺；⑤检查页面与链接，更新本表状态。没有写入正文的内容继续留在队列。


### 北周末至开皇续补验收

| 顺序 | 故事 | 状态与范围 | 记录 |
|---|---|---|---|
| 46／BZ01–02 | 平阳前史 | 正文、交叉复核、页面验收完成；11段，具体P范围见分表 | `pingyang-prelude-review.json` |
| 47／BZ03 | 天元皇帝 | 正文、交叉复核、页面验收完成；30段，具体P范围见分表 | `zhou-xuan-emperor-review.json` |
| 48／SU01 | 杨坚家世与仕途 | 正文、交叉复核、页面验收完成；18段，具体P范围见分表 | `yang-jian-origins-review.json` |
| 49／BZ04 | 杨坚代周 | 正文、交叉复核、页面验收完成；40段，具体P范围见分表 | `sui-takes-power-review.json` |
| 50／SU02–05 | 官制、户籍与开皇律 | 正文、交叉复核、页面验收完成；39段，具体P范围见分表 | `sui-offices-law-review.json` |
| 51／SU06 | 大兴城与仓储 | 正文、交叉复核、页面验收完成；10段，具体P范围见分表 | `sui-capital-stores-review.json` |
| 52／SU07 | 灭陈 | 正文、交叉复核、页面验收完成；18段，具体P范围见分表 | `sui-conquers-chen-review.json` |
| 53／SU08 | 江南再起兵 | 正文、交叉复核、页面验收完成；12段，具体P范围见分表 | `jiangnan-rebellion-review.json` |
| 54／SU09 | 长孙晟外交与公主诗 | 正文、交叉复核、页面验收完成；18段，具体P范围见分表 | `sui-turk-diplomacy-review.json` |
| 55／SU10 | 开皇疆域与户口 | 正文、交叉复核、页面验收完成；4段，具体P范围见分表 | `sui-prosperity-ledger-review.json` |

### 隋中续补验收

| 顺序 | 故事文件 | 状态与范围 | 记录 |
|---|---|---|---|
| 56／SM01 | renshou-palace | 正文、交叉复核、页面验收完成；13段，具体P范围见分表 | `renshou-palace-review.json` |
| 57／SM02 | dugu-empress | 正文、交叉复核、页面验收完成；27段，具体P范围见分表 | `dugu-empress-review.json` |
| 58／SM03 | yang-yong-heir | 正文、交叉复核、页面验收完成；31段，具体P范围见分表 | `yang-yong-heir-review.json` |
| 59／SM04 | yang-guang-succession | 正文、交叉复核、页面验收完成；28段，具体P范围见分表 | `yang-guang-succession-review.json` |
| 60／SM05 | renshou-succession | 正文、交叉复核、页面验收完成；14段，具体P范围见分表 | `renshou-succession-review.json` |
| 61／SM06 | yang-brothers | 正文、交叉复核、页面验收完成；18段，具体P范围见分表 | `yang-brothers-review.json` |
| 62／SM07 | shi-wansui | 正文、交叉复核、页面验收完成；7段，具体P范围见分表 | `shi-wansui-review.json` |
| 63／SM08/SM09 | sui-canals-capital | 正文、交叉复核、页面验收完成；32段，具体P范围见分表 | `sui-canals-capital-review.json` |
| 64／SM10 | sui-examinations | 正文、交叉复核、页面验收完成；8段，具体P范围见分表 | `sui-examinations-review.json` |
| 65／SM11 | sui-western-tour | 正文、交叉复核、页面验收完成；12段，具体P范围见分表 | `sui-western-tour-review.json` |
| 66／SM12 | sui-southern-expeditions | 正文、交叉复核、页面验收完成；4段，具体P范围见分表 | `sui-southern-expeditions-review.json` |
| 67／SM13 | sui-khitan-campaign | 正文、交叉复核、页面验收完成；3段，具体P范围见分表 | `sui-khitan-campaign-review.json` |
| 68／SM14 | sui-japanese-envoys | 正文、交叉复核、页面验收完成；4段，具体P范围见分表 | `sui-japanese-envoys-review.json` |
| 69／SM15／SL03–05 | sui-goguryeo | 正文、交叉复核、页面验收完成；86条，具体P范围见分表 | `sui-goguryeo-expansion-review.json` |
| 70／SL01 | sui-imperial-tours | 正文、交叉复核、页面验收完成；6条，具体P范围见分表 | `sui-imperial-tours-review.json` |
| 71／SL02 | wang-bo-song | 正文、交叉复核、页面验收完成；11条，具体P范围见分表 | `wang-bo-song-review.json` |
| 72／SL06 | sui-wagang | 正文、交叉复核、页面验收完成；11条，具体P范围见分表 | `sui-wagang-review.json` |
| 73／SL07 | sui-regional-powers | 正文、交叉复核、页面验收完成；6条，具体P范围见分表 | `sui-regional-powers-review.json` |
| 74／SL08 | sui-jiangdu-coup | 正文、交叉复核、页面验收完成；14条，具体P范围见分表 | `sui-jiangdu-coup-review.json` |
| 75／SL09 | jinyang-uprising | 正文、交叉复核、页面验收完成；6条，具体P范围见分表 | `jinyang-uprising-review.json` |
| 76／SL10 | yang-guang-poems | 正文、交叉复核、页面验收完成；28条，具体P范围见分表 | `yang-guang-poems-review.json` |
| 77／SL11 | yang-guang-tomb | 正文、交叉复核、页面验收完成；6条，具体P范围见分表 | `yang-guang-tomb-review.json` |
| 78／S01 | liu-yu-origins | 正文、交叉复核、页面验收完成；57条，具体P范围见分表 | `liu-yu-origins-review.json` |
| 79／S02 | huan-xuan-fall | 正文、交叉复核、页面验收完成；28条，具体P范围见分表 | `huan-xuan-fall-review.json` |
| 80／S03 | liu-yu-northern-campaigns | 正文、交叉复核、页面验收完成；32条，具体P范围见分表 | `liu-yu-northern-campaigns-review.json` |
| 81／S04 | liu-yu-shu-campaign | 正文、交叉复核、页面验收完成；4条，具体P范围见分表 | `liu-yu-shu-campaign-review.json` |
| 82／S05 | liu-song-founding | 正文、交叉复核、页面验收完成；18条，具体P范围见分表 | `liu-song-founding-review.json` |
| 83／S06 | liu-song-deposition | 正文、独立逐段复核完成；页面验收完成；29条，具体P范围见分表 | `liu-song-deposition-review.json` |
| 84／S07 | liu-yilong-northern-campaigns | 正文、独立逐段复核完成；页面验收完成；20条，具体P范围见分表 | `liu-yilong-northern-campaigns-review.json` |
| 85／S08 | liu-shao-coup | 正文、独立交叉复核完成；既有页面验收完成，本轮修改回归验收完成；20条，具体P范围见分表 | `liu-shao-coup-review.json` |
| 86／S09 | liu-song-palace-violence | 正文、独立逐段复核完成；页面验收完成；37条，具体P范围见分表 | `liu-song-palace-violence-review.json` |
| 87／S10 | liu-song-last-emperors | 正文、独立交叉复核完成；既有页面验收完成，本轮修改回归验收完成；19条，具体P范围见分表 | `liu-song-last-emperors-review.json` |
| 88／S11 | qi-founding-yongming | 正文、独立交叉复核完成；既有页面验收完成，本轮修改回归验收完成；24条 | `qi-founding-yongming-review.json` |
| 89／S12 | qi-household-registers | 正文、独立交叉复核完成；既有页面验收完成，本轮修改回归验收完成；23条 | `qi-household-registers-review.json` |
| 90／S13 | xiao-zixiang | 正文、独立交叉复核完成；既有页面验收完成，本轮修改回归验收完成；36条 | `xiao-zixiang-review.json` |
| 91／S14 | qi-succession-xiao-luan | 正文、独立交叉复核完成；既有页面验收完成，本轮修改回归验收完成；44条 | `qi-succession-xiao-luan-review.json` |
| 92／S15 | donghun-xiao-yan | 正文、独立交叉复核完成；既有页面验收完成，本轮修改回归验收完成；18条 | `donghun-xiao-yan-review.json` |
| 93／S16 | xiao-yan-rise | 正文、独立交叉复核完成；38条；页面合批验收完成 | `xiao-yan-rise-review.json` |
| 94／S17 | liang-family-indulgence | 正文、独立交叉复核完成；20条；页面合批验收完成 | `liang-family-indulgence-review.json` |
| 95／L01 | khitan-origins | 正文、独立交叉复核完成；30条；页面合批验收完成 | `khitan-origins-review.json` |
| 96／L02 | liao-beijing-temples | 正文、独立交叉复核完成；17条；页面合批验收完成 | `liao-beijing-temples-review.json` |
| 97／S18 | liang-government | 正文、独立交叉复核完成；32条；页面合批验收完成 | `liang-government-review.json` |
| 98／S19 | xiao-yan-poetry | 正文、独立交叉复核完成；24条；页面合批验收完成 | `xiao-yan-poetry-review.json` |
| 99／L03 | abaoji-rise | 正文、独立交叉复核完成；35条；页面合批验收完成 | `abaoji-rise-review.json` |
| 100／S20 | liang-emperor-buddhism | 正文、独立交叉复核完成；27条；页面合批验收完成 | `liang-emperor-buddhism-review.json` |
| 101／J01 | jin-beijing-origins | 正文、独立交叉复核完成；40条；页面合批验收完成 | `jin-beijing-origins-review.json` |
| 102／L04 | abaoji-brothers-salt-feast | 正文、独立交叉复核完成；24条；页面合批验收完成 | `abaoji-brothers-salt-feast-review.json` |
| 103／L05 | liao-capital-scripts | 正文、独立交叉复核完成；17条；页面合批验收完成 | `liao-capital-scripts-review.json` |
| 104／S21 | hou-jing-defection | 正文、独立交叉复核完成；40条；页面合批验收完成 | `hou-jing-defection-review.json` |
| 105／J02 | hailing-moves-zhongdu | 正文、独立交叉复核完成；38条；页面合批验收完成 | `hailing-moves-zhongdu-review.json` |
| 106／S22 | jiankang-siege | 正文与逐段复核完成；36条；页面合批验收完成 | `jiankang-siege-review.json` |
| 107／S23 | jiankang-fall | 正文与逐段复核完成；27条；页面合批验收完成 | `jiankang-fall-review.json` |
| 108／S24 | hou-jing-defeat | 正文与逐段复核完成；25条；页面合批验收完成 | `hou-jing-defeat-review.json` |
| 109／S25 | jiangling-fall | 正文与逐段复核完成；12条；页面合批验收完成 | `jiangling-fall-review.json` |
| 110／S26 | chen-baxian-rise | 正文与逐段复核完成；30条；页面合批验收完成 | `chen-baxian-rise-review.json` |
| 111／S27 | chen-succession-crisis | 正文与逐段复核完成；32条；页面合批验收完成 | `chen-succession-crisis-review.json` |
| 112／S28 | wu-mingche-northern-campaign | 正文与逐段复核完成；10条；页面合批验收完成 | `wu-mingche-northern-campaign-review.json` |
| 113／S29 | chen-palace-coup | 正文与逐段复核完成；13条；页面合批验收完成 | `chen-palace-coup-review.json` |
| 114／S30 | chen-falls | 正文与逐段复核完成；52条；页面合批验收完成 | `chen-falls-review.json` |
| 115／L09 | yelu-wuzhi-hengdu | 正文与逐段复核完成；19条；页面合批验收完成 | `yelu-wuzhi-hengdu-review.json` |
| 116／L10 | shizong-huoshendian | 正文与逐段复核完成；46条；页面合批验收完成 | `shizong-huoshendian-review.json` |
| 117／J06 | hailing-shizong-succession | 正文与逐段复核完成；30条；页面合批验收完成 | `hailing-shizong-succession-review.json` |
| 118／J07 | li-shier-zhangzong-court | 正文与逐段复核完成；39条；页面合批验收完成 | `li-shier-zhangzong-court-review.json` |
| 119／J09 | hushahu-court-coup | 正文与逐段复核完成；34条；页面合批验收完成 | `hushahu-court-coup-review.json` |
| 120／L11 | muzong-black-mountain | 正文与逐段复核完成；27条；页面合批验收完成 | `muzong-black-mountain-review.json` |
| 121／L12 | jingzong-frail-court | 正文与逐段复核完成；41条；页面合批验收完成 | `jingzong-frail-court-review.json` |
| 122／L13 | sixteen-prefectures-barrier | 正文与逐段复核完成；15条；页面合批验收完成 | `sixteen-prefectures-barrier-review.json` |
| 123／L15 | gaolianghe-relief | 正文与逐段复核完成；45条；页面合批验收完成 | `gaolianghe-relief-review.json` |
| 124／L16 | waqiao-succession | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `waqiao-succession-review.json` |
| 125／W01 | huangchao-uprising | 正文与逐段复核完成；44条；页面合批验收完成 | `huangchao-uprising-review.json` |
| 126／W02 | huangchao-south-and-return | 正文与逐段复核完成；61条；页面合批验收完成 | `huangchao-south-and-return-review.json` |
| 127／W03 | huangchao-daqi | 正文与逐段复核完成；50条；页面合批验收完成 | `huangchao-daqi-review.json` |
| 128／W04 | shatuo-li-keyong | 正文与逐段复核完成；39条；页面合批验收完成 | `shatuo-li-keyong-review.json` |
| 129／W05 | shangyuan-feud | 正文与逐段复核完成；34条；页面合批验收完成 | `shangyuan-feud-review.json` |
| 130／L14 | northern-han-buffer | 正文与逐段复核完成；51条；页面合批验收完成 | `northern-han-buffer-review.json` |
| 131／L17 | han-derang-power | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `han-derang-power-review.json` |
| 132／L18 | yongxi-eastern-route | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `yongxi-eastern-route-review.json` |
| 133／L19 | chenjiagu | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `chenjiagu-review.json` |
| 134／L20 | xiulunhe-yinjilun | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `xiulunhe-yinjilun-review.json` |
| 135／L21 | wang-jizhong | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `wang-jizhong-review.json` |
| 136／L22 | chanzhou-crisis | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `chanzhou-crisis-review.json` |
| 137／L23 | cao-liyong-treaty | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `cao-liyong-treaty-review.json` |
| 138／L24 | shengzong-chaimu | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `shengzong-chaimu-review.json` |
| 139／L25 | shengzong-seal-poem | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `shengzong-seal-poem-review.json` |
| 140／L26 | xingzong-two-mothers | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `xingzong-two-mothers-review.json` |
| 141／L27 | chongxi-tribute-war | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `chongxi-tribute-war-review.json` |
| 142／L28 | luoyiqing-shuanglu | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `luoyiqing-shuanglu-review.json` |
| 143／L29 | huangtaishu-rebellion | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `huangtaishu-rebellion-review.json` |
| 144／L30 | yeluyixin-power | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `yeluyixin-power-review.json` |
| 145／L31 | xiao-guanyin-supplement | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `xiao-guanyin-supplement-review.json` |
| 146／L32 | taizi-harmed | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `taizi-harmed-review.json` |
| 147／L33 | tianzuo-accession | 正文已注册、二次独立逐段复核完成；本轮页面合批验收完成 | `tianzuo-accession-review.json` |
| 148／L34 | haidongqing-touyu | 正文与逐段复核完成；22条；页面合批验收完成 | `haidongqing-touyu-review.json` |

## 已有故事的回补

- 平阳之战：2026-10-03回查完成：`pingyang` 的12个部分承接项均为审慎分层（心理模拟、未确证兵数与拟对白未采用），无遗漏实质情节；北周P032军力比较维持未承接，待专项核源。
- 隋征高句丽：2026-10-03回查完成：33个部分承接项均为限定性处理（戏拟对白、现场心理、未确证数字未采用），水陆配合与撤退过程已在86条台账内承接；未发现需新写内容。
- 完颜陈和尚：同上，保留人物经历、司法与军纪关系，避免只写殉国结尾。2026-10-03回补完成：金03 P081潼关驰援过程（速不台破小关、与夹谷泽往援、追至谷口、两省辄称大捷）已按《金史》卷112核写，P091马酒及P093碑文赞语已补核。
- 萧观音：2026-10-03回查完成：15个部分承接项为诗文异文与评价的限定处理，维持不变；辽04 P179（存世作品与读者接触）保持未承接，作为传播研究专项另列。
- 元子攸：2026-10-03回查完成：17个部分承接项均为分层限定（拟对白、内心动机、坊间评价未写成事实），维持不变；P094（人格威慑解释）保持未承接，独立故事未写时不升级覆盖等级。

## 收尾条件

每项写完保留正文链接、来源和逐段处理记录；逐项完成不等于该原稿全部覆盖。全部篇目完成故事安排后，对6,926段再做全量回查，合并重复内容，列出仍需回听或暂缓项，再单独处理搜索和问答接入。不自动发布或提交。
