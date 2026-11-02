# Step 7 Unity WebGL 接入状态（实玩验收待完成）

核查日期：2026-09-20。Web 基线：`9bff6ec64ab8b3a5877631711e459c467a7e3b70`。本轮保留全部 Mock tests，未修改 Game 仓库。

## 构建来源与部署

- Game HEAD：`8f30b9f004d90aac80e8ecf17b28a2e49075b7a2`。
- 最新 U10 控制、碰撞和检视修复尚未提交，不能把 HEAD 当作修复构建的精确源码提交。manifest 的 `gameCommit` 为 null、`sourceDirty` 为 true；构建以四个文件的 SHA-256 固定。
- Unity：6000.3.24f1；源目录：`D:\OPC\history-field\game\Builds\WebGL`。
- 原始目录共 17 文件、31,024,056 bytes（本轮实际统计；Game 报告的汇总数字稍有不同）。
- `.data.gz` SHA-256：`7b42277a3c64f8665d6ecd7761967f9808258658e7b2eb8149b9f6c16930488b`。
- `.wasm.gz` SHA-256：`0ab109de5bc00b9c86f695fa9627c2d20a563eefe9225ce03bebbe1854da5eab`。
- `builtAt` 为 null，源构建没有构建时间证明；`artifactLatestWriteAt` 仅记录源文件最后修改时间。
- 二进制不入 Git。Web 自有外壳、manifest、导入脚本进入版本控制；没有创建云服务或发布 artifact。
- 旧副本与旧 manifest 已保留在本地 gitignored `output/unity-builds/2e7bef7/` 和 `output/unity-builds/scene-repair-124f544e/`，没有直接覆盖旧 Build 文件。

```powershell
node scripts/import-field-build.mjs D:/OPC/history-field/game/Builds/WebGL
$env:NEXT_PUBLIC_HISTORY_FIELD_MODE = 'webgl'
$env:NEXT_PUBLIC_HISTORY_FIELD_PLAYER_URL = '/history-field/li-jingxun/index.html'
npm run dev -- --port 3102
```

访问 `http://localhost:3102/field/li-jingxun`。导入脚本先验证全部源文件和已有目标，拒绝覆盖不同哈希的构建。CI/部署必须先取得与 manifest 匹配的 artifact、执行导入，再 build；单独 clone 不包含 Unity 二进制。默认开发仍为 mock、生产仍为 disabled。

`next.config.ts` 为三个 `.gz` 资源提供 gzip 编码及准确 MIME。iframe 允许 Pointer Lock；同源静态外壳处理加载进度、失败与上下文丢失，转发原协议 INIT 到 Unity。Parent 保持严格来源、窗口和消息形状校验。没有重命名 HISTORY_* 或放宽 Discovery ID。

移动端不创建 Unity iframe、不下载构建，显示桌面浏览器建议及档案入口。READY 等待为 120 秒，Mock 保留 15 秒。已修正“加载失败后迟到 READY 清除重试入口”的问题，也不再把无关的 Pointer Lock rejection 误判成 Unity 加载失败。

## 原阻塞已解除

旧构建的 `level0 is corrupted`、空场景名称与 build index -1 在新构建中未再出现。Game 修复将 SiteSceneLoader 拆成同名脚本并重新生成 Bootstrap；细节见 Game `docs/migration/U9_scene_load_fix.md`。

## 本轮实玩发现的新阻塞

用户保持页面前台后，自动键盘移动已进入墓室、真实按 E 发出了石椁 observed。读取 Web 存储也确认墓志 observed 已存在，但不能由此宣称完整 Case 1 通过。用户反馈：观察墓志后无明显反应，通常只能选到相邻目标，需蹲下并采用特定角度才出现墓志提示。

先前版本缺少真实 E → InspectMode.Enter 链路。U10 已在 Game 接通并集中分派 E，避免同次输入进入又退出；Web 只读核查确认了调用。此前碰撞盒重叠仅为候选原因，Game 的实际射线测试定位为玩家自身 capsule 抢先命中，已将玩家置于 Ignore Raycast 层。

Game U10 报告还修正了鼠标 Y 符号、MeshCollider 三角形绕序、地面接缝，并移除了缺乏依据的封闭墓道顶盖。报告的 EditMode 32/32、PlayMode 72/72 是 Game 提供的结果，不是 Web 本轮重新执行的测试。

本轮已导入 U10，真实 Chromium 收到 READY、loader 为 running、首帧 2175 ms；截图确认“探索示意 · 非原貌复原”和开放入口说明可见。键盘可沿入口前移，但自动点击仍出现 Pointer Lock WrongDocumentError，因此视角、墓志热点和碰撞完整实玩尚未独立验收。已请求用户手动完成墓志热点，不通过伪造 DISCOVERY 绕过。

真实 Chromium 已显示围栏、天空、入口、墓室和石椁 UI，收到 Game 自己发送的 `li-jingxun.stone-outer-coffin / observed`。该 ID 不属于 Web 当前三个注册项，按契约拒绝保存；此观察不能代替墓志验收。Game 的其余九项发现不在本轮 Web 内容范围。

## 真实浏览器结果

环境：Tabbit / Chromium 152、Windows、ANGLE AMD Radeon 880M / Direct3D11 硬件渲染。尚未独立验证 Google Chrome、Edge、Firefox、Safari。

