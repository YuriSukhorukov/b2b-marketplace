const puppeteer         = require('puppeteer');
const config            = require(`./src/config.json`).gatewayServiceConfig;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

let browser = null;
let page = null;

beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true
    });
    page = await browser.newPage();
});
afterAll(async () => {
    await browser.close();
});

  describe(`Widjet`, () => {
    test('Тест атворизации', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'yuri@gmail.com',
                    'password': 'sdWE343sx!'
                }
            });
            return response.status;
        });

        expect(result).toBe(200);
    });

    test('Тест создания оффера', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            });

            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'yuri@gmail.com',
                    'password': 'sdWE343sx!'
                }
            });

            let response = await fetch(`/api/v1/market/offers`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    title: "Сгущенка",
                    description: "Оригинальная сгущенка Рогачевъ.",
                    price: 1000000,
                    amount: 249,
                    currency_code: "RUB",
                    offer_type: "SELL",
                    measure_unit_code: "TN",
                    date_expires: new Date().toISOString(),
                    country: "Российская Федерация",
                    city: "Москва"
                })
            });
            const content = await response.json();
            return content;
        });

        expect(result[0].created_on).not.toBeUndefined();
    });
  });