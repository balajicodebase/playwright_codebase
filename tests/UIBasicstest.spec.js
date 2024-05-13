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



test.only('Page Playwright test login', async ({page}) => {
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