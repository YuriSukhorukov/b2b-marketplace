const {
    Client,
    Pool
  } = require('pg');

const connect             = require('./actions/connect.action');
const createTableUsers    = require('./actions/create.table.users.action');
const dropTable           = require('./actions/drop.table.action');
const checkEmailExist     = require('./actions/check.email.exist.action');
const checkAccountExist   = require('./actions/check.account.exist.action');
const checkUsernameExist  = require('./actions/check.username.exist.action');
const checkPassword       = require('./actions/check.password.action');
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
      return await checkEmailExist(this.pool, params);
  }
  async checkAccountExist(params) {
      return await checkAccountExist(this.pool, params);
  }
  async checkUsernameExist(params) {
    return await checkUsernameExist(this.pool, params);
  }
  async checkPassword(params) {
    return await checkPassword(this.pool, params);
  }
  async createAccount(params) {
    console.log(params);
    
      return await createAccount(this.pool, params);
  }
  async createTableUsers() {
    return await createTableUsers(this.pool);
  }
  async dropTable(params) {
    return await dropTable(this.pool, params);
  }
}
  
module.exports = new Repository();
  