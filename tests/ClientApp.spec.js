const {test, expect} = require('@playwright/test');


test('Page Playwright test login', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const products = page.locator('.card-body');
    const productTitle = 'ZARA COAT 3';
    const email = "anshika@gmail.com"
    const allText = await page.locator('.card-body b').allTextContents();
    console.log(allText);
    const count = await products.count();
    for(let i=0; i < count; ++i){
        if(await products.nth(i).locator('b').textContent() === productTitle){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i < optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        console.log(text)
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator("label[class='ng-star-inserted']").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();
    const rows = page.locator("tbody tr");
    for(let i=0; i<await rows.count(); ++i){
        const rowOrderId = await rows.nth(i).locator("th").textContent();
       console.log(rowOrderId);
        if(orderId.includes(rowOrderId)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

