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

        expect(true).toBe(true);
    });
});