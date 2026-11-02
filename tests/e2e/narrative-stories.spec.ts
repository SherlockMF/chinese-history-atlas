import { expect, test } from "@playwright/test";

test("北魏族源、力微、沙漠汗与文化连读，故事和诗文保留来源说明", async ({ page }, testInfo) => {
  await page.goto("/series/northern-wei/stories");
  await page.getByRole("link", { name: /从嘎仙洞回望/ }).click();
  await expect(page.getByRole("figure", { name: "嘎仙洞北魏祭祖祝文节选" })).toContainText("此处为祭文");
  await expect(page.locator("#migration-memory")).toContainText("神兽不能被当作实际向导");
  await page.getByRole("link", { name: /下一篇.*拓跋力微/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "拓跋力微：一匹马与两场丧事" })).toBeVisible();
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "一场吊丧的阴谋，变成了另一场丧事" }).click();
  await expect(page.locator("#funeral")).toBeInViewport();
  await expect(page.locator("#funeral")).toContainText("《北史·神元窦皇后传》");
  await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("原卷亡佚");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: `output/playwright/tuoba-liwei-${testInfo.project.name}.png` });
  await page.getByRole("link", { name: /下一篇.*沙漠汗之死/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "沙漠汗之死：归途上的飞鸟" })).toBeVisible();
  await expect(page.locator("#luoyang")).toContainText("留为质子");
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "他们害怕的，是太子回来以后" }).click();
  await expect(page.locator("#birds")).toBeInViewport();
  await expect(page.locator("#message")).toContainText("矫害");
  await expect(page.locator("#axe")).toContainText("长子");
  await page.getByText("原稿段落定位").click();
  await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北魏01 · P088–P093");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: `output/playwright/shamohan-${testInfo.project.name}.png` });
  await page.goto("/series/northern-wei/stories/wei-culture");
  await expect(page.getByRole("heading", { level: 1, name: "诗里的木兰，石上的北魏" })).toBeVisible();
  const poem = page.getByRole("figure", { name: "《木兰诗》古辞节选" });
  await expect(poem).toContainText("作者不详");
  await expect(poem).toContainText("木兰不用尚书郎");
  await poem.screenshot({ path: `output/playwright/wei-culture-poem-${testInfo.project.name}.png` });
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "一件小造像，把年号留在身边" }).click();
  await expect(page.locator("#votive-image")).toBeInViewport();
  await expect(page.locator("#votive-image")).toContainText("太平真君是北魏太武帝的年号");
  await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("不替原稿市场器物作鉴定");
  await page.getByText("原稿段落定位").click();
  await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北魏03 · P097–P098");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto("/series/northern-wei/stories/shamohan");
  await page.getByRole("link", { name: /上一篇.*拓跋力微/ }).click();
  await page.getByRole("link", { name: /上一篇.*从嘎仙洞回望/ }).click();
  await expect(page).toHaveURL(/\/stories\/xianbei-origins$/);
});

