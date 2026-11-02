# 十六国关键年地图、同期对照、档案与并立总览

## 实现内容

- 首页增加“并立时间图 / 政权档案 / 地图与同期对照”直达入口，543211六组顺序不变。
- 总览以301—439年为横轴，按543211排列16个政权，选择关键年份可对照六组存续。前凉301年起算与专题304年主线分别说明。西秦分成385—400、409—431两条色带；建国和终结年纳入色带，不表示全年并立。
- 手机时间图局部横向滚动，页面整体不因图而溢出；固定左侧国名，选择年份自动定位。点击国名展开档案并将键盘焦点移到档案标题。
- 16份档案统一展示存续、都城和统治中心、关键人物、兴亡事件、地图入口与史料。已有的人物档案可点击，没有独立人物实体的姓名保留为文字。保留复国等所有founding事件，不因首尾筛选丢失409年西秦复国节点。
- 地图推演增加随当前步骤年份更新的同期对照，显示其余五组在本年存续的政权、此前/同年/后续节点及具体年份，可跳转并刷新恢复。西晋/东晋/刘宋与北魏列作背景，不计入16国。

## 八幅关键年地图

304、347、376、394、410、417、431、439年增加独立的核心区域态势重建图，分别表现初起、成汉终结、前秦兼并、前秦西燕退场、南燕终结、后秦终结、秦夏终结、姑臧降魏。原281、327、366、382、395、409年配准图及449年尾声保留，共15幅资料。

新图采用所选转折完成后的年末状态，与存续图“含兴亡全年”口径不同，两处分别说明。仅同年有新图的步骤改用；旧步骤ID、叙事ID、事件返回链接和两晋专题映射保持兼容，描述中的旧背景年份说明同步调整。

**这些新图是有范围限制的核心区域示意，不是完整年度疆界复原。** 每年的政权归属依据史事，区域外缘按地理范围手工概括。没有从原图政治面插值，也没有将449年疆界倒推到439年。空白包括未考定接界、其他控制区与外围，不能解释为无人居住或无政权；全部外缘用重建疏点线，地图常驻说明“核心区域”。

引用包括[《晋书》刘渊载记](https://zh.wikisource.org/wiki/晉書/卷101)、[《晋书》桓温传](https://zh.wikisource.org/wiki/晉書/卷098)、[《晋书》苻坚载记](https://zh.wikisource.org/wiki/晉書/卷113)、[《魏书》世祖纪](https://zh.wikisource.org/wiki/魏書/卷4上)及《宋书》《资治通鉴》相关年条。每幅图另列来源与本年史事定位；史料证明据点与归属，不证明手绘外缘坐标。

## 文件

- 数据：`data/series/jin-sixteen-kingdoms/polity-profiles.ts`、`key-year-snapshots.ts`、`map-snapshots.ts`、`narratives.ts`。
- 页面：`features/series/jin-sixteen-overview.tsx`、`jin-sixteen-home.tsx`；`features/history-map/jin-contemporaries.tsx`、`map-narrative-explorer.tsx`。
- GIS：`gis/jin-sixteen-kingdoms/key-year-cores.json`、`key-year-report.json`、`scripts/maps/build-jin-key-years.py`、`data/maps/jin-sixteen-kingdoms/key-years.json`及两处README。
- 新测试：`tests/jin-sixteen-overview.test.tsx`、`jin-key-year-maps.test.ts`、`jin-contemporaries.test.tsx`。更新原有atlas/content/integration断言及E2E的304年背景。
- 计划：`docs/superpowers/plans/2026-10-24-sixteen-kingdoms-atlas-overview.md`。

## 验证记录

- QGIS runtime重建成功：8图几何有效、政权面无重叠、标签位于面内；裁切复用已有陆地与湖泊。
- 11个专题相关文件42项Vitest通过，另7个共享地图/状态/播放文件47项通过，共18文件89项。
- `npm run typecheck`、修改TS/TSX文件ESLint通过；最终生产构建通过，生成323个静态页面。
- 独立只读审查未发现重要问题，另运行3文件5项测试通过。之后补的手机定位及复国事件筛选经针对性测试和浏览器复核。
- 最终生产模式E2E：桌面/手机共14项通过，覆盖304年入口、原图切换、六组推演、事件往返、旧URL、键盘与自动播放、地图失败时阅读。
- Playwright CLI实际检查：桌面八个新增年份全部渲染，手机抽查304/417/439；两种宽度均验证16行总览、西秦两段色条、档案展开与出处、同期节点跳转和刷新。手机切换409年后时间图自动横向定位，页面整体无横向溢出。
- 桌面/手机总览、档案、304/439年地图和同期对照截图保存在 `output/playwright/sixteen-*.png`；可复跑脚本为 `output/playwright/verify-sixteen-overview.js`（本地忽略产物）。已目视核对版式。浏览器仅见既有favicon.ico缺失404，未作为本轮功能问题处理。

未新增依赖、网站外部请求、事件或人物实体；未提交、部署或发布。其他工作区改动保留。
