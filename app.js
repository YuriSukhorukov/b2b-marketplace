const { spawn } = require('child_process');

const runService = async (cmd, args, env) => {
  return new Promise((res, rej)=>{
    const service = spawn('node', args, env);
    service.stdout.on('data', (data) => {
      console.log(`${data}`);
    });
    service.stderr.on('data', (data) => {
      console.error(`child stderr:\n${data}`);
    });
    service.on('exit', function (code, signal) {
      console.log(`child process exited with code ${code} and signal ${signal}`);
      service.kill('SIGTERM');
    });
    res(service);
  });
}

process.env.PORT_AUTH = 8082;
process.env.URL_AUTH = `http://localhost`;

(async()=>{
  const gatewayService = await runService('node', ['src/services/gateway/server.js'], {
    env: {
      PWD: process.env.PWD,
      PORT: 8081,
      PORT_AUTH: process.env.PORT_AUTH,
      URL_AUTH: process.env.URL_AUTH
    },
    shell: true
  });
  const authService = await runService('node', ['src/services/auth/server.js'], {
    env: {
      PWD: process.env.PWD,
      PORT: process.env.PORT_AUTH
    },
    shell: true
  });
})()


// // This is the startup file of our application. It initializes the database connection and starts the express server.
//
// const port 					= process.env.PORT || 8080;
//
// const express 			= require("express");
// const app 					= express();
// const swaggerJsDoc 	= require("swagger-jsdoc");
// const swaggerUi 		= require("swagger-ui-express");
//
// const routes 				= require(`./src/routes`);
// const config        = require(`./src/config`);
//
// const {
//   Client,
//   Pool
// }                   = require('pg');
//
// const client        = new Client();
//
// // Extended: https://swagger.io/specification/#infoObject
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Customer API",
//       description: "Customer API Information",
//       contact: {
//         name: "Amazing Developer"
//       },
//       servers: [`http://localhost:${port}`]
//     }
//   },
//   apis: [`routes/api/${config.api.version}/*.js`]
// };
//
// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//
// app.use(`/`, routes);
//
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
//
// app.get("/", (req, res) => {
//   res.status(200).send("Hello");
// });
//
//
//
//
//
// const tableName = "employee";
//
// // Declare a string for the CREATE TABLE SQL statement
// const newTableSql = `CREATE TABLE ${tableName} (
//   id SERIAL NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   address TEXT NOT NULL,
//   email VARCHAR(255) NOT NULL,
//   phone VARCHAR(20) NOT NULL
// );`;
//
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
