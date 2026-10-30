async (page) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.getByRole("textbox", { name: "용어 검색" }).fill("모션 패스");
  const host = page.locator('[data-demo-host="40"]');
  await host.scrollIntoViewIfNeeded();
  const d = host.locator("[data-demo]");
  await d.waitFor();
  await page.waitForFunction(() => {
    const d = document.querySelector('[data-demo="40"]');
    return (
      Number(d?.getAttribute("data-clock-progress")) > 0.15 &&
      d?.getAttribute("data-clock-phase") === "motion"
    );
  });
  await d
    .getByRole("button", { name: "모션 패스 일시정지", exact: true })
    .click();
  const paused = await d.getAttribute("data-clock-elapsed");
  await page.waitForTimeout(350);
  if ((await d.getAttribute("data-clock-elapsed")) !== paused)
    throw Error("pause clock advanced");
  const snapshot = await d.evaluate((el) => {
    const p = Number(el.getAttribute("data-clock-progress")),
      dot = el.querySelector("[data-path-dot]"),
      meter = el.querySelector("progress");
    return {
      p,
      x: Number(dot.getAttribute("cx")),
      y: Number(dot.getAttribute("cy")),
      meter: meter.value,
    };
  });
  if (
    Math.abs(snapshot.x - (20 + 260 * snapshot.p)) > 0.01 ||
    Math.abs(snapshot.y - (100 - 340 * snapshot.p * (1 - snapshot.p))) > 0.01 ||
    Math.abs(snapshot.meter - snapshot.p * 100) > 0.01
  )
    throw Error("visual/progress clocks differ");
  await d.getByRole("button", { name: "모션 패스 재생", exact: true }).click();
  await page.waitForTimeout(150);
  if (Number(await d.getAttribute("data-clock-elapsed")) <= Number(paused))
    throw Error("resume");
  await d
    .getByRole("button", { name: "모션 패스 처음부터 다시 재생", exact: true })
    .click();
  if (Number(await d.getAttribute("data-clock-elapsed")) > 150)
    throw Error("replay did not reset");
  await page.waitForFunction(
    () =>
      document
        .querySelector('[data-demo="40"]')
        ?.getAttribute("data-clock-phase") === "hold",
  );
  const cycle = await d.getAttribute("data-clock-cycles");
  await page.waitForTimeout(180);
  if (
    (await d.getAttribute("data-clock-phase")) !== "hold" ||
    Number(await d.getAttribute("data-clock-progress")) !== 1
  )
    throw Error("end hold");
  await page.waitForFunction(
    () =>
      document
        .querySelector('[data-demo="40"]')
        ?.getAttribute("data-clock-phase") === "reset",
  );
  await page.waitForFunction(
    (c) =>
      Number(
        document
          .querySelector('[data-demo="40"]')
          ?.getAttribute("data-clock-cycles"),
      ) > Number(c),
    cycle,
  );
  await d
    .getByRole("button", { name: "모션 패스 일시정지", exact: true })
    .click();
  const saved = await d.getAttribute("data-clock-elapsed");
  await page.getByRole("textbox", { name: "용어 검색" }).fill("Tabs");
  if (await page.locator('[data-demo="40"]').count())
    throw Error("filter cleanup");
  await page.getByRole("textbox", { name: "용어 검색" }).fill("모션 패스");
  await host.scrollIntoViewIfNeeded();
  await d.waitFor();
  if (
    (await d.getAttribute("data-clock-paused")) !== "true" ||
    (await d.getAttribute("data-clock-elapsed")) !== saved
  )
    throw Error("user pause not retained across filter");
  await d.getByRole("button", { name: "모션 패스 재생", exact: true }).click();
  await page.waitForTimeout(100);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await d.waitFor({ state: "detached" });
  await page.waitForTimeout(500);
  await host.scrollIntoViewIfNeeded();
  await d.waitFor();
  const afterOffscreen = Number(await d.getAttribute("data-clock-elapsed"));
  if (afterOffscreen > Number(saved) + 300) throw Error("offscreen caught up");
  const background = await page.context().newPage();
  await background.goto("about:blank");
  await background.bringToFront();
  await page.waitForTimeout(100);
  const actualHidden = await page.evaluate(() => document.hidden);
  if (!actualHidden)
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        get: () => true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
  const hiddenStart = await d.getAttribute("data-clock-elapsed"),
    cycleHidden = await d.getAttribute("data-clock-cycles");
  await page.waitForTimeout(800);
  if ((await d.getAttribute("data-clock-elapsed")) !== hiddenStart)
    throw Error("hidden tab clock advanced");
  await background.close();
  await page.bringToFront();
  if (!actualHidden)
    await page.evaluate(() => {
      Reflect.deleteProperty(document, "hidden");
      document.dispatchEvent(new Event("visibilitychange"));
    });
  await page.waitForTimeout(100);
  await d
    .getByRole("button", { name: "모션 패스 일시정지", exact: true })
    .click();
  if (
    Number(await d.getAttribute("data-clock-elapsed")) >
      Number(hiddenStart) + 350 ||
    (await d.getAttribute("data-clock-cycles")) !== cycleHidden
  )
    throw Error("hidden catch-up");

  await page.getByRole("textbox", { name: "용어 검색" }).fill("");
  await page.locator('[data-demo-host="24"]').scrollIntoViewIfNeeded();
  const manual = page.locator('[data-demo="24"]');
  await manual.waitFor();
  const idle = await manual.getAttribute("data-clock-elapsed");
  await page.waitForTimeout(250);
  if (
    (await manual.getAttribute("data-clock-elapsed")) !== idle ||
    idle !== "0.0"
  )
    throw Error("save feedback auto ran");
  await manual
    .getByRole("button", { name: "저장 피드백 재생", exact: true })
    .click();
  await page.waitForTimeout(850);
  if (
    (await manual.getAttribute("data-clock-paused")) !== "true" ||
    Number(await manual.getAttribute("data-clock-progress")) !== 1
  )
    throw Error("manual completion");
  return {
    errors,
    autoWrap: true,
    endHold: true,
    pauseResumeReplay: true,
    poseMatchesProgress: snapshot,
    userPauseRetained: true,
    offscreenPause: true,
    documentHiddenPause: actualHidden
      ? "native"
      : "controlled visibility event; runner keeps tabs visible",
    manualSaveOnly: true,
  };
}
