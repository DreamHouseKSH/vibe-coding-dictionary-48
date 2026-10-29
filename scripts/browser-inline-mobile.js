async (page) => {
  const context = await page
    .context()
    .browser()
    .newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "no-preference",
    });
  const mobile = await context.newPage();
  const errors = [];
  mobile.on("pageerror", (e) => errors.push(e.message));
  await mobile.goto("http://127.0.0.1:4173/vibe-coding-dictionary-48/");
  const done = [];
  let maxMounted = 0;
  for (let id = 1; id <= 48; id++) {
    const host = mobile.locator(`[data-demo-host="${id}"]`);
    await host.scrollIntoViewIfNeeded();
    const d = host.locator(`[data-demo="${id}"]`);
    await d.waitFor();
    await mobile.waitForTimeout(100);
    maxMounted = Math.max(
      maxMounted,
      await mobile.locator("[data-demo]").count(),
    );
    if (
      await mobile.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )
    )
      throw Error(`mobile page overflow ${id}`);
    if (await d.evaluate((el) => el.getBoundingClientRect().width > innerWidth))
      throw Error(`mobile demo width ${id}`);
    if ([10, 11].includes(id)) {
      await d.getByRole("button").first().tap();
      await mobile.getByRole("dialog").waitFor();
      await mobile.waitForTimeout(200);
      const box = await mobile.getByRole("dialog").boundingBox();
      if (box.x < 0 || box.x + box.width > 391) throw Error("overlay overflow");
      await mobile.getByRole("button", { name: "Close", exact: true }).tap();
      await mobile.getByRole("dialog").waitFor({ state: "hidden" });
    }
    if (id === 8) await d.getByRole("tab", { name: "기능", exact: true }).tap();
    if (id === 9) await d.getByRole("button").first().tap();
    if (id === 12) {
      await d.getByRole("button").first().tap();
      await mobile.getByRole("menuitemradio", { name: "인기순" }).tap();
      await mobile.waitForTimeout(300);
    }
    if (id === 13) {
      await d.getByRole("button").first().tap();
      await mobile.keyboard.press("Escape");
    }
    if ([15, 23].includes(id)) {
      await d.getByRole("button", { name: "다음", exact: true }).tap();
      await mobile.waitForTimeout(400);
      if ((await d.locator(".snap-track").evaluate((el) => el.scrollLeft)) <= 0)
        throw Error("touch carousel");
    }
    if (
      [
        17, 19, 20, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
        38, 39, 40, 41, 42, 48,
      ].includes(id)
    )
      await d.getByRole("button").first().tap();
    if ([2, 45, 46, 47].includes(id)) {
      await d.getByRole("slider").tap();
      await d.getByRole("slider").focus();
      await mobile.keyboard.press("ArrowRight");
    }
    if ([22, 43].includes(id)) {
      await d.locator(".scroll-demo").evaluate((el) => (el.scrollTop = 300));
    }
    if (id === 1)
      await mobile.screenshot({
        path: "output/playwright/inline-mobile-card.png",
      });
    if (id === 42) {
      await mobile.waitForTimeout(700);
      await mobile.screenshot({
        path: "output/playwright/inline-mobile-shared.png",
      });
    }
    if (await mobile.getByRole("dialog").count())
      throw Error(`unexpected overlay ${id}`);
    done.push(id);
  }
  if (maxMounted > 5) throw Error(`mobile mounted ${maxMounted}`);
  await mobile.getByRole("switch", { name: "모션 줄이기" }).tap();
  await mobile.locator('[data-demo-host="48"]').scrollIntoViewIfNeeded();
  await mobile
    .locator('[data-demo="48"]')
    .getByText("모션 감소 적용")
    .waitFor();
  await mobile.locator('[data-demo="48"]').getByRole("button").first().tap();
  if (await mobile.locator(".confetti-piece").count())
    throw Error("reduced confetti");
  await mobile.evaluate(() => window.scrollTo(0, 0));
  await mobile.screenshot({ path: "output/playwright/inline-mobile-home.png" });
  await context.close();
  return {
    done,
    errors,
    mobileWidth: 390,
    touch: true,
    maxMounted,
    noPageOverflow: true,
    localReducedMotion: true,
  };
}
