# 原年地图配准与重绘

2026-10-28渐隐修复：背景渐隐改在EPSG:3857显示投影内分为24档，宽度200 km（显示约定，非历史精度）。逆投影后不稳定的细长面使用受约束三角剖分；保存后的每个分片同时验证经纬度和墨卡托几何有效性。显示分片不舍入坐标，防止重引自交。下文旧版1.4°参数已由此替代。`scripts/maps/refresh-jin-atlas-fills.py` 可仅刷新原图集背景分片而不重写政治面；`scripts/maps/test-coverage-projection.py` 验证真实376年案例及全部保存后的分片。

2026-10-28补充：`stage-traces.json` 与 `stage-maps.json` 已扩展为八个关键年，补齐347、376、410、417、431。稳定山川地理线明确复用，各年政治归属分别依据史事修订；不是把异年全图改名。早期 `key-year-cores.json` 保留为研究记录，核心区版本已退出页面注册。最新方法、过渡地区及来源以各scene字段为准。

输入为本地《中国历史地图集》扫描图；仓库只保存概括描线、经纬网控制点和原文件 SHA-256，不分发扫描图。

`atlas-traces.json` 保存六个主图的归一化像素坐标和共享政治线网络。`inset-traces.json` 保存 366、395、409 年左下西域附图的独立经纬网和轮廓，不能按主图坐标投射。各年输入均对应本年图，不把政权不同年份的边界替换后改名。

重建命令（现有 QGIS runtime）：

```powershell
& 'C:/Program Files/QGIS 4.0.2/bin/python-qgis.bat' scripts/maps/build-jin-sixteen-atlas.py
npm run test:run -- tests/jin-sixteen-atlas.test.ts
```

算法：在 Albers 投影中拟合图页经纬网的二次变换；将共享描线多边形化并以原图色区内部采样点选面；独立变换西域附图；以已有 Natural Earth 陆地、天然湖泊作自然地理裁切；保留大陆和海南，防止海上闭合包络误分配菲律宾等岛屿。图框闭合边、附图遮挡边从政治描边中移除。经纬度小数保留六位仅便于文件稳定，不表示这种历史精度。

构建时检查配准最大残差小于 35 km、几何有效、政权面互不重叠、标签在面内、都城落在对应唯一政治面内。`calibration-report.json` 记录实际结果；残差不是历史疆界误差。

用户确认补做完整图后，`completion-traces.json` 独立记录南方、附图缺口和外围补绘坐标及依据。补绘默认只延伸原覆盖之外；409年谯蜀、各年仇池及409年汉中另按史籍校正归属。保留原图描线，新增外缘输出到 `reconstructed-outlines.json`，页面使用另一线型并注明补绘。`fill-bands.json` 现仅用于外围诸部的开放背景；24档、1.4°只是显示约定，不再沿原政治面图框淡化。

281、382底稿为全图；327、366、395、409底稿是北方区域图，现已补成完整格局示意。366、395年北部色区仍合组代／魏及柔然等背景，以 `influence` 和说明区分，不能当成单一政权的直接统治区。主图与附图间连接、外围补绘均非原图可观测边界，不能作为精确疆界引用。

## 关键年份核心区域重建

`key-year-cores.json` 独立记录八个年份的史料、转折后的年末状态与核心区域归属。`cores` 是手工概括的地理区域外包线，不是古籍提供的政治边界坐标；各年仅按可考归属组合，没有沿用原配准图的政治面或作年度疆域插值。展示范围有意留白，不应当作全幅国界。人物/政权存续时间图含兴亡全年，与这里的年末状态分别标明。

运行 `& 'C:/Program Files/QGIS 4.0.2/bin/python-qgis.bat' scripts/maps/build-jin-key-years.py` 生成 `data/maps/jin-sixteen-kingdoms/key-years.json` 与 `key-year-report.json`；复用已有自然陆地、湖泊裁切，断言几何有效、政权面无重叠、标签在面内。配准原图构建脚本与输入不受影响。

## 439、394、304年完整阶段格局重建

`stage-traces.json` 按上述顺序保存独立经纬度描线、共享接界、飞地及争夺区、都城、背景诸部、逐年来源与未定段。三幅都取年末状态，不导入其他年份的政治面；281、395、449年图页只作标明年代的地理参照。304年晋色区表示名义州郡体系，外围诸部合组不表示统一政权。

```powershell
& 'C:/Program Files/QGIS 4.0.2/bin/python-qgis.bat' scripts/maps/build-jin-stage-atlas.py
npm run test:run -- tests/jin-full-stage-atlas.test.ts tests/jin-key-year-maps.test.ts
```

脚本复用自然陆地、湖泊和背景渐隐方法，按共享线闭合政权面，明确扣除飞地及争夺区，输出 `data/maps/jin-sixteen-kingdoms/stage-maps.json` 和 `stage-report.json`。检查共享线连接、输入及最终几何、互不重叠、标签在面内、都城唯一归属；沿海狭小碎片采用不舍入序列化，重新解析最终JSON，逐个验证政权面及渐隐分片，避免坐标舍入造成自交。背景开放外缘不描成政治界线。

页面以同ID覆盖三个核心区版本，保留旧链接与其余快照。这里的“完整”指阶段覆盖范围，所有接界仍为推定；不能作为精确的本年疆界引用。详见 `docs/research/2026-10-26-jin-full-stage-atlases.md`。
