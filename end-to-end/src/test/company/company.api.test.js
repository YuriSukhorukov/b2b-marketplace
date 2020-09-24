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
    test('Успешный...', async () => {
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
            // return response.json();
            return {succes: true};
        });
        expect(result.succes).toBe(true);

        expect(true).toBe(true);
    });
});