| 项目 | 本轮结果与范围 |
| --- | --- |
| Real startup smoke | 通过：真实 READY、INIT 数组送达 iframe、Unity 首帧指标大于 0、加载器 running、无旧场景损坏错误 |
| 重复 READY | 通过：调用实际 Unity Bridge.NotifyReady，确认再次收到 INIT |
| iframe reload | 通过：等待新 Unity 实例及新 INIT，不以旧状态文字判断 |
| Parent reload | 通过：刷新后重新握手 |
| Unity EXIT | Bridge 层通过：调用实际 Unity Bridge.SendExit 返回 Archive；尚非玩家完成出口闸门 |
| localStorage blocked | 通过：模拟 SecurityError，明确提示无法读取，不用空记录初始化 |
| malformed / wrong origin | 通过：测试注入畸形/错误版本消息与错误 origin，存储未改变 |
| WebGL load failure / retry | 通过：拦截 loader 请求，显示错误；解除拦截后重试并握手成功 |
| Unity build timeout | 通过：iframe 不发 READY，实际等待超过 120 秒，显示超时及重试入口 |
| 移动端 | 通过 UA 模拟：显示提示、零 iframe、零 Build 请求；非真机 3D 性能验收 |
| Case 1 墓志 observed → 游戏 EXIT → Archive | 未完成实玩 |
| Case 2 刷新 → INIT → Unity 墓志恢复 | 传输握手已验证，墓志实际恢复未验收 |
| Case 3 Unity catalogued → observed 不降级 | Mock/组件单调规则通过；真实 Unity 产生 catalogued 的实玩未完成 |

实玩剩余限制：Pointer Lock 曾成功，但自动输入时也出现 `WrongDocumentError: The root document of this element is not valid for pointer lock.`；当前浏览器工具保持前台策略，不支持主动将页面置前。已请求用户将测试页面保持前台后继续。不能用手工 HISTORY_DISCOVERY 或直接写存储冒充游戏产生的状态。

新增 `tests/e2e/field-webgl.spec.ts` 是实际 Unity 加载 smoke，可在拥有 artifact 的环境运行：

```powershell
$env:NEXT_PUBLIC_HISTORY_FIELD_MODE = 'webgl'
$env:NEXT_PUBLIC_HISTORY_FIELD_PLAYER_URL = '/history-field/li-jingxun/index.html'
npm run test:e2e -- tests/e2e/field-webgl.spec.ts --project=desktop
```

先停止占用同一工作目录 `.next/dev` 的其他 dev server。Playwright runner 文件本轮未直接执行；同等启动断言已通过 Tabbit 浏览器执行，不将两者混称。

## 性能与 Console

以下为此前 U9 scene-repair 构建基线，不代表 U10：首次观测导航到 READY 约 2.94 秒；Unity GetMetricsInfo：assetLoadTime 524 ms、codeDownloadTime 97 ms、webAssemblyStartupTime 453 ms、pageLoadTime 1149 ms、pageLoadTimeToFrame1 2800 ms、gameStartupTime 2108 ms。首帧/游戏启动指标并非语义上的“玩家已进入墓室”，后者仍待实玩记录。

一次焦点有效、Pointer Lock 成功后的采样：fps 91.84、movingAverageFps 46.20；这是瞬时样本，不是持续 Chrome 性能基线。此时 JS used heap 110,984,676 bytes，WASM used heap 87,849,984 bytes，未观察 OOM。没有长时间内存泄漏结论。

后台 smoke 再次启动：pageLoadTimeToFrame1 2698 ms，gameStartupTime 2042 ms，JS used heap 162,070,805 bytes、WASM used heap 76,749,624 bytes。焦点为 false，该次低 FPS 不作为正常游戏帧率。

Console 仍有浏览器扩展连接错误、扩展造成的 hydration 提示、WebGL INVALID_ENUM、Shader 日志、Unity 文件系统同步弃用警告、同源 sandbox 警告，以及自动输入中的 Pointer Lock 错误。不宣称 Console 无错误。

U10 本轮启动样本：assetLoadTime 1385 ms、wasm startup 491 ms、gameStartupTime 1399 ms、首帧 2175 ms；JS used heap 165,485,243 bytes、WASM used heap 87,160,712 bytes。后台 FPS 不作为性能基线。Console 观察到 hydration 提示、Pointer Lock WrongDocumentError、sandbox 阻止 alert 和 favicon.ico 404（Unity 资源无 4xx），未宣称无错误。

## 完成剩余实玩验收

1. 保持 Tabbit 前台，点击画面锁定鼠标。使用独立测试 origin，不清除用户日常档案记录。
2. Archive → Field，真实操作发现墓志，记录 Game observed；通过游戏出口返回，核对档案 observed。
3. 刷新 Parent 再进入 Unity，记录真实 INIT 中的墓志状态，并在游戏内确认恢复。
4. 实玩检视墓志产生 catalogued 并确认 Web 保存；随后对同 ID 注入 observed，确认不降级。降级注入应与真实 catalogued 来源分别记录。
5. 记录前台持续 FPS、场景进入耗时、内存和 Console；Game 提交场景修复后补齐精确 commit 来源。

## Web 验证与 Git

本轮实际执行：typecheck 通过、lint 通过、`npm test -- --run` 81 文件 / 745 tests 通过、`npm run build` 通过（默认生产 disabled）。独立只读 review 发现的失败时序问题已修复并有回归测试。

工作区保留未提交的 Step 7 改动；因实玩验收和精确 Game commit 尚缺，未将阶段标为完成、未 commit/push。Web HEAD 仍为基线。没有修改 Unity、没有进入第二座墓。
