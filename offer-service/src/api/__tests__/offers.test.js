const rp                = require('request-promise');
const config            = require(`../../config.json`).appConfig;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

beforeAll(async () => {
  // Подключение к БД
});

afterAll(async () => {
  // Отключение от БД
});

// describe('Offers API', () => {
//   test('GET .../offers/?category={category}', async () => {
//     const response = JSON.parse(await rp({
//         uri: `${config.uri}:${config.port}/offers/?category=food`, 
//         method: 'GET',
//         query: {
//             category: 'food'
//         }
//     }));
//     const result = response.code;
//     const expected = 200;
//     console.log(response);
//     expect(result).toBe(expected);
//   })
// });

describe('Offers API /{id}', () => {
    test('Создать offer: POST {uri}/offers', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/offers`, 
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: 1
            })
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
    // test('PUT .../offers/{id}', async () => {
    //     const response = JSON.parse(await rp({
    //         uri: `${config.uri}:${config.port}/offers/0129e1Ws`, 
    //         method: 'PUT'
    //     }));
    //     const result = response.code;
    //     const expected = 200;
    //     console.log(response);
    //     expect(result).toBe(expected);
    // })
    test('Получить список offers: GET {uri}/offers', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/offers`, 
            method: 'GET'
        }));
        const result = response.code;
        const expected = 200;
        expect(result).toBe(expected);
    })
    // test('DELETE .../offers/{id}', async () => {
    //     const response = JSON.parse(await rp({
    //         uri: `${config.uri}:${config.port}/offers/0129e1Ws`, 
    //         method: 'DELETE'
    //     }));
    //     const result = response.code;
    //     const expected = 200;
    //     console.log(response);
    //     expect(result).toBe(expected);
    // })
})

describe('Offers API /proposals', () => {
    test('POST .../proposals', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/proposals`, 
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: 3,
                offerId: 1
            })
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
    test('GET .../proposals/?offer_id={id}', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/proposals/?offer_id=1`, 
            method: 'GET'
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
    // test('DELETE .../proposals/{id}', async () => {
    //     const response = JSON.parse(await rp({
    //         uri: `${config.uri}:${config.port}/proposals/asWq12e`, 
    //         method: 'DELETE'
    //     }));
    //     const result = response.code;
    //     const expected = 200;
    //     console.log(response);
    //     expect(result).toBe(expected);
    // })
})