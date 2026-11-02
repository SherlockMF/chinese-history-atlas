# 朝代篇故事补全执行计划

<!-- latest-state-2026-10-11:start -->
## 2026-10-11 最新状态

当前实际注册244篇；本轮从156篇增加的88篇正文、逐P台账与独立交叉复核全部完成，共2624条新增审查记录。记录数不是去重原段数，也不表示所有口述命题进入正文。

既有南朝S01—S30、五代W01—W05、金J03—J07/J09与陈和尚回补的独立核查已登记；[S29补充复核](../../research/dynasty-narratives/cross-review-s29.md)13条记录已冻结。旧辽L06—L33全部28篇、775条完成二次独立核查，L34的22条亦完成，见[旧辽复核](../../research/dynasty-narratives/cross-review-old-liao.md)及[L21—L33复核](../../research/dynasty-narratives/cross-review-old-liao-l21-l33.md)。

仅沿旧基线的88段partial/not-covered已补核并独审关闭：其他38段见[复核报告](../../research/dynasty-narratives/baseline-remainder-other-review.md)，金/西夏50段见[独立复核](../../research/dynasty-narratives/baseline-remainder-jin-xia-independent.md)。最后57个review-not-covered原段也已逐段研究处理、补入有据内容并完成独审：北朝15段为3 corrected、2 partial、10未采用，见[北组独审](../../research/dynasty-narratives/final-unadopted-north-independent.md)；南朝/隋/大理/金28段为1 covered、3 corrected、4 partial、20未采用，见[南组独审](../../research/dynasty-narratives/final-unadopted-south-other-independent.md)；辽五代14段完成实际补充，并处理辽03 P006的竞争记录及3个旧空锚，见[辽五代独审](../../research/dynasty-narratives/final-unadopted-liao-wudai-independent.md)。30条最终not-covered全有research-closed理由，保留不采用判定，不靠更换assessment清零。review及manifest递归检查显式independentReview:pending为0；部分旧台账没有该字段，其独审依据保留在method与独立报告，不能把字段缺省当作新完成证明。

[全量覆盖登记审计](../../research/dynasty-narratives/coverage-reconciliation-2026-10-11.md)按冻结数据重跑final、expected-stories 244，退出0。40稿、6926段原始sha/verdict保持不变；246个审查文件含多故事pilot与补充台账，6704条全部历史/当前记录、6672条最新记录、6618个唯一原段。合并结果：covered 1835、corrected 1824、partial 2432、not-needed 331、uncertain 151、not-covered 30、mixed 15；baseline-only 308（covered 38、corrected 6、not-needed 264），无仅沿基线的partial/not-covered。追加实质或部分采用6106段；完整/校正且无竞争未解记录3659段。仍含uncertain的152段、36条空正文锚候选warning如实保留；文件及逐段hash差异0、登记errors 0。脚本的unresolved表示采用边界，并不把已有research-closed的未采用内容再算作未执行写作任务。

只有正文范围引用而没有任何review的3段、未获对应section审查的790个引用对均不自动算采用；52条未注册旧别名草稿审查排除。baseline-only的38个covered没有伪称为本轮新增覆盖；多个partial不升级。本次是登记审计，没有重新语义复读全部6926段，也未回听音频。无证心理、医学化评价、拟对白、未明数字与转写候选按实际证据处理；事实类苑卷77旧链接本轮403的限度见辽五代独审报告，不称已重新亲读该失效链接。

最新全部代码（含SSR深章节修复、刘裕363—421纪年和AI来源点击关闭抽屉）已通过生产build、tsc与定向ESLint，均退出0；全量Vitest 112文件/1174项通过。244个故事HTTP 200、实际初始h1与section检查错误0；检索244篇/1442节/1686 context checks通过，8个不安全链接被拒绝。46项E2E在SSR修复后全部通过，运行早于最后纪年及AI来源关闭修改；最后两项随后通过完整1174测试、20项定向检查和新生产浏览器实查，没有把46项测试说成覆盖这两项最后改动。额外CLI曾发现的初始深章节URL问题已修复，原46项测试没有因此失败。新release-review会话首次打开#six-rulers，hash正确、top 112.375；问史答案来源点击后抽屉消失、hash保留、top 112.375且无横向溢出，393×851直接打开同样正确定位。最终验收全部收口，证据见[最终验证报告](../../research/dynasty-narratives/final-verification-2026-10-11.md)。跨系列故事问史及真实章节来源链已接入，旧五代纯事件问答年份边界保留，见[检索独审](../../research/dynasty-narratives/cross-review-retrieval.md)。

