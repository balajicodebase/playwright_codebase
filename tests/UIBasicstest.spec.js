const {test, expect} = require('@playwright/test');

test('Browser Context Playwright test', async ({browser}) => {
    //chrome - plugins / cookies
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    await page.locator('input#username').fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator('#signInBtn').click();
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
});



test('Page Playwright test login', async ({page}) => {
    const userName = page.locator('input#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const cardTitles = page.locator('.card-body a');
    expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    await userName.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("learning");
    await page.locator('#signInBtn').click();
    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});

test('UI Controls', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const password = page.locator('#signInBtn');
    const dropDown = page.locator('select.form-control');
    const documentLink = page.locator('.blinkingText');
    await dropDown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    console.log(await page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(page.locator('.blinkingText')).toHaveAttribute('class','blinkingText');

});


test('Child Window Handle', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
   [
        context.waitForEvent('page'), //Listen for new page
        documentLink.click()// new page is opened
   ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split('@');
    const domain = arrayText[1].split(' ');
    // console.log(domain[0]);
    await page.locator('#username').fill(domain[0]);
    await page.pause();
    console.log(await page.locator('#usernamee').textContent()); 


});
