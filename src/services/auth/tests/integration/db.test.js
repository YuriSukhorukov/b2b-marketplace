jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

const DB = require('../../../auth/components/db/index.js')
const { sql } = require('../../../auth/components/db/queries/index.js')

let db = null;

beforeAll(async ()=> {
  db = new DB();
});

describe('DB Tests integration', () => {
  test('Create table: ', async () => {
    let request = sql.user.createTable();
    let result = db.query(request);
    let expected = null;
    expect(result).toBe(expected);
  });
  test('Insert user: ', async () => {
    let request = sql.user.insertUser(login, password);
    let result = db.query(request);
    let expected = null;
    expect(result).toBe(expected);
  });
});
