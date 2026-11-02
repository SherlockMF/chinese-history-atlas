# 图集典型年代地图：546 / 572 / 612

运行时使用《中国历史地图集》同年图页概括重绘的三套数据。来源为用户提供的本地第四册南北朝、第五册隋扫描图；影像仅在本机查阅，不复制到仓库或网站。

- `geometry.json`：主要政权的Polygon/MultiPolygon；共享接触线，不逐年插值。
- `boundaries.json`：原图政治线网经投影转换后与陆地相交；外海包络不会画成海上疆界。
- `outlines.json`：悬停/选中轮廓，剔除天然湖泊岸线。
- `label-points.json`：经过面内检查的政权标签位置，不是都城坐标。

编辑源为 `gis/northern-qi-zhou-sui/atlas-traces.json`，含页名、SHA-256、图集纪年、经纬网控制点、共享线段和面归属。按照五代十国篇的流程，在Albers投影中作二次配准；海岸和天然湖泊复用已提交的Natural Earth掩膜。三张扫描页在标准1872×1312查看尺度中定位，线网以[650,450]为原点保存；坐标精度不代表疆界的历史精确程度。

## 重生成

在项目根目录运行现有QGIS Python（无新增网站依赖，无网络请求）：

```powershell
& 'C:/Program Files/QGIS 4.0.2/bin/python-qgis.bat' scripts/maps/build-northern-qi-zhou-sui.py
npx vitest run tests/atlas-snapshots.test.ts tests/snapshot-atlas.test.ts tests/series-snapshots.test.tsx --maxWorkers=1
```

生成脚本检查线网闭合、无自相交、政权无面积重叠、标签在面内；测试检查长安、邺、建康、江陵、成都、广州和敦煌等点及年份语义。自然地理掩膜位于`gis/continuous/master-land-mask.geojson`与`master-lakes-mask.geojson`，不需要重新取得扫描图。

## 精度与来源

三图均为`approximate`：保留主要转折，不表示州县级精确疆界或所有地方的实际控制。572的后梁单列；612图不用于回填589。外围未绘制政权的留白不表示无人统治；台湾和日本主要岛屿不通过外海包络归入任何政权。都城点仅表示所在区域。

详见[来源台账](../../../docs/research/northern-qi-zhou-sui/map-source-ledger.md)。图集扫描资料标记`redistributable: false`，不为其授予新许可。

## 旧V1采样留档

`source-traces.json`是2026-09-19的旧Commons采样，不再参与生成或运行时地图；它仍保留原修改作品的CC BY-SA 4.0许可和Zunkir / Kanguole署名。原参考为[Wei Wei Liang 546.svg](https://commons.wikimedia.org/wiki/File:Wei_Wei_Liang_546.svg)、[Zhou Qi Chen.svg](https://commons.wikimedia.org/wiki/File:Zhou_Qi_Chen.svg)、[Eastern China blank relief map.svg](https://commons.wikimedia.org/wiki/File:Eastern_China_blank_relief_map.svg)。该许可不被套用到本次图集重绘数据。
