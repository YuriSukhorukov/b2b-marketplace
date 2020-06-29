class DB {
  constructor() {
    this._pool = null;
    this._client = {query: str => str};
  }
  async query(sql) {
    await this._client.query(sql, (err, res) => {});
  }
}

module.exports = DB;