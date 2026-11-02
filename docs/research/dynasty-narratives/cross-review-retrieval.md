# 检索与AI集成独立复核

日期：2026-10-11。范围：`lib/rag/narrative-retriever.ts`、`local-history-retriever.ts`、`lib/ai/person-history-answer.ts`、`mock-provider.ts`、`validate-answer.ts`、`types/ai.ts`、`app/api/ai/route.ts`、`features/ai/ai-message.tsx`及相关测试。为验证旧人物路由边界，亦完整阅读`app/api/person-chat/route.ts`、`person-chat-scope.ts`与`features/ai/ai-drawer.tsx`。已阅读本机Next 16.3.3文档`node_modules/next/dist/docs/01-app/01-getting-started/15-route-handlers.md`；POST使用Web Request/Response与NextResponse，无缓存API变更。

## 复现及修复

| 问题 | 修复前实际行为 | 修复 |
| --- | --- | --- |
| 短姓名自然问法漏检 | `高欢是谁`、`请介绍高欢`均未检得标题含高欢的故事 | 清理是谁、介绍等常见问句词；保留短姓名只匹配标题、不扫正文的限制 |
| 全篇标题压过具体节 | `胡沙虎军队回到宫门前 五千武卫军`首先返回西京败退，而非含五千武卫军的掌兵政变节 | 同一标题层级加上正文命中的长度得分，具体节实际内容参与排序 |
| 命中后段但证据截错 | `减省营造`已检得陈宫三阁节，matchedEvidence和prompt却只截正文开头，缺少检索命中的文字 | 按正文段、解释、诗文选择命中字段；返回实际命中段，长段以命中位置附近有界节录输出，并保留相应字段标签 |
| 旧人物模型路由跨专题 | 本地人物答复禁用narrative，但已配置模型的person-chat路由仍把`玉树后庭花`南朝故事及陈书送入石敬瑭的五代prompt | 旧路由同样使用`includeNarratives:false`；站内问史AI路由继续检索全部系列 |
| 可省略证据年份显示undefined | 一个无year的普通事件证据会输出`未标年代事件（undefined）` | 只在year存在时渲染括号年代，relatedYears继续为空，不擅自补年代 |

前四类问题先新增回归测试，见5个用例明确失败；修复后对应两组46个测试通过。年份缺省先新增用例，确认真实输出包含undefined，再修复。

改动文件仅：`lib/rag/narrative-retriever.ts`、`lib/ai/mock-provider.ts`、`app/api/person-chat/route.ts`，以及`tests/narrative-retrieval.test.ts`、`tests/ai-provider.test.ts`、`tests/person-chat-route.test.ts`和本报告。保留其他代理已经完成的API/types/展示/正文修改。

## 核查结论

- 具体故事节具有稳定`narrative:series:slug:section`来源ID和站内section锚点；命中节的正文、解释或诗文真实进入有界证据和prompt。显式锚点的指代问题优先命中该节。客户端抽屉目前用pathname提供整篇路径，未提供hash时按整篇检索，此行为没有声称能识别用户当前屏幕所在节。
- 短姓名通过标题检索，泛化为正文任意两字会制造误命中，因此未放宽这条限制。四字以上的正文匹配仍为确定性词段检索，并非向量或全面语义问答。
- 旧事件retriever仍使用fiveDynastiesSeedData；人物本地与已配置模型的检索都保持五代事件语料，不把新故事扩展带进旧人物渠道。现有角色对话的介绍、关系、年份、追问测试仍通过。
- `/api/ai`只使用服务端检索结构，客户端伪造excerpts/evidence未成为回答依据；provider回答再经schema验证。href仅允许`/series/<slug>/stories/<slug>#<section>`，拒绝javascript、外站、协议相对地址、路径遍历、转义斜杠和附加跳转参数。抽屉也在渲染前safeParse，AiMessage用Link显示来源，没有执行sourceRefs里的URL或HTML。
- 故事没有机器可判定年份时保留period文本，evidence.year缺省、relatedYears为空，不以时间线currentYear代替故事年代。通用证据year也允许缺省且不显示undefined。**客户端context.currentYear仍是旧API必填字段，范围875—979；省略字段实际返回400，不是自动补936。** 新系列纯年份检索尚未扩展时间线事件契约，本次没有更改年份范围或暗称已支持。
- 无结果、超时、取消、provider故障、无效响应与证据输出边界均由现有相关测试覆盖；本次没有新增外部调用或依赖。

