# 碎块地图修复与存续对照

## 原因与范围

上批只把304、394、439升级为连续阶段图，347、376、410、417、431仍从核心区草图加载，因此切换年份会再次出现孤立色块。本批补齐后五年，并移除页面的核心草图回退入口。旧研究输入保留，地图ID和叙事链接继续使用原值。

各年史事及来源记入 `gis/jin-sixteen-kingdoms/stage-traces.json`，生成输出为 `data/maps/jin-sixteen-kingdoms/stage-maps.json`。稳定地理线可复用；政治归属依本年史事修订。完整覆盖仍是宏观重建，推定接界、影响区域和争夺地分别说明，不表示逐县或逐日实控。

417年关中、河东新取区域属晋，夏进安定单列；410年谯蜀与姑臧争夺独立列示、汉中仍属仇池；431年夏与西秦灭亡后，陇右过渡地区单列。347年蜀地归晋，376年已归前秦而襄阳仍晋，不能提前画入379年变化。独立复核另发现410、417、431及旧439北魏轮廓误跨渤海包入辽东，已收回并加入大连、盖州不属魏的断言。

主要核对《资治通鉴》[卷97](https://zh.wikisource.org/wiki/資治通鑑/卷097)、[卷104](https://zh.wikisource.org/wiki/資治通鑑/卷104)、[卷114](https://zh.wikisource.org/wiki/資治通鑑/卷114)、[卷115](https://zh.wikisource.org/wiki/資治通鑑/卷115)、[卷116](https://zh.wikisource.org/wiki/資治通鑑/卷116)、[卷118](https://zh.wikisource.org/wiki/資治通鑑/卷118)、[卷122](https://zh.wikisource.org/wiki/資治通鑑/卷122)。逐条定位和适用范围保存在输入数据sources字段。

## 重叠专题的资源共享

`lib/repositories/series-repository.ts` 按专题时段引用同一快照的regions、sources、outlines、capitals等对象，只改变专题路由ID。西晋新增304；东晋共享其时段各图；北魏新增394—439可用阶段；南朝新增431、439。已有449/497宋魏、546/572南北朝、1111/1142/1208辽宋夏金等图由 `withFullAtlas` 读取共用同年几何。

共享以实际地图年份及地理内容为准，不能把事件年份相同误当成存在一幅同年原图，也不把449图替代439图。五代十国仍采用既有年度地图数据。新增共享重建图在普通专题页明确显示“史料重建地图”，默认选择本专题政权，周边地区仍可查看。

## 存续对照

共享 `PolityPeriodBar` 支持悬停、键盘聚焦、点击显示国名与起止年。提示用portal避开横向滚动裁切，Escape、外部点击和滚动可关闭。十六国按既有543211排列，西秦385—400、409—431两段分别显示。

五代十国首页新增 `FiveDynastiesOverview`，复用配置中五代/十国15国及实体起讫年，时间轴902—979，含兴亡年。同年并存不表示全年同时存在；902年从杨行密受封吴王起算，早于907年的选择不会伪造地图。鼠标、键盘和手机点击使用同一交互。

## 验证记录

- 八幅共100个区域：304/347/376/394/410/417/431/439分别为10/12/8/15/18/14/12/11区。最终JSON几何与渐隐分片有效、标签在面内、都城唯一归属、无实质交叠。
- 两个地图归属测试文件19项通过；10个UI、共享与专题回归文件38项通过，共57项。整页测试受本机负载影响，早先5秒及15秒阈值曾超时；最终串行测试命令使用 `--maxWorkers=1 --testTimeout=30000`，所有断言通过，未删减断言或修改项目默认阈值。
- 生产构建成功（323页），含TypeScript检查；修改的TS/TSX文件ESLint检查通过。
- Playwright CLI验证两套对照表在1440与390像素下的悬停/点击、键盘focus和Escape，共4组通过。生产构建验证五幅新增地图×两个视口共10组，并验证北魏417共享图的来源标签与默认选中政权。
- 已检查417、410、431、347、376桌面截图及417手机截图。开发环境最初捕获到加载中的空白底图，生产环境等待完整绘制后重新截图；不以仅出现年份标签作为视觉验收。

浏览器截图和脚本保存于忽略的本地 `output/playwright` 目录。`remaining-417-1440.png` 为本次用户所指年份的修复后截图。未提交或发布。

主要实现文件：`features/series/polity-period-bar.tsx`、`five-dynasties-overview.tsx`、`jin-sixteen-overview.tsx`、`jin-sixteen-home.tsx`、`features/home/home-page-content.tsx`、`features/history-map/snapshot-map.tsx`、`lib/repositories/series-repository.ts`，以及上述地图输入/输出、`scripts/maps/build-jin-stage-atlas.py`、`data/series/jin-sixteen-kingdoms/key-year-snapshots.ts`、`narratives.ts`。新增测试为 `jin-remaining-stages`、`shared-dated-maps`、`polity-period-bar`、`five-dynasties-overview`，并更新原有对照表、关键年和快照测试。
