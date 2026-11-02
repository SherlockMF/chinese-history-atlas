# 都城古今叠图的现代街道快照

北京金中都及明清城址、西安隋大兴城周边的本地 MVT 矢量数据。

- 提供者：[OpenFreeMap](https://openfreemap.org/)，采用 OpenMapTiles schema。
- 原数据：© OpenStreetMap contributors，ODbL；保留 © OpenMapTiles 署名。
- 快照：`manifest.json` 中记录上游版本、范围和缩放级别；本次为 2026-09-13 构建。
- 范围：北京 `116.29,39.84,116.455,39.958`；西安 `108.858,34.190,109.01,34.30`。
- 级别 10–14，180 个矢量瓦片，约 15 MB；更高缩放使用第14级细节放大。覆盖范围外不提供全球底图。
- 来源允许网站使用及自行托管。本目录不下载或代理 OSM 官方受限栅格瓦片。
- 字形：OpenFreeMap 的 Noto Sans Regular 字形范围（拉丁与常用标点），SIL Open Font License；中文由浏览器本地字体生成。

复现：在项目根目录运行 `node scripts/maps/prepare-city-basemaps.mjs`。脚本保留已有瓦片，不自动覆盖本地快照；更新应另行准备完整目录后再替换，并同步记录新的版本。

古城墙、城门等历史数据在 `data/series/city-plan-details.ts`，与这些现代道路数据分离。现代快照不作为历史遗迹测绘依据。
