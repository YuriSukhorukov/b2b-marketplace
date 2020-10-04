const {
    Pool
} = require('pg');

const dropTable                 = require('./actions/drop.table');
const createTableProfiles       = require('./actions/profile/create.table.profiles');
const getProfile                = require('./actions/profile/get.profile');
const getProfiles               = require('./actions/profile/get.profiles');
const editProfile               = require('./actions/profile/edit.profile');

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
    async createTableProfiles() {
        return await createTableProfiles(this.pool);
    }
    async getProfile(params) {
        return await getProfile(this.pool, params);
    }
    async getProfiles(params) {
        return await getProfiles(this.pool, params);
    }
    async editProfile(params) {
        return await editProfile(this.pool, params);
    }
  }
    
  module.exports = new Repository();