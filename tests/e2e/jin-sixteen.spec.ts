import { expect, test } from "@playwright/test";

const root = "/series/jin-sixteen-kingdoms";

test("Jin topics separate the 304 opening, Western Jin background and Eastern Jin context", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await page.goto(root);
  await expect(page.getByRole("complementary", { name: "时代前因与并行专题" })).toContainText("八王之乱始于291年");
  await expect(page.getByTestId("narrative-atlas")).toHaveAttribute("data-rendered-year", "382");
  await page.screenshot({ path: testInfo.outputPath("sixteen-home.png"), fullPage: true });
  await page.getByRole("link", { name: /从304年诸国兴起开始/ }).click();
  await expect(page).toHaveURL(/year=304&sequence=two-zhaos&step=liu-yuan-founds-han/, { timeout: 30_000 });
  await expect(page.getByRole("heading", { level: 2, name: "刘渊称汉王", exact: true })).toBeVisible();
  await expect(page.getByText("事件 304 年 · 背景地图 304 年", { exact: true })).toBeVisible();
  await page.goto("/series/western-jin");
  await expect(page.getByRole("heading", { level: 1, name: "西晋", exact: true })).toBeVisible();
  await page.goto("/series/western-jin/timeline?year=265");
  await expect(page.getByRole("link", { name: /司马炎代魏建晋/ }).first()).toBeVisible();
  await page.goto("/series/eastern-jin");
  await expect(page.getByRole("heading", { level: 1, name: "东晋", exact: true })).toBeVisible();
  await page.goto("/explore/jin-fei-river?year=383&series=eastern-jin&sequence=former-qin-fei&step=fei-river");
  const back = page.getByRole("link", { name: "返回地图推演", exact: true });
  await expect(back).toHaveAttribute("href", "/series/eastern-jin/map?year=383&sequence=former-qin-fei&step=fei-river");
  await back.click();
  await expect(page).toHaveURL(/\/series\/eastern-jin\/map\?/, { timeout: 30_000 });
  await expect(page.getByRole("region", { name: "东晋地图推演", exact: true })).toBeVisible();
});
test("Jin completed maps disclose reconstructed edges and keep capitals in place", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await page.goto(root);
  const map = page.getByTestId("narrative-atlas");
  for (const year of [327, 366, 395, 409, 382, 281, 449]) {
    await page.getByRole("button", { name: year === 449 ? "449 · 尾声" : String(year), exact: true }).click();
    await expect(map).toHaveAttribute("data-rendered-year", String(year));
    if ([327, 366, 395, 409].includes(year)) {
      await expect(page.getByTestId("map-coverage-note")).toContainText("完整格局示意");
      await expect(page.getByTestId("map-coverage-note")).toBeVisible();
      await expect(map.locator("[data-map-capital]").first()).toHaveClass(/size-11/);
      await expect(map.locator(".narrative-map-node")).toHaveCount(0);
      if (year === 409) {
        await page.getByRole("group", { name: "本图政权" }).getByRole("button", { name: "谯蜀", exact: true }).click();
        await expect(page.getByRole("heading", { name: "谯蜀", exact: true })).toBeVisible();
      }
      await map.screenshot({ path: testInfo.outputPath(`coverage-${year}.png`) });
    } else {
      await expect(page.getByTestId("map-coverage-note")).toHaveCount(0);
    }
  }
});

