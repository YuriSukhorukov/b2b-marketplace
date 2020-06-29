jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;

const { sql } = require('../../../auth/components/db/queries/index.js')

describe('SQL Tests', () => {
  test('Defined: user', async () => {
    expect(sql).toHaveProperty('user');
  });
  test('Defined: sql.user.createTable()', async () => {
    expect(sql.user.createTable()).not.toBeNull();
  });
  test('Defined: sql.user.insertUser()', async () => {
    expect(sql.user.insertUser()).not.toBeNull();
  });
  test('Defined: sql.user.findByEmail()', async () => {
    expect(sql.user.findByEmail()).not.toBeNull();
  });


  
  // test('Next', async () => {
  //   // expect(db.user.createTable()).not.toBeNull();
  //   // const createTable = jest.fn();
  //   // expect(createTable).toHaveBeenCalledWith({...db});
  //   // const drink = jest.fn();
  //   // expect(db.user.createTable()).toBeCalled()
  //   // expect(drink).toHaveBeenCalled()

  //   // expect(db.user.createTable).toHaveReturned();
  //   // db.query(sql.user.createTable);
  //   // db.query(sql.user.findById);
  //   // db.query(sql.user.findByEmail);
  //   // db.query(sql.user.findByLogin);

  //   // db.user.createTable();
  //   // db.user.insert({id: '', email: '', login: '', password: ''});
  //   // db.user.findByEmail('john@gmail.com');
  //   // db.user.findById('DSD1221dDs');
  //   // db.user.findByLogin('Johny1100$');

  //   // db.session.createTable();
  //   // db.session.findByUserId('sdSSD221sds');
  //   // db.session.insert({id: '', user_id: '', token: ''});
  //   // db.session.findUserIdByToken('Ddddf22e22@###1!@#2cxcz');

  //   expect(true).toBe(true);
  // });
});
