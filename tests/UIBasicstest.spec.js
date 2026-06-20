const {test, expect} = require('@playwright/test');


test('Browser Context Playwright test',async ({browser})=>{
    //chrome - open new borwser without any cookie / cache
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

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
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    //array
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('UI Controls', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("Consultant");
    const documentLink = page.locator("[href*='documents-request']");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();

    //assert if option "User" is clicked
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    
    // click t&c
    await page.locator("#terms").click();
    // assert t&c clicked => toBeChecked
    await expect(page.locator("#terms")).toBeChecked();
    // unclick t&c
    await page.locator("#terms").uncheck();
    // assert UNclicked t&c 
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

    //assert blinking effect => topHaveAttribute
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    
});

test.only('Child window handle', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),//listen for any new page pending, rejected, fulfilled
        documentLink.click() // new page is opened
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log('domain', domain);
    await page.locator("#username").fill(domain);
    console.log('original page username', await page.locator("#username").inputValue());
});