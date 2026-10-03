const { snapshot } = require('./snapshot.cjs');
const {test,expect}=require('@playwright/test');
for(const width of [1440,390,320]){
 test(`calculator states ${width}`,async({page})=>{
  await page.setViewportSize({width,height:1000});await page.clock.setFixedTime(new Date('2026-10-04T10:00:00Z'));
  async function shot(name){await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>scrollTo(0,0));expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await snapshot(page, `${name}-${width}.png`,{fullPage:true});}
  await page.goto('/limitation-calculator');
  for(const[name,choice]of [['court',/Civil Case/],['order',/District Court/],['dates',/Final Judgment/]]){await page.getByRole('button',{name:choice}).click();await page.waitForTimeout(350);await shot('wizard-'+name);}
  await page.getByRole('button',{name:/Continue/}).click();await shot('wizard-error');
  await page.getByLabel('Judgment Date',{exact:false}).fill('2026-09-01');await page.getByRole('button',{name:/Continue/}).click();await shot('wizard-review');await page.getByRole('button',{name:/Calculate Limitation/}).click();await page.getByRole('button',{name:/New Calculation/}).waitFor();await shot('wizard-results');
  await page.goto('/court-fee-calculator');await page.getByRole('button',{name:/Money & Recovery.*Group A/}).click();await shot('court-types');await page.getByRole('button',{name:/Money Suit \/ Recovery of Debt/}).click();await shot('court-inputs');await page.getByLabel('Amount Claimed (Rs.)',{exact:true}).fill('4500000');await page.getByRole('button',{name:'Calculate Court Fee',exact:true}).click();await page.locator('.result-fee').waitFor();await shot('court-result');
  await page.goto('/stamp-duty-calculator');await page.getByRole('button',{name:/Conveyance/}).click();await shot('stamp-types');await page.getByRole('button',{name:/^Sale Deed/}).click();await shot('stamp-inputs');await page.getByLabel('Property / Consideration Value',{exact:true}).fill('5000000');await page.getByText('BBMP / Corporation',{exact:true}).click();await page.getByRole('button',{name:'Calculate Stamp Duty & Fees',exact:true}).click();await page.locator('.stamp-result-fee').waitFor();await shot('stamp-result');
 });
 test(`reference and navigation states ${width}`,async({page})=>{
  await page.setViewportSize({width,height:1000});
  async function shot(name){await page.evaluate(()=>document.fonts.ready);await page.evaluate(()=>scrollTo(0,0));await snapshot(page, `${name}-${width}.png`,{fullPage:true});}
  await page.goto('/limitation-calculator/rules');await page.getByRole('tab',{name:/Civil/}).focus();await page.keyboard.press('ArrowRight');await expect(page.getByRole('tab',{name:/Criminal/})).toHaveAttribute('aria-selected','true');await shot('criminal-rules');await page.getByRole('tab',{name:/Writ/}).click();await shot('writ-rules');
  await page.goto('/court-fee-calculator/rules');await page.getByRole('button',{name:/Group B:/}).click();await shot('court-rules-expanded');
  await page.goto('/laws/karnataka-court-fees-act-1958');await page.locator('.law-section-summary').first().click();await shot('law-expanded');
  await page.goto('/feedback');await page.getByRole('button',{name:'Prepare GitHub issue'}).click();await expect(page.locator('#feedback-message')).toHaveAttribute('aria-invalid','true');await shot('feedback-error');await page.getByLabel('Your message',{exact:true}).fill('Example: please explain the calculation steps.');await page.getByRole('button',{name:'Prepare GitHub issue'}).click();await shot('feedback-draft');
  await page.goto('/');if(width<768){await page.getByRole('button',{name:/menu/i}).first().click();await shot('mobile-menu');await page.keyboard.press('Escape');}else{await page.locator('.calculator-switcher summary').click();await shot('calculator-menu');}
 });
}

test('reference components stay readable',async({page})=>{
  await page.goto('/court-fee-calculator/rules');
  expect(await page.locator('.slab-table th').first().evaluate(e=>parseFloat(getComputedStyle(e).paddingTop))).toBeGreaterThanOrEqual(12);
  await page.setViewportSize({width:320,height:900});await page.goto('/laws/karnataka-court-fees-act-1958');
  expect(await page.locator('.law-section-summary-title').first().evaluate(e=>e.getBoundingClientRect().width)).toBeGreaterThan(200);
  await page.goto('/limitation-calculator/rules');
  const sizes=await page.locator('.section-badge-link').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().width).map(e=>parseFloat(getComputedStyle(e).fontSize)));
  expect(Math.min(...sizes)).toBeGreaterThanOrEqual(13);
});
