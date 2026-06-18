const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test',async ({browser})=>{
    //chrome - open new borwser without any cookie / cache
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log( await page.title());

    //css, xpath
    await userName.fill("dini na");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();

    //it takes some time until warning message to be displayed
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //type-fill
    await userName.fill(""); //wipe out
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await page.locator(".card-body a").first().textContent());
});

test('Page Playwright test', async({page})=>{
    await page.goto("https://google.com");
    // get title - assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});