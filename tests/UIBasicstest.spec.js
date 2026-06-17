const {test} = require('@playwright/test');


test('Browser Context Playwright test',async ({browser})=>{
    //chrome - open new borwser without any cookie / cache
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test('Page Playwright test', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});