未注册旧草稿shulu-regency、yelu-bei-sea、yelu-deguang-kaifeng保留文件及旧manifest，不重复计数。后文旧日期、批次数和当时状态保留为历史记录，最新进度以上述状态及当前逐P台账为准。
<!-- latest-state-2026-10-11:end -->

### 本轮收尾检查

- [x] 完成并注册本轮88篇；新增独立逐段复核全部冻结。
- [x] 同步已完成的旧稿复核、故事检索和来源边界。
- [x] 保存可重跑的全量登记审计，保留原基线、当前记录与合并规则。
- [x] 旧辽L16—L33二次独立逐段复核冻结。
- [x] 当前244篇生产构建、全量测试、类型与定向ESLint检查。
- [x] 最后57段研究处理及独审metadata关闭，重跑final覆盖登记。
- [x] SSR深章节修复后新production 3100桌面/手机定位及46项E2E通过。
- [x] 问史来源点击新session复核、刘裕时期校正后的最终重建和相关复验。
- [x] 旧辽同步后重跑final覆盖报告，不将待核数清零。


> 执行方式：使用 executing-plans 按任务逐步落实；先完成第一批可阅读样章，再按台账推进各朝代。用户已于 2026-09-29 授权计划与执行，无需重复确认。

**Goal:** 将战役过程、宫廷冲突、人物评价与诗文补入朝代篇，保留原稿吸引力，并能逐段追溯实际承接情况。

**Architecture:** 保留事件与人物数据作为历史主线，新增独立故事阅读页。长文由 Server Component 渲染；客户端只使用轻量目录。逐段审计基线与新内容承接状态分开，引用范围不等于全部覆盖。

**Tech Stack:** 已安装的 Next.js 16、React 19、TypeScript、Tailwind、Vitest、Playwright；不新增依赖。

**逐项执行清单（2026-09-30起）:** `docs/research/dynasty-narratives/item-plan.md`。后续按清单中的故事逐项补写，并同步逐段回查；本文件保留总体批次与技术验收要求。

## 全局约束

- 以 2026-09-27 全量审计的 40 篇、6,926 段为基线，原审计文件只读。
- 当前 `feat/multi-series` 有大量已存在的未提交工作，新增文件优先；只局部接入入口，不改写其他内容，不自动提交或发布。
- 逐字稿提供叙事线索；史料记载、节目观点、编辑解读与文学传说分别标明。
- 不虚构人物内心或对白；原稿误写的人名、年代不进入事实正文。
- 诗文提供版本与归属说明；《焚椒录》研究目前仅查阅摘要，不声称已通读论文或解决真伪争议。
- 每个故事小节记录精确原稿范围和来源；未逐段复核的覆盖状态保持待复核。
- 不以自动关键词分类或整段范围引用冒充语义核验；不公开原稿全文。
- 旧五代人物问答边界保留；跨朝代故事章节证据现已接入站内问史AI。检索独立复核和定向检查已登记，最终页面回归仍单独验收。

## 第一批：台账与四组样章

### Task 1：保存基线与补写台账

**Files:**
- Create: `docs/research/dynasty-narratives/baseline.json`
- Create: `docs/research/dynasty-narratives/README.md`
- Create: `docs/research/dynasty-narratives/pilot-review.json`

- [x] 从外部审计读取文件名、文件/段落散列、段落编号和原判定；不复制逐字稿全文。
- [x] 核对 40 篇、6,926 个唯一段落，记录各篇 covered/partial/corrected/not-covered/not-needed/uncertain 数量。
- [x] 给全部篇目安排批次；样章先处理北周、隋下、金03、辽04，其余保留在全量队列。
- [x] 保存样章每段的承接小节、处理理由和剩余问题；partial 与待核验段不升级成完整覆盖。

### Task 2：故事数据与来源边界