## 最终验证证据

1. 初始7组测试：151项通过。
2. 新增问题复现：5项明确失败；年份缺省1项明确失败，修复后通过。
3. `npx vitest run tests/narrative-retrieval.test.ts tests/local-history-retriever.test.ts tests/ai-route.test.ts tests/ai-provider.test.ts tests/ai-year-range.test.ts tests/person-history-answer.test.ts tests/person-chat-route.test.ts tests/ai-drawer.test.tsx`：8组、199项全部通过。
4. 对9个相关生产文件和3个变更测试文件运行eslint：退出0，无诊断。
5. `npx tsc --noEmit --incremental false`：退出0。

未执行浏览器端到端测试或全库Vitest；本报告不据单元测试声称页面视觉、窗口hash联动或网络模型质量已经验证。未改共享故事注册、coverage总表或队列；不继续其他内容。

## 全站注册后的只读检查（2026-10-11 12:10）

当时实际注册230篇、1375节。只读脚本 `output/check-narrative-final.cjs`（不写正文、注册或台账、不联网）以每个真实故事节的`为什么`为查询，检查首位锚点、来源ID、该节sourceIds、生成回答href及无机器年份时的缺省值；再以每篇`这件事有什么影响`检查代词作用域，共1605次上下文检查。8类危险href拒绝，失败0。该验证检查现有Mock链路；schema本身只约束href语法，并不证明任意模型输出的站内href一定存在。错误series的代词上下文返回空。显式跨系列查询与旧人物边界另由199项测试覆盖。

再次运行8组AI/检索测试，199项通过。同期类型检查发现两处其他代理正在修改的正文source.kind非法值：`northern-han-buffer.ts:63`、`sixteen-prefectures-barrier.ts:112`为`interpretation`，允许值是`history | literary-tradition`；已交整合代理处理，本检查没有越界改正文。不得以较早的类型通过结果代替这次失败记录。

### 面向读者的文字扫描建议（只读，交作者/整合代理执行）

扫描范围为已注册正文lead、summary与每节interpretation。自动得到32处工作痕迹候选、49处史源限度候选；人工辨析后，两条瓦桥篇介绍也是稿件处理痕迹，合为34处待清理、47处可保留史源限度。`yuanjia-campaigns`的“逆转写”属于正则误命中，应保留。下表保留未核、传说、转引与未回听的实际限制，不要求把它们改成确定事实。辽旧篇正在由另一代理修订，下表仅供其协调，不由检索代理修改。

