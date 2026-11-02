# 439、394、304年完整阶段图

**Goal:** 按用户确认的439→394→304顺序，将三幅孤立核心区示意替换为连续的全幅阶段格局；保留原snapshotId和推演链接。

**Architecture:** 新增独立经纬度共享界线与区域输入 `gis/jin-sixteen-kingdoms/stage-traces.json`、生成脚本 `scripts/maps/build-jin-stage-atlas.py`、生成数据 `data/maps/jin-sixteen-kingdoms/stage-maps.json` 和快照适配 `data/series/jin-sixteen-kingdoms/stage-map-snapshots.ts`。在现有key-year注册中用同ID覆盖三个核心区版本。旧原年配准图和其余五幅核心区图不变。

**Constraints:** 不新增依赖、外部网站请求、事件/人物实体或发布；保留已有工作区改动。本地281、395、449等图页仅为明确标年的时期地理参照，不能标成304、394、439原年图。每幅独立依据本年史事与时期州郡资料绘制，记录各推定接界，不以其他年份政治面改名。周边诸部合组只作背景，地图外缘不画成国界。

- [x] 439：核对《通鉴》卷123、《魏书》世祖纪与《宋书》州郡志，补宋魏连续区域、仇池、吐谷浑、敦煌沮渠余部、张掖年末争夺；不得把439年后尚存势力提前并魏。
- [x] 394：核对《通鉴》卷108与晋书相关载记，补后秦/后燕/后凉/西秦/北魏/东晋及仇池、周边；洛阳和广固不提前归后秦/南燕，南凉北凉尚未建国。
- [x] 304：核对《通鉴》卷85、《晋书》地理志及刘渊/李雄载记，画晋名义州郡与地方分据背景，凉州保留晋辖性质；汉、成仅画可考初建区域，晋廷迁长安与后来的平阳分别说明。
- [x] 验证与记录：先写主要城市归属、连续覆盖、后年变化排除、来源口径测试并观察失败；每幅生成时断言有效/无重叠/共享接界/标签与都城/海岸裁切。通过相关Vitest、typecheck、ESLint、build及桌面手机显示检查，按requesting-code-review技能作只读复核。

验收文件 `tests/jin-full-stage-atlas.test.ts`；更新 `tests/jin-key-year-maps.test.ts` 三幅覆盖说明断言，已有日期、原图及事件返回测试保留。完成后在 `docs/research/2026-10-26-jin-full-stage-atlases.md` 记录来源、假设与未定段。
