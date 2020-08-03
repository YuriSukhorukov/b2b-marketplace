const {
    Client,
    Pool
  } = require('pg');

const dropTable                 = require('./actions/drop.table');
const createTableOffers         = require('./actions/create.table.offers');
const createTableProposals      = require('./actions/create.table.proposals');
  
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

  async createTableOffers() {
    return await createTableOffers(this.pool);
  }
  async createTableProposals(params) {
    return await createTableProposals(this.pool, params);
  }
  async dropTable(params) {
    return await dropTable(this.pool, params);
  }
}
  
module.exports = new Repository();
  