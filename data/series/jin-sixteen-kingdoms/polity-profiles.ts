export type SixteenPolityProfile = {
  polityId: string;
  periods: readonly { start: number; end: number }[];
  capitalHistory: string;
  figures: readonly string[];
  note?: string;
  sourceRefs: string[];
};

const jin = (volume: number, locator: string) => `《晋书》卷${volume} · ${locator} — https://zh.wikisource.org/wiki/晉書/卷${String(volume).padStart(3, "0")}`;
function profile(polityId: string, start: number, end: number, capitalHistory: string, figures: string[], volumes: number[], note?: string): SixteenPolityProfile {
  return { polityId, periods: [{ start, end }], capitalHistory, figures, sourceRefs: volumes.map(volume => jin(volume, "政权兴亡、统治中心与人物")), ...(note ? { note } : {}) };
}

export const jinSixteenProfiles: SixteenPolityProfile[] = [
  profile("former-liang", 301, 376, "姑臧为张氏统治中心。", ["张轨", "张骏", "张天锡"], [86, 113], "301年张轨任凉州刺史是张氏据有河西的起点；314年张寔继掌凉州，世袭格局形成。长期奉晋正朔，不能将起点等同称帝。"),
  profile("later-liang-sixteen", 386, 403, "姑臧；吕光西征归来后据此经营河西。", ["吕光", "吕隆"], [122, 117]),
  profile("southern-liang-sixteen", 397, 414, "廉川 → 乐都；一度据姑臧，失去姑臧后回到乐都。西平也曾是统治中心。", ["秃发乌孤", "秃发利鹿孤", "秃发傉檀"], [126, 125], "各中心分阶段使用，不表示同时拥有整条迁移线上的地区。"),
  profile("northern-liang", 397, 439, "张掖 → 姑臧。", ["段业", "沮渠蒙逊", "沮渠牧犍"], [129], "397年段业被拥立，401年沮渠蒙逊取代段业。439年终点指姑臧政权降魏；沮渠氏余部此后仍在高昌活动。"),
  profile("western-liang-sixteen", 400, 421, "敦煌 → 酒泉；李歆败亡后，李恂余部退守敦煌。", ["李暠", "李歆", "李恂"], [87, 129], "420年李歆败亡，421年敦煌余部被北凉消灭，两次终局分别阅读。"),
  profile("former-yan", 337, 370, "棘城 → 龙城 → 蓟 → 邺。", ["慕容皝", "慕容儁", "慕容暐"], [109, 110, 111], "337年称燕王，352年称帝；燕国的建立与进入河北不是同一节点。"),
  profile("later-yan", 384, 407, "中山 → 龙城；前期复国战争中军政中心尚在变化。", ["慕容垂", "慕容宝", "慕容熙"], [123, 124]),
  profile("southern-yan", 398, 410, "滑台 → 广固。", ["慕容德", "慕容超"], [127]),
  profile("northern-yan", 407, 436, "龙城。", ["高云", "冯跋", "冯弘"], [124, 125], "传统纪年常从407年高云掌权算起；409年冯跋继掌政权。436年冯弘弃龙城奔高句丽。"),
  profile("former-qin", 351, 394, "长安；淝水战后余部分别辗转晋阳、南安等地。", ["苻健", "苻坚", "王猛", "苻登"], [112, 113, 114, 115], "383年淝水败北与385年苻坚被杀均不等于前秦当年灭亡；余部延续到394年。"),
  profile("later-qin", 384, 417, "长安为主要都城；建政初期先在渭北活动。", ["姚苌", "姚兴", "姚泓"], [116, 117, 118]),
  { ...profile("western-qin", 385, 431, "勇士川 → 金城、苑川 → 枹罕；末期退保南安。", ["乞伏国仁", "乞伏乾归", "乞伏炽磐", "乞伏暮末"], [125], "400—409年独立统治中断。400年败于后秦后失国，409年乞伏乾归复称秦王；不能把385—431年画成连续独立统治。"), periods: [{ start: 385, end: 400 }, { start: 409, end: 431 }] },
  profile("han-zhao", 304, 329, "离石 → 蒲子 → 平阳 → 长安。", ["刘渊", "刘聪", "刘曜"], [101, 102, 103], "304年刘渊称汉王，308年称帝；319年刘曜改号赵。前赵与汉赵在此为同一档案。"),
  profile("later-zhao", 319, 351, "襄国 → 邺。", ["石勒", "石虎", "石祗"], [104, 105, 106, 107]),
  profile("cheng-han", 304, 347, "成都。", ["李雄", "李寿", "李势"], [121], "304年称成都王、306年称帝建成；338年李寿改号汉。成、汉合为传统十六国中的一个政权。"),
  profile("hu-xia", 407, 431, "建国初在河套、陕北活动 → 统万；一度据长安，末期转战平凉与陇右。", ["赫连勃勃", "赫连昌", "赫连定"], [130], "413年开始营建统万城。427年失都后仍有余部，431年赫连定被吐谷浑俘获，夏国终结。"),
];

jinSixteenProfiles.find(profile => profile.polityId === "western-qin")!.sourceRefs.push("《资治通鉴》卷115 · 义熙五年七月，西秦复建，取409年纪年 — https://zh.wikisource.org/wiki/資治通鑑/卷115");
jinSixteenProfiles.find(profile => profile.polityId === "northern-yan")!.sourceRefs.push("《资治通鉴》卷123 · 元嘉十三年，冯弘弃龙城 — https://zh.wikisource.org/wiki/資治通鑑/卷123");
jinSixteenProfiles.find(profile => profile.polityId === "hu-xia")!.sourceRefs.push("《魏书》卷4上 · 神䴥四年，秦夏终局 — https://zh.wikisource.org/wiki/魏書/卷4上");

/** Includes founding/ending years: coexistence within that year, not a year-end frontier. */
export function politiesAtYear(year: number) {
  return jinSixteenProfiles.filter(profile => profile.periods.some(period => period.start <= year && year <= period.end)).map(profile => profile.polityId);
}

export const jinComparisonYears = [304, 319, 329, 347, 351, 370, 376, 383, 394, 397, 400, 405, 409, 410, 417, 420, 427, 431, 436, 439];
