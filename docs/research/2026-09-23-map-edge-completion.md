# 地图图幅切口排查与修复

## 排查结果

| 图年/地图 | 结论与处理 |
| --- | --- |
| 572 突厥及北方、西域诸部 | 原主图西侧缺幅。上一轮只删除描边，填色仍沿斜向图框截止。本轮补接概略西部范围，旧闭合线成为面内部。 |
| 612 西突厥及西域诸国 | 同类西侧缺幅，分别登记本年接点和补绘路径，不改东突厥分界。 |
| 879 南诏 | 原图东界基本完整，网站采线却偏离外界、绕进内部支界，制造两条沿页框的直边。按同年原图从(1175,485)至(1127,1370)重采，56个旧点替换为129个概括点。 |
| 449、497、546 | 外环未发现同类图框长直闭合段。 |
| 1111、1142、1208 | 外环未发现同类图框闭合；西辽最西端的弧线在原图可见，并未被50°E自然掩膜截掉。 |
| 五代十国年度共用母版 | 943原图外环位于图框内；成图范围约70.46—144.76°E、18.17—58.82°N，未碰65—145°E、14—62°N自然掩膜。 |

## 西部补绘依据及限度

1. **О. Дж. Осмонов、Оскон уулу Улукбек，《История Кыргызстана》，2013**。[原书PDF](https://jasulib.org.kg/wp-content/uploads/2024/02/Istoriya_Kyrgyzstana_Kratkiy_kurs_O.Dzh_Osmonov_2_kurs.pdf)。书页49（PDF51页）是552—603年突厥通期地图；书页47—48交代西进及576年、580年克里米亚军事行动。书页52说明西突厥与咸海、北高加索等地域；书页56是包含多个时代的地图，不能整体当作612年版图。
2. **Ken Chen, The Identity of Silzibul, the Early Monarch of Western Turks, JOTS 9/1 (2025), 7–30**。[论文](https://dergipark.org.tr/tr/download/article-file/3745584)。用于核对563—568年活动涉及中亚草原、伏尔加河流域等的地域背景。本文人物身份论点不是本次地图采用内容；军事活动范围也不自动等于直接统治。
3. 二次图形交叉核对：[突厥通期重绘](https://commons.wikimedia.org/wiki/File:Map_of_the_First_Turkic_Khaganate.png)、[西突厥通期重绘](https://commons.wikimedia.org/wiki/File:Map_of_the_Western_Turkic_Khaganate.png)。只核对里海周边形貌，不把整张最大疆域图套入本年。
4. 已阅读本地 `05-30西突厥.jpg`（611—617），该分图西端仍截断，不能单独解决完整西界问题。Svat Soucek《A History of Inner Asia》书页52的622年图口径更偏核心范围，与诸部合组口径不同，未拿它直接替换612年原图。

**补绘是人工历史地理概括，不是对另一张精确572/612年图的逐点数字化。** 它仅表示原图外的外围势力/诸部大致形貌。连接里海、伏尔加河下游与北高加索等地理锚点，排除克里米亚以及南高加索的后期扩张点；没有将现代国界当作古代界。不能凭此判断某一村镇本年的政治归属。

各年原图内轮廓及自然掩膜保持原样；补面只接在原图框西侧。最终区域继续采用诸部合组和虚线，精度登记为`reconstructed`；读者说明、来源元数据明确通期性质，不标作572/612年的精确图页。

## 实现文件

- `gis/context/western-extent-supplements.json`：来源、参考文件哈希、逐年接点、补绘经纬度、时间排除条件。
- `scripts/maps/build-atlas-context.py`：将补面与原面合并；断言旧图框不再构成边界；补面使用全域自然陆地与湖泊。
- `gis/context/northern-context-traces.json`：更新图幅来源说明，原采点和图框位置仍留档。
- `gis/expansion/atlas-traces.json`：879年东缘修正。
- `data/maps/context/atlas-context.json`、`data/maps/expansion/{geometry,boundaries,outlines}.json`、配准报告：重新生成的数据。
- `scripts/maps/build-expanded-land-context.py`、`public/maps/base/atlas-land-context.geojson`：自然底图从50°E扩展到30°E，避免再次截断补绘部分。沿用天然斋桑湖例外，不能因其现今被水库扩建而填掉。
- `data/maps/full-atlas.ts`、`types/series.ts`、`features/history-map/atlas/snapshot-atlas.ts`：传递通期说明和来源注记；补绘标签未混入“原图名称”列表。
- `tests/map-edge-completion.test.ts`：旧图框两侧连贯性、里海和斋桑湖留空、后期扩张排除、来源时期、南诏误采回归。

原书、扫描和QA叠图均仅用于本地研究，未复制到网站目录。

## 验证

- 几何生成：面有效、标签在面内、共享边重叠阈值检查通过；旧图框与新面边界交长为0。补绘西端位于38°E/39°E附近，未被50°E掩膜裁断。
- 6个相关测试文件，共24项通过。
- TypeScript、修改文件ESLint、生产构建通过（53个静态页面）。
- 浏览器：572年实际截图已目视核对，旧西侧斜切口消失，里海留空；612、879年页面加载成功，`data-rendered-year`分别为612、879，MapLibre画布均已创建。
- 视觉验收限制：612年截图出现一次视口合成异常，随后截图工具超时；879年未完成浏览器截图目视验收。两年几何与来源的自动检查已通过，但页面加载检查不代替截图验收。
