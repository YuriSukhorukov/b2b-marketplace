const port 					= process.env.PORT || 8080;
const express 			= require("express");
const app 					= express();
const router        = require('express').Router();

// const {
//   Client,
//   Pool
// }                   = require('pg');
//
// const client        = new Client();

app.use(`/`, require(`./components/routes`));

app.listen(port, () => {
  console.log(`Auth server listening on port ${port}`);
});







// const tableName = "employee";
//
// const newTableSql = `CREATE TABLE ${tableName} (
//   id SERIAL NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   address TEXT NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   phone VARCHAR(20) NOT NULL
// );`;
//
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "postgres",
//   password: "12345",
//   port: "5432"
// });
//
// (async()=>{
//   const client = await pool.connect().catch(err => {
//     console.log('pool .connect ->', err)
//   });
//   if (client !== undefined) {
//     // await client.query(`${newTableSql}`, (err, res) => {
//     //   console.log("client ready:", client.readyForQuery, "n")
//
//     //   if (err) {
//     //     console.log('DROP TABLE ->', err)
//     //   }
//     //   if (res) {
//     //     console.log('DROP TABLE result:', res)
//     //   }
//     // });
//     // await client.query(`DROP TABLE ${tableName};`, (err, res) => {
//     //   console.log("client ready:", client.readyForQuery, "n")
//
//     //   if (err) {
//     //     console.log('DROP TABLE ->', err)
//     //   }
//     //   if (res) {
//     //     console.log('DROP TABLE result:', res)
//     //   }
//     // });
//     await client.query(`SELECT NOW()`, (err, res) => {
//       console.log("client ready:", client.readyForQuery, "n")
//
//       if (err) {
//         console.log('DROP TABLE ->', err)
//       }
//       if (res) {
//         console.log('DROP TABLE result:', res)
//       }
//     });
//   }
// })()
