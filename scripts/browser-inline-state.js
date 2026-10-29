async (page) => {
  await page.reload();
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.getByRole("textbox", { name: "용어 검색" }).fill("스태거");
  const card = page.locator('[data-term="19"]'),
    host = card.locator("[data-demo-host]");
  await host.scrollIntoViewIfNeeded();
  const d = host.locator("[data-demo]");
  await d.waitFor();
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (t) => {
          window.__copied = t;
        },
      },
    }),
  );
  await card
    .getByRole("button", { name: "스태거 애니메이션 예시 복사", exact: true })
    .click();
  if (!(await page.evaluate(() => window.__copied?.includes("스태거"))))
    throw Error("card clipboard success");
  if (await d.locator(".playing").count()) throw Error("copy triggered demo");
  await card
    .getByRole("button", { name: "스태거 애니메이션 담기", exact: true })
    .click();
  if (await d.locator(".playing").count()) throw Error("select triggered demo");
  if (await page.getByRole("dialog").count())
    throw Error("card action opened modal");
  await d.getByRole("button", { name: "다시 재생", exact: true }).click();
  if (!(await d.locator(".playing").count())) throw Error("replay");
  await d.getByRole("button", { name: "중지 / 초기화" }).click();
  if (await d.locator(".playing").count()) throw Error("cancel");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw Error("denied");
        },
      },
    }),
  );
  await card
    .getByRole("button", { name: "스태거 애니메이션 예시 복사", exact: true })
    .click();
  await card
    .getByRole("textbox", { name: "스태거 애니메이션 직접 복사용 예시" })
    .waitFor();
  if (
    !(await card
      .locator("details")
      .getAttribute("open")
      .then((v) => v !== null))
  )
    throw Error("copy failure not expanded");
  await page
    .getByRole("button", { name: "프롬프트 빌더 1", exact: true })
    .click();
  const prompt = await page
    .getByRole("textbox", { name: "완성 프롬프트" })
    .inputValue();
  if (!prompt.includes("스태거")) throw Error("builder");
  await page.getByRole("button", { name: "전체 복사", exact: true }).click();
  await page
    .getByText("자동 복사가 차단됐습니다. 텍스트를 선택해 직접 복사하세요.")
    .waitFor();
  await page.getByRole("button", { name: "비우기", exact: true }).click();
  if (
    !(await page
      .getByRole("button", { name: "전체 복사", exact: true })
      .isDisabled())
  )
    throw Error("empty copy");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });
  await page.getByRole("textbox", { name: "용어 검색" }).fill("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const id of [22, 32, 33, 34, 36, 39, 40, 45, 46, 47, 48]) {
    const h = page.locator(`[data-demo-host="${id}"]`);
    await h.scrollIntoViewIfNeeded();
    const demo = h.locator("[data-demo]");
    await demo.waitFor();
    await demo.getByText("모션 감소 적용").waitFor();
    if ([32, 33, 34, 36, 39, 40, 48].includes(id)) {
      await demo.getByRole("button").first().click();
      await page.waitForTimeout(50);
    }
    if (id === 40 && (await demo.locator("animateMotion").count()))
      throw Error("reduced SVG motion");
    if (id === 48 && (await demo.locator(".confetti-piece").count()))
      throw Error("reduced confetti");
  }
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("textbox", { name: "용어 검색" }).fill("");
  await page.locator('[data-demo-host="1"]').scrollIntoViewIfNeeded();
  await page.screenshot({
    path: "output/playwright/inline-desktop-catalog.png",
  });
  return {
    errors,
    copySuccessAndFailure: true,
    copyAndSelectIndependent: true,
    replayCancel: true,
    builder: true,
    systemReducedMotion: 11,
  };
}
