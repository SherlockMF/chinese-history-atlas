# 西晋、东晋与五胡十六国专题拆分

## 交付范围

- `/series/jin-sixteen-kingdoms` 保持原路径，显示名称改为“五胡十六国”，主线304—439年。
- `/series/western-jin`：265—316年，承接建晋、灭吴、八王之乱与西晋崩解；新增265年建晋事件，依据既有《晋书·武帝纪》来源。
- `/series/eastern-jin`：317—420年，江左建政、门阀政治、北府军与北伐。
- 十六国首页与首条导读、首组地图推演从刘渊和李雄304年建政展开。西晋完整前因另设入口，并明确八王之乱始于291年。
- 保留跨政权战争和南北互动；事件、人物、关系、地点只入库一次，其他专题通过 shared 引用。
- 默认事件归属按轻量所有权索引选择，显式 series 参数保留调用专题。事件页可返回各自的推演；URL同步支持三个专题的 sequence/step 参数。

## 修改文件

内容与注册：

- `data/series/jin-sixteen-kingdoms/config.ts`
- `data/series/jin-sixteen-kingdoms/content.ts`
- `data/series/jin-sixteen-kingdoms/narratives.ts`
- `data/series/expansion/configs.ts`
- `data/series/expansion/event-ids.ts`
- `data/series/expansion/index.ts`
- `data/series/index.ts`
- `lib/repositories/series-repository.ts`

页面与状态：

- `features/series/jin-sixteen-home.tsx`
- `features/series/series-page.tsx`
- `features/history-map/map-narrative-explorer.tsx`
- `features/history-state/history-provider.tsx`
- `app/explore/[id]/page.tsx`
- `app/series/[seriesSlug]/sources/page.tsx`

验证：

- 新增 `tests/jin-period-separation.test.ts`、`tests/jin-sixteen-home.test.tsx`
- 更新 `tests/jin-sixteen-content.test.ts`、`tests/jin-sixteen-integration.test.ts`、`tests/history-expansion.test.ts`、`tests/history-provider.test.tsx`、`tests/e2e/jin-sixteen.spec.ts`
- 实施计划：`docs/superpowers/plans/2026-10-23-sixteen-kingdoms-independence.md`

## 验证记录

- 新增拆分集成测试先运行：8项按预期失败，实施后通过。
- URL同步新增回归先运行：东晋事件页和地图页两项按预期失败，修复后16项提供器测试通过。
- 相关12个测试文件、74项测试通过。最终使用 `--maxWorkers=2`，避免并行浏览器和大地图导入争用资源导致5秒导入超时。
- `npm run typecheck` 通过。
- 本次修改文件 ESLint 通过。
- `npm run build` 通过，生成323个静态页面，包含三个专题的首页、地图、人物、时间轴和来源入口。
- 独立只读审查完成，无遗留重要发现。
- 生产模式 Playwright 整组12项通过（桌面6项、手机6项），覆盖三个专题入口、304开篇、地图阶段切换、推演播放、共享事件返回、跨专题切换、减少动态效果与WebGL不可用时的阅读降级；桌面与手机首页截图已检查。
- 开发模式首轮两项长流程达到30秒时限；提高长流程上限后，开发编译与构建并行时另有导航等待失败。最终使用已完成的生产构建独立运行整组，通过12项，不将中间失败计为通过。

## 地图与内容边界

- 未新增或推算304、316、317、420、439年的疆界。西晋复用281年快照；东晋复用327、366、382、395、409年快照；十六国保留281年前因图及449年尾声图，异年背景明确提示。
- 311—318年南迁事件横跨西晋与东晋分界，保留真实观察区间；西晋时间轴只展示至316年的相交部分。
- 西晋、东晋专题复用现有已整理内容，并不表示已全面补齐两朝通史。
- 开发模式中复用的 SnapshotHeroMap 出现过 SVG 浮点坐标约1e-13差异引起的 hydration 属性警告；不在本次拆分范围内修改通用绘图组件。
- 不涉及部署、发布、提交或新增依赖；保留工作区原有未提交内容。
