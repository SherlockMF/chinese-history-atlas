import { expect, test } from "@playwright/test";

test("real Unity artifact starts and exchanges READY / INIT without scene load errors", async ({ page, isMobile }) => {
  test.skip(process.env.NEXT_PUBLIC_HISTORY_FIELD_MODE !== "webgl", "Requires the pinned Unity artifact and webgl server configuration");
  test.setTimeout(150_000);
  const errors: string[] = [];
  page.on("console", (message) => {
    if (/level0.*corrupt|Cannot load scene|Exception:|out of memory/i.test(message.text())) errors.push(message.text());
  });
  await page.addInitScript(() => {
    if (window === window.parent) return;
    const received: unknown[] = [];
    Object.assign(window, { __unitySmokeInit: received });
    window.addEventListener("message", (event) => {
      if (event.source === parent && event.origin === location.origin && event.data?.type === "HISTORY_INIT") received.push(event.data);
    });
  });
  await page.goto("/field/li-jingxun");
  if (isMobile) {
    await expect(page.getByText("现场探索建议使用桌面浏览器")).toBeVisible();
    await expect(page.locator("iframe")).toHaveCount(0);
    return;
  }
  await expect(page.getByRole("status")).toContainText("现场已连接", { timeout: 120_000 });
  const game = page.frames().find((frame) => frame.url().includes("/history-field/li-jingxun/"));
  expect(game).toBeTruthy();
  await game!.waitForFunction(() => {
    const scope = window as unknown as { historyFieldUnityInstance?: { GetMetricsInfo(): { pageLoadTimeToFrame1: number } }; __unitySmokeInit?: unknown[] };
    return (scope.historyFieldUnityInstance?.GetMetricsInfo().pageLoadTimeToFrame1 ?? 0) > 0 && (scope.__unitySmokeInit?.length ?? 0) > 0;
  }, undefined, { timeout: 120_000 });
  await expect(game!.locator("#history-field-loader")).toHaveAttribute("data-state", "running");
  expect(errors).toEqual([]);
  // This is a real startup smoke, not a substitute for the three gameplay cases.
});
