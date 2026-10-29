async (page) => {
  await page.reload();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("textbox", { name: "용어 검색" }).fill("스태거");
  const card = page.locator('[data-term="19"]');
  await card.locator("[data-demo-host]").scrollIntoViewIfNeeded();
  const d = card.locator("[data-demo]");
  await d.waitFor();
  await d.getByRole("button", { name: "스태거 일시정지", exact: true }).click();
  const elapsed = await d.getAttribute("data-clock-elapsed");
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
    throw Error("copy success");
  await card
    .getByRole("button", { name: "스태거 애니메이션 담기", exact: true })
    .click();
  if (
    (await d.getAttribute("data-clock-elapsed")) !== elapsed ||
    (await d.getAttribute("data-clock-paused")) !== "true"
  )
    throw Error("copy/select changed paused animation");
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
  await page
    .getByRole("button", { name: "프롬프트 빌더 1", exact: true })
    .click();
  if (
    !(await page
      .getByRole("textbox", { name: "완성 프롬프트" })
      .inputValue()
      .then((t) => t.includes("스태거")))
  )
    throw Error("builder");
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
  return {
    copySelectDoNotChangeClock: true,
    copySuccessAndDenial: true,
    builder: true,
  };
}
