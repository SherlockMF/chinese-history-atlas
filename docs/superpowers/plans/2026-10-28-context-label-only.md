# 外围背景仅标名称

用户已批准：主线疆域保留填色及有依据的接界；外围诸部仅标位置名称，不以闭合色块暗示国界。共享年份沿用相同地理资料。

1. SnapshotRegion 增加可选 displayMode: label-only。晋与十六国两套载入入口明确标记外围 ID，不将 influence 全部视为背景；保留代、北魏及主线争夺区。
2. snapshot-atlas 将这些区域输出为已有 landmark 名称点；从填色、边界和悬停轮廓中排除。保留主线一侧的已有接界，不生成新国界。原始几何数据保留。
3. 首页 SVG 使用同一标记，外围只留名称；图例与范围说明同步更新。
4. 回归验证十四幅晋图、跨专题共享、主线填色与边界；桌面及手机检查 281、376、417 年。

涉及 types/series.ts、data/series/jin-sixteen-kingdoms 两个载入入口及 context-display.ts、features/history-map/atlas/snapshot-atlas.ts、features/home/snapshot-hero-map.tsx；相关 Vitest 与浏览器复核。不增加依赖，不部署，不修改历史疆域。
