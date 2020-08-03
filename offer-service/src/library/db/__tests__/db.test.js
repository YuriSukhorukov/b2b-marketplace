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

describe('DB инициализация', () => {
  test('Создание таблицы offers', async () => {
    const result = await db.createTableOffers();
    expect(result['rows']).not.toBeNull();
  })
  test('Создание таблицы proposals', async () => {
    const result = await db.createTableProposals();
    expect(result['rows']).not.toBeNull();
  })
});