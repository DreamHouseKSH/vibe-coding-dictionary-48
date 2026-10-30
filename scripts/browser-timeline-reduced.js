async (page) => {
  await page.reload();
  await page.emulateMedia({ reducedMotion: "reduce" });
  const ids = [
    19, 20, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 48,
  ];
  for (const id of ids) {
    const h = page.locator(`[data-demo-host="${id}"]`);
    await h.scrollIntoViewIfNeeded();
    const d = h.locator("[data-demo]");
    await d.waitFor();
    await d.getByText("모션 감소 적용").waitFor();
    if (!(await d.getByRole("slider").getAttribute("aria-label")))
      throw Error("unlabeled timeline slider");
    const elapsed = await d.getAttribute("data-clock-elapsed");
    await page.waitForTimeout(100);
    if ((await d.getAttribute("data-clock-elapsed")) !== elapsed)
      throw Error(`reduced auto clock ${id}`);
    await d.getByRole("button", { name: /시작 장면$/ }).click();
    if (Number(await d.getAttribute("data-clock-progress")) !== 0)
      throw Error("start static");
    await d.getByRole("button", { name: /끝 장면$/ }).click();
    if (Number(await d.getAttribute("data-clock-progress")) !== 1)
      throw Error("end static");
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "화면 및 모션 설정", exact: true }).click();
  await page.getByRole("switch", { name: "모션 줄이기" }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  const h = page.locator('[data-demo-host="40"]');
  await h.scrollIntoViewIfNeeded();
  const d = h.locator("[data-demo]");
  await d.waitFor();
  await d.getByText("모션 감소 적용").waitFor();
  const e = await d.getAttribute("data-clock-elapsed");
  await page.waitForTimeout(200);
  if ((await d.getAttribute("data-clock-elapsed")) !== e)
    throw Error("local reduced auto");
  await page.getByRole("button", { name: "화면 및 모션 설정", exact: true }).click();
  await page.getByRole("switch", { name: "모션 줄이기" }).click();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  return {
    systemReducedStatic: ids.length,
    localReducedStatic: true,
    noAutoSubmission: true,
  };
}
