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

describe('Auth API integration /api/v1/auth/signup/', () => {
  test('Signup успешная вставка учетной записи: api/v1/auth/signup', async () => {
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup`;
    const method = 'POST';
    const headers = {
      'username': 'yuri',
      'email': 'yuri@gmail.com',
      'password': 'sdWE343sx!'
    }
    const response = JSON.parse(await rp({uri, method, headers}));
    const result = response.code;
    const expected = 201;
		expect(result).toBe(expected);
  })
  test('Signup неудачная вставка учетной записи с зарегистрированным username: /api/v1/auth/signup/', async () => {
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup`;
    const method = 'POST';
    const headers = {
      'username': 'yuri',
      'email': 'ivan@gmail.com',
      'password': 'sdWE343sx!'
    }
    const response = JSON.parse(await rp({uri, method, headers}));
    const result = response.code;
    const expected = 403;
		expect(result).toBe(expected);
  })
  test('Signup неудачная вставка учетной записи с зарегистрированным email: /api/v1/auth/signup/', async () => {
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup`;
    const method = 'POST';
    const headers = {
      'username': 'ivan',
      'email': 'yuri@gmail.com',
      'password': 'sdWE343sx!'
    }
    const response = JSON.parse(await rp({uri, method, headers}));
    const result = response.code;
    const expected = 403;
		expect(result).toBe(expected);
  })
  test('Email свободен: /api/v1/auth/signup/email', async () => {
    const email = 'ivan@gmail.com';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup/email/${email}`;
    const method = 'GET';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 204;
		expect(result).toBe(expected);
  })
  test('Email занят: /api/v1/auth/signup/email', async () => {
    const email = 'yuri@gmail.com';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup/email/${email}`;
    const method = 'GET';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 302;
		expect(result).toBe(expected);
  })
  test('Login свободен: /api/v1/auth/signup/login/', async () => {
    const login = 'ivan';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signup/login/${login}`;
    const method = 'GET';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 204;
		expect(result).toBe(expected);
  })
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

describe('Auth API integration /api/v1/auth/signin/', () => {
  test('Signin пользователь с указанным email существует: /api/v1/auth/signin/:username', async () => {
    const email = 'yuri@gmail.com';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin/${email}`;
    const method = 'POST';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 302;
		expect(result).toBe(expected);
  })
  test('Signin пользователь с указанным username существует: /api/v1/auth/signin/:username', async () => {
    const username = 'yuri';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin/${username}`;
    const method = 'POST';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 302;
		expect(result).toBe(expected);
  })
  test('Signin пользователь с указанным не email существует: /api/v1/auth/signin/:username', async () => {
    const email = 'ivan@gmail.com';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin/${email}`;
    const method = 'POST';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 204;
		expect(result).toBe(expected);
  })
  test('Signin пользователь с указанным username не существует: /api/v1/auth/signin/:username', async () => {
    const username = 'ivan';
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin/${username}`;
    const method = 'POST';
    const response = JSON.parse(await rp({uri,method}));
    const result = response.code;
    const expected = 204;
		expect(result).toBe(expected);
  })
  test('Signin авторизация успешна: /api/v1/auth/signin/:username/:password', async () => {
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin`;
    const method = 'POST';
    const headers = {
      'username': 'yuri',
      'password': 'sdWE343sx!'
    }
    const response = JSON.parse(await rp({uri, method, headers}));
    const result = response.code;
    const expected = 200;
		expect(result).toBe(expected);
  })
  test('Signin неудачная авторизация - неправильный логин, правильный пароль: /api/v1/auth/signin', async () => {
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin`;
    const method = 'POST';
    const headers = {
      'username': 'ivan',
      'password': 'sdWE343sx!'
    }
    const response = JSON.parse(await rp({uri, method, headers}));
    const result = response.code;
    const expected = 401;
		expect(result).toBe(expected);
  })
  test('Signin неудачная авторизация - правильный логин, неправильный пароль: /api/v1/auth/signin/:username/:password', async () => {
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin`;
    const method = 'POST';
    const headers = {
      'username': 'yuri',
      'password': 'sdWE343sx!_bla-bla-bla'
    }
    const response = JSON.parse(await rp({uri,method,headers}));
    const result = response.code;
    const expected = 401;
		expect(result).toBe(expected);
  })
  test('Signin неудачная авторизация - неправильный email, правильный пароль: /api/v1/auth/signin/:username/:password', async () => {
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin`;
    const method = 'POST';
    const headers = {
      'username': 'ivan@gmail.com',
      'password': 'sdWE343sx!'
    }
    const response = JSON.parse(await rp({uri,method,headers}));
    const result = response.code;
    const expected = 401;
		expect(result).toBe(expected);
  })
  test('Signin неудачная авторизация - правильный email, неправильный пароль: /api/v1/auth/signin/:username/:password', async () => {
    const uri = `${config.uri}:${config.port}/api/v1/auth/signin`;
    const method = 'POST';
    const headers = {
      'username': 'yuri@gmail.com',
      'password': 'sdWE343sx!_bla-bla-bla'
    }
    const response = JSON.parse(await rp({uri,method,headers}));
    const result = response.code;
    const expected = 401;
		expect(result).toBe(expected);
  })
  test('Signin авторизация успешна, получение токена, переход на домашнюю страницу: /api/v1/home', async () => {
    const { token } = JSON.parse(await rp({
      uri: `${config.uri}:${config.port}/api/v1/auth/signin`,
      method: 'POST',
      headers: {
        'username': 'yuri@gmail.com',
        'password': 'sdWE343sx!'
      }
    }));
    const response = JSON.parse(await rp({
      uri: `${config.uri}:${config.port}/api/v1/home`,
      method: 'GET',
      headers: {
        'authorization': token
      }
    }));
    const result = response.code;
    const expected = 200;
		expect(result).toBe(expected);
  })
})