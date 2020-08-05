const rp                = require('request-promise');
const config            = require(`../../config.json`).appConfig;
const db                = require('../../library/db/index');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

beforeAll(async () => {
    try {
        await db.dropTable({table: 'offers'});
    } catch (e) {
        console.log(e.message);
    }
    try {
        await db.createTableOffers();
    } catch (e) {
        console.log(e.message);
    }
    try {
        await db.dropTable({table: 'proposals'});
    } catch (e) {
        console.log(e.message);
    }
    try {
        await db.createTableProposals();
    } catch (e) {
        console.log(e.message);
    }
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
    test('Создать offer: POST {URI}/offers', async () => {
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
        const result = response.code == 200 && response.body.length == 1 && response.body[0].user_id == 1;
        const expected = true;
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
    test('Получить список offers: GET {URI}/offers', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/offers`, 
            method: 'GET'
        }));
        const result = response.code == 200 && response.body.length == 1 && response.body[0].user_id == 1;
        const expected = true;
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
    test('Создать новый proposal: POST {URI}/proposals', async () => {
        const response_offers = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/offers`, 
            method: 'GET'
        }));
        const offers = response_offers.body;

        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/proposals`, 
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: 2,
                offerId: offers[0].id
            })
        }));
        
        const result = response.code;
        const expected = 200;
        expect(result).toBe(expected);
    })
    test('Неудачная попытка создать дубликат: POST ${URI}/proposals', async () => {
        const response_offers = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/offers`, 
            method: 'GET'
        }));
        const offers = response_offers.body;

        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/proposals`, 
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: 2,
                offerId: offers[0].id
            })
        }));
        const result = response.code;
        const expected = 404;
        // console.log(response);
        expect(result).toBe(expected);
    })
    test('Неудачная попытка создать proposal с user_id из offers.user_id: POST ${URI}/proposals', async () => {
        const response_offers = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/offers`, 
            method: 'GET'
        }));
        const offers = response_offers.body;

        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/proposals`, 
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: offers[0].user_id,
                offerId: offers[0].id
            })
        }));
        const result = response.code;
        const expected = 404;
        // console.log(response);
        expect(result).toBe(expected);
    })
    test('Получить список proposals: GET ${URI}/proposals/?offer_id={id}', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/proposals/?offer_id=1`, 
            method: 'GET'
        }));
        const result = response.code;
        const expected = 200;
        // console.log(response);
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