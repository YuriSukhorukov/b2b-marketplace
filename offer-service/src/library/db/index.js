const {
    Client,
    Pool
  } = require('pg');

const dropTable                 = require('./actions/drop.table.action');
  
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
  
  async dropTable(params) {
    return await dropTable(this.pool, params);
  }
}
  
module.exports = new Repository();
  