| 文件（data/narratives/）与字段 | 可直接替代建议 |
| --- | --- |
| jin-zhongdu-palaces.ts / fish-pond interpretation | 民国水位、后续开发与开放状态缺少连续可复核资料；历史见闻不能作为今日现况。 |
| jin-zhongdu-last-defenders.ts / summary | 从1214年议和与南迁争论，到1215年乣军倒戈、运粮失败与中都失守；承晖绝笔和尽忠出逃，留下两种结局。 |
| jin-southern-court.ts / summary | 南迁朝廷在防御与攻宋之间争论，泄密与重臣被诛不断改动权力格局，最终走向宣宗最后一夜的皇位交接。 |
| jin-tolui-succession.ts / hearth-and-throne interpretation | 幼子守灶不能等同全部军队和财产归属；监国按1227—1229及宿卫交付记载分清。郭靖为小说人物。 |
| 同上 / kneeling-order interpretation | 跪拜行动见传文；私人心理与现场口音不能由此确证。 |
| 同上 / water-two-accounts interpretation | 撤兵占卜与烧纸符细节未获上述记载确认。《秘史》年次有错置，不能以兔儿年定1232；死期按《太宗纪》九月，不合成为饮水数日后即死。 |
| 同上 / family-after-death interpretation | 毒杀说未查明；以死保家属于推演，不能作为既定动机。 |
| chenqiao-and-song-power.ts / legacy-and-cost interpretation | 制度评价与《论语》典故为编辑解读；跨朝概括、具体阵图及诗句须区别于可核史实。 |
| wei-bo-and-liang-conquest.ts / north-front interpretation | 《新五代史》卷48明载存矩索卢女；922年新城所俘辽主之子按《通鉴》不具名，亚里果与李胡的亲属关系未核定。 |
| 同上 / huliu interpretation | 长期南迁可作背景；拟定逃亡路线及客家、广州人口概括缺少人口史证据，不作既定事实。 |
| later-tang-shu-and-mutiny.ts / money-and-performers interpretation | 《新五代史》卷37所载“李天下”为优名；“龙虎大将军”未获所列史源支持。财富与行为的关系按具体账目讨论，心理归因仍有限度。 |
| last-tang-army-reward-debt.ts / five-months interpretation | 史源记预借五月租值、逼征及死亡；“十个月租金”与具体贪污比例属于讽刺演绎，不能当作史实。 |
| shi-jingtang-khitan-bargain.ts / sang-evaluation interpretation | 对桑维翰的评价为编辑解读；想象的临终对白与微笑没有史源支持。 |
| sixteen-prefectures-strategic-cost.ts / resources-and-dependence interpretation | 自由贸易免关税、南京固定十万兵及各州行业分工尚未核定；此处以州县、城镇及岁帛条款讨论资源。 |
| shatuo-li-keyong.ts / shisan-taibao interpretation | 唱词据节目转写，未回听音频，未冒称核定京剧底本。 |
| shangyuan-feud.ts / shangyuan-night interpretation | 身份认同的心理解释为编辑解读；“朱三，我与你不共戴天”未见《通鉴》卷255—256和《旧五代史》卷25所叙该夜文字，不能作核定直接引语。 |
| 同上 / monk-tradition interpretation | 自刎说与遁僧说分别辨析；所列宋代笔记为转引材料，未亲见陶谷、王仁裕原本，不能视为同代原记录。 |
| yelu-deguang-bianjing.ts / north-and-three-losses interpretation | “不遽遣诸节度还镇”指原有节帅遣返，非辽朝官制未铺设；蒙古比较和地名起源传说缺少所列史源支持。 |
| jingzong-frail-court.ts / rice-and-zhen interpretation（另一代理所有） | 仅把“本次不复原具体案发讯问”替为“具体案发讯问无法据此复原”；保留其余两书差异与校勘说明。 |
| northern-han-buffer.ts / south-first interpretation（另一代理所有） | 删除P编号与本轮说明，保留宋先立国、再攻北汉及相关史源限度。 |
| 同上 / envoy-and-buffer interpretation（另一代理所有） | 删除P编号与本轮说明，保留辽景宗杀使完整对白尚未核定的限度。 |
| xiao-guanyin-supplement.ts / lead（旧辽独立复核时执行） | 身世梦兆、伏虎林应制诗与怀古诗，留下不同传本中的萧观音；诗文归属与宫廷故事，需要分别辨明材料层级。 |
| pusuwan-zhilugu-crisis.ts / capital-turns-against-army interpretation | 都城冲突解释1211年夺权的条件；兵数为史书估数，有夸张疑点，不作人口精确统计。 |
| emil-first-western-campaign.ts / eastern-pressure interpretation | 余睹围攻、宗翰兵数与可敦弃城的单一路线未核定；1134年东征另有明确列传记载。 |
| xia-tangut-migration.ts / mountain-life interpretation | 语系名称未专核，不以外貌类比或马超小说形象推定党项；转写候选未回听。 |
| 同上 / sui-to-tang interpretation | 拓跋宁丛据《隋书》；姓名音频候选未回听，各州以崌、奉、巖、遠等原文为准。 |
| xia-tongwan-city.ts / two-tests interpretation | 史籍分别记锥验墙、箭验甲，不能混作刀刺墙；记数不是现代工程实测。 |
| xia-dingnan-succession.ts / summary | 思恭勤王、思忠战死，定难军又经历拒绝换防和宋初册赐；982年继捧入朝与994年毁城分处两段历史。 |
| xia-jiqian-return.ts / mourning-cart interpretation | 画像见清代辑史及所注异文；地斤泽今址未专核，借故出逃不增拟请假对白。 |
| 同上 / grain-and-five-roads interpretation | 994年灵州行动、996年粮运、997年授职分别叙述；咸平初与即位初不合成同月。 |
| xia-deming-hexi.ts / summary | 德明承位后以誓表与贸易经营宋辽关系，推进河西、营建兴州，元昊逐渐走到太子的位置。 |
| 同上 / oath-and-trade interpretation | 誓表与宋辽关系据史籍；有疑义的转写尚未回听，不以候选词判断外交动作。 |
| waqiao-succession.ts / lead（另一代理所有） | 辽景宗在瓦桥关争战后，皇位传给十二岁的孩子；受托顾命者与镇守南边者各有职责，皇后的摄政由此开始。 |
| 同上 / summary（另一代理所有） | 乾亨二年景宗围瓦桥关，休哥三捷拜于越；两年后景宗崩于焦山，斜轸与韩德让受顾命，休哥镇守南边。原摘要“四年后”还需更正980→982的两年间隔。 |

