// Lightweight route ownership; validated against content by history-expansion tests.
import { easternJinEventIds, jinSixteenEventIds, westernJinEventIds } from "../jin-sixteen-kingdoms/config";

export const expansionEventIds: Record<string, readonly string[]> = {
  "jin-sixteen-kingdoms": jinSixteenEventIds,
  "western-jin": westernJinEventIds,
  "eastern-jin": easternJinEventIds,
  "northern-wei": [
    "wei-founded",
    "wei-capital-pingcheng",
    "wei-unifies-north",
    "wei-buddhism-suppression",
    "wei-buddhism-restored",
    "wei-feng-regency",
    "wei-equal-field",
    "wei-three-chiefs",
    "wei-moves-luoyang",
    "wei-surname-reform",
    "wei-six-garrisons",
    "wei-heyin-massacre"
  ],
  "liao": [
    "liao-shengzong-accession",
    "liao-yongxi-campaign",
    "liao-chanyuan-treaty",
    "liao-increased-payments",
    "liao-crown-prince-killed",
    "liao-tianzuo-captured",
    "western-liao-founded",
    "western-liao-qatwan",
    "western-liao-regency",
    "western-liao-usurpation",
    "western-liao-falls"
  ],
  "jin": [
    "jin-rebellion",
    "jin-founded",
    "jin-jingkang",
    "jin-shaoxing-treaty",
    "jin-moves-zhongdu",
    "jin-hailing-southern-war",
    "jin-longxing-treaty",
    "jin-mongol-invasion",
    "jin-moves-kaifeng",
    "jin-zhongdu-falls",
    "jin-sanfengshan",
    "jin-caizhou-falls"
  ],
  "western-xia": [
    "xia-jiqian-rises",
    "xia-takes-lingzhou",
    "xia-demings-succession",
    "xia-yuanhao-succeeds",
    "xia-script",
    "xia-founded",
    "xia-song-peace",
    "xia-yuanhao-death",
    "xia-yongle-battle",
    "xia-renxiao-accession",
    "xia-ren-dejing-division",
    "xia-anquan-coup",
    "xia-mongol-siege",
    "xia-zunxu-accession",
    "xia-falls"
  ],
  "dali": [
    "nanzhao-unifies",
    "nanzhao-tianbao-first",
    "nanzhao-tianbao-second",
    "nanzhao-cangshan-oath",
    "nanzhao-chengdu-raid",
    "nanzhao-falls",
    "dali-founded",
    "dali-gao-usurpation",
    "dali-restored",
    "dali-mongol-conquest"
  ],
  "southern-dynasties": [
    "liu-song-founded",
    "song-yuanjia-begins",
    "song-yuanjia-war",
    "song-liu-shao-coup",
    "southern-qi-founded",
    "southern-liang-founded",
    "hou-jing-rebellion",
    "liang-jiankang-falls",
    "hou-jing-defeated",
    "liang-jiangling-falls",
    "southern-chen-founded",
    "chen-northern-campaign",
    "chen-lvliang-defeat"
  ]
};
