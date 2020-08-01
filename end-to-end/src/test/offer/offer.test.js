const rp                = require('request-promise');
const config            = require(`../../config.json`).gatewayServiceConfig;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

beforeAll(async () => {
  // Подключение к БД
});

afterAll(async () => {
  // Отключение от БД
});

// TODO
// 1. Регистрация нового польщователя
//    - Проверка отсутствия профиля с указанным email
//    - Проверка отсутствия профиля с указанным login
//    - Запрос пароля 
//    - Запись в БД нового польщователя
// 2. Попытка зарегистрировать пользователя повторно

describe('Offer API integration /api/v1/offer/...', () => {
  test('...: api/v1/offer/...', async () => {
    const result = true;
    const expected = true;
    expect(result).toBe(expected);
  })
});