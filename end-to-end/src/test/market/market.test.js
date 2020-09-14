const rp                = require('request-promise');
const config            = require(`../../config.json`).gatewayServiceConfig;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

beforeAll(async () => {
  // Подключение к БД
});

afterAll(async () => {
  // Отключение от БД
});

// TODO перенести тесты в окружение браузера для работы с cookies
describe('Market API integration /api/v1/market/offer', () => {
  test('Создание оффера: POST /api/v1/market/offer', async () => {
    const uri       = `${config.uri}:${config.port}/api/v1/market/offers`;
    const method    = 'POST';
    const headers   = {"content-type": "application/json"};
    const body      = JSON.stringify({
      userId: 1,
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
    const response  = JSON.parse(await rp({uri, method, headers, body}));

    const result    = response.code == 200;
    const expected  = true;

		expect(result).toBe(expected);
  })
  test('Создать несколько офферов и получить список всех офферов: POST /api/v1/market/offer', async () => {
    const uri       = `${config.uri}:${config.port}/api/v1/market/offers`;
    let method      = 'POST';
    const headers   = {"content-type": "application/json"}
    const body      = JSON.stringify({
      userId: 1,
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
    JSON.parse(await rp({uri, method, headers, body}));
    JSON.parse(await rp({uri, method, headers, body}));
    JSON.parse(await rp({uri, method, headers, body}));
    method = 'GET';
    const response = JSON.parse(await rp({uri, method, headers}));
    
    const result = response.code == 200 
                && response.body.length == 4 
                && response.body[0].user_id == 1
                && response.body[1].user_id == 1
                && response.body[2].user_id == 1
                && response.body[3].user_id == 1
                && response.body[0].title == "Сгущенка"
                && response.body[0].description == "Оригинальная сгущенка Рогачевъ."
                && response.body[0].price == 1000000
                && response.body[0].amount == 249
                && response.body[0].currency_code == "RUB"
                && response.body[0].offer_type == "SELL"
                && response.body[0].measure_unit_code == "TN"
                && response.body[0].date_publication != undefined
                && response.body[0].date_expires != undefined
                && response.body[0].country == "Российская Федерация"
                && response.body[0].city == "Москва";
    const expected = true;
    
		expect(result).toBe(expected);
  })
});

// describe('Market API integration /api/v1/market/proposals', () => {
//   test('Создать отклик на оффер: POST /api/v1/market/proposals', async () => {
//     let uri         = `${config.uri}:${config.port}/api/v1/market/offers`;
//     let method      = 'GET';
//     let headers     = {"content-type": "application/json"};
//     let body        = undefined;
//     let response    = JSON.parse(await rp({uri, method, headers}));
//     const offers    = response.body;
    
//     uri             = `${config.uri}:${config.port}/api/v1/market/proposals`;
//     method          = 'POST';
//     body            = JSON.stringify({userId: offers[0].user_id + 1, offerId: offers[0].id});
//     response        = JSON.parse(await rp({uri, method, headers, body}));
    
//     const result    = response.code == 200;
//     const expected  = true;

//     expect(result).toBe(expected);
//   })
//   test('Неудачное создание отклика на оффер с копиями offer_id и user_id: POST /api/v1/market/proposals', async () => {
//     let uri         = `${config.uri}:${config.port}/api/v1/market/proposals/?offer_id=1`;
//     let method      = 'GET';
//     let headers     = {"content-type": "application/json"};
//     let body        = undefined;
//     let response    = JSON.parse(await rp({uri, method, headers}));
//     let proposals   = response.body;
    
//     uri             = `${config.uri}:${config.port}/api/v1/market/proposals`;
//     method          = 'POST';
//     body            = JSON.stringify({userId: proposals[0].user_id, offerId: proposals[0].offer_id});
//     response        = JSON.parse(await rp({uri, method, headers, body}));
    
//     const result    = response.code == 404;
//     const expected  = true;

//     expect(result).toBe(expected);
//   })
//   test('Неудачное создание отклика на свой же оффер: POST /api/v1/market/proposals', async () => {
//     let uri         = `${config.uri}:${config.port}/api/v1/market/offers`;
//     let method      = 'GET';
//     let headers     = {"content-type": "application/json"};
//     let body        = undefined;
//     let response    = JSON.parse(await rp({uri, method, headers}));
//     const offers    = response.body;
    
//     uri             = `${config.uri}:${config.port}/api/v1/market/proposals`;
//     method          = 'POST';
//     body            = JSON.stringify({userId: offers[0].user_id, offerId: offers[0].id});
//     response        = JSON.parse(await rp({uri, method, headers, body}));
    
//     const result    = response.code == 404;
//     const expected  = true;

//     expect(result).toBe(expected);
//   })
// })