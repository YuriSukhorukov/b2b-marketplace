const puppeteer         = require('puppeteer');
const config            = require(`../../config.json`).gatewayServiceConfig;

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

describe(`Market offers`, () => {
    test('Создание оффера', async () => {
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
            return await response.json();
        });

        expect(result.body[0].created_on).not.toBeUndefined();
    });
    test('Создание нескольких офферов и получение списка всех офферов', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            let method = 'POST';
            let headers = {"content-type": "application/json",};
            let offer = JSON.stringify({
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
            });
            
            await fetch(`/api/v1/market/offers`, {method, headers, body: offer});
            await fetch(`/api/v1/market/offers`, {method, headers, body: offer});
            await fetch(`/api/v1/market/offers`, {method, headers, body: offer});
            
            method = 'GET';
            
            const response = await fetch(`/api/v1/market/offers`, {method, headers});
            return await response.json();
        });

        expect(parseInt(result.body[3].amount)).toBe(249);
    });
    test('Получение списка всех офферов', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            let method = 'GET';
            let headers = {"content-type": "application/json",};
            
            const response = await fetch(`/api/v1/market/offers`, {method, headers});
            return await response.json();
        });
        expect(result.succes && result.body.length > 0).toBe(true);
    });
    test('Создать оффер на покупку и оффер на продажу', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            let method = 'POST';
            let headers = {"content-type": "application/json",};
            let offer_buy = JSON.stringify({
                title: "Сгущенка",
                description: "Оригинальная сгущенка Рогачевъ.",
                price: 1000000,
                amount: 149,
                currency_code: "RUB",
                offer_type: "BUY",
                measure_unit_code: "TN",
                date_expires: new Date().toISOString(),
                country: "Российская Федерация",
                city: "Москва"
            });
            let offer_sell = JSON.stringify({
                title: "Сгущенка",
                description: "Оригинальная сгущенка Рогачевъ.",
                price: 1000000,
                amount: 149,
                currency_code: "RUB",
                offer_type: "SELL",
                measure_unit_code: "TN",
                date_expires: new Date().toISOString(),
                country: "Российская Федерация",
                city: "Москва"
            });
            
            const response_1 = await fetch(`/api/v1/market/offers`, {method, headers, body: offer_buy});
            const response_2 = await fetch(`/api/v1/market/offers`, {method, headers, body: offer_sell});
            
            return response_1.json();
        });
        expect(result.succes).toBe(true);
    });
    test('Получение списка офферов на покупку', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            let response = await fetch(`/api/v1/market/offers?offer_type=BUY`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                },
            });
            return await response.json();
        });
        expect(result.succes && result.body[0].offer_type === 'BUY').toBe(true);
    });
});