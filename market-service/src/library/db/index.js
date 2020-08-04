const {
    Client,
    Pool
  } = require('pg');

const dropTable                 = require('./actions/drop.table');
const createTableOffers         = require('./actions/create.table.offers');
const createTableProposals      = require('./actions/create.table.proposals');
const createOffer               = require('./actions/create.offer');
const createProposal            = require('./actions/create.proposal');
const getOffers                 = require('./actions/get.offers');
const getProposals              = require('./actions/get.proposals');
  
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
  async createOffer(params) {
    return await createOffer(this.pool, params);
  }
  async createProposal(params) {
    return await createProposal(this.pool, params);
  }
  async getOffers(params) {
    return await getOffers(this.pool, params);
  }
  async getProposals(params) {
    return await getProposals(this.pool, params);
  }
}
  
module.exports = new Repository();
  