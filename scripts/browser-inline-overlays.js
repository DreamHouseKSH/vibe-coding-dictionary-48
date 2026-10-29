async (page) => {
  await page.reload();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("switch", { name: "모션 줄이기" }).click();
  for (const id of [10, 11]) {
    const h = page.locator(`[data-demo-host="${id}"]`);
    await h.scrollIntoViewIfNeeded();
    const d = h.locator("[data-demo]");
    await d.waitFor();
    await d.getByRole("button").click();
    const overlay = page.getByRole("dialog");
    await overlay.waitFor();
    const duration = await overlay.evaluate((el) => ({
      animation: getComputedStyle(el).animationDuration,
      transition: getComputedStyle(el).transitionDuration,
    }));
    if (duration.animation !== "0s" || duration.transition !== "0s")
      throw Error(JSON.stringify(duration));
    await page.keyboard.press("Escape");
    await overlay.waitFor({ state: "hidden" });
  }
  await page.getByRole("switch", { name: "모션 줄이기" }).click();
  return { localReducedMotionPortalOverlays: 2 };
}
