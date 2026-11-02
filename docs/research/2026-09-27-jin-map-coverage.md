# 两晋十六国局部图的图幅切口

> 此文记录最初的局部图渐隐方案。用户随后要求补做完整地图，现已由 [完整地图与史事复核](2026-09-27-jin-completion-audit.md) 中的补绘方案替代；下文保留为问题与修复过程记录。

## 根因

327、366、395、409 年来自《中国历史地图集》第四册的北方区域图，366、395、409 年另含独立配准的西域附图。多边形化必须借图框闭合色区；原实现仅从描边中剔除图框，填色仍沿图框硬截断。因此在开放的地形底图上出现矩形、斜边和主图/附图间的裂口，容易被读成疆域尽头。

已目视核对本地 `04-7后赵.jpg`、`04-9前燕.jpg`、`04-5东晋.jpg`。东晋分图不是这四个年份各自的完整同年图，不能直接拿其中疆域补成四张年度全图。对照检索的 [327 年二次重绘来源说明](https://commons.wikimedia.org/wiki/File:Seize_Royaumes_327.svg)、[409 年二次重绘来源说明](https://commons.wikimedia.org/wiki/File:Seize_Royaumes_409.svg) 也没有用来替换原图或补绘：没有完成其全幅几何及不同口径的核对。

## 修改

- 原政治面、同年出处、图内分界和都城保持不变。
- 生成独立显示分片，只对与已记录图框相接的开放边渐隐。历史分界继续独立绘制。
- 图上常驻“北方局部图”，解释渐隐处是图幅尽头、东晋南部未收录。该提示不藏在资料折叠项中。
- MapLibre 可选使用显示分片；标签、选中轮廓、镜头仍使用原数据。推演淡化与覆盖渐隐相乘，避免播放时重现切口。切换全图或其他专题恢复原显示。

这次修正消除的是误导性的硬切表达，**没有补齐这四年的完整疆域**。主图/附图缺测缝隙继续保持未知，不把它解释为领土中断，也不借其他年份填补。

## 几何验证

构建脚本断言显示分片有效、互不重叠、合并后的范围与原政治面相等；既不向外补领土，也不挖掉已知范围。原配准、都城归属、政治面重叠检查继续运行。完整图 281、382 年不生成分片，449 年保持共享快照。

## 验收结果

- QGIS 重建通过；显示分片约 1.28 MB。MapLibre 的政治面源关闭独立路径简化，避免相邻渐隐分片之间产生细小白缝。
- 7 个相关 Vitest 文件、37 项测试通过，包含分片归属、标签去重、政权点击、切换后的数据恢复。
- 新专题桌面/手机完整流程共 10 项通过；最后调整手机说明位置和切片精度后，另复跑覆盖范围与自动推演的 4 项，全部通过。
- `npm run typecheck`、修改文件 ESLint、`npm run build` 通过。最后构建生成 58 个静态页面。
- 实际检查 327、366、395、409 年桌面/手机截图：矩形填色硬边改为开放渐隐，说明在手机上方可见。281、382、449 年切换时不残留局部图说明。

## 涉及文件

`scripts/maps/build-jin-sixteen-atlas.py`、`gis/jin-sixteen-kingdoms/calibration-report.json`、`data/maps/jin-sixteen-kingdoms/fill-bands.json`、两处 GIS/数据 README；`types/series.ts`、`data/series/jin-sixteen-kingdoms/map-snapshots.ts`；`features/history-map/atlas/{atlas-types,atlas-style,snapshot-atlas,maplibre-canvas}`、`features/history-map/narrative-atlas.tsx`；相应地图数据、样式、画布单元测试和 `tests/e2e/jin-sixteen.spec.ts`。