test("代国到平城八篇连续阅读，来源与原段定位均可展开", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  const slugs = ["dai-kings", "dai-succession", "shiyijian", "dai-fall", "tuoba-gui-restoration", "canhe-slope", "zhongshan-campaign", "wei-name"];
  await page.goto("/series/northern-wei/stories/shamohan");
  for (const slug of slugs) {
    await page.getByRole("link", { name: /^下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const firstSection = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").first();
    const anchor = await firstSection.getAttribute("href");
    await firstSection.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北魏");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "386、398与439，分别发生了什么" }).click();
  await expect(page.locator("#three-dates")).toBeInViewport();
  await expect(page.locator("#three-dates")).toContainText("148年");
  await page.screenshot({ path: `output/playwright/wei-name-${testInfo.project.name}.png` });
  for (const slug of slugs.slice(0, -1).reverse()) {
    await page.getByRole("link", { name: /上一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
  }
  await page.getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/shamohan$/);
});

test("宫廷与太武时代八篇连读，战事、诗词与史料分歧可定位", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const slugs = ["tuoba-gui-last-night", "wei-mothers", "mingyuan-frontiers", "taiwu-rouran", "tongwan-siege", "yuanjia-campaigns", "wei-buddhism", "cui-hao"];
  await page.goto("/series/northern-wei/stories/wei-name");
  for (const slug of slugs) {
    await page.getByRole("link", { name: /^下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const sectionLink = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await sectionLink.getAttribute("href");
    await sectionLink.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北魏");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await expect(page.locator("#regret")).toContainText("李宣城可哀");
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last().click();
  await expect(page.locator("#regret")).toBeInViewport();
  await page.screenshot({ path: `output/playwright/cui-hao-${testInfo.project.name}.png` });
  for (const slug of slugs.slice(0, -1).reverse()) {
    await page.getByRole("link", { name: /上一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
  }
  await page.getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/wei-name$/);
});

test("宗爱至太和改革七篇连读，图解可进入长文与歌谣", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const slugs = ["zong-ai", "feng-enters-palace", "feng-first-regency", "xianwen-abdication", "feng-regency", "wei-schools-law", "wei-households"];
  await page.goto("/series/northern-wei/stories/cui-hao");
  for (const slug of slugs) {
    await page.getByRole("link", { name: /^下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const link = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await link.getAttribute("href");
    await link.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北魏");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "李波小妹，为什么留在了歌里" }).click();
  await expect(page.locator("#li-bo")).toBeInViewport();
  await expect(page.getByRole("figure", { name: "《李波小妹歌》" })).toContainText("北朝歌谣");
  await page.screenshot({ path: `output/playwright/wei-households-${testInfo.project.name}.png` });
  for (const slug of slugs.slice(0, -1).reverse()) {
    await page.getByRole("link", { name: /上一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
  }
  await page.goto("/series/northern-wei");
  await page.getByRole("link", { name: "读完整故事：户籍、田地与官俸 →" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "户籍、田地与官俸：改革怎样落到乡里" })).toBeVisible();
});

test("迁都至六镇六篇连读，图解节点进入各自长文", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const slugs = ["xiaowen-luoyang", "yuan-xun", "xiaowen-southern-campaigns", "wei-reform-legacy", "xuanwu-empress-hu", "six-garrisons"];
  await page.goto("/series/northern-wei/stories/wei-households");
  for (const slug of slugs) {
    await page.getByRole("link", { name: /^下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const link = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await link.getAttribute("href");
    await link.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北魏");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  for (const slug of slugs.slice(0, -1).reverse()) {
    await page.getByRole("link", { name: /上一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
  }
  await page.goto("/series/northern-wei/stories/wei-reform-legacy");
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "户籍深入乡里，门第仍在朝廷" }).click();
  await expect(page.getByRole("figure", { name: "《乌衣巷》" })).toContainText("唐 · 刘禹锡");
  await page.screenshot({ path: `output/playwright/wei-reform-legacy-${testInfo.project.name}.png` });
  for (const [node, slug] of [["迁往洛阳", "xiaowen-luoyang"], ["边镇危机", "six-garrisons"]]) {
    await page.goto("/series/northern-wei");
    await page.getByRole("button", { name: "从洛阳新都到北镇危机", exact: true }).click();
    await page.getByRole("button", { name: node, exact: true }).click();
    await page.getByRole("link", { name: /^读本节故事/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
  }
});

test("两魏人物与三场战役连读，宫廷诗句保留版本说明", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const slugs = ["gao-huan-yuwen-tai", "xiaoguan-battle", "shayuan-battle", "heqiao-battle", "gao-cheng"];
  await page.goto(`/series/northern-qi-zhou-sui/stories/${slugs[0]}`);
  for (const [index, slug] of slugs.entries()) {
    if (index) await page.getByRole("link", { name: /^下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const link = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await link.getAttribute("href");
    await link.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北齐");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "三拳之后，皇帝念起别人的诗" }).click();
  await expect(page.getByRole("figure", { name: "元善见所咏谢灵运诗" })).toContainText("版本差异");
  await page.screenshot({ path: `output/playwright/gao-cheng-${testInfo.project.name}.png` });
  for (const slug of slugs.slice(0, -1).reverse()) {
    await page.getByRole("link", { name: /上一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
  }
});

test("北齐后期四篇连读，亡国诗与断弦诗分别署明", async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const slugs = ["gao-yang", "qi-succession-law", "gao-zhan", "gao-wei-poems"];
  await page.goto("/series/northern-qi-zhou-sui/stories/gao-cheng");
  for (const slug of slugs) {
    await page.getByRole("link", { name: /^下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const link = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await link.getAttribute("href");
    await link.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北齐");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  const poem = page.getByRole("figure", { name: "《北齐二首》其一" });
  await expect(poem).toContainText("唐·李商隐");
  await expect(poem).toContainText("小怜玉体横陈夜，已报周师入晋阳。");
  await poem.screenshot({ path: `output/playwright/gao-wei-poem-${testInfo.project.name}.png` });
  const elegy = page.getByRole("figure", { name: "《北史》所记冯小怜断弦诗" });
  await expect(elegy).toContainText("按传记所载呈现");
  await expect(elegy).toContainText("欲知心断绝，应看胶上弦。");
  for (const slug of slugs.slice(0, -1).reverse()) {
    await page.getByRole("link", { name: /上一篇/ }).click();
    await expect(page).toHaveURL(new RegExp(`/stories/${slug}$`));
  }
});

test("从朝代目录连续阅读、定位章节并打开来源", async ({ page }) => {
  await page.goto("/series/northern-qi-zhou-sui/stories");
  await page.getByRole("link", { name: /平阳城下，谁先失去了胜算/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "平阳城下，谁先失去了胜算" })).toBeVisible();
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "皇帝一走，败局才扩大" }).click();
  await expect(page).toHaveURL(/#decision$/);
  await expect(page.locator("#decision")).toBeInViewport();
  await page.getByText("原稿段落定位").click();
  await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北周 · P027–P036");
  await page.getByRole("link", { name: /下一篇.*宇文赟/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "宇文赟：太子规矩与天元皇帝" })).toBeVisible();
  await page.getByRole("link", { name: /上一篇.*平阳城下/ }).click();
  await expect(page).toHaveURL(/\/stories\/pingyang$/);
});

test("宫廷诗文保留归属说明且小屏无横向溢出", async ({ page }, testInfo) => {
  await page.goto("/series/liao/stories/xiao-guanyin");
  const poem = page.getByRole("figure", { name: "《回心院》其五" });
  await expect(poem).toContainText("作品归属存在争议");
  await expect(poem).toContainText("装绣帐。待君贶。");
  await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("仅查阅摘要");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: `output/playwright/narrative-${testInfo.project.name}.png` });
  await poem.screenshot({ path: `output/playwright/narrative-poem-${testInfo.project.name}.png` });
});

test("人物切换后显示各自的故事入口", async ({ page }) => {
  await page.goto("/series/northern-qi-zhou-sui/people");
  await page.getByRole("searchbox", { name: "搜索历史人物" }).fill("高纬");
  await page.getByRole("button", { name: "选择高纬", exact: true }).click();
  await expect(page.getByRole("region", { name: "故事长读" }).getByRole("link", { name: /平阳城下/ })).toBeVisible();
  await page.getByRole("searchbox", { name: "搜索历史人物" }).fill("杨广");
  await page.getByRole("button", { name: "选择杨广", exact: true }).click();
  const stories = page.getByRole("region", { name: "故事长读" });
  await expect(stories.getByRole("link", { name: /大军为何走向失败/ })).toBeVisible();
  await expect(stories.getByRole("link", { name: /平阳城下/ })).toHaveCount(0);
  await stories.getByRole("link", { name: /大军为何走向失败/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "大军为何走向失败" })).toBeVisible();
});

test("朝代首页及关联事件都有故事入口", async ({ page }) => {
  await page.goto("/series/jin");
  await expect(page.getByRole("link", { name: /完颜陈和尚，最后要说清的一句话/ })).toBeVisible();
  await page.goto("/explore/jin-sanfengshan?series=jin");
  await page.getByRole("link", { name: /完颜陈和尚，最后要说清的一句话/ }).click();
  await expect(page).toHaveURL(/\/series\/jin\/stories\/chen-heshang$/);
  await expect(page.getByRole("heading", { level: 1, name: /完颜陈和尚/ })).toBeVisible();
});

test("跨朝代文章地址返回404", async ({ page }) => {
  const response = await page.goto("/series/liao/stories/pingyang");
  expect(response?.status()).toBe(404);
});

test("北魏事件进入新长文并定位刺杀与末路", async ({ page }) => {
  await page.goto("/explore/wei-heyin-massacre?series=northern-wei");
  await page.getByRole("link", { name: /元子攸：刀出鞘之后/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "元子攸：刀出鞘之后" })).toBeVisible();
  await expect(page.locator("#watched")).toContainText("元昭业拦住他的马");
  await expect(page.locator("#appointments")).toContainText("虎贲、斧钺、弓矢和秬鬯");
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "假报皇子诞生，膝下藏着刀" }).click();
  await expect(page.locator("#blade")).toBeInViewport();
  await expect(page.locator("#blade")).toContainText("皇子此时尚未出生");
  await expect(page.locator("#aftermath")).toContainText("晋阳三级佛寺");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("北魏三篇按河阴、反抗、分裂连续阅读", async ({ page }, testInfo) => {
  await page.goto("/explore/wei-heyin-massacre?series=northern-wei");
  await page.getByRole("link", { name: /河阴：拥立之后，为何又想废掉皇帝/ }).click();
  await expect(page.locator("#encircled")).toContainText("二千余人");
  await expect(page.locator("#message")).toContainText("遣人");
  await page.getByRole("link", { name: /下一篇.*元子攸/ }).click();
  await page.getByRole("link", { name: /下一篇.*两位拥立者，两座朝廷/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "两位拥立者，两座朝廷" })).toBeVisible();
  await expect(page.locator("#successions")).toContainText("尔朱氏先立元晔与之对抗");
  await expect(page.locator("#two-courts")).toContainText("535年");
  await expect(page.locator("#two-courts")).toContainText("没有在这句中交代具体下毒者");
  await page.getByText("原稿段落定位").click();
  await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("北魏06 · P140–P143");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: `output/playwright/wei-split-${testInfo.project.name}.png` });
  await page.getByRole("link", { name: /上一篇.*元子攸/ }).click();
  await expect(page).toHaveURL(/\/stories\/yuan-ziyou$/);
});


test("北周末至开皇九篇连读，制度、战事与外交诗文有可用定位", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const slugs = ["zhou-xuan-emperor", "yang-jian-origins", "sui-takes-power", "sui-offices-law", "sui-capital-stores", "sui-conquers-chen", "jiangnan-rebellion", "sui-turk-diplomacy", "sui-prosperity-ledger"];
  await page.goto("/series/northern-qi-zhou-sui/stories/pingyang");
  await expect(page.locator("#march-575")).toContainText("575");
  await expect(page.locator("#monasteries-and-households")).toContainText("三百万");
  for (const slug of slugs) {
    await page.getByRole("link", { name: /^下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const firstSection = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").first();
    const anchor = await firstSection.getAttribute("href");
    await firstSection.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("P");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (slug === "sui-offices-law") await expect(page.locator("#death-review")).toContainText("595");
    if (slug === "sui-turk-diplomacy") {
      await expect(page.locator("#whose-salutation")).toContainText("611");
      const poem = page.getByRole("figure", { name: "大义公主《屏风诗》" });
      await expect(poem).toContainText("余本皇家子，飘流入虏庭。");
      await poem.screenshot({ path: "output/playwright/dayi-poem-" + testInfo.project.name + ".png" });
    }
  }
  for (const slug of slugs.slice(0, -1).reverse()) {
    await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /上一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
  }
});

test("隋中十三篇连续阅读，宫廷与远征异说保留来源", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const slugs = ["renshou-palace", "dugu-empress", "yang-yong-heir", "yang-guang-succession", "renshou-succession", "yang-brothers", "shi-wansui", "sui-canals-capital", "sui-examinations", "sui-western-tour", "sui-southern-expeditions", "sui-khitan-campaign", "sui-japanese-envoys"];
  await page.goto("/series/northern-qi-zhou-sui/stories/sui-prosperity-ledger");
  for (const slug of slugs) {
    await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const entry = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").first();
    const anchor = await entry.getAttribute("href");
    await entry.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("隋（中）");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (slug === "renshou-succession") await expect(page.locator("#accusation-in-617")).toContainText("不能独立证明");
    if (slug === "sui-canals-capital") await expect(page.locator("#yuan-locks")).toContainText("1293");
    if (slug === "sui-japanese-envoys") {
      await expect(page.locator("#east-and-west")).toContainText("没有给出杨广");
      await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: "东天皇与西皇帝，留下了什么证据" }).click();
      await expect(page.locator("#east-and-west")).toBeInViewport();
      await page.screenshot({ path: "output/playwright/sui-envoys-" + testInfo.project.name + ".png" });
    }
  }
  await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/sui-khitan-campaign$/);
});

test("隋末九篇连续阅读，歌辞、战事与墓葬证据可定位", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const slugs = ["sui-imperial-tours", "sui-goguryeo", "wang-bo-song", "sui-wagang", "sui-regional-powers", "sui-jiangdu-coup", "jinyang-uprising", "yang-guang-poems", "yang-guang-tomb"];
  await page.goto("/series/northern-qi-zhou-sui/stories/sui-japanese-envoys");
  for (const slug of slugs) {
    await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const entry = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await entry.getAttribute("href");
    await entry.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("隋（下）");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (slug === "wang-bo-song") {
      await expect(page.getByRole("figure")).toContainText("无向辽东浪死歌");
      await page.getByRole("figure").screenshot({ path: "output/playwright/wang-bo-song-" + testInfo.project.name + ".png" });
    }
    if (slug === "sui-regional-powers") await expect(page.locator("#liu-after-xia")).toContainText("623");
    if (slug === "jinyang-uprising") await expect(page.locator("#wen-dayas-record")).toContainText("温大雅");
    if (slug === "yang-guang-poems") {
      await expect(page.getByRole("figure", { name: "《春江花月夜》其一", exact: true })).toContainText("流波将月去");
      await page.getByRole("figure", { name: "《春江花月夜》其一", exact: true }).screenshot({ path: "output/playwright/yang-guang-poem-" + testInfo.project.name + ".png" });
    }
  }
  await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/yang-guang-poems$/);
});


test("南朝刘裕五篇从人物入口连续阅读，诗词与史源可定位", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await page.goto("/series/southern-dynasties/people");
  await page.getByRole("searchbox", { name: "搜索历史人物" }).fill("刘裕");
  await page.getByRole("button", { name: "选择刘裕", exact: true }).click();
  await page.getByRole("region", { name: "故事长读" }).getByRole("link", { name: /寄奴出京口/ }).click();
  const slugs = ["liu-yu-origins", "huan-xuan-fall", "liu-yu-northern-campaigns", "liu-yu-shu-campaign", "liu-song-founding"];
  for (const [index, slug] of slugs.entries()) {
    if (index) await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const entry = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await entry.getAttribute("href");
    await entry.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("南朝01");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (slug === "liu-yu-origins") {
      const poem = page.getByRole("figure", { name: "永遇乐·京口北固亭怀古", exact: true });
      await expect(poem).toContainText("金戈铁马");
      await poem.screenshot({ path: "output/playwright/liu-yu-poem-" + testInfo.project.name + ".png" });
    }
    if (slug === "liu-yu-shu-campaign") await expect(page.locator("#two-banks-at-pingmo")).toContainText("413年");
    if (slug === "liu-song-founding") await expect(page.locator("#limits-on-staff")).toContainText("兵士不在这个限额里");
  }
});

test("刘宋后续五篇连续阅读，宫变纪年、联句与原稿可定位", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const slugs = ["liu-song-deposition", "liu-yilong-northern-campaigns", "liu-shao-coup", "liu-song-palace-violence", "liu-song-last-emperors"];
  await page.goto("/series/southern-dynasties/stories/liu-song-founding");
  for (const slug of slugs) {
    await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const entry = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await entry.getAttribute("href");
    await entry.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("南朝02");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (slug === "liu-song-deposition") await expect(page.getByRole("figure")).toContainText("一旦失风水");
    if (slug === "liu-shao-coup") {
      await expect(page.locator("#the-drums-at-xinting")).toContainText("四月，他就在这里即皇帝位");
      await expect(page.locator("#the-well-and-the-city")).toContainText("五月");
      const poem = page.getByRole("figure", { name: "建康歌谣", exact: true });
      await expect(poem).toContainText("前见子杀父");
      await poem.screenshot({ path: "output/playwright/jiankang-song-" + testInfo.project.name + ".png", style: "header, nav { visibility: hidden; }" });
    }
    if (slug === "liu-song-palace-violence") await expect(page.locator("#another-emperor-upstream")).toContainText("466年正月");
    if (slug === "liu-song-last-emperors") await expect(page.locator("#leaving-the-palace")).toContainText("四月禅位");
  }
  await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/liu-song-palace-violence$/);
});

