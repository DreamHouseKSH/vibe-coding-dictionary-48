async (page) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const done = [];
  let maxMounted = 0;
  if ((await page.locator("[data-term]").count()) !== 48)
    throw Error("48 cards");
  if (
    await page.getByRole("button", { name: "데모 열기", exact: true }).count()
  )
    throw Error("old modal-only control remains");
  for (let id = 1; id <= 48; id++) {
    const host = page.locator(`[data-demo-host="${id}"]`);
    await host.scrollIntoViewIfNeeded();
    const d = host.locator(`[data-demo="${id}"]`);
    await d.waitFor();
    await page.waitForTimeout(100);
    maxMounted = Math.max(
      maxMounted,
      await page.locator("[data-demo]").count(),
    );
    if (id === 2) {
      await d.getByRole("slider").focus();
      await page.keyboard.press("Home");
      await page.waitForTimeout(250);
      const columns = await d
        .locator(".responsive-tiles")
        .evaluate(
          (el) => getComputedStyle(el).gridTemplateColumns.split(" ").length,
        );
      if (columns !== 1) throw Error("responsive slider layout");
    }
    if (
      [
        1, 5, 14, 16, 17, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
        34, 35, 36, 37, 38, 39, 40, 41, 42, 45, 48,
      ].includes(id)
    )
      await d.getByRole("button").first().click();
    if ([10, 11].includes(id)) {
      const t = d.getByRole("button").first();
      await t.click();
      await page.getByRole("dialog").waitFor();
      await page.waitForTimeout(200);
      for (let i = 0; i < 15; i++) {
        await page.keyboard.press("Tab");
        if (
          !(await page
            .getByRole("dialog")
            .evaluate((el) => el.contains(document.activeElement)))
        )
          throw Error("overlay focus trap");
      }
      await page.keyboard.press("Escape");
      await page.getByRole("dialog").waitFor({ state: "hidden" });
      await page.waitForTimeout(150);
      if (!(await t.evaluate((el) => el === document.activeElement)))
        throw Error("overlay restore");
    }
    if (id === 8) {
      await d.getByRole("tab", { name: "기능", exact: true }).click();
      if (
        !(await d
          .getByRole("tabpanel")
          .textContent()
          .then((t) => t.includes("기능")))
      )
        throw Error("tabs");
    }
    if (id === 9) {
      await d.getByRole("button").first().click();
      await d
        .getByText(
          "자연어로 의도를 전달하고 결과를 확인하며 구현하는 방식입니다.",
        )
        .waitFor();
    }
    if (id === 12) {
      await d.getByRole("button").first().click();
      await page.getByRole("menuitemradio", { name: "인기순" }).click();
      await page.waitForTimeout(300);
    }
    if (id === 13) {
      await d.getByRole("button").first().focus();
      await d.getByRole("button").first().click();
      await page.keyboard.press("Escape");
    }
    if ([6, 18, 22, 43].includes(id)) {
      await d.locator(".scroll-demo").evaluate((el) => (el.scrollTop = 300));
      await page.waitForTimeout(100);
      if (id === 22) {
        const y = await d
          .locator(".parallax-back")
          .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42);
        if (y !== 195) throw Error(`parallax ${y}`);
      }
    }
    if ([15, 23].includes(id)) {
      await d.getByRole("button", { name: "다음", exact: true }).click();
    }
    if ([33, 34, 36].includes(id)) {
      await d.getByRole("button").first().click();
      await d.getByRole("button", { name: "중지 / 초기화" }).click();
      await d.getByRole("button").first().click();
    }
    if (id === 42) {
      await page.waitForTimeout(700);
      if (!(await d.locator(".detail .shared-card p").isVisible()))
        throw Error("shared layout");
      await page.screenshot({
        path: "output/playwright/inline-shared-desktop.png",
      });
    }
    if (id === 44) {
      await d.locator(".horizontal-demo").hover();
      await page.mouse.wheel(0, 150);
      await page.waitForTimeout(100);
      if (
        (await d.locator(".horizontal-demo").evaluate((el) => el.scrollLeft)) <=
        0
      )
        throw Error("horizontal wheel");
    }
    if (id >= 45 && id <= 47) {
      await d.getByRole("slider").focus();
      await page.keyboard.press("ArrowRight");
    }
    if (await page.getByRole("dialog").count())
      throw Error(`unexpected modal for ${id}`);
    done.push(id);
  }
  if (maxMounted > 12) throw Error(`too many mounted demos ${maxMounted}`);
  if (await page.locator('[data-demo="32"]').count())
    throw Error("offscreen loop not cleaned");
  await page.getByRole("textbox", { name: "용어 검색" }).fill("카운트업");
  const countHost = page.locator('[data-demo-host="36"]');
  await countHost.scrollIntoViewIfNeeded();
  await countHost.locator('[data-demo="36"]').waitFor();
  await countHost.getByRole("button").first().click();
  await page.getByRole("textbox", { name: "용어 검색" }).fill("zzzz");
  if (await page.locator("[data-demo]").count())
    throw Error("filter did not unmount animation");
  await page.getByRole("button", { name: "검색 초기화" }).click();
  await page.getByRole("button", { name: "레이아웃 7", exact: true }).click();
  if ((await page.locator("[data-term]").count()) !== 7)
    throw Error("category");
  await page.getByRole("button", { name: "전체 48", exact: true }).click();
  return {
    done,
    errors,
    maxMounted,
    allInline: true,
    overlayFocusAndRestore: 2,
    filterDuringAnimation: true,
    offscreenCleanup: true,
  };
}
