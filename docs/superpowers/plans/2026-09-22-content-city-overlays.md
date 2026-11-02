# 逐字稿主题补齐与古今地图叠加

目标：补齐已审计的主要缺口，并使金中都、大兴城可以在现代街道底图上比较历史空间。

沿用现有 SeriesStory 数据及 MapLibre，不新增依赖。用户已授权自主实施；不发布、不覆盖现有修改。

- [x] 扩展八个主题：大兴城、开皇治理、隋选官、猛安谋克、大理佛教政治、南朝用人治理、西夏文字军队、北魏改革与六镇。每个主题提供逐字稿定位与核查来源。
- [x] 为主题节点加入事件入口、前后阅读及连接解释，连通既有年表。
- [x] 增加两城共用的古今叠图，支持现代地图、历史范围、轴线、参照地标独立开关、透明度及视图复位。现代底图采用 OpenStreetMap 在线瓦片，显示署名；历史层是有来源的概略空间复原，不伪装测绘成果。不把隋大兴城混入唐代新增大明宫。
- [x] 增加行为测试：跨主题选择、事件链接、图层开关、透明度、无 WebGL 降级；核查坐标范围和来源。运行相关测试、lint、typecheck、build，浏览器检查桌面及窄屏。

文件：data/series/supplemental-stories.ts、city-overlays.ts；features/series/city-overlay-explorer.tsx、city-overlay-canvas.tsx；修改 series-stories.ts、series-story-explorer.tsx 与 home-page-content.tsx。