test("南齐五篇连续阅读，检籍、父子遗书与宫市歌谣可定位", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const slugs = ["qi-founding-yongming", "qi-household-registers", "xiao-zixiang", "qi-succession-xiao-luan", "donghun-xiao-yan"];
  await page.goto("/series/southern-dynasties/stories/liu-song-last-emperors");
  for (const slug of slugs) {
    await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const entry = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await entry.getAttribute("href");
    await entry.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("南朝03");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (slug === "qi-household-registers") await expect(page.locator("#tang-uprising")).toContainText("486年正月");
    if (slug === "xiao-zixiang") await expect(page.locator("#the-letter")).toContainText("射堂");
    if (slug === "qi-succession-xiao-luan") {
      await expect(page.locator("#music-in-mourning")).toContainText("萧坦之");
      await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("P151");
      const poem = page.getByRole("figure", { name: "《修柏赋》节录", exact: true });
      await expect(poem).toContainText("柏树与群木不同");
      await poem.screenshot({ path: "output/playwright/xiubai-fu-" + testInfo.project.name + ".png", style: "header, nav { visibility: hidden; }" });
    }
    if (slug === "donghun-xiao-yan") {
      await expect(page.locator("#the-river-campaign")).toContainText("501年三月");
      const poem = page.getByRole("figure", { name: "阅武堂歌", exact: true });
      await expect(poem).toContainText("潘妃酤酒");
      await poem.screenshot({ path: "output/playwright/qi-palace-song-" + testInfo.project.name + ".png", style: "header, nav { visibility: hidden; }" });
    }
  }
  await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/qi-succession-xiao-luan$/);
});