**Files:**
- Create: `types/narrative.ts`
- Create: `data/narratives/catalog.ts`
- Create: `data/narratives/index.ts`
- Create: `data/narratives/pingyang.ts`
- Create: `data/narratives/sui-goguryeo.ts`
- Create: `data/narratives/chen-heshang.ts`
- Create: `data/narratives/xiao-guanyin.ts`
- Test: `tests/narratives.test.ts`

**Interfaces:** 目录项包含 slug、seriesId、title、summary、period、eventIds、personIds；正文包含 lead、sections、sources。section 包含 id、title、paragraphs、sourceIds、transcripts，可选 poem 和 interpretation。`getNarrative(seriesId, slug)` 必须同时匹配朝代和文章。

- [x] 先测试错朝代不可取文、目录与正文一致、来源及段落定位可解析，观察缺少模块导致的失败。
- [x] 阅读四组原稿完整候选范围，并比对公开史籍；核定每个小节的素材范围。
- [x] 编写平阳之战、隋征高句丽、完颜陈和尚、萧观音四篇；使用编辑解读承载评价，用文学流传说明承载有争议的诗文。
- [x] 运行 `npx vitest run tests/narratives.test.ts`，要求全部通过。

### Task 3：可连续阅读的页面与入口

**Files:**
- Create: `app/series/[seriesSlug]/stories/page.tsx`
- Create: `app/series/[seriesSlug]/stories/[storySlug]/page.tsx`
- Create: `features/stories/story-reader.tsx`
- Create: `features/stories/story-links.tsx`
- Modify: `features/series/series-page.tsx`
- Modify: `features/events/event-detail.tsx`
- Modify: `features/people/person-explorer.tsx`
- Test: `tests/story-reader.test.tsx`
- Test: `tests/story-routes.test.tsx`
- Test: `tests/e2e/narrative-stories.spec.ts`

- [x] 先写阅读行为测试：章节锚点、诗文及归属说明、来源链接、同朝代前后篇、错朝代 404。
- [x] 实现 Server Component 长文、目录和生成静态参数；不把长文导入客户端组件。
- [x] 在朝代首页、相关事件和相关人物处显示轻量入口；地图已有事件链接继续通向事件，再进入故事。
- [x] 运行对应单测，检查新入口与现有事件、人物页回归。
- [x] 使用桌面与移动浏览器检查目录跳转、来源展开、长文换行和前后篇导航。

### Task 4：第一批验收与覆盖回查

- [x] 对样章候选范围逐段比较正文，记录“完整承接 / 部分承接 / 校正承接 / 不纳入 / 待核”及小节编号；不改动原审计结论。
- [x] 运行 `npm run typecheck` 与涉及文件的 ESLint；再运行 `npm run build` 检查静态路由。
- [x] 运行 `npx playwright test tests/e2e/narrative-stories.spec.ts`，验证桌面和移动阅读路径。
- [x] 在 `docs/research/dynasty-narratives/README.md` 记录已完成范围、命令结果与未解决项。

## 后续批次（第一批完成不等于全量完成）

| 批次 | 原稿范围 | 编辑主线 | 完成标准 |
|---|---|---|---|
| 二 | 北魏01—06、北齐、北周、隋上中下 | 部落与皇权、宫廷政变、战役转折、统一及崩溃 | 每篇实质缺口有明确故事去向或暂缓理由，逐段复核 |
| 三 | 南朝01—06、五代十国01—06 | 人物命运、家族与政权、诗文及城市生活 | 同上，保留节目观点的依据和归属 |
| 四 | 辽01—05、西辽、金01—03 | 宫廷、边疆、外交与末世战役 | 同上，分清不同史料层次 |
| 五 | 西夏01—06、大理上下 | 君臣与家族、宋夏战事、洱海与南诏大理 | 同上，文学形象与历史人物分开 |
| 六 | 全部40篇 | 合并重复、贯通阅读顺序、更新搜索与问答依据 | 再跑6,926段覆盖审计；按完成/部分/待核如实统计 |

每批沿用第一批的数据、小节来源与验收方式。故事数量取决于实际叙事边界，不预设一段一卡或每篇固定篇数。14段转写不确定项保留待回听状态，不能用史书补写冒充原音确认。

## 第二批当前进度（2026-09-29）

