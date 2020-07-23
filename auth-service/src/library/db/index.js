const {
    Client,
    Pool
  } = require('pg');

  const checkEmailExist = require('./actions/check.email.exist.action');
  const checkAccountExist = require('./actions/check.account.exist.action');
  const createAccount = require('./actions/create.account.action');
  
  class Repository {
    constructor() {
      this.name = 'repository';
      this.pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: "12345",
        port: "5432"
      });
      this.client = new Client();
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
  
    // createTableAccounts = async () => {
    //   await client.query(`${newTableSql}`, (err, res) => {
    //     console.log("client ready:", client.readyForQuery, "n")
    //     if (err) console.log('DROP TABLE ->', err);
    //     if (res) console.log('DROP TABLE result:', res);
    //   });
    // }
  }
  
module.exports = new Repository();
  