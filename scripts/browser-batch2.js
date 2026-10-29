async (page) => {
 const errors=[];page.on('pageerror',e=>errors.push(e.message));const done=[];
 for(let id=25;id<=48;id++){
  const trigger=page.locator(`[data-term="${id}"]`).getByRole('button',{name:'데모 열기',exact:true});await trigger.click();const demo=page.locator(`[data-demo="${id}"]`);await demo.waitFor();
  if(![43,44,46,47].includes(id)){await demo.getByRole('button').first().click();}
  if([33,34,36].includes(id)){await demo.getByRole('button').first().click();await demo.getByRole('button',{name:'중지 / 초기화'}).click();await demo.getByRole('button').first().click();}
  if(id===42){await demo.locator('.detail').waitFor();if(!await demo.locator('.shared-card p').isVisible())throw Error('shared detail');await demo.getByRole('button').first().click();}
  if(id===43){await demo.locator('.scroll-demo').evaluate(el=>el.scrollTop=350);await page.waitForTimeout(50);if(!await demo.getByRole('heading').textContent().then(s=>s.includes('03')))throw Error('pinning');}
  if(id===44){await demo.getByRole('button').click();}
  if(id>=45&&id<=47){const slider=demo.getByRole('slider');await slider.focus();await page.keyboard.press('ArrowRight');}
  await page.keyboard.press('Escape');await page.locator('[role="dialog"]').waitFor({state:'hidden'});done.push(id);
 }
 await page.locator('[data-term="1"]').getByRole('button',{name:'히어로 섹션 & CTA 담기'}).click();await page.locator('[data-term="29"]').getByRole('button',{name:'스프링 애니메이션 담기'}).click();await page.getByRole('button',{name:'프롬프트 빌더 2',exact:true}).click();
 const prompt=await page.getByRole('textbox',{name:'완성 프롬프트'}).inputValue();if(!prompt.includes('스프링')||!prompt.includes('히어로'))throw Error('builder combination');
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}}));await page.getByRole('button',{name:'전체 복사',exact:true}).click();await page.getByText('자동 복사가 차단됐습니다. 텍스트를 선택해 직접 복사하세요.').waitFor();
 await page.getByRole('button',{name:'비우기',exact:true}).click();if(!await page.getByRole('button',{name:'전체 복사',exact:true}).isDisabled())throw Error('empty copy');await page.waitForTimeout(200);await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});
 await page.emulateMedia({reducedMotion:'reduce'});for(const id of [22,33,34,36,45,46,47,48]){await page.locator(`[data-term="${id}"]`).getByRole('button',{name:'데모 열기',exact:true}).click();const d=page.locator(`[data-demo="${id}"]`);await d.getByText('모션 감소 적용').waitFor();if([33,34,36,48].includes(id)){await d.getByRole('button').first().click();await page.waitForTimeout(30)}await page.waitForTimeout(100);await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'})}
 await page.emulateMedia({reducedMotion:'no-preference'});return {done,errors,builder:true,copyFailure:true,emptyCopy:true,reducedMotion:8};
}
