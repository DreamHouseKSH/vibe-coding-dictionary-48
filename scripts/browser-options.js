async (page) => {
  // Run in an isolated context: this deliberately changes and resets local settings.
  const timed = new Set([19,20,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,48]);
  const result = [];
  for (let id = 1; id <= 48; id++) {
    const host = page.locator(`[data-demo-host="${id}"]`);
    await host.scrollIntoViewIfNeeded();
    const panel = host.locator(`[data-demo-options="${id}"]`);
    await panel.waitFor();
    const slider = panel.getByRole("slider");
    await slider.focus();
    await page.keyboard.press("End");
    const max = Number(await slider.getAttribute("aria-valuemax"));
    if (Number(await slider.getAttribute("aria-valuenow")) !== max) throw Error(`Option ${id}: maximum mismatch`);
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("vibe48-demo-options-v1") || "{}"));
    if (stored[id] !== max) throw Error(`Option ${id}: persistence mismatch`);
    const demo = host.locator("[data-demo]");
    if (timed.has(id) && !(await demo.locator(".timeline-ends").innerText()).includes("6.00초")) throw Error(`Duration ${id}: readout did not update`);
    if (id === 1 && await demo.locator(".sample-hero").evaluate(el => getComputedStyle(el).paddingTop) !== "48px") throw Error("Hero padding not applied");
    if (id === 3 && await demo.locator(".sample-cards").evaluate(el => getComputedStyle(el).gap) !== "24px") throw Error("Card gap not applied");
    if (id === 4 && await demo.locator(".bento .tile").count() !== 8) throw Error("Bento count not applied");
    if (id === 8 && await demo.getByRole("tab").count() !== 3) throw Error("Tab count not applied");
    if (id === 9 && await demo.locator('[data-slot="accordion-trigger"]').count() !== 4) throw Error("Accordion count not applied");
    if (id === 16 && await demo.locator('[data-slot="skeleton"]').count() !== 5) throw Error("Skeleton rows not applied");
    await slider.focus();
    await page.keyboard.press("Home");
    if (Number(await slider.getAttribute("aria-valuenow")) !== Number(await slider.getAttribute("aria-valuemin"))) throw Error(`Option ${id}: minimum mismatch`);
    if (id === 11) {
      await demo.getByRole("button", {name: "왼쪽 드로워 열기"}).click();
      const dialog = page.getByRole("dialog");
      if (await dialog.getAttribute("data-side") !== "left") throw Error("Drawer side not applied");
      await page.keyboard.press("Escape");
    }
    await panel.getByRole("button", {name: `${id}번 데모 옵션 초기화`}).click();
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error(`Option ${id}: page overflow`);
    result.push(id);
  }
  return { all48BoundedLiveOptions: result, persistence: true, keyboardMinMaxReset: true };
}
