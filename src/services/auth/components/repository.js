const {
  Client,
  Pool
} = require('pg');

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
    this.createTableAccounts();
  }

  sayHi = () => {
    console.log(this.name);
  }

  isEmailExist = () => {}
  isAccountExist = () => {}
  insertAccount = () => {}

  createTableAccounts = async () => {
    await client.query(`${newTableSql}`, (err, res) => {
      console.log("client ready:", client.readyForQuery, "n")
      if (err) console.log('DROP TABLE ->', err);
      if (res) console.log('DROP TABLE result:', res);
    });
  }
  dropTableAccounts = () => {}
}

exports.repository = new Repository();