test("Jin autoplay visibly draws a route and advances same-year steps", async ({ page }, testInfo) => {
  test.setTimeout(60000);
  await page.goto(`/series/western-jin/map?year=280&sequence=jin-conquers-wu&step=upper-yangtze`);
  await expect(page.getByTestId("narrative-atlas")).toHaveAttribute("data-rendered-year", "281");
  const explorer = page.getByRole("region", { name: "西晋地图推演", exact: true });
  await expect(explorer.getByRole("button", { name: "开始播放", exact: true })).toHaveText("自动推演");
  await explorer.getByRole("button", { name: "开始播放", exact: true }).click();
  await expect(explorer.getByRole("status")).toContainText("正在自动推演");
  await expect(explorer.getByRole("progressbar", { name: "当前步骤播放进度" })).toBeVisible();
  await expect(explorer.getByText(/秒后进入：打通中游，进抵武昌/)).toBeVisible();
  const route = page.getByTestId("narrative-route-reveal");
  await expect(route).toBeVisible();
  const segment = route.locator("line").first();
  await expect.poll(() => segment.evaluate(node => parseFloat(getComputedStyle(node).strokeDashoffset))).toBeLessThan(70);
  await expect(page.getByTestId("narrative-phase")).toContainText("白帝 → 西陵");
  await expect(page.getByTestId("narrative-traveller")).toBeVisible();
  await expect(page.getByRole("button", { name: "查看地点：白帝", exact: true })).toHaveAttribute("data-node-state", "active");
  await explorer.getByRole("button", { name: "暂停播放", exact: true }).click();
  await expect(explorer.getByRole("status")).toContainText("已暂停");
  const progress = explorer.getByRole("progressbar", { name: "当前步骤播放进度" });
  const paused = await progress.getAttribute("aria-valuenow");
  await page.waitForTimeout(1200);
  await expect(progress).toHaveAttribute("aria-valuenow", paused!);
  await page.getByTestId("narrative-atlas").screenshot({ path: testInfo.outputPath("route-paused.png") });
  await explorer.getByRole("button", { name: "开始播放", exact: true }).click();
  await expect(page.getByTestId("narrative-phase")).toContainText("停留阅读", { timeout: 12000 });
  await expect(page.getByRole("button", { name: "查看地点：西陵", exact: true })).toHaveAttribute("data-node-state", "active");
  await expect(explorer.getByRole("heading", { name: "打通中游，进抵武昌", exact: true })).toBeVisible({ timeout: 10000 });
  await expect(page).toHaveURL(/year=280.*step=middle-yangtze/);
  await explorer.getByRole("button", { name: "暂停播放", exact: true }).click();
  await explorer.getByRole("button", { name: "下一步", exact: true }).click();
  await explorer.getByRole("button", { name: "开始播放", exact: true }).click();
  await expect(explorer.getByRole("status")).toContainText("本组推演已结束", { timeout: 16000 });
  await expect(explorer.getByRole("button", { name: "重新播放", exact: true })).toBeEnabled();
  await explorer.getByRole("button", { name: "重新播放", exact: true }).click();
  await expect(explorer.getByRole("heading", { name: "从巴蜀顺流而下", exact: true })).toBeVisible();
  await explorer.getByRole("button", { name: "暂停播放", exact: true }).click();
});

