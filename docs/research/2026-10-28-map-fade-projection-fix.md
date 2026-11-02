# 背景渐隐尖角修复

用户截图376年的紫灰色长三角来自背景渐隐分片。旧算法在经纬度平面生成细长差集，几何在那里有效，但转为Web Mercator后部分环自交，渲染三角化出现长尖角。上轮检查只覆盖地理坐标有效性，视觉复核也漏掉了这些异常。

实际376年北方背景回归先复现失败：旧分片投影后约20.8平方公里重叠、73.1平方公里越出投影目标，部分原始投影环无效。修复在EPSG:3857构造渐隐，采用200 km显示宽度与24档透明度；对逆投影后不稳定的Polygon使用受约束三角剖分，避免修补逆投影几何改变分区。每个输出面在WGS84和实际显示投影下均须有效，投影覆盖及重叠误差限制在目标面积的1e-7内。显示分片使用无舍入JSON保存。

修改 `scripts/maps/build-jin-sixteen-atlas.py` 的共享渐隐算法；重新生成 `data/maps/jin-sixteen-kingdoms/stage-maps.json`。新增 `scripts/maps/refresh-jin-atlas-fills.py`，仅刷新 `data/maps/jin-sixteen-kingdoms/fill-bands.json`。旧政治面曾以六位小数保存，其拓扑问题只在临时裁切mask中修复，原政治geometry文件未重写。八幅关键年与四幅已有补绘图的渐隐均更新，其他专题通过原有同源引用同步生效。

新增回归 `scripts/maps/test-coverage-projection.py`：真实376案例先失败后通过；最终JSON重新解析后64组背景的全部分片在两个坐标系中直接有效，检查前不先make_valid掩盖问题。34项相关Vitest、TypeScript检查通过。独立只读复核未发现重要剩余问题。

浏览器检查376、417、327、409年的桌面和手机显示，并对376放大检查。修复后截图在 `output/playwright/fade-fixed-376-1440.png`；原圈出的东西两处长三角已消失。渐隐是视觉样式，不改变历史疆域归属；未部署。
