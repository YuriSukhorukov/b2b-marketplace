const rp                = require('request-promise');
const config            = require(`../../config.json`).appConfig;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

beforeAll(async () => {
  // Подключение к БД
});

afterAll(async () => {
  // Отключение от БД
});

describe('Offers API /search', () => {
  test('GET .../offers/search/?category={category}', async () => {
    const response = JSON.parse(await rp({
        uri: `${config.uri}:${config.port}/search/?category=food`, 
        method: 'GET',
        query: {
            category: 'food'
        }
    }));
    const result = response.code;
    const expected = 200;
    console.log(response);
    expect(result).toBe(expected);
  })
});

describe('Offers API /{id}', () => {
    test('POST .../offers/{id}', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/0129e1Ws`, 
            method: 'POST'
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
    test('PUT .../offers/{id}', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/0129e1Ws`, 
            method: 'PUT'
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
    test('GET .../offers/{id}', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/0129e1Ws`, 
            method: 'GET'
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
    test('DELETE .../offers/{id}', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/0129e1Ws`, 
            method: 'DELETE'
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
})

describe('Offers API /{id}/proposals', () => {
    test('GET .../offers/{id}/proposals', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/0129e1Ws/proposals`, 
            method: 'GET'
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
    test('POST .../offers/{id}/proposals', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/0129e1Ws/proposals`, 
            method: 'POST'
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
    test('DELETE .../offers/{id}/proposals', async () => {
        const response = JSON.parse(await rp({
            uri: `${config.uri}:${config.port}/0129e1Ws/proposals`, 
            method: 'DELETE'
        }));
        const result = response.code;
        const expected = 200;
        console.log(response);
        expect(result).toBe(expected);
    })
})