test("Jin panorama, six narratives, event return and shared topics", async ({ page }) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const checkWidth = async () => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.goto(root);
  await expect(page.getByRole("heading", { level: 1, name: "五胡十六国", exact: true })).toBeVisible();
  await expect(page.getByTestId("narrative-atlas")).toHaveAttribute("data-rendered-year", "382");
  await checkWidth();
  await page.getByRole("group", { name: "本图政权", exact: true }).getByRole("button", { name: "前秦", exact: true }).click();
  await expect(page).toHaveURL(/dynasty=former-qin/);
  await page.reload();
  await expect(page.getByRole("heading", { level: 2, name: "前秦", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "进入淝水推演" }).click();
  await expect(page).toHaveURL(/\/map\?.*sequence=three-qins/, { timeout: 30_000 });
  await expect(page.getByLabel("选择推演")).toHaveValue("three-qins");
  await expect(page.getByLabel("选择推演").locator("option")).toHaveCount(6);
  await page.getByRole("button", { name: "下一步", exact: true }).click();
  const stepUrl = page.url();
  const title = await page.getByRole("region", { name: "五胡十六国地图推演" }).getByRole("heading", { level: 2 }).textContent();
  await page.reload();
  await expect(page.getByRole("heading", { level: 2, name: title!, exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "开始播放", exact: true })).toBeVisible();
  await page.getByRole("link", { name: /·.*↗/ }).filter({ hasText: /\d{3}/ }).first().click();
  await expect(page.getByRole("link", { name: "返回地图推演", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "返回地图推演", exact: true }).click();
  await expect(page).toHaveURL(stepUrl);
  await checkWidth();
  await page.getByRole("button", { name: "全景浏览", exact: true }).click();
  for (const year of [281, 327, 366, 382, 395, 409]) {
    await page.getByRole("group", { name: "地图年代" }).getByRole("button", { name: String(year), exact: true }).click();
    await expect(page.getByTestId("narrative-atlas")).toHaveAttribute("data-rendered-year", String(year));
  }
  await page.getByRole("button", { name: "449 · 尾声", exact: true }).click();
  await expect(page.getByText(/统一后的局势/)).toBeVisible();
  await page.goto(`${root}/people`);
  await expect(page.getByRole("heading", { name: "苻坚", exact: true })).toBeVisible();
  const portrait = page.getByRole("img", { name: "苻坚画像", exact: true }).first();
  await expect.poll(() => portrait.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  await page.goto(`${root}/sources`);
  await expect(page.getByText(/未使用独立的两晋十六国逐字稿/)).toBeVisible();
  await checkWidth();
  await page.goto(`/explore/wei-unifies-north?year=439&series=jin-sixteen-kingdoms`);
  await expect(page.getByRole("link", { name: "返回时间线 · 439 年" })).toHaveAttribute("href", `${root}/timeline?year=439#timeline`);
  expect(errors).toEqual([]);
});

test("all six Jin narratives remain readable with reduced motion and a failed map", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { value: function (type: string, ...args: unknown[]) {
      return type.includes("webgl") ? null : Reflect.apply(original, this, [type, ...args]);
    } });
  });
  await page.goto(`${root}/map?sequence=hexi-liang`);
  await expect(page.getByText("互动地图暂时无法显示", { exact: true })).toBeVisible();
  const select = page.getByLabel("选择推演");
  for (const id of ["hexi-liang", "yan-successions", "three-qins", "two-zhaos", "cheng-han-rise-fall", "xia-rise-fall"]) {
    await select.selectOption(id);
    await expect(page.getByRole("button", { name: "上一步", exact: true })).toBeDisabled();
    await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
    await expect(page.getByText("本步骤的史料依据", { exact: true })).toBeVisible();
    const next = page.getByRole("button", { name: "下一步", exact: true });
    let count = 0;
    while (await next.isEnabled()) {
      await next.click();
      if (++count > 15) throw new Error("Narrative did not terminate");
    }
    expect(count).toBeGreaterThan(0);
  }
});