test("梁初至侯景六篇连续阅读，诗歌全文与原稿定位可用", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const slugs = ["xiao-yan-rise", "liang-family-indulgence", "liang-government", "xiao-yan-poetry", "liang-emperor-buddhism", "hou-jing-defection"];
  await page.goto("/series/southern-dynasties/stories/donghun-xiao-yan");
  for (const slug of slugs) {
    await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const entry = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await entry.getAttribute("href");
    await entry.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText(slug === "hou-jing-defection" ? "南朝05" : "南朝04");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (slug === "xiao-yan-poetry") {
      const poem = page.getByRole("figure", { name: "河中之水歌", exact: true });
      await expect(poem).toContainText("卢家");
      await poem.screenshot({ path: "output/playwright/liang-poetry-" + testInfo.project.name + ".png", style: "header, nav { visibility: hidden; }" });
    }
  }
  await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/liang-emperor-buddhism$/);
});


test("辽初五篇连续阅读，史源与白沟诗文可定位", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const slugs = ["khitan-origins","liao-beijing-temples","abaoji-rise","abaoji-brothers-salt-feast","liao-capital-scripts"];
  await page.goto("/series/liao/stories/khitan-origins");
  for (const [index, slug] of slugs.entries()) {
    if (index) await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /下一篇/ }).click();
    await expect(page).toHaveURL(new RegExp("/stories/" + slug + "$"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const entry = page.getByRole("navigation", { name: "本篇目录" }).getByRole("link").last();
    const anchor = await entry.getAttribute("href");
    await entry.click();
    await expect(page.locator(anchor!)).toBeInViewport();
    await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《");
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("辽01");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    if (slug === "liao-capital-scripts") {
      const poem = page.getByRole("figure", { name: "过白沟河", exact: true });
      await expect(poem).toContainText("两朝曾此界中州");
      await poem.screenshot({ path: "output/playwright/baigou-poem-" + testInfo.project.name + ".png", style: "header, nav { visibility: hidden; }" });
    }
  }
  await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/abaoji-brothers-salt-feast$/);
});


test("金中都开篇连读，迁都时序与吴山诗可定位", async ({ page }, testInfo) => {
  await page.goto("/series/jin/stories/jin-beijing-origins");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /下一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/hailing-moves-zhongdu$/);
  await expect(page.locator("#capital-and-power")).toContainText("1153");
  await expect(page.locator("#ancestors-follow")).toContainText("1155");
  await page.getByRole("navigation", { name: "本篇目录" }).getByRole("link", { name: /把新都建起来的人/ }).click();
  await expect(page.locator("#builders")).toBeInViewport();
  await expect(page.getByRole("region", { name: "阅读依据" })).toContainText("《金史》");
  await page.getByText("原稿段落定位").click();
  await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText("金01");
  const poem = page.getByRole("figure", { name: "题临安湖山图诗（传）", exact: true });
  await expect(poem).toContainText("盍混同");
  await poem.screenshot({ path: "output/playwright/wushan-poem-" + testInfo.project.name + ".png", style: "header, nav { visibility: hidden; }" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("navigation", { name: "前后篇" }).getByRole("link", { name: /上一篇/ }).click();
  await expect(page).toHaveURL(/\/stories\/jin-beijing-origins$/);
});
