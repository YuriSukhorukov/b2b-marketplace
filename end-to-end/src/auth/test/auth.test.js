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

describe('Auth e2e', () => {
  test('Email свободен: /api/v1/auth/signup/email', async () => {
    const email = 'yyy@xxx.com';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup/email/${email}`;
    const method = 'GET';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 204;
		expect(result).toBe(expected);
  }),
  test('Email занят: /api/v1/auth/signup/email', async () => {
    const email = 'xxx@xxx.com';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup/email/${email}`;
    const method = 'GET';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 302;
		expect(result).toBe(expected);
  }),
  test('Login свободен: /api/v1/auth/signup/login/', async () => {
    const login = 'ivan';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup/login/${login}`;
    const method = 'GET';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 204;
		expect(result).toBe(expected);
  }),
  test('Login занят: /api/v1/auth/signup/login/', async () => {
    const login = 'yuri';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup/login/${login}`;
    const method = 'GET';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 302;
		expect(result).toBe(expected);
  })
});