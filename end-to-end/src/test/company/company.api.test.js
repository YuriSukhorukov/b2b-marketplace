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

describe(`Company...`, () => {
    test('Создание записи компании', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/company/profile`, {
                method: 'POST',
                headers: {"content-type": "application/json",},
                body: JSON.stringify({
                    type: "ООО",
                    title: "Иванов и Сидоров",
                    tax_id: "4447362839",
                })
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
    test('Модификация записи созданной компании', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/company/profile`, {
                method: 'POST',
                headers: {"content-type": "application/json",},
                body: JSON.stringify({
                    type: "ООО",
                    title: "Сидоров и Иванов",
                    tax_id: "4447362839",
                })
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
    test('Получить данные о компании по ID пользователя', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/company/profile?user_id=1`, {
                method: 'GET',
                headers: {"content-type": "application/json",}
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
    test('Получить данные о компаний по IDs пользователей', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/company/profile?user_ids=1,2,3,4`, {
                method: 'GET',
                headers: {"content-type": "application/json",}
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
    test('Получить данные о компании по ИНН', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/company/profile?tax_number=4436423372`, {
                method: 'GET',
                headers: {"content-type": "application/json",}
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
});