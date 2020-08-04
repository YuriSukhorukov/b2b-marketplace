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
    const result = await db.createOffer({userId: 1});
    expect(result['rows']).not.toBeNull();
  })
  test('Получение всех записей из таблицы offers', async () => {
    const result = await db.getOffers({});
    console.log(result);
    expect(result['rows']).not.toBeNull();
  })
});

describe('DB действия с таблицей proposals', () => {
  test('Создание новой записи в таблице proposals', async () => {
    const result = await db.createProposal({userId: 1, offerId: 1});
    expect(result['rows']).not.toBeNull();
  })
  test('Получение всех записей из таблицы proposals для offerId', async () => {
    await db.createOffer({userId: 1});
    await db.createProposal({userId: 100, offerId: 2});
    await db.createProposal({userId: 101, offerId: 2});
    await db.createProposal({userId: 102, offerId: 2});
    const result = await db.getProposals({offerId: 2});
    const expected = 3;
    expect(result).toHaveLength(expected)
  })
});