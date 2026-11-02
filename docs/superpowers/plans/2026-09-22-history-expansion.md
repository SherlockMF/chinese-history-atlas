# 历史专题 Web 扩展实施计划

**Goal:** 按北齐北周隋、北魏、辽、金、西夏、大理、南朝顺序完成可浏览的专题，墓葬只预留关联。

**Architecture:** 复用现有 HistorySeriesConfig、HistoryDataSet、专题路由、时间线、人物及事件详情。新专题使用独立内容模块和统一实体注册。首轮地点图已由补全计划中的18个图集原年疆域快照替代；画像也已逐人补齐。既有五代年度地图和北齐北周隋阶段地图保留。

**Tech Stack:** Next.js 16.3 App Router、React 19、TypeScript、Vitest、Playwright。

## 约束

- 用户已授权自主判断并完成本地工作，不等待逐步设计审批。
- 保留任务开始前的未提交改动；不改上游原稿，不把整篇逐字稿复制到公开产品。
- 事实以可追溯史料核对，保存集数、清洗稿段落和来源；不把 CLEANED 等同 VERIFIED。
- 墓葬使用既有 site registry 增加 planned 状态，不创建空白档案、游戏或可点击的失效链接。
- 不添加依赖、遥测、运行时外部请求，不改已有模型边界。

## 执行

- [x] 1. 为六专题注册、数据引用、时间范围和墓葬状态写失败测试。运行 `npx vitest run tests/history-expansion.test.ts`。
- [x] 2. 添加 `data/series/expansion/` 下专题配置、事实、人物、地点、关系、导读和来源，接入 `data/seed/`、`data/series/index.ts`、`lib/repositories/series-repository.ts`，运行数据测试和 typecheck。
- [x] 3. 增加地点地图，修复首页里针对周齐隋的硬编码文案；专题总览按优先级排列；加入 sources 页面和来源导航。
- [x] 4. 扩展 `types/site.ts`、`data/sites/index.ts`、`features/sites/related-sites.tsx`，为徐显秀、司马金龙、耶律羽之、房山金陵预留稳定 ID 与关联，保留李静训现有功能。
- [x] 5. 运行相关测试、全量单测、lint、typecheck、build、桌面及手机 E2E；审查差异并记录内容边界和查看入口。

## 验收

每个专题提供首页、可筛选时间线、图集原年疆域地图、人物画像与关系、事件详情、三条导读和来源说明。专题切换不串年份，事件链接保持对应专题上下文；不显示错误的周齐隋文案。未知路由返回 404。地图标注参考年份与精度，不推演没有依据的年度疆界。待开发墓葬不生成档案链接。

首轮记录及既有 Mock Field 测试环境限制见 `docs/research/2026-09-22-history-expansion.md`；画像、疆域图补全及最终验收见 `docs/research/2026-09-22-portraits-atlases-completion.md`。仅交付 Web，不包含小红书版本。