test("543211 groups preserve the Wei conclusion, related campaigns and event return links", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await page.goto(root);
  const mainlines = page.getByRole("region", { name: "543211：十六国分组" });
  await expect(mainlines.getByRole("link")).toHaveCount(6);
  await expect(mainlines.getByRole("heading", { level: 3 })).toHaveText(["五凉", "四燕", "三秦", "二赵", "一成", "一夏"]);
  for (const [index, id] of ["hexi-liang", "yan-successions", "three-qins", "two-zhaos", "cheng-han-rise-fall", "xia-rise-fall"].entries()) await expect(mainlines.getByRole("link").nth(index)).toHaveAttribute("href", new RegExp(`sequence=${id}&step=`));
  await expect(page.getByRole("link", { name: /北魏如何收束北方/ })).toHaveAttribute("href", `${root}/map?year=386&sequence=wei-unification&step=wei-founded`);
  await expect(mainlines).not.toContainText("桓温北伐");
  await expect(mainlines).not.toContainText("刘裕北伐");
  await expect(page.getByTestId("narrative-atlas")).toHaveAttribute("data-rendered-year", "382");
  await page.screenshot({ path: testInfo.outputPath("543211-home.png"), fullPage: true });
  await page.screenshot({ path: testInfo.outputPath("543211-first-screen.png") });
  await mainlines.getByRole("link", { name: /二赵/ }).click();
  await expect(page).toHaveURL(/\/map\?.*sequence=two-zhaos/, { timeout: 30_000 });
  await expect(page.getByLabel("选择推演")).toHaveValue("two-zhaos");
  await expect(page.getByLabel("选择推演").locator("option")).toHaveCount(6);
  await page.getByRole("button", { name: "下一步", exact: true }).click();
  await expect(page.getByRole("heading", { name: "同称赵国，各据一方", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "下一步", exact: true }).click();
  const returnUrl = page.url();
  await page.getByRole("link", { name: /329 · 石勒消灭刘曜势力/ }).click();
  await page.getByRole("link", { name: "返回地图推演", exact: true }).click();
  await expect(page).toHaveURL(returnUrl, { timeout: 30_000 });
  for (const [sequence, step, year, title] of [
    ["yan-successions", "canhebei-turn", 395, "参合陂战败，燕魏力量转折"],
    ["hexi-liang", "southern-liang-ends", 414, "西秦攻取乐都，南凉结束"],
    ["three-qins", "western-qin-ends", 431, "西秦降夏，三秦全部退场"],
    ["cheng-han-rise-fall", "cheng-han-ends", 347, "成都被攻破，成汉结束"],
    ["xia-rise-fall", "xia-ends", 431, "西秦亡于夏，夏国随后终结"],
    ["wei-unification", "northern-liang", 439, "姑臧降魏，南北格局形成"],
    ["sixteen-foundations", "liu-yuan-founds-han", 304, "刘渊称汉王"],
    ["huan-wen-expeditions", "guanzhong", 354, "抵达灞上，补给决定退兵"],
  ] as const) {
    await page.goto(`${root}/map?year=${year}&sequence=${sequence}&step=${step}`);
    await expect(page.getByRole("heading", { level: 2, name: title, exact: true })).toBeVisible();
    await expect(page.getByLabel("选择推演")).toHaveValue(sequence);
  }
  await expect(page.getByText("延伸阅读 · 把这条线索放回时代的交错中。", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByLabel("选择推演")).toHaveValue("huan-wen-expeditions");
  await page.getByRole("link", { name: /354 · 桓温北伐至灞上/ }).click();
  await expect(page.getByRole("link", { name: "返回地图推演", exact: true })).toHaveAttribute("href", `${root}/map?year=354&sequence=huan-wen-expeditions&step=guanzhong`);
});

test("Jin keyboard controls, map inspection and switching topics stop playback", async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  await page.goto(`${root}/map?year=383&sequence=former-qin-fei&step=fei-river`);
  const map = page.getByTestId("narrative-atlas");
  await expect(map).toHaveAttribute("data-rendered-year", "382");
  const first = map.getByRole("button", { name: "查看地点：寿阳", exact: true });
  const second = map.getByRole("button", { name: "查看地点：淝水战区", exact: true });
  await expect(first).toBeVisible();
  await expect(second).toBeVisible();
  const a = (await first.boundingBox())!;
  const b = (await second.boundingBox())!;
  expect(a.y + a.height <= b.y || b.y + b.height <= a.y || a.x + a.width <= b.x || b.x + b.width <= a.x).toBe(true);
  await first.click();
  await expect(page.getByRole("heading", { name: "寿阳", exact: true })).toBeVisible();
  await second.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "淝水战区", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "开始播放", exact: true }).click();
  await expect(page.getByRole("button", { name: "暂停播放", exact: true })).toBeVisible();
  await map.hover();
  await page.mouse.wheel(0, -50);
  await expect(page.getByRole("button", { name: "开始播放", exact: true })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("jin-narrative.png"), fullPage: true });
  await page.getByRole("button", { name: "下一步", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/step=fragmentation/);
  await page.getByRole("banner").getByRole("link", { name: "切换专题", exact: true }).click();
  await page.locator('a[href="/series/northern-wei"]').click();
  await expect(page).toHaveURL(/\/series\/northern-wei(?:\?|$)/, { timeout: 30_000 });
  await expect(page.getByRole("heading", { level: 1, name: "北魏", exact: true })).toBeVisible();
  expect(page.url()).not.toContain("sequence=");
  await expect(page.getByTestId("narrative-atlas")).toHaveCount(0);
  await page.getByRole("banner").getByRole("link", { name: "切换专题", exact: true }).click();
  await page.locator(`a[href="${root}"]`).click();
  await expect(page).toHaveURL(new RegExp(`${root}(?:\\?|$)`), { timeout: 30_000 });
  await expect(page.getByRole("button", { name: "全景浏览", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(map).toHaveAttribute("data-rendered-year", "382");
});
