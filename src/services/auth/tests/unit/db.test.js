jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

const DB = require('../../../auth/components/db/index.js');

let db = null;

beforeAll(async ()=> {
  db = new DB();
});

describe('DB Tests', () => {
  test('Defined: query', async () => {
    expect(db).toHaveProperty('query');
  });
});
