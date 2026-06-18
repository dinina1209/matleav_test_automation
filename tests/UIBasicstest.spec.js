const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test',async ({browser})=>{
    //chrome - open new borwser without any cookie / cache
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log( await page.title());

    //css, xpath
    await page.locator("#username").fill("dini");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();

    //it takes some time until warning message to be displayed
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});

test('Page Playwright test', async({page})=>{
    await page.goto("https://google.com");
    // get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});