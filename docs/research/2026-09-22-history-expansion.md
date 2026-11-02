# 历史专题 Web 扩展交付记录

首轮在现有五代十国、北齐北周隋结构上，搭建了北魏、辽与西辽、金与金中都、西夏、南诏与大理、南朝宋齐梁陈六个专题。首轮交付缺少新增人物画像与疆域图，不能视作完整完成；以下保留当时的内容与验证记录。补全进度及最终验收另见 `2026-09-22-portraits-atlases-completion.md`。总首页按本次优先顺序排列，原五代专题保留。

## 查看入口

启动 `npm run dev` 后打开总首页，从专题卡片进入。交付时另有生产预览运行于 `http://127.0.0.1:3100`；进程关闭后可用 `npm run start -- --hostname 127.0.0.1 --port 3100` 重启，需先完成构建。

| 专题路径 | 年份范围 | 事件 | 人物 | 地点 | 导读 |
| --- | --- | ---: | ---: | ---: | ---: |
| `/series/northern-wei` | 386—534 | 13 | 10 | 8 | 3 |
| `/series/liao` | 907—1218 | 14 | 13 | 9 | 3 |
| `/series/jin` | 1114—1234 | 13 | 9 | 11 | 3 |
| `/series/western-xia` | 982—1227 | 15 | 10 | 4 | 3 |
| `/series/dali` | 738—1253 | 10 | 10 | 5 | 3 |
| `/series/southern-dynasties` | 420—589 | 14 | 14 | 3 | 3 |

各专题均有首页、`/timeline`、`/map`、`/people`、`/sources`；事件详情沿用 `/explore/:id`。表内包含共享实体，不能直接相加作为全站唯一数量。本次新增 73 条独立事件、54 位人物、18 条导读。

## 内容与来源

叙事依据为 `D:\OPC\小宇宙待开发\_source-materials\transcripts\cleaned\dynasty` 中的北魏、辽、西辽、金、西夏、大理和南朝清洗稿。遵循知识库自身的 CLEANED NOT VERIFIED 说明：只组织事实摘要，不复制全文，不把清洗稿视作史实已核验。

每条新增内容保存 `sourceEpisodes`（专题、集数、段落或叙述定位）和 `sourceRefs`。事件页可查看依据，专题资料页提供按事件展开的来源及异说。主要校读材料为《魏书》《宋书》《南齐书》《梁书》《陈书》《北齐书》《周书》《隋书》《辽史》《金史》《宋史》《新唐书》《元史》和《云南志略》；在线古籍为维基文库转录本，仍有校勘限制。

本次纠正或区分的重点：

- 北魏均田、三长分别采用485、486年，使用《魏书》卷7上、下对应的纪年；493年迁都决策与494年迁入洛阳分开。
- 澶渊之盟采用换算公历1005年，同时提示传统纪年与常见1004年口径；辽朝1125年结束与西辽1218年终局分开。
- 屈出律夺权采用1211年；其败亡事实补《元史》卷120曷思麦里传，避免只引用止于西辽耶律氏的叙述。
- 天祚被俘由辽、金共享一条记录；北魏分裂、辽早期建国、隋灭陈同样复用既有实体，带 `series` 参数保持阅读上下文。
- 张浩不填未经支持的生年；三峰山之战补《金史》卷17，避免只引卷18的蔡州终局。
- 大理建国采用云南省民族宗教事务委员会《段思平》所列937年，注明《云南志略》“天福三年”的差异。1253年蒙古攻取大理与其后的归附、云南行省设置分开。
- 《梁书》与《元史》的在线卷号分别补齐两位、三位，避免生成失效资料链接。

## 地图和人物边界

首轮新专题仅使用本地 PMTiles 自然地理底图与历史地点，未完成疆域图。原五代年度疆域、北齐北周隋已有546/572/612年图集地图继续使用。本轮补全后以原年图集疆域快照替代六专题的地点图。

首轮54位新人物只有姓名卡片并标注“画像未收录”，这是交付缺项。本轮逐人制作画像，并恢复全站所有人物的独立画像覆盖检查。画像为艺术创作，不宣称历史真容。人物关系页展示全生平关系；未标定起止年的非亲属关系有说明。

## 墓葬预留

`data/sites/index.ts` 登记四个 `planned` 现场：`xu-xianxiu`、`sima-jinlong`、`yelu-yuzhi`、`fangshan-jinling`。已有稳定 ID、未来档案 slug 和相关实体；`getArchiveHref` 对 planned 返回 null，页面仅展示筹备中。未创建新墓葬游戏、空档案或失效链接，李静训现有代码保留。

## 主要代码位置

- `data/series/expansion/`：六专题内容、配置和轻量事件路由归属。
- `data/seed/`、`data/series/index.ts`、`lib/repositories/series-repository.ts`：实体注册、专题隔离和共享事件解析。
- `features/history-map/locations-map.tsx`、`locations-canvas.tsx`：地点地图、年份与筛选。
- `app/series/[seriesSlug]/sources/page.tsx`、`components/history/source-reference.tsx`：来源页和书目链接。
- `features/home/`、`features/series/`、`features/events/`、`features/people/`、`features/timeline/`、`features/history-state/history-provider.tsx`：专题文案、导航和阅读上下文。
- `data/sites/index.ts`、`types/site.ts`、`features/sites/related-sites.tsx`：墓葬预留。
- `tests/history-expansion.test.ts`、`tests/expansion-navigation.test.tsx`、`tests/locations-map.test.tsx`、`tests/e2e/expansion.spec.ts`：新增回归覆盖。

## 验证记录

- `npm run test:run`：87个测试文件，772项通过。
- `npm run lint`、`npm run typecheck`、`npm run build`：通过。八专题五类页面完成静态构建，未知专题返回404。
- Web专项回归 `npx playwright test --grep-invert 'Mock Field|real Unity|production keeps' --workers=4`：80项通过、6项按设备跳过，0失败；排除了另行配置的墓场景与模型生产策略测试。
- 新增六专题桌面/手机完整流程、共享事件、地图清除筛选、未知专题：16项通过。
- Tabbit 实机检查桌面首页、手机资料页与地点图；无横向溢出，本地底图与worker请求成功。
- `git diff --check`：通过，只有仓库既有的LF/CRLF提示。
- 全量 Playwright 首轮：80通过、10按环境/设备跳过，2项旧 Mock Field 测试失败。原因是当前李静训现场显示“现场版本准备中”，测试要求 Mock 模式的“进入现场”按钮；不是新专题故障。本任务按要求不更改墓葬模式或配置，真实Unity流程也未纳入本次验收。

本次没有部署、提交或推送，也没有覆盖任务开始前地图、画像、Unity相关的未提交工作。
