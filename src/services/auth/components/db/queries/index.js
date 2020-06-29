const { createTable } = require('./user/sql.create.table.js');
const { insertUser } = require('./user/sql.insert.user.js');
const { findByEmail } = require('./user/sql.find.by.email.js');

exports.sql = {
  user: {
    createTable,
    insertUser,
    findByEmail,
  }
}