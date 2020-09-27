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

describe(`Market proposals`, () => {
    test('Успешный отклик на оффер', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);
        
        let result = await page.evaluate(async () => {
            // Выход
            await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            });
            // Регистрация пользователя 1
            await fetch(`/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'email': 'user_xxx@gmail.com',
                    'password': '12345'
                }
            });
            // Регистрация пользователя 2
            await fetch(`/api/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'email': 'user_yyy@gmail.com',
                    'password': '12345'
                }
            });
            // Авторизация пользователя 1
            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'user_xxx@gmail.com',
                    'password': '12345'
                }
            });
            // Создание оффера пользователем 1
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
            let response_json = await response.json();
            let offer = response_json.body[0];
            // Выход пользователя 1
            await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            });
            // Авторизация пользователя 2
            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'user_yyy@gmail.com',
                    'password': '12345'
                }
            });
            // Отклик пользователем 2 на оффер пользователя 1
            let result = await fetch(`/api/v1/market/proposals`, {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({offerId: offer.id})
            });
            return await result.json();
        });
        expect(result.succes).toBe(true);
    })

    test('Неудачный повторный отклик на оффер', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);
        
        let result = await page.evaluate(async () => {
            // Выход
            await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            });
            // Авторизация пользователя 1
            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'user_xxx@gmail.com',
                    'password': '12345'
                }
            });
            // Создание оффера пользователем 1
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
            let response_json = await response.json();
            let offer = response_json.body[0];
            // Выход пользователя 1
            await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            });
            // Авторизация пользователя 2
            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'user_yyy@gmail.com',
                    'password': '12345'
                }
            });
            // Отклик пользователем 2 на оффер пользователя 1
            await fetch(`/api/v1/market/proposals`, {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({offerId: offer.id})
            });
            // Повторный отклик пользователем 2 на оффер пользователя 1
            let result = await fetch(`/api/v1/market/proposals`, {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({offerId: offer.id})
            });

            return await result.json();
        });
        expect(result.succes).toBe(false);
    })

    test('Неудачный отклик на свой оффер', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            // Выход пользователя
            await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            });
            // Авторизация пользователя
            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'user_xxx@gmail.com',
                    'password': '12345'
                }
            });
            // Создание оффера пользователем
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
            let response_json = await response.json();
            let offer = response_json.body[0];
            // Отклик пользователем на свой же оффер
            let result = await fetch(`/api/v1/market/proposals`, {
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify({offerId: offer.id})
            });

            return await result.json();
        });
        expect(result.succes).toBe(false);
    })
    test('Получение списка откликов на оффер', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);
        
        let result = await page.evaluate(async () => {
            // Выход пользователя
            await fetch(`/api/v1/auth/signout`, {
                method: 'POST'
            });
            // Авторизация пользователя
            await fetch(`/api/v1/auth/signin`, {
                method: 'POST',
                headers: {
                    'username': 'user_xxx@gmail.com',
                    'password': '12345'
                }
            });
            let result = await fetch(`/api/v1/market/proposals?offer_id=7`, {
                method: 'GET',
                headers: {"content-type": "application/json"},
            });
            return await result.json();
        });
        expect(result.succes).toBe(true);
    })
})


// TODO
// Из оффера получить идентификаторы откликов
// Из откликов получить идентификаторы пользователей
// Из идентификаторов пользователей получить информацию о компаниях

describe(`Market proposals companies details`, () => {
    test('', async () => {
        page = await browser.newPage();
        await page.goto(`${config.uri}:${config.port}/api/v1/auth/signin`);

        let result = await page.evaluate(async () => {
            const signup = async (params) => {
                return await fetch(`/api/v1/auth/signup`, {
                    method: 'POST',
                    headers: params
                });
            };
            const signin = async (params) => {
                return await fetch(`/api/v1/auth/signin`, {
                    method: 'POST',
                    headers: params
                });
            };
            const signout = async () => {
                return await fetch(`/api/v1/auth/signout`, {
                    method: 'POST'
                });
            };
            const editCompanyProfile = async (params) => {
                return await fetch(`/api/v1/company/profile`, {
                    method: 'POST',
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(params)
                });
            };
            const createOffer = async (params) => {
                return await fetch(`/api/v1/market/offers`, {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(params)
                });
            };
            const getOffers = async () => {            
                return await fetch(`/api/v1/market/offers`, {
                    method: 'GET', 
                    headers: {
                        "content-type": "application/json"
                    }
                });
            };
            const createProposal = async (params) => {
                return await fetch(`/api/v1/market/proposals`, {
                    method: 'POST',
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify(params) // {offerId: offer.id}
                });
            };
            
            // 1
            await signup({
                email: 'alexander@gmail.com',
                password: 'password12345'
            });
            await signin({
                email: 'alexander@gmail.com',
                password: 'password12345'
            });
            await editCompanyProfile({
                legal_type: "ООО",
                company_name: "Иванов и Сидоров",
                tax_id: "4447362830",
            });
            await createOffer({
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
            await signout();

            // 2
            const response = await signup({
                email: 'german@gmail.com',
                password: 'password12345'
            });

            return response.json();
        });

        // 1
        // Зарегистрироваться
        // Авторизоваться
        // Создать профиль компании
        // Создать предложение
        // Выйти

        // 2
        // Зарегистрироваться
        // Авторизоваться
        // Создать профиль компании
        // Получить список предложений
        // Создать отклик на предложение
        // Выйти

        // 3
        // Зарегистрироваться
        // Авторизоваться
        // Создать профиль компании
        // Получить предложение по идентификатору предложения
        // Получить отклики по идентификатору предложения
        // Получить идентификаторы пользователей из откликов
        // Получить информацию о компаниях по идентификаторам пользователей

        expect(result.succes).toBe(true);
    })
});

const sinup = async () => {
    return await fetch(`/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
            'email': 'yuri@gmail.com',
            'password': 'sdWE343sx!'
        }
    });
};