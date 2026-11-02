# 北部轮廓来源与重描记录

> 后续修订：本文“填色仍截止于资料图幅”的处理已被[地图边缘完整性修复](2026-09-23-map-edge-completion.md)替代。572、612年图幅以西现在另据通期资料作明确标注的概略复原；原图内北缘采线继续沿用本文结果。

## 核查结论

用户指出的是449年宋魏全图上“柔然及北方诸部”和东北诸部的北部外缘。原始 `04-17宋、魏时期全图.jpg` 在这一区域绘有连续紫色“政权部族界”界带，没有在此被图框截断。其走势本来就是大尺度平滑概括；旧网站采点较疏，又把局部缓弯压成较长直线。

北部色区包含柔然、契骨、高车等名称，不能把整个色区直接称作柔然实控版图。东北也没有依据将失韦、勿吉等全部画成某一个政权。重描提高的是对原图的忠实度，不能提高古代边界本身的史料精度。

## 外部资料核对

- Nikolay N. Kradin, *From Tribal Confederation to Empire: The Evolution of the Rouran Society*, **Acta Orientalia Academiae Scientiarum Hungaricae 58(2), 149–169 (2005)**。作者机构为俄罗斯科学院远东分院历史、考古与民族学研究所；[机构文库全文](https://real.mtak.hu/45766/1/aorient.58.2005.2.3.pdf)。刊页154（PDF第6页）概述柔然北向贝加尔湖及黑龙江上游的地域，刊页150讨论游牧与材料限制。它可核对地域和统属表达，但不提供449、497、546年的逐年实测边界，不能用来臆造更曲折的北界。
- 检索到 [Wikimedia的柔然地图](https://commons.wikimedia.org/wiki/File:Map_of_the_Rouran_Khaganate.png)，页面引用 *Philip’s Atlas of World History*。该图是二次重绘，缺少449年逐年精确对应关系，因此未拿它覆盖本项目同年图集。

## 实际修改

逐年读取本地1872×1312整页扫描坐标，复核原图及SHA-256，提取紫色历史界带的中心走势。只重描北部及西北外围，共边端点固定，同一段正反向复用，保留1像素简化以避免追随印刷噪点；没有使用现代国界、随机抖动或均匀插值伪装细节。

| 图集年份 | 重新核对取线段数 | 单段最大离开旧引导线的距离 |
| --- | ---: | ---: |
| 449 | 45 | 7 px |
| 497 | 45 | 7 px |
| 546 | 46 | 8 px |
| 572 | 47 | 6 px |
| 612 | 70 | 6 px |

距离是在归一扫描页内的像素差，**不是历史疆界误差或地理定位精度**。大形没有另造：原图平滑的部分依然平滑。新轮廓保留了原有概括遗漏的曲率和小转折。

另外，572年西侧 `[43,423]→[44,114]`、612年 `[24,411]→[23,107]` 是图幅闭合边，扫描图内没有将它们画成历史界。此前输出从多边形外环直接生成描边，会误显示这两段。现以 `frameEdges` 显式记录，从描边中剔除，填色仍截止于资料图幅，图幅外不补造领土。

## 可追溯文件

- `gis/context/northern-boundary-guides.json`：保留修改前的引导环，重跑不累积误差。
- `scripts/maps/refine-northern-frontiers.py`：读取同年原图、提取界带、复用共边、校验环。
- `gis/context/northern-boundary-audit.json`：逐段旧引导线、采样数、界带拟合误差、原图哈希。
- `gis/context/northern-context-traces.json`：修正后的像素轮廓、图框边及区域解释。
- `scripts/maps/build-atlas-context.py`：重投影、陆地裁切、共边检查和图框边剔除。
- `data/maps/context/atlas-context.json`、`gis/context/calibration-report.json`：网站共用的派生数据；首页与阶段大地图同步更新。
- `data/maps/full-atlas.ts`：向读者说明北部界线的图集尺度与部族合组性质。

本地研究叠加图：`output/qa/northern-frontiers/*-source-overlay.png`。红为旧引导线、深绿为新取线；叠加图仅作本机校验，不分发扫描底图。

## 验证

- 原图指纹校验、27个多边形合法性、共边及重叠阈值检查、图框线不再与输出描边相交：构建脚本通过。
- `npx vitest run tests/northern-frontiers.test.ts tests/full-atlas.test.tsx tests/snapshot-hero-map.test.tsx tests/snapshot-atlas.test.ts tests/expansion-atlases.test.ts`：5个文件、21项通过。
- TypeScript、修改文件ESLint、生产构建通过；浏览器逐个打开449、497、546、572、612年地图，确认各自渲染年份正确，截图检查449和612年。
- 独立只读审查在内存重算253段取线和最终派生数据，与文件逐项一致；五年像素环无面积重叠。两条图框边周围0.001°范围内的输出描边长度为0。
