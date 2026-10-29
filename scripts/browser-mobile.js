async (page) => {
 await page.emulateMedia({reducedMotion:'no-preference'});await page.reload();await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:'output/playwright/mobile-home.png'});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('mobile page overflow');const done=[];
 for(let id=1;id<=48;id++){
  await page.locator(`[data-term="${id}"]`).getByRole('button',{name:'데모 열기',exact:true}).click();const d=page.locator(`[data-demo="${id}"]`);await d.waitFor();
  const box=await page.getByRole('dialog').boundingBox();if(box.x<0||box.x+box.width>391)throw Error(`dialog overflow ${id}`);
  if([2,45,46,47].includes(id)){await d.getByRole('slider').focus();await page.keyboard.press('ArrowRight')}
  if(id===42){await d.getByRole('button').first().click();await page.screenshot({path:'output/playwright/mobile-shared-element.png'})}
  await page.waitForTimeout(250);await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});done.push(id);
 }
 await page.getByRole('switch',{name:'모션 줄이기'}).click();await page.locator('[data-term="48"]').getByRole('button',{name:'데모 열기',exact:true}).click();await page.getByText('모션 감소: 색종이 대신 축하 메시지를 표시합니다.').waitFor();await page.keyboard.press('Escape');return {mobileWidth:390,done,pageOverflow:false,dialogsWithinViewport:48,keyboardSliders:4,localMotionSwitch:true};
}
