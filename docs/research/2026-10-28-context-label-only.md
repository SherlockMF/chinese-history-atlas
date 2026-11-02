# 晋与十六国外围背景显示调整

按用户确认的取舍，281—439 年十四幅地图的外围背景仅显示名称，不再绘制填色、渐隐面、闭合轮廓或悬停轮廓。主线政权、争夺地区及主线一侧的已有接界继续保留。原始疆域几何与史料未重写，留白不表示无人统治。

不能直接删除所有 influence：366 年代国、395 年北魏，以及青州争夺区、张掖反抗势力都属于主线。使用明确的外围 ID 清单，独立于边界可信度设置 displayMode。共享相同年份资料的西晋、东晋、北魏、南朝专题继承相同显示规则；449 年以后其他图集未在本次重新分类。

修改文件：

- types/series.ts：可选的 label-only 显示标记。
- data/series/jin-sixteen-kingdoms/context-display.ts、map-snapshots.ts、stage-map-snapshots.ts：外围清单、两套图集标记和范围说明。
- features/history-map/atlas/snapshot-atlas.ts：背景转为名称点，排除背景填色、边界及悬停轮廓；主线几何保持引用。
- features/home/snapshot-hero-map.tsx：首页预览遵循同一规则。
- features/history-map/map-narrative-explorer.tsx、snapshot-map.tsx：外围说明入口保留，去掉对应色点并更新说明。
- tests/jin-context-display.test.ts、snapshot-hero-map.test.tsx、jin-sixteen-atlas.test.ts：新行为回归。

验证：新增测试先复现十四幅地图仍有外围填色，再通过。两组相关 Vitest 共 72 项通过；TypeScript 与修改文件的 ESLint 通过。浏览器检查 281、376、417 年及东晋专题 376 年，各有桌面与手机截图，并检查 376 年放大显示。控制台仅见既有 favicon.ico 404。

截图：output/playwright/context-labels-jin-sixteen-kingdoms-376-1440.png。未运行生产构建，未部署。
