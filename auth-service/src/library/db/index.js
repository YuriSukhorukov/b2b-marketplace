const {
    Client,
    Pool
  } = require('pg');

const connect             = require('./actions/connect.action');
const createTable         = require('./actions/create.table.action');
const dropTable           = require('./actions/drop.table.action');
const checkEmailExist     = require('./actions/check.email.exist.action');
const checkAccountExist   = require('./actions/check.account.exist.action');
const createAccount       = require('./actions/create.account.action');
  
class Repository {
  constructor() {
    this.client = null;
    this.pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "postgres",
      password: "12345",
      port: "5432"
    });
  }
  
  async connect() {
      this.client = await connect(this.pool);
  }
  async checkEmailExist(params) {
      return await checkEmailExist(this.client, params);
  }
  async checkAccountExist(params) {
      return await checkAccountExist(this.client, params);
  }
  async createAccount(params) {
      return await createAccount(this.client, params);
  }
  async createTable(params) {
    return await createTable(this.pool, params);
  }
  async dropTable(params) {
    return await dropTable(this.pool, params);
  }
}
  
module.exports = new Repository();
  