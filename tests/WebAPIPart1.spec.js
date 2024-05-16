const {test, expect, request} = require('@playwright/test');
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayload = {orders: [{country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}
let token, orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
    {data: loginPayLoad});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    token = await loginResponseJson.token;
    console.log(token)

    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        })
        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];
});



test('Client API login and verify order created', async ({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token)

    await page.goto('https://rahulshettyacademy.com/client');
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
    // await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  
});

