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

describe(`Auth signup`, () => {
    test('Успешная регистрация', async () => {
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
            return response.json();
        });
        expect(result.succes).toBe(true);
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
            return response.json();
        });
        expect(result.succes).toBe(false);
    });
    test('Занятый email', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signup/email/yuri@gmail.com`, {
                method: 'GET'
            });
            return response.json();
        });
        expect(result.succes).toBe(false);
    });
    test('Свободный email', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signup/email/ivan@gmail.com`, {
                method: 'GET'
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
});

describe(`Auth signin`, () => {
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
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
    test('Неудачная авторизация: неправильный пароль', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'yuri1@gmail.com',
                    'password': 'sdWE343sx!_bla-bla-bla'
                }
            });
            return response.json();
        });
        expect(result.succes).toBe(false);
    });
    test('Неудачная авторизация: несуществующий email', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'yuri_bla-bla-bla@gmail.com',
                    'password': 'sdWE343sx!'
                }
            });
            return response.json();
        });
        expect(result.succes).toBe(false);
    });
});

describe(`Auth signout`, () => {
    test('Успешный выход', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
});

describe(`Auth verification`, () => {
    test('Успешная верификация', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'yuri@gmail.com',
                    'password': 'sdWE343sx!'
                }
            })
            const response = await fetch(`/api/v1/auth/verification`, {
                method: 'POST'
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
    test('Неудачная верификация', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            })
            const response = await fetch(`/api/v1/auth/verification`, {
                method: 'POST'
            });
            return response.json();
        });
        expect(result.succes).toBe(false);
    });
});