最终244篇注册后将再次实测；此处230篇证据不冒称为244篇结果。未运行全量构建，也未改变构建配置。

## 244 篇最终冻结验证（2026-10-11 12:31）

最终实际注册 244 篇、1438 个正文节。`node output/check-narrative-final.cjs` 对每个节的锚点代词问句、每个故事保留旧事件选择的代词问句、跨系列路径、真实来源 id/href 和缺省年份执行 1682 个上下文检查，`unsafeRejected: 8`、`failures: []`。这份证据取代上文 230 篇时的全站规模，不抹去其历史记录。

`npx tsc --noEmit` 最新实际 exit 0。此前两个叙事 sourceKind 类型错误已由相应所有者修正；本代理没有修改构建配置。

八组测试在 12:30 首跑为 203 通过、1 失败。根因是 `tests/narrative-retrieval.test.ts` 的 API 样例在南朝故事路由传 `currentYear: 936`；它此前用于满足旧五代范围，现不满足南朝 420—589 范围。将该测试的请求年份改为 587，先单组验证 20/20，再实际重跑：

```text
npx vitest run tests/narrative-retrieval.test.ts tests/local-history-retriever.test.ts tests/ai-route.test.ts tests/ai-provider.test.ts tests/ai-year-range.test.ts tests/person-history-answer.test.ts tests/person-chat-route.test.ts tests/ai-drawer.test.tsx
Test Files 8 passed (8)
Tests 204 passed (204)
```

实际检查 API 新增范围校验：只有能在 catalog 匹配同系列和 slug 的 `/series/<series>/stories/<slug>`（可带合法节 hash）采用该系列 timeline 范围。缺失故事、跨系列故事、非故事路由仍走 875—979，纯年份检索未扩展。currentYear 仍必填；故事证据自身缺省 year 保持 undefined，回答不会借这个请求值虚造 relatedYears。

实际只读审查 `SiteHeader`、`AiDrawer`、`AiEmpty` 的入口和文字修改：其他系列仅在故事页显示问史，故事抽屉使用“当前故事”而非把默认时间线年份标成正文年代。根代理另行提供的 UI/API 16 项独立测试由第三复核者运行，通过证据归其报告；不是本代理执行结果。

本代理重新亲读本地 Next Route Handlers/usePathname 指南。API 校验和客户端路径判断未引入外部网络调用。纯年份产品范围、浏览器 usePathname 不含 hash 所导致当前节感知限度仍保留；直接向 API 提交合法 hash 可优先定位具体节。没有为这些边界扩大产品范围。

最终补改文件仅此报告与 `tests/narrative-retrieval.test.ts` 单个 fixture 年份。上文工作痕迹替代清单交根代理统一清理，旧辽 13 篇已在独立复核中清理对应摘要。未运行全量构建，未作提交或发布。
