# 朝代篇覆盖登记审计 2026-10-11

状态：final；注册快照 244 篇。基线 40 稿、6926 段。

登记审计；复用已完成的语义复核记录，不声称重新读完6926段语义或回听音频。

原文件SHA差异 0，逐段SHA差异 0。基线在运行中保持不变：true。当前文件行数与每段行号完整保存于同名JSON。

## 合并规则

- 原baseline每个文件sha、每段sha、verdict原样保留，不修改baseline；当前每段去HTML注释并trim后hash，对应既有基线算法。
- 只加载index narratives数组中的字面量故事；未注册或被替代草稿的review记录保留在excluded，不计覆盖。
- 同story/file/P以同名canonical *-review.json为当前权威；无canonical时采用较新date，同日不同ledger保留并列；旧行不删除。
- covered/corrected/partial需非空sectionIds、实际正文、该节transcripts包含精确file/P。uncertain若列sectionId也须有精确锚；未落正文的空sectionIds候选单列警示，不算采用。链接或引用范围本身不等于语义采用。
- 多个partial不升级；covered/corrected若与未解记录并存列mixed；not-needed不算采用；uncertain与其记录始终保留。
- 原基线covered但无追加review单列，既不降为未使用，也不冒充本轮故事覆盖。
- bodyMapping表示结构引用，adopted只取合格covered/corrected/partial审查；fullReview不等于所有史实无争议。
- reviewRecords中的bodyMappingIndexes与unreviewedBodyMappingIndexes均指向本行bodyMappings数组，精确正文行号和transcripts范围不重复存储；ledger级元数据集中于reviewFiles。
- 当前lineCount/正文起止行号供回查；baseline没有行号字段，不能声称与历史行数逐值比较。

## 段落结果

| 登记状态 | 唯一原段 |
| --- | --- |
| baseline-only | 308 |
| review-covered | 1835 |
| review-corrected | 1824 |
| review-partial | 2432 |
| review-not-needed | 331 |
| review-uncertain | 151 |
| review-not-covered | 30 |
| review-mixed | 15 |

追加审查涉及 6618 个唯一原段，6672 条当前记录（全部历史及当前注册记录 6704 条）。追加实质或部分采用 6106 段；没有竞争性未解记录的完整/校正承接 3659 段。

仅保留原基线covered、没有追加review的 38 段单列。仍含当前uncertain的 152 段。not-needed不计采用，mixed与partial不计完整。

其中 36 条uncertain记录没有声明正文落点，保留为候选警示；没有虚补引用，也没有算作已采用。

仅有正文范围引用却没有任何审查记录的 3 段；未获对应section审查的引用对 790。这些范围不自动证明采用。排除未注册草稿审查 52 条。

## 核验问题

错误 0，警示 36。完整定位和原记录见JSON的issues与rows。

| 类型 | 条数 |
| --- | --- |
| uncertain-candidate-without-body-anchor | 36 |

## 原稿逐文件

