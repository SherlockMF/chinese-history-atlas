# 中国历史图谱 · Chinese History Atlas

中国历史互动图谱：历代疆域地图、时间线、人物关系与史料叙事。以本地类型化数据驱动的 Next.js 历史探索站，属于“经纬”Web 产品线，与独立的“现场”游戏项目通过调查档案协议联动。

**仓库：[SherlockMF/chinese-history-atlas](https://github.com/SherlockMF/chinese-history-atlas) · 主分支：`master`**

项目从五代十国扩展为多专题平台，现有 11 个专题，时间覆盖 265—1253 年之间的不同区间，不表示这段时期的中国历史已完整收录。

## 历史专题

| 专题 | 时间线范围 | 入口 |
| --- | --- | --- |
| 西晋 | 265—316 | `/series/western-jin` |
| 东晋 | 317—420 | `/series/eastern-jin` |
| 五胡十六国 | 304—439 | `/series/jin-sixteen-kingdoms` |
| 北魏 | 386—534 | `/series/northern-wei` |
| 南朝 · 宋齐梁陈 | 420—589 | `/series/southern-dynasties` |
| 北齐·北周 → 隋 | 534—618 | `/series/northern-qi-zhou-sui` |
| 五代十国（含唐末前史） | 875—979 | `/series/five-dynasties` |
| 辽与西辽 | 907—1218 | `/series/liao` |
| 西夏 | 982—1227 | `/series/western-xia` |
| 金与金中都 | 1114—1234 | `/series/jin` |
| 南诏与大理 | 738—1253 | `/series/dali` |

时间线范围来自 `data/series/`，地图另有有效年份与阶段覆盖范围。各专题史料、地图和叙事的完整程度不同，具体以页面的来源与精度说明为准。

## 功能与入口

- `/`、`/series`：专题总览；每个专题有独立年份、轨道、人物和导读。
- `/series/[seriesSlug]/timeline`：时间线、事件播放及关联史事。
- `/series/[seriesSlug]/map`：五代十国逐年地图，以及其他专题的阶段地图、地图叙事和部分都城专题。
- `/series/[seriesSlug]/people`：人物生平、关系图谱、来源与人物对话。
- `/series/[seriesSlug]/stories`：带来源的历史叙事，联动人物、事件和地图。
- `/series/[seriesSlug]/sources`：专题史料与出处。
- `/explore/[id]`：事件背景、过程、影响、因果联系与证据。
- `/archive/li-jingxun`、`/field/li-jingxun`：李静训调查档案与现场容器。
- 旧的 `/timeline`、`/map`、`/people` 等五代十国入口继续可用；`/notes` 保留校勘与方法说明。

## 分支与归档

日常开发统一到 `master`。原 `feat/continuous-atlas`、`feat/multi-series` 和地图修订分支的主站历史已归入主线，不再维持多个长期开发分支。

小红书离线小工具有独立的运行与交付边界，通过标签保存，不将其专用改动混入主站：

- [完整源码与维护说明](https://github.com/SherlockMF/chinese-history-atlas/tree/xhs-contest-2026-09-06/mini-tool)
- [2026-09-06 固定参赛交付包](https://github.com/SherlockMF/chinese-history-atlas/tree/xhs-contest-2026-09-06/mini-tool/releases/2026-09-06)

标签 `xhs-contest-2026-09-06` 的内容与原 `codex/xhs-mini-tool` 分支一致，保留历史提交及交付物。不要覆盖该标签；需要修订时从标签创建临时分支。

```bash
git clone https://github.com/SherlockMF/chinese-history-atlas.git
cd chinese-history-atlas
git switch master
```

已有本地目录可以继续使用原名称，无需移动工作区。项目架构与跨产品边界见 [PROJECT_BASE_PLAN.md](PROJECT_BASE_PLAN.md)。

## 五代十国来源角标

- `¹`：六集主线，经外部史料核定。
- `²`：六集未覆盖的史料扩展。
- `¹²`：六集提供叙事主线，具体事实由史料补齐。
- `³`：存在影响理解的重要异说，可与前三种角标叠加。

角标可以用鼠标或键盘查看完整说明，并提供无障碍名称。六集播客逐字稿不是最终唯一史料；完整的实际使用范围、事件 ID、争议处理和 `sourceRefs` 审计见[历史内容来源账本](docs/research/2026-08-31-history-source-ledger.md)。

## 本地运行

```bash
npm ci
npm run dev
```

打开 `http://localhost:3000`。默认使用本地 `LocalHistoryRepository` 和 mock 问史 provider，浏览核心功能不要求 Supabase 或外部 LLM 凭据。人物自由对话需要下面的模型配置；不要提交真实密钥。

## 人物对话

在人物详情点击“聊一聊”。“问历史”检索站内人物生平、史料争议和事件记录；未接入模型时，由本地规则整理回答，可结合最近问题定位追问主题，但不保证理解所有代词或复杂推理。仅在本地开发环境接入模型后，会结合站内线索和最近会话生成回复；模型失败时返回本地结果并标明退路。

所有专题的已收录人物均可对话，也可以询问其他专题的已知人物与事件。151 位人物的独立表达方向维护在 `data/person-voices.ts`，与各自的身份、别名、经历、书目和异说共同组成人物设定。表达方向属于创作设定，不是历史原话；档案缺少的生卒年和私人经历不会凭空补齐。

“随意聊”需要大模型，允许现代生活、创作等话题，以人物经历与表达方式作跨时代假设。这一模式的回复属于 AI 角色演绎，并非历史人物原话。聊天记录逐条标注“站内资料 · 本地整理”“结合史料生成”或“AI 演绎 · 非史料原文”；历史模式展示资料来源，自由聊天模式的书目只表示提供给模型的背景资料，不代表回复逐句得到核定。

“随意聊”使用服务端配置的 Chat Completions 兼容接口，不增加 SDK 依赖。参考[接口协议](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create)。仅在本地开发环境的 `.env.local` 中设置以下变量后重启开发服务（这里全部是占位值）：

```dotenv
LLM_PROVIDER=openai-compatible
LLM_BASE_URL=https://your-provider.example/v1
LLM_MODEL=your-chat-model
LLM_API_KEY=your-server-only-api-key
```

`LLM_BASE_URL` 是 HTTPS API 根地址，包含服务商要求的版本路径，不含 `/chat/completions`；模型需支持文本聊天和 `system` 消息。密钥只在服务端读取，请勿添加 `NEXT_PUBLIC_` 前缀。人物身份、提示词及史料由服务端生成，客户端不能指定模型、服务地址或 system 消息。原有全局“问史”仍使用本地 mock provider。

未配置或仍为 `LLM_PROVIDER=mock` 时，“问历史”仍可正常使用，只有“随意聊”会提示尚未接入模型；“人物设定 → 复制人物设定”也可直接使用。不会用固定文本假装模型生成。

对话记录只保存在当前页面内存，刷新或切换人物后清空；关闭弹窗保留会话。每条问题最多 1000 字，携带最近 6 轮完整对话，单次模型请求 30 秒超时。本地接入模型时，两种模式均会把问题、最近会话、公开人物资料和检索线索交给所配置的服务商；未接入时的历史查询不发送外部模型请求。本站不额外落库保存对话。

按当前使用范围，生产环境（`NODE_ENV=production`，包括 `npm run build` / `npm start`）强制关闭模型调用，即使配置了模型变量也不会发出请求。“问历史”返回本地资料；“随意聊”返回 HTTP 403、`CHAT_LOCAL_ONLY`，界面显示说明。本地开发使用 `npm run dev -- --hostname 127.0.0.1`；不将开发服务器对外开放。本轮不引入账号、访问码或付费模型配额系统。

## 验证命令

```bash
npm run typecheck
npm run lint
npm test -- --run
npm run build
npm run test:e2e
git diff --check
```

GitHub Actions 的 `.github/workflows/ci.yml` 在 push、pull_request 或手动触发时运行 typecheck、lint、全量单元测试、生产构建及 Playwright。使用 Windows runner 兼容现有 PowerShell 导出测试；失败时保留7天浏览器 traces，不提供真实模型凭据。Actions 配置依据[官方工作流文档](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax)。

Playwright 配置包含 desktop Chrome 与 Pixel 7 两个项目。CI 使用构建后的生产服务器，监听 `127.0.0.1:3100`；本地默认启动开发服务器。若已有开发服务占用同一工作目录，可先构建，再设置 `PLAYWRIGHT_PRODUCTION=1` 运行测试，以验证生产构建而不停止现有开发服务。

## 地图精度

五代十国地图展示 907—979 年年末格局；其他专题按已有阶段或关键年份地图展示，不通过插值伪造逐年疆界。地图包含概括区域、史料支持的边界和仅标名称的外围背景，具体精度由图层与来源说明界定；留白不表示无人统治。都城与地点用于理解空间关系，不代表精确考古复原。

地图加工脚本位于 `scripts/maps/`，来源与生成资料位于 `gis/`、`data/maps/` 和 `docs/research/`。五代十国不为 875—906 绘制逐年疆界。

## 本地 RAG 边界

首页、专题总览与各专题页面均提供“问史”。首页检索全站资料，不沿用上次选择的人物或事件；专题页面优先考虑当前线索，仍可明确查询其他专题。年份按相应专题校验，首页和回答支持全部已收录专题的年份范围。事件和故事来源均可点击返回原页面。

问史检索全部专题的事实层事件和历史叙事。事件证据来自标题、年份、人物/政权/地点名称、摘要、背景、过程、结果、影响、书目与异说提示；叙事证据来自已入库故事及其来源。它不进行全文古籍搜索，不读取逐字稿校勘中的错误原句，不调用生产 embedding 或生产 LLM。没有本地证据时会明确显示“未检索到”，不自动使用通用知识补齐。

## 当前不包含

账号、会员、评论、CMS、数据库内容发布、运行时自动抓取史料和精确 GIS 边界不在当前范围内。人物对话已提供模型接入；全局问史尚未改为生产 LLM。

## 现场容器与部署

现场容器默认开发环境使用 mock，生产环境为 disabled。真实 Unity WebGL 构建从独立的 `history-field` 项目导入，二进制不入本仓库；只克隆本仓库不包含可运行的 Unity 现场。导入方法、已验证范围与仍待人工实玩的项目见 [WebGL 联调状态](docs/field-webgl-integration-status.md)，协议见 [现场容器 V1](docs/field-container-v1.md)。

GitHub Actions 的 Quality checks 在推送时执行质量检查。Netlify 配置保留在 `netlify.toml` 和 `.github/workflows/netlify-deploy.yml`，部署仅通过 `workflow_dispatch` 手动触发，需要仓库中已配置的部署凭据。本次仓库整理不执行网站部署。

## 目录

- `app/`、`features/`、`components/`：页面、业务模块与共享组件。
- `data/seed/`：共享历史实体；`data/series/`：专题组织；`data/narratives/`：叙事内容。
- `data/maps/`、`gis/`、`public/maps/`：地图注册、来源资料与可发布图层。
- `data/sites/`、`features/archive/`、`features/field/`：调查档案和现场协议。
- `lib/`、`types/`：数据访问、检索、协议与类型。
- `docs/research/`：来源台账与阶段核验记录；历史记录中的日期和验证结果只对应当次工作。
- `scripts/`、`tests/`：资源处理和自动化验证。

本地 `.env*`、研究下载临时文件 `.tmp-*`、构建产物和 `output/` 不提交。`.env.example` 仅保存占位配置。
