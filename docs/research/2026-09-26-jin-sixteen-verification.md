# 两晋与十六国专题验收

入口：`/series/jin-sixteen-kingdoms`。默认382年全景，六组推演共29步，五幕主线280—439年，449年单列尾声。

## 交付内容

- 53个独有事件和4个共享事件；16位新增人物及独立艺术想象画像，另共享3位人物。
- 21个新增政权（两晋、传统十六国、3个相关政权），共享北魏与刘宋；27个新地点，12条人物关系，3条导读。
- 281、327、366、382、395、409年六幅重绘快照，449年复用既有宋魏图。
- 首页与地图页共用全景/推演组件，支持主动播放、暂停、步骤切换、路线节点和政权点选。
- URL保存年份、政权、推演和稳定步骤ID。事件页核验步骤与事件的关联后提供返回原推演链接。切换专题清除原推演状态。
- 镜头退出恢复全景；地图鼠标、滚轮、键盘操作暂停播放；减少动态效果时镜头直接切换。邻近地点标签避让并保留位置引线。
- 移动端地图在上、说明在下。WebGL不可用时仍可完整阅读29步和来源。

## 主要文件

| 范围 | 文件 |
| --- | --- |
| 专题内容与推演 | `data/series/jin-sixteen-kingdoms/config.ts`、`content.ts`、`narratives.ts`、`map-snapshots.ts`、`portraits.ts`；`types/map-narrative.ts` |
| 地图数据与生成 | `data/maps/jin-sixteen-kingdoms/`、`gis/jin-sixteen-kingdoms/`、`scripts/maps/build-jin-sixteen-atlas.py` |
| 推演界面 | `features/history-map/map-narrative-explorer.tsx`、`narrative-atlas.tsx`、`narrative-detail.tsx`、`narrative-state.ts`；`features/series/jin-sixteen-home.tsx` |
| 既有地图与页面接入 | `features/history-map/atlas/maplibre-canvas.tsx`、`features/series/series-page.tsx`、`features/events/event-detail.tsx`、`features/history-state/history-provider.tsx`、`app/explore/[id]/page.tsx`、`app/series/[seriesSlug]/sources/page.tsx` |
| 数据与画像注册 | `data/series/expansion/{configs,index,event-ids}.ts`、`data/series/index.ts`、`data/seed/index.ts`、`data/portraits.ts`、`lib/repositories/series-repository.ts`；`public/portraits/jin-sixteen-kingdoms/` |
| 测试 | 新增 `tests/jin-sixteen-{content,atlas,integration}.test.ts`、`tests/map-narrative-state.test.ts`、`tests/map-narrative-explorer.test.tsx`、`tests/e2e/jin-sixteen.spec.ts`；扩展地图、URL提供器、事件详情、画像和专题注册测试 |

## 实际验证

- `npm run test:run`：104个文件、864项测试通过。之后新增政权URL恢复测试，最终相关7文件45项通过。
- `npm run typecheck`、`npm run lint`、`npm run build`：通过；最后改动文件的ESLint另行复核通过。
- 新专题生产构建端到端测试：桌面、Pixel 7共6项通过，涵盖57个事件中的代表性阅读链路、六幅主图及449尾声、全部六组29步、刷新/返回/政权恢复、键盘、邻近标签、滚轮暂停、跨专题切换、减少动态效果和WebGL失败降级。
- 既有专题关键回归：北魏、南朝、五代以及辽、金、西夏、南诏大理的首页、时间轴、人物、地图、来源和共享事件流程通过；生产本地史料查询限制检查通过。
- 第一轮36项浏览器用例有32项通过、2项生产专用跳过、2项全阶段地图长流程超时。长流程以60秒上限、2个worker单独复核，两端分别22.0与23.8秒通过；生产专用2项随后通过。新增键盘测试最初在手机端遇到桌面/手机导航同名定位歧义，限定banner后通过。合计38项不同浏览器用例均已通过。
- Tabbit实际桌面浏览与Playwright桌面/手机截图目视检查；近邻寿阳、淝水按钮重叠在验收中修正，并增加互不重叠及分别点选断言。
- 相关已跟踪文件的`git diff --check`通过，仅有Windows行尾转换提示。

## 资料与限制

详见 `2026-09-26-jin-sixteen-content.md`、`2026-09-26-jin-sixteen-maps.md` 和 `portraits/jin-sixteen-kingdoms/README.md`。

地图为近似重绘。区域图未覆盖的南部不以其他年份补齐，主图与附图缺乏依据的间隙留白。事件年和背景图年分别标示，异年背景淡化，不作年度疆域插值。迁徙方向、军事节点连线与古代实际道路有明确区别；参合陂、淝水等争议位置保持区域示意。计划引用的故宫年代页本轮访问失败，内容核对采用研究记录中的古籍原文与其他依据。

本轮沿用工作区已有多专题架构及未提交内容；不涉及城市复原、墓葬游戏或外部部署。

## 2026-09-27：播放反馈修正

用户反馈“播放没反应”。在当前预览复现后确认自动切换实际有效，但每步等待7秒，原有路线从开始就已完整显示，缺少即时动态和等待提示。

修改 `features/history-map/map-narrative-explorer.tsx`、`features/history-map/narrative-atlas.tsx`、`app/globals.css` 及对应组件/浏览器测试：按钮显示“自动推演”；点击立即显示运行状态、进度条、倒计时和下一步标题；军事/迁徙连线逐步显现，单点/政治节点用光圈反馈；最后一步可从头重播。暂停停止计时，再次播放重新开始当前步骤，界面明确提示。减少动态效果时保留文字倒计时，关闭路线和光圈动画。疆域不参与播放动画。

验证：相关单元测试2文件10项通过；新专题桌面和手机8项端到端用例通过，直接验证线路绘制进度随时间变化、同为280年的步骤自动推进、暂停和重播；typecheck、相关文件ESLint、生产build通过。当前内置浏览器刷新后也已目视确认运行状态和倒计时。
