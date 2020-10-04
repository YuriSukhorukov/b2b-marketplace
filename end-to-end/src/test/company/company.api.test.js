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

// TODO добавить тест неудачной модификации компании

describe(`Company`, () => {
    test('Создание записи компании', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            // Авторизация
            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'yuri@gmail.com',
                    'password': 'sdWE343sx!'
                }
            });
            // Создание профиля компании
            await fetch(`/api/v1/company/profile`, {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    legal_type: "ООО",
                    company_name: "Иванов и Сидоров",
                    tax_id: "4447362839",
                })
            });
            // Получить информацию о компании
            const response = await fetch(`/api/v1/company/profile?tax_id=4447362839`, {
                method: 'GET',
                headers: {"content-type": "application/json"},
            });
            return response.json();
        });
        expect(result.succes).toBe(true);
    });
    test('Модификация записи созданной компании', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            // Изменить данные о компании
            await fetch(`/api/v1/company/profile`, {
                method: 'POST',
                headers: {"content-type": "application/json",},
                body: JSON.stringify({
                    legal_type: "ООО",
                    company_name: "Сидоров и Иванов",
                    tax_id: "4447362839",
                })
            });
            // Получить информацию о компании
            const response = await fetch(`/api/v1/company/profile?tax_id=4447362839`, {
                method: 'GET',
                headers: {"content-type": "application/json"},
            });
            return response.json();
        });
        // Сравнить отредактированную информацию о компании
        expect(
            result.succes 
         && result.body[0].tax_id === '4447362839' 
         && result.body[0].company_name === 'Сидоров и Иванов').toBe(true);
    });
    test('Получить названия и типы компаний по массиву IDs пользователей [...user_id]', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/company/profile?user_ids=1,2,3,4`, {
                method: 'GET',
                headers: {"content-type": "application/json"},
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
    test('Получить данные о компании по ИНН', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const response = await fetch(`/api/v1/company/profile?tax_id=4447362839`, {
                method: 'GET',
                headers: {"content-type": "application/json",}
            });
            return response.json();
        });
        expect(parseInt(result.body[0].tax_id)).toBe(4447362839);
    });
});