| 文件 | 当前行数 | 段数 | 文件SHA一致 | 段SHA差异 |
| --- | --- | --- | --- | --- |
| 北齐_clean_v1.md | 1041 | 158 | true | 0 |
| 北魏01_clean_v1.md | 890 | 136 | true | 0 |
| 北魏02_clean_v1.md | 904 | 134 | true | 0 |
| 北魏03_clean_v1.md | 1012 | 155 | true | 0 |
| 北魏04_clean_v1.md | 928 | 142 | true | 0 |
| 北魏05_clean_v1.md | 1032 | 158 | true | 0 |
| 北魏06_clean_v1.md | 1102 | 169 | true | 0 |
| 北周_clean_v1.md | 709 | 90 | true | 0 |
| 大理（上）_clean_v1.md | 1417 | 217 | true | 0 |
| 大理（下）_clean_v1.md | 1369 | 211 | true | 0 |
| 金01_clean_v1.md | 1235 | 192 | true | 0 |
| 金02_clean_v1.md | 1289 | 201 | true | 0 |
| 金03_clean_v1.md | 1679 | 266 | true | 0 |
| 辽01_clean_v1.md | 1319 | 201 | true | 0 |
| 辽02_clean_v1.md | 1503 | 238 | true | 0 |
| 辽03_clean_v1.md | 1600 | 251 | true | 0 |
| 辽04_clean_v1.md | 1445 | 228 | true | 0 |
| 辽05_clean_v1.md | 1433 | 224 | true | 0 |
| 南朝01_clean_v1.md | 940 | 143 | true | 0 |
| 南朝02_clean_v1.md | 928 | 139 | true | 0 |
| 南朝03_clean_v1.md | 1014 | 154 | true | 0 |
| 南朝04_clean_v1.md | 992 | 151 | true | 0 |
| 南朝05_clean_v1.md | 963 | 145 | true | 0 |
| 南朝06_clean_v1.md | 960 | 143 | true | 0 |
| 隋（上）_clean_v1.md | 1246 | 166 | true | 0 |
| 隋（下）_clean_v1.md | 1291 | 201 | true | 0 |
| 隋（中）_clean_v1.md | 1376 | 216 | true | 0 |
| 五代十国01_clean_v1.md | 1486 | 231 | true | 0 |
| 五代十国02_clean_v1.md | 1034 | 140 | true | 0 |
| 五代十国03_clean_v1.md | 1154 | 151 | true | 0 |
| 五代十国04_clean_v1.md | 1024 | 135 | true | 0 |
| 五代十国05_clean_v1.md | 1281 | 169 | true | 0 |
| 五代十国06_clean_v1.md | 1391 | 185 | true | 0 |
| 西辽_clean_v1.md | 1275 | 195 | true | 0 |
| 西夏01_clean_v1.md | 1170 | 183 | true | 0 |
| 西夏02_clean_v1.md | 1054 | 159 | true | 0 |
| 西夏03_clean_v1.md | 1019 | 155 | true | 0 |
| 西夏04_clean_v1.md | 989 | 151 | true | 0 |
| 西夏05_clean_v1.md | 688 | 101 | true | 0 |
| 西夏06_clean_v1.md | 929 | 142 | true | 0 |

## 注册故事的登记缺口

