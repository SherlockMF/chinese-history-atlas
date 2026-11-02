# 城市图解、专题深读和全图地图：交付记录

2026-09-22，本地生产预览 `http://127.0.0.1:3100/`。

## 已实现

- 金中都首页新增城市格局／今日北京两个交互视图：内外城、十三门、中轴、水系，以及莲花池、白纸坊、丽泽、凉水河、景风门站等联系。考古遗存、历史范围、文献复原和地名联系分别标注。
- 其他七专题新增九组图解：北魏改革、辽上京与捺钵、西辽治理、西夏文教法典、洱海六诏、建康寺院、隋官制、隋运河、闽地经营。
- 九个原图年份均保留图幅内可辨周边内容：新增39个周边区域、147个名称点。879年仍使用南诏区域图，不虚构唐代全国疆界。
- 同年专题共享疆域、名称、颜色、都城集合，默认选中本专题主体。周边区域可点击阅读，但不加入专题人物与时间线筛选。
- 五代十国默认显示既有943年周边参考层，并继续明确它不是逐年控制面。

## 主要文件

| 部分 | 文件 |
| --- | --- |
| 金中都 | `data/series/jin-city.ts`、`features/series/jin-city-explorer.tsx` |
| 七专题深读 | `data/series/series-stories.ts`、`features/series/series-story-explorer.tsx` |
| 首页接入 | `features/home/home-page-content.tsx` |
| 全图数据与生成 | `gis/context/*-context-traces.json`、`scripts/maps/build-atlas-context.py`、`data/maps/context/atlas-context.json` |
| 同年合图 | `data/maps/full-atlas.ts`、两处 `data/series/*/map-snapshots.ts` |
| 地图类型与交互 | `types/series.ts`、`features/history-map/snapshot-map.tsx`、`features/history-map/atlas/snapshot-atlas.ts`、`atlas-style.ts` |
| 五代默认全图 | `features/history-map/historical-map.tsx`、`features/history-map/atlas/historical-atlas-map.tsx` |
| 回归测试 | `tests/full-atlas.test.tsx`、`tests/jin-city-explorer.test.tsx`、`tests/series-story-explorer.test.tsx`，以及现有地图测试的预期更新 |

## 验证结果

- QGIS Python运行 `scripts/maps/build-atlas-context.py`：9年生成成功；闭环、自交、标签归属、共享边重叠检查通过。结果记录于 `gis/context/calibration-report.json`。
- `npm run test:run`：91个文件、797项通过。最后补入879年名称点并更新宋说明后，再跑5个地图测试文件、21项通过。
- `npm run typecheck`、`npm run lint`：通过。
- `npm run build`：通过，53个静态页面生成完成；已重启本地3100生产预览。
- Tabbit实际浏览器：七个深读专题分别在1440、390宽度检查，主题切换和选点通过，无横向溢出；金专题另检两个宽度、两个视图、键盘选门、水关与站名证据、鱼藻池说明。
- 21个专题地图阶段逐个切换，Canvas均可见且原年渲染标记正确，无页面脚本错误；窄屏选择南宋、打开周边名称、五代默认开启943参考层均通过。
- 已查看金中都模块、390宽六诏图和1142全图截图。截图保存在Tabbit任务产物，不发布参考扫描。
- 独立审查发现并修复：鱼藻池相对白纸坊桥的图上方位、天桥金鱼池来源标题、同年都城集合不一致。审查后未发现剩余功能阻断。
- `git diff --check`：通过。未提交、推送或部署，保留原有用户改动。

## 资料边界

- 原图与方法清单见 `2026-09-22-full-map-sources.md`；城市逐项依据见 `2026-09-22-jin-city.md`。
- 逐字稿审查见 `2026-09-22-series-content-audit.md`。11项候选中已实现9项；云冈／龙门造像、大理帝王出家两项仍需更细的作品、人物个案核验，没有伪装成已完成专题。
- 图集疆域是概括重绘，图框、属部与没有闭合界的名称保留限制说明。612年奚、西南诸部与旧隋采样有已检查的界带概括差异，按既有主体优先处理，记录了扣除比例；不把配准残差当成历史边界精度。
- 墓模块与小红书内容未新增；窄屏检查针对同一个Web网站。
