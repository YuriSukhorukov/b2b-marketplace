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

describe(`Auth signin`, () => {
    test('Успешная регистрация', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'email': 'yuri2322233@gmail.com',
                    'password': 'sdWE343sx!'
                }
            });
            return response.status;
        });

        expect(result).toBe(201);
    });
    test('Неудачная регистрация: занятый email', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'email': 'yuri@gmail.com',
                    'password': 'sdWE343sx!'
                }
            });
            return response.status;
        });
        expect(result).toBe(403);
    });
});

describe(`Auth signup`, () => {
    test('Успешная авторизация', async () => {
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
    test('Неудачная авторизация: неправильный пароль', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'username': 'yuri@gmail.com',
                    'password': 'sdWE343sx!_bla-bla-bla'
                }
            });
            return response.status;
        });
        expect(result).toBe(401);
    });
});