| 故事 | 审查记录 | 未获对应审查的引用对 |
| --- | --- | --- |
| gao-huan-yuwen-tai | 15 | 1 |
| gao-cheng | 21 | 3 |
| gao-yang | 23 | 1 |
| gao-wei-poems | 13 | 17 |
| pingyang | 75 | 1 |
| zhou-xuan-emperor | 30 | 1 |
| sui-takes-power | 40 | 1 |
| sui-offices-law | 39 | 7 |
| sui-turk-diplomacy | 18 | 1 |
| sui-prosperity-ledger | 4 | 2 |
| dugu-empress | 27 | 6 |
| yang-yong-heir | 31 | 4 |
| yang-guang-succession | 28 | 1 |
| renshou-succession | 14 | 4 |
| shi-wansui | 7 | 4 |
| sui-canals-capital | 32 | 5 |
| sui-examinations | 8 | 5 |
| sui-western-tour | 12 | 1 |
| sui-southern-expeditions | 4 | 1 |
| sui-khitan-campaign | 3 | 1 |
| sui-imperial-tours | 6 | 3 |
| sui-goguryeo | 122 | 1 |
| wang-bo-song | 11 | 1 |
| sui-wagang | 11 | 8 |
| yang-guang-poems | 28 | 5 |
| liu-yu-origins | 57 | 4 |
| huan-xuan-fall | 28 | 1 |
| liu-yu-northern-campaigns | 32 | 6 |
| liu-song-founding | 19 | 4 |
| liu-song-deposition | 29 | 9 |
| liu-shao-coup | 20 | 1 |
| liu-song-last-emperors | 19 | 2 |
| qi-founding-yongming | 25 | 1 |
| qi-household-registers | 23 | 1 |
| xiao-zixiang | 36 | 3 |
| qi-succession-xiao-luan | 44 | 8 |
| donghun-xiao-yan | 21 | 1 |
| xiao-yan-rise | 38 | 6 |
| liang-government | 32 | 5 |
| xiao-yan-poetry | 24 | 15 |
| liang-emperor-buddhism | 31 | 26 |
| jin-beijing-origins | 40 | 5 |
| hou-jing-defection | 40 | 2 |
| hailing-moves-zhongdu | 40 | 3 |
| jiankang-siege | 36 | 6 |
| jiankang-fall | 27 | 28 |
| hou-jing-defeat | 25 | 5 |
| jiangling-fall | 13 | 10 |
| chen-baxian-rise | 32 | 9 |
| chen-succession-crisis | 32 | 13 |
| wu-mingche-northern-campaign | 10 | 1 |
| chen-palace-coup | 13 | 8 |
| chen-falls | 52 | 3 |
| jin-zhongdu-palaces | 33 | 4 |
| jin-meng-an-farms-gardens | 29 | 6 |
| hailing-shizong-succession | 30 | 9 |
| li-shier-zhangzong-court | 39 | 9 |
| hushahu-court-coup | 34 | 11 |
| jin-streets-and-memory | 29 | 4 |
| jin-mongol-yehuling | 44 | 7 |
| jin-zhongdu-last-defenders | 44 | 4 |
| jin-southern-court | 31 | 3 |
| jin-sanfeng-campaign | 30 | 2 |
| jin-tolui-succession | 40 | 9 |
| jin-three-last-ministers | 79 | 3 |
| tang-court-hedong-distrust | 41 | 4 |
| li-cunxiao-alliance-breaks | 37 | 7 |
| zhu-wen-tang-end | 17 | 3 |
| li-cunxu-luzhou-baixiang | 22 | 4 |
| liang-palace-coups | 9 | 1 |
| jin-rebellions-and-grandson-letter | 26 | 4 |
| jin-khitan-three-campaigns | 66 | 6 |
| later-han-and-guo-wei-rise | 34 | 2 |
| shu-wu-to-southern-tang | 19 | 2 |
| guo-wei-chai-rong-reforms | 47 | 10 |
| chai-rong-expansion-and-last-march | 21 | 1 |
| chenqiao-and-song-power | 43 | 6 |
| song-unification-campaigns | 42 | 1 |
| li-yu-words-after-country | 19 | 6 |
| li-cunxu-conquers-yan | 37 | 7 |
| wei-bo-and-liang-conquest | 38 | 4 |
| later-tang-shu-and-mutiny | 38 | 7 |
| feng-dao-mingzong-order | 17 | 5 |
| fengxiang-revolt-and-min-emperor | 49 | 13 |
| last-tang-army-reward-debt | 20 | 2 |
| shi-jingtang-khitan-bargain | 30 | 1 |
| sixteen-prefectures-strategic-cost | 24 | 3 |
| huangchao-uprising | 44 | 6 |
| huangchao-south-and-return | 61 | 6 |
| huangchao-daqi | 50 | 7 |
| shatuo-li-keyong | 39 | 5 |
| khitan-origins | 30 | 3 |
| liao-beijing-temples | 17 | 2 |
| abaoji-rise | 35 | 5 |
| abaoji-brothers-salt-feast | 24 | 1 |
| dongdan-duanwan | 25 | 9 |
| yelu-wuzhi-hengdu | 19 | 3 |
| shizong-huoshendian | 46 | 12 |
| muzong-black-mountain | 27 | 2 |
| jingzong-frail-court | 41 | 2 |
| han-derang-power | 36 | 2 |
| yongxi-eastern-route | 41 | 1 |
| xiulunhe-yinjilun | 22 | 1 |
| wang-jizhong | 17 | 5 |
| chanzhou-crisis | 33 | 1 |
| cao-liyong-treaty | 30 | 1 |
| shengzong-chaimu | 17 | 5 |
| xingzong-two-mothers | 60 | 5 |
| luoyiqing-shuanglu | 25 | 3 |
| huangtaishu-rebellion | 40 | 3 |
| yeluyixin-power | 30 | 1 |
| xiao-guanyin-supplement | 21 | 3 |
| taizi-harmed | 25 | 10 |
| tianzuo-accession | 18 | 1 |
| haidongqing-touyu | 22 | 4 |
| gaolianghe-relief | 45 | 8 |
| waqiao-succession | 13 | 1 |
| liao-jin-titles | 27 | 3 |
| xiaosese-jinwang | 21 | 2 |
| beiliao-first-yanjing | 33 | 3 |
| puxiannv-second-yanjing | 26 | 5 |
| dashi-leaves-tianzuo | 43 | 3 |
| tianzuo-captivity | 18 | 5 |
| liao-people-after-dynasty | 15 | 1 |
| balasaghun-layered-rule | 27 | 5 |
| qatwan-contested-plain | 26 | 5 |
| gantian-yilie-chengtian | 18 | 3 |
| pusuwan-zhilugu-crisis | 15 | 1 |
| kuchlug-enters-court | 15 | 1 |
| jebe-mountain-hunters | 6 | 1 |
| kirman-after-qara-khitai | 11 | 3 |
| xiao-guanyin | 32 | 7 |
| kedun-northern-reserve | 26 | 5 |
| emil-first-western-campaign | 25 | 4 |
| gurkhan-tianyou | 12 | 7 |
| xia-tangut-migration | 61 | 7 |
| xia-tongwan-city | 12 | 3 |
| xia-dingnan-succession | 34 | 2 |
| xia-jiqian-return | 61 | 2 |
| xia-yuanhao-palace-crisis | 43 | 4 |
| xia-yeli-counterplot | 30 | 10 |
| xia-younger-liang-dowager | 37 | 1 |
| xia-renxiao-disasters | 12 | 4 |
| xia-heda-rendejing | 28 | 3 |
| xia-huanzong-first-mongol | 33 | 4 |
| xia-anquan-coup | 20 | 2 |
| xia-mongol-sieges | 30 | 1 |
| xia-zunxu-scholar-emperor | 20 | 1 |
| nanzhao-names-frontiers | 44 | 12 |
| piluoge-six-zhao | 39 | 2 |
| nanzhao-tang-tibet-turns | 27 | 2 |
| wang-cuodian-court-war | 53 | 2 |
| nanzhao-last-kings | 14 | 4 |
| duan-siping-founding | 37 | 5 |
| dali-early-kings-gao-rise | 74 | 13 |
| dali-yang-revolt-gao-return | 38 | 3 |
| duan-zhengyan-later-kings | 20 | 5 |
| dali-conquest-governors | 31 | 2 |
| xia-last-cities-two-endings | 21 | 1 |
| xianbei-origins | 34 | 12 |
| tuoba-liwei | 28 | 1 |
| dai-fall | 36 | 3 |
| tuoba-gui-restoration | 24 | 4 |
| wei-name | 17 | 4 |
| mingyuan-frontiers | 26 | 3 |
| taiwu-rouran | 25 | 1 |
| yuanjia-campaigns | 20 | 1 |
| wei-buddhism | 16 | 5 |
| feng-enters-palace | 40 | 1 |
| xianwen-abdication | 24 | 3 |
| feng-regency | 55 | 9 |
| wei-schools-law | 18 | 3 |
| wei-households | 59 | 5 |
| xiaowen-luoyang | 24 | 1 |
| wei-reform-legacy | 28 | 4 |
| wei-culture | 11 | 1 |
| yuan-ziyou | 58 | 4 |
| wei-split | 26 | 7 |

## 重跑

```powershell
node scripts/research/reconcile-dynasty-coverage.cjs --phase provisional
node scripts/research/reconcile-dynasty-coverage.cjs --phase final --expected-stories 244
```

脚本仅写同名JSON/Markdown审计报告；不改原稿、基线、正文或注册目录。默认原稿目录可用--source-dir替换。非零退出表示登记/指纹错误或注册快照在运行中变化，应先检查报告，不把失败称为完成。