- [x] 新增《元子攸：刀出鞘之后》八节正文，接入北魏首页、河阴事件与尔朱荣人物入口。
- [x] 对北魏06 P077–P133逐段回查57条，独立复核史料次序及台账；19实质承接、15校正、18部分、3未承接、2插话。
- [x] 校正李苗焚桥方式、浅水渡河次序、洛阳囚禁与晋阳遇害地点；原稿转写不清处不冒充回听确认。
- [x] 继续北魏06 P044–P076河阴之变前史、P134–P145的高欢与东西分裂：新增两篇，45条回查与页面验收完成；10条仍为部分承接。
- [x] 整理第二批11篇的具体故事队列，见 `docs/research/dynasty-narratives/queue-north-sui.md`（87项，包含待补、回补和部分完成项）。
- [x] 核读元昭业与九锡原典，回补P083—P084、P090；保留眼神示意等无据演绎的边界。
- [x] BW01鲜卑族源、BW02木兰与魏碑各新增六节，45段独立复核与页面验收完成，保留10段部分承接；当前共九篇，累计277段回查。
- [x] 复查既有九篇277段，修正时序、引用与三条过满判定；继续完成BW03拓跋力微六节28段，当前共十篇、305个唯一原段。
- [x] 完成BW04沙漠汗六节与27段独立回查，5实质、16校正、6部分；通过19项单测、构建与16项页面检查，当前十一篇332个唯一原段。
- [x] BW05–20新增十六篇，逐段及交叉回查320条新增记录；当前27篇、652条记录、650个唯一原段，通过94页构建和20项桌面/手机E2E。
- [x] BW21–37首轮正文与逐段交叉复核完成，BQ01–05同期完成；45篇生产构建112页及26项桌面/手机E2E通过。
- [x] BQ06–10四篇及56条记录写成并交叉复核，接入后共49篇、1146条记录、1138个唯一原段；2文件54项结构与路由检查通过。
- [x] BQ06–10、BZ01–04、SU01–10统一验收完成：58篇，1346条记录、1338个唯一原段；107项相关单测、类型检查、ESLint、125页构建、30项桌面/手机E2E经过必要修正后通过，详情见研究README。
- [x] SM01–14十三篇完成逐条与交叉复核、页面验收；71篇、1547条记录、1539个唯一原段，验证明细见研究README。
- [x] SM15、SL01–11扩展一篇并新增八篇，完成交叉复核；79篇、1721条记录、1711个唯一原段，89项组件/数据检查、146页构建和34项生产E2E通过。
- [x] 南朝S01–S05五篇完成139条逐段与独立交叉复核，累计84篇、1860条记录、1850个唯一原段；94项检查、151页构建、36项生产E2E通过。
- [x] S06–S10五篇正文接入，125条逐段记录累计至1985条、1974个唯一原段；S06、S07、S09独立逐段复核完成。
- [x] S08、S10独立交叉复核已完成；原先并行额度中断为历史阻碍，不再列为未办。
- [x] S11–S15五篇正文与145条逐段自审记录接入：当前94篇、2130条记录、2118个唯一原段。
- [x] S11–S15桌面与手机页面验收；119项相关检查及161页构建通过。完整E2E首跑39/40，既有人物切换超时定向复跑2/2；保留间歇问题记录。
- [x] S11–S15及S08、S10独立交叉复核已完成，记录见研究复核报告。
- [x] 南朝S16—S30正文与独立复核已完成；partial/uncertain/not-covered继续保留。本轮最终页面验收另列，详见逐项计划。

## 2026-10-02 全量并行续办

用户授权将全部剩余补写与独立交叉复核交给子代理连续执行，不以单篇为停点。当前剩余队列151项：南朝S16–S30与五代W01–W30共45项，辽与西辽52项，金/西夏/大理54项（含既有篇回补）。这些是队列项，不等于151篇新文章。

- cross_review_pending：独立复核S08、S10–S15的7篇及逐P台账，修正文与判定；完成后接金/西夏/大理。
- south_remaining：负责S16–S30、W01–W30，首批S16–S20；逐篇交付，继续后续。
- liao_remaining：负责辽与西辽，首批L01–L05；逐篇交付，继续后续。
- 主代理：统一登记目录、引用与测试，复核非本人起草的原段和正文，验收页面，维护缺口和总进度。

每项写成、自审、独立复核、页面验收分别记账；不把派出或收到文件算完成。原始baseline保持不变，所有未核、未承接和需原音的内容保留。
