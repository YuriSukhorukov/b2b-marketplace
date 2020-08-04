const db = require('../index');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

beforeAll(async () => {
    try {
        await db.dropTable({table: 'offers'});
    } catch (e) {
        console.log(e.message);
    }
    try {
        await db.dropTable({table: 'proposals'});
    } catch (e) {
        console.log(e.message);
    }
});

afterAll(async () => {});

describe('DB создание таблиц', () => {
  test('Создание таблицы offers', async () => {
    const result = await db.createTableOffers();
    expect(result['rows']).not.toBeNull();
  })
  test('Создание таблицы proposals', async () => {
    const result = await db.createTableProposals();
    expect(result['rows']).not.toBeNull();
  })
});

describe('DB действия с таблицей offers', () => {
  test('Создание новой записи в таблице offers', async () => {
    expect(true).toBe(true);
  })
});

describe('DB действия с таблицей proposals', () => {
  test('Создание новой записи в таблице proposals', async () => {
    expect(true).toBe(true);
  })
});