import {test} from '@playwright/test';

test('Popup validations', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //alert window
    page.on("dialog", dialog => dialog.accept());
    //page.on("dialog", dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();

    //hover
    await page.locator("#mousehover").hover();
});