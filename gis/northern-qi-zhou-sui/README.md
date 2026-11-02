# 典型图集年代编辑源

`atlas-traces.json`是546、572、612三个图集原年的人工概括线网。修改共同边时只修改一个命名edge；region的`-edge`表示反向连接。闭合顺序或相邻端点错误会使生成失败。enclave为江陵后梁，先从周边面扣除再单独发布。

图像坐标标准化为1872×1312，线网坐标相对[650,450]；`gridControls`为完整页面坐标和WGS84经纬度。三张同版式图的经纬网作水平对齐后配准，报告残差不是边界准确性证明。海岸用已有Natural Earth掩膜裁切。源影像不入库。

在项目根运行：

```powershell
& 'C:/Program Files/QGIS 4.0.2/bin/python-qgis.bat' scripts/maps/build-northern-qi-zhou-sui.py
```

输出包括`calibration-report.json`及`data/maps/northern-qi-zhou-sui/`下四份运行时JSON。各政权使用同一套地理转换，不独立移动或缩放；不用未来年代的图反填早期年份。来源、限制与原图许可标记见[台账](../../docs/research/northern-qi-zhou-sui/map-source-ledger.md)。
