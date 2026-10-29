async (page) => {
  const timed = new Set([
    19, 20, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 48,
  ]);
  async function all(p, touch) {
    const done = [],
      errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    let maxMounted = 0;
    const act = async (button) => (touch ? button.tap() : button.click());
    for (let id = 1; id <= 48; id++) {
      const host = p.locator(`[data-demo-host="${id}"]`);
      await host.scrollIntoViewIfNeeded();
      const d = host.locator("[data-demo]");
      await d.waitFor();
      await p.waitForTimeout(80);
      maxMounted = Math.max(maxMounted, await p.locator("[data-demo]").count());
      if (
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )
      )
        throw Error(`page overflow ${id}`);
      if (timed.has(id)) {
        const snapshot = await d.evaluate((el) => ({
          p: Number(el.getAttribute("data-clock-progress")),
          meter: el.querySelector("progress").value,
        }));
        if (Math.abs(snapshot.meter - snapshot.p * 100) > 0.01)
          throw Error(`meter mismatch ${id}`);
        if (id !== 24) {
          const pause = d.getByRole("button", { name: /일시정지$/ });
          await act(pause);
        }
        const slider = d.getByRole("slider");
        await slider.focus();
        await p.keyboard.press("Home");
        await p.keyboard.press("ArrowRight");
        if ((await d.getAttribute("data-clock-paused")) !== "true")
          throw Error(`keyboard scrub ${id}`);
        await p.keyboard.press("End");
        if (Number(await d.getAttribute("data-clock-progress")) !== 1)
          throw Error(`end pose ${id}`);
        if (id === 42)
          await p.screenshot({
            path: `output/playwright/timeline-shared-${touch ? "mobile" : "desktop"}.png`,
          });
      } else {
        if ([10, 11].includes(id)) {
          const t = d.getByRole("button").first();
          await act(t);
          const dialog = p.getByRole("dialog");
          await dialog.waitFor();
          await p.waitForTimeout(150);
          if (touch)
            await dialog
              .getByRole("button", { name: "Close", exact: true })
              .tap();
          else {
            for (let i = 0; i < 5; i++) {
              await p.keyboard.press("Tab");
              if (
                !(await dialog.evaluate((el) =>
                  el.contains(document.activeElement),
                ))
              )
                throw Error("focus trap");
            }
            await p.keyboard.press("Escape");
          }
          await dialog.waitFor({ state: "hidden" });
        }
        if (id === 8)
          await act(d.getByRole("tab", { name: "기능", exact: true }));
        if (id === 9) await act(d.getByRole("button").first());
        if (id === 12) {
          await act(d.getByRole("button").first());
          await act(p.getByRole("menuitemradio", { name: "인기순" }));
          await p.waitForTimeout(300);
        }
        if (id === 13) {
          await act(d.getByRole("button").first());
          await p.keyboard.press("Escape");
        }
        if ([1, 5, 14, 16, 17, 21].includes(id))
          await act(d.getByRole("button").first());
        if ([6, 18, 22, 43].includes(id)) {
          await d
            .locator(".scroll-demo")
            .evaluate((el) => (el.scrollTop = 300));
          await p.waitForTimeout(100);
          const state = await d.evaluate((el) => {
            const scroll = el.querySelector(".scroll-demo");
            return {
              expected:
                (scroll.scrollTop /
                  (scroll.scrollHeight - scroll.clientHeight)) *
                100,
              actual: el.querySelector("progress").value,
            };
          });
          if (Math.abs(state.expected - state.actual) > 0.1)
            throw Error(`scroll meter ${id}`);
        }
        if ([15, 23].includes(id)) {
          await act(d.getByRole("button", { name: "다음", exact: true }));
          await p.waitForTimeout(400);
          if (
            (await d.getByRole("progressbar").evaluate((el) => el.value)) <= 0
          )
            throw Error("carousel progress");
        }
        if (id === 44) {
          await act(
            d.getByRole("button", { name: "다음 카드 →", exact: true }),
          );
          await p.waitForTimeout(400);
          if (
            (await d.getByRole("progressbar").evaluate((el) => el.value)) <= 0
          )
            throw Error("horizontal progress");
        }
        if (id >= 45 && id <= 47) {
          await d.getByRole("slider").focus();
          await p.keyboard.press("End");
          if (
            (await d.getByRole("progressbar").evaluate((el) => el.value)) !==
            100
          )
            throw Error("pointer progress");
        }
      }
      if (await p.getByRole("dialog").count())
        throw Error(`unexpected overlay ${id}`);
      done.push(id);
    }
    return { done, errors, maxMounted, touch };
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  const desktop = await all(page, false);
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
  await mobile.goto("http://127.0.0.1:4173/vibe-coding-dictionary-48/");
  const mobileResult = await all(mobile, true);
  await context.close();
  return { desktop, mobile: mobileResult };
}
