async (page) => {
 await page.emulateMedia({reducedMotion:"no-preference"});await page.reload();const errors=[];page.on('pageerror',e=>errors.push(e.message));const done=[];
 for(let id=1;id<=24;id++){
  const trigger=page.locator(`[data-term="${id}"]`).getByRole('button',{name:'데모 열기',exact:true});await trigger.click();const demo=page.locator(`[data-demo="${id}"]`);await demo.waitFor();
  if([1,5,14,16,17,19,20,21,24].includes(id)){await demo.getByRole('button').first().click();}
  if([10,11].includes(id)){await demo.getByRole('button').first().click();await page.waitForTimeout(200);await page.keyboard.press('Tab');await page.keyboard.press('Escape');await page.waitForTimeout(450);await demo.waitFor();}
  if(id===8){await demo.getByRole('tab',{name:'기능',exact:true}).click();if(!await demo.getByRole('tabpanel').textContent().then(x=>x.includes('기능')))throw Error('tabs');}
  if(id===9){await demo.getByRole('button').first().click();if(!await demo.getByText('자연어로 의도를 전달하고 결과를 확인하며 구현하는 방식입니다.').isVisible())throw Error('accordion');}
  if(id===12){await demo.getByRole('button').first().click();await page.getByRole('menuitemradio',{name:'인기순'}).click();}
  if(id===13){await demo.getByRole('button').first().focus();await demo.getByRole('button').first().click();}
  if([6,18,22].includes(id)){await demo.locator('.scroll-demo').evaluate(el=>el.scrollTop=300);if(id===22){await page.waitForTimeout(50);if(!await demo.locator('.parallax-back').getAttribute('style').then(s=>s.includes('195')))throw Error('parallax scroll');}}
  if([15,23].includes(id)){await demo.getByRole('button',{name:'다음',exact:true}).click();}
  await page.keyboard.press('Escape');await page.locator('[role="dialog"]').waitFor({state:'hidden'});
  await page.waitForTimeout(150);if(!await trigger.evaluate(el=>el===document.activeElement))throw Error(`focus restore ${id}`);done.push(id);
 }
 await page.getByRole('textbox',{name:'용어 검색'}).fill('스프링');if(await page.locator('[data-term]').count()!==1)throw Error('search');await page.getByRole('textbox',{name:'용어 검색'}).fill('zzzz');if(await page.locator('[data-term]').count()!==0)throw Error('empty');await page.getByRole('button',{name:'검색 초기화'}).click();
 await page.getByRole('button',{name:'레이아웃 7',exact:true}).click();if(await page.locator('[data-term]').count()!==7)throw Error('category');await page.getByRole('button',{name:'전체 48',exact:true}).click();
 return {done,errors,search:true,category:true,empty:true,focusRestore:24};
}
