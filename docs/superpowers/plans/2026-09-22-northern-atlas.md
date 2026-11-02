# 北齐·北周 → 隋：图集典型年代地图

**Goal:** 根据用户指定的本地图集，制作546、572、612年可交互地图。
**Architecture:** 保留snapshot年份语义；从配准的共享线网生成GeoJSON，适配现有MapLibreCanvas，复用五代十国底图、范围复位与选择交互。
**Tech Stack:** QGIS现有Python / NumPy / PyProj / Shapely、TypeScript、React、MapLibre、Vitest。

用户已选择以图集原年为主。采用第四册04-21（546）、04-23（572）及第五册05-3（612），04-65齐和04-67周用于局部核对。三张典型地图替换原四张简化图与三个占位；保留时间线范围和默认年份，非快照年明确提示参考年，不逐年插值。重绘主要政权完整主要疆域，外围留白不表示无人统治。扫描图留本机；仓库仅保存来源元数据、控制点与概括矢量。旧Commons采样留档，不作为新图来源或许可。

- [x] 测试先行：典型年份、非快照年提示、城市归属、选择交互。
- [x] 新增GIS共享线网和来源；更新生成脚本，验证配准残差、拓扑、重叠，生成几何。
- [x] 更新快照元数据，新增AtlasDataset适配器与懒加载MapLibre地图。
- [x] 更新来源与重现说明。
- [x] 执行Python几何检查、针对性Vitest、typecheck、lint，浏览器检查三年地图与五代十国回归。

验证：`python-qgis.bat scripts/maps/build-northern-qi-zhou-sui.py`；`npx vitest run tests/series-snapshots.test.tsx tests/atlas-snapshots.test.ts tests/snapshot-atlas.test.ts tests/series-routes.test.tsx tests/atlas-style.test.ts tests/maplibre-canvas.test.tsx tests/continuous-atlas.test.ts --maxWorkers=1`；`npm run typecheck`；`npm run lint`。
