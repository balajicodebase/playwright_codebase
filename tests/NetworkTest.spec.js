const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
let response;
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"}
const orderPayload = {orders: [{country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]}
const fakePayloadOrders = {data:[],message:"No Orders"};

test.beforeAll(async() => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
});

test('Client API login and verify order created', async ({page}) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token)

    await page.goto('https://rahulshettyacademy.com/client');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca',
        async route=>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill(
                {
                    response, 
                    body,
                }
            )
        }
    );
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator('.mt-4').textContent());

});

