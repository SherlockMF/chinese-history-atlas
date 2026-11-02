import { expect, test } from "@playwright/test";

test("three related portraits use the same orthogonal layout as four related portraits", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Mobile uses the existing relationship list.");
  await page.goto("/series/jin-sixteen-kingdoms/people?person=fu-jian");
  const graph = page.getByLabel("人物一度关系图", { exact: true });
  const center = graph.getByLabel("聚焦苻坚", { exact: true });
  await expect(center).toBeVisible();
  await graph.scrollIntoViewIfNeeded();
  await expect.poll(() => graph.getByRole("img", { name: /画像$/ }).evaluateAll(images => images.length === 4 && images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  const centerBox = (await center.boundingBox())!;
  const positions = await Promise.all(["慕容垂", "谢玄", "姚苌"].map(async name => {
    const node = graph.getByLabel(`聚焦${name}`, { exact: true });
    await expect(node).toBeVisible();
    return (await node.boundingBox())!;
  }));
  expect(positions.filter(p => Math.abs(p.y - centerBox.y) < 2)).toHaveLength(2);
  expect(positions.filter(p => Math.abs(p.x - centerBox.x) < 2 && p.y > centerBox.y + centerBox.height)).toHaveLength(1);
  await graph.screenshot({ path: testInfo.outputPath("three-neighbor-layout.png") });
  await graph.getByLabel("聚焦慕容垂", { exact: true }).click();
  await expect(page.getByRole("heading", { name: "慕容垂", exact: true })).toBeVisible();
  await expect(graph.getByLabel("聚焦慕容皝", { exact: true })).toBeVisible();
});
