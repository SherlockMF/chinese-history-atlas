import { expect, test } from "@playwright/test";

const batch: Array<{ series: string; slug: string; title: string; source: string }> = [
  { series: "five-dynasties", slug: "huangchao-uprising", title: "晚唐的裂缝与黄巢起兵", source: "五代十国01" },
  { series: "five-dynasties", slug: "huangchao-south-and-return", title: "招安、南下与北返", source: "五代十国01" },
  { series: "five-dynasties", slug: "huangchao-daqi", title: "黄巢入长安：大齐、皮日休与士族", source: "五代十国01" },
  { series: "five-dynasties", slug: "shatuo-li-keyong", title: "沙陀兵、朱温与十三太保", source: "五代十国01" },
  { series: "five-dynasties", slug: "shangyuan-feud", title: "黄巢败亡与上源驿的仇怨", source: "五代十国01" },
  { series: "liao", slug: "muzong-black-mountain", title: "睡王的宫廷与黑山之变", source: "辽02" },
  { series: "liao", slug: "jingzong-frail-court", title: "病弱的景宗与被他启用的人", source: "辽02" },
  { series: "liao", slug: "sixteen-prefectures-barrier", title: "十六州究竟挡住了什么", source: "辽02" },
  { series: "liao", slug: "northern-han-buffer", title: "夹在辽宋之间的北汉", source: "辽02" },
  { series: "liao", slug: "gaolianghe-relief", title: "高梁河：城墙、地道与换旗的援军", source: "辽02" },
  { series: "liao", slug: "waqiao-succession", title: "高梁河之后：瓦桥关与景宗托孤", source: "辽02" },
  { series: "liao", slug: "han-derang-power", title: "韩德让为何能进入皇族的权力中心", source: "辽03" },
  { series: "liao", slug: "yongxi-eastern-route", title: "雍熙北伐东路：军粮、争功与岐沟关", source: "辽03" },
  { series: "liao", slug: "chenjiagu", title: "陈家谷没有等来的援军", source: "辽03" },
  { series: "liao", slug: "xiulunhe-yinjilun", title: "名将也会轻敌：休哥与尹继伦", source: "辽03" },
  { series: "liao", slug: "wang-jizhong", title: "王继忠：两朝之间的说客", source: "辽03" },
  { series: "liao", slug: "chanzhou-crisis", title: "澶州危局：皇帝过河以前与以后", source: "辽03" },
  { series: "liao", slug: "cao-liyong-treaty", title: "曹利用的三十万与盟约之后", source: "辽03" },
  { series: "liao", slug: "shengzong-chaimu", title: "圣宗亲政与燔柴礼的完整过程", source: "辽03" },
  { series: "liao", slug: "shengzong-seal-poem", title: "玉玺诗里的天下与圣宗的身后评价", source: "辽03" },
  { series: "liao", slug: "xingzong-two-mothers", title: "兴宗的两位母亲", source: "辽04" },
  { series: "liao", slug: "chongxi-tribute-war", title: "从重熙增币到对夏败战", source: "辽04" },
  { series: "liao", slug: "luoyiqing-shuanglu", title: "罗衣轻、双陆赌城与兴宗的失意", source: "辽04" },
  { series: "liao", slug: "huangtaishu-rebellion", title: "皇太弟没有等到的皇位", source: "辽04" },
  { series: "liao", slug: "yeluyixin-power", title: "耶律乙辛怎样把权力握在手里", source: "辽04" },
  { series: "liao", slug: "xiao-guanyin-supplement", title: "萧观音：诗文怎样变成罪证", source: "辽04" },
  { series: "liao", slug: "taizi-harmed", title: "太子被害之后：皇孙的生路与乙辛败亡", source: "辽04" },
  { series: "liao", slug: "tianzuo-accession", title: "天祚即位：平反与被赶走的谏臣", source: "辽05" },
  { series: "liao", slug: "haidongqing-touyu", title: "海东青、头鱼宴与阿骨打起兵", source: "辽05" },
];

test("2026-10批次：故事连读、目录定位与原稿明细", async ({ page }, testInfo) => {
  test.setTimeout(120_000);
  await page.goto("/series/five-dynasties/stories");
  for (const item of batch.filter((x) => x.series === "five-dynasties")) {
    await expect(page.getByRole("link", { name: item.title })).toBeVisible();
  }
  await page.goto("/series/liao/stories");
  for (const item of batch.filter((x) => x.series === "liao")) {
    await expect(page.getByRole("link", { name: item.title })).toBeVisible();
  }
  for (const item of batch) {
    await page.goto(`/series/${item.series}/stories/${item.slug}`);
    await expect(page.getByRole("heading", { level: 1, name: item.title })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "本篇目录" })).toBeVisible();
    await page.getByText("原稿段落定位").click();
    await expect(page.getByRole("region", { name: "原稿定位明细" })).toContainText(item.source);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.screenshot({ path: `output/playwright/batch-10-${item.slug}-${testInfo.project.name}.png` });
  }
});
