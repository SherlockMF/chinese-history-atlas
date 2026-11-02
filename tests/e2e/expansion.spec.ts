import { expect, test } from "@playwright/test";

const topics = [
  { slug: "northern-wei", title: "北魏", year: 494, event: "北魏迁都洛阳", person: "元宏" },
  { slug: "liao", title: "辽与西辽", year: 1005, event: "澶渊之盟", person: "萧绰" },
  { slug: "jin", title: "金与金中都", year: 1153, event: "迁都燕京，改为中都", person: "完颜亮" },
  { slug: "western-xia", title: "西夏", year: 1038, event: "李元昊称帝，西夏建立", person: "李元昊" },
  { slug: "dali", title: "南诏与大理", year: 937, event: "段思平建立大理国", person: "段思平" },
  { slug: "southern-dynasties", title: "南朝 · 宋齐梁陈", year: 548, event: "侯景起兵反梁", person: "萧衍" },
];

for (const topic of topics) test(`${topic.title}: home, timeline, people, map and sources`, async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const root = `/series/${topic.slug}`;
  const checkWidth = async () => expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.goto(root);
  await expect(page.getByRole("heading", { level: 1, name: topic.title, exact: true })).toBeVisible();
  await expect(page.locator("#reading-paths").getByRole("link", { name: /开始阅读/ })).toHaveCount(3);
  await checkWidth();
  await page.goto(`${root}/timeline?year=${topic.year}`);
  const event = page.getByRole("link", { name: `查看${topic.event}详情` });
  await expect(event).toBeVisible();
  await expect(event).toHaveAttribute("href", new RegExp(`series=${topic.slug}`));
  await event.click();
  await expect(page.getByRole("heading", { level: 1, name: topic.event, exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /返回时间线/ })).toHaveAttribute("href", `${root}/timeline?year=${topic.year}#timeline`);
  await checkWidth();
  await page.goto(`${root}/people`);
  await expect(page.getByRole("heading", { name: topic.person, exact: true })).toBeVisible();
  const portrait = page.getByRole("img", { name: new RegExp(topic.person) }).first();
  await expect(portrait).toBeVisible();
  await expect.poll(() => portrait.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
  const life = page.getByRole("region", { name: `${topic.person}的生平事件` });
  await expect(life.getByRole("link", { name: /在地图查看/ }).first()).toHaveAttribute("href", new RegExp(`${root}/map`));
  await checkWidth();
  await page.goto(`${root}/map?year=${topic.year}`);
  await expect(page.getByRole("region", { name: `${topic.title}阶段地图` })).toBeVisible();
  await expect(page.getByRole("slider", { name: "地图年份" })).toHaveValue(String(topic.year));
  await expect(page.getByTestId("snapshot-atlas")).toHaveAttribute("data-rendered-year", /\d+/);
  await expect(page.getByRole("group", { name: "本阶段政权" }).getByRole("button").first()).toBeVisible();
  await checkWidth();
  await page.goto(`${root}/sources`);
  await expect(page.getByRole("heading", { name: "资料来源与阅读说明", exact: true })).toBeVisible();
  await page.locator("summary").filter({ hasText: topic.event }).click();
  await expect(page.getByRole("link", { name: "阅读完整事件 →" }).first()).toHaveAttribute("href", new RegExp(`series=${topic.slug}`));
  await checkWidth();
  expect(errors).toEqual([]);
});

test("shared events retain the chosen series and maps switch between original atlas years", async ({ page, isMobile }) => {
  for (const [slug, eventId, year] of [["northern-wei", "wei-split-eastern-wei", 534], ["liao", "liao-founded", 916], ["jin", "liao-tianzuo-captured", 1125], ["southern-dynasties", "sui-conquers-chen", 589]] as const) {
    await page.goto(`/explore/${eventId}?year=${year}&series=${slug}`);
    await expect(page.getByRole("link", { name: /返回时间线/ })).toHaveAttribute("href", `/series/${slug}/timeline?year=${year}#timeline`);
    const nav = page.getByRole("navigation", { name: isMobile ? "移动端主要导航" : "主要导航", exact: true });
    await expect(nav.getByRole("link", { name: "人物", exact: true })).toHaveAttribute("href", `/series/${slug}/people?year=${year}`);
  }
  await page.goto("/series/southern-dynasties/map?year=450");
  await expect(page.getByText(/当前显示 449 年地图/)).toBeVisible();
  await page.getByRole("group", { name: "地图阶段" }).getByRole("button", { name: "572", exact: true }).click();
  await expect(page.getByTestId("snapshot-atlas")).toHaveAttribute("data-rendered-year", "572");
  await expect(page.getByRole("group", { name: "本阶段政权" }).getByRole("button", { name: "南陈", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("group", { name: "本阶段政权" }).getByRole("button", { name: "北周", exact: true })).toBeVisible();
  await expect(page).toHaveURL(/year=572/);
});

test("all expansion atlas stages render territory layers and retain original years", async ({ page }) => {
  test.setTimeout(60_000);
  for (const [slug, years] of Object.entries({ "northern-wei": [449,497], liao: [1111,1142,1208], jin: [1142,1208], "western-xia": [1111,1142,1208], dali: [879,1111,1142,1208], "southern-dynasties": [449,497,546,572] })) {
    await page.goto(`/series/${slug}/map?year=${years[0]}`);
    for (const year of years) {
      await page.getByRole("group", { name: "地图阶段" }).getByRole("button", { name: String(year), exact: true }).click();
      await expect(page.getByTestId("snapshot-atlas")).toHaveAttribute("data-rendered-year", String(year));
      await expect(page.getByTestId("snapshot-atlas").locator("canvas")).toBeVisible();
      await expect(page.getByTestId("snapshot-atlas").getByRole("alert")).toHaveCount(0);
    }
  }
});

test("unknown topics remain 404s", async ({ page }) => {
  const response = await page.goto("/series/not-a-series/sources");
  expect(response?.status()).toBe(404);
});
