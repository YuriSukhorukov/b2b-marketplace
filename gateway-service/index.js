const { appConfig }     = require('./src/config.json');
const app               = require('./src/app');

const port 				      = process.env.PORT || appConfig.port;

app.listen(port, () => {
  console.log(`API Gateway server listening on port ${port}`);
});






// ---------------------------------------------


// const express = require("express");
// const app = express();
// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const port = process.env.PORT || 5000;

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
//       servers: ["http://localhost:5000"]
//     }
//   },
//   // ['.routes/*.js']
//   apis: ["index.js"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// // const swaggerDocs = require('./swagger.json');
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// // Routes
// /**
//  * @swagger
//  * /customers:
//  *  get:
//  *    description: Use to request all customers
//  *    tags: ["customers"]
//  *    responses:
//  *      '200':
//  *        description: A successful response
//  */
// app.get("/customers", (req, res) => {
//   res.status(200).send("Customer results");
// });

// /**
//  * @swagger
//  * /customers:
//  *    put:
//  *      description: Use to return all customers
//  *    parameters:
//  *      - name: customer
//  *        in: query
//  *        description: Name of our customer
//  *        required: false
//  *        schema:
//  *          type: string
//  *          format: string
//  *    responses:
//  *      '201':
//  *        description: Successfully created user
//  */
// app.put("/customer", (req, res) => {
//   res.status(200).send("Successfully updated customer");
// });

// /**
//  * @swagger
//  *
//  * definitions:
//  *   NewUser:
//  *     type: object
//  *     required:
//  *       - username
//  *       - password
//  *     properties:
//  *       username:
//  *         type: string
//  *       password:
//  *         type: string
//  *         format: password
//  *   User:
//  *     allOf:
//  *       - $ref: '#/definitions/NewUser'
//  *       - required:
//  *         - id
//  *       - properties:
//  *         id:
//  *           type: integer
//  *           format: int64
//  */

// /**
//  * @swagger
//  * /users:
//  *   get:
//  *     description: Returns users
//  *     produces:
//  *      - application/json
//  *     responses:
//  *       200:
//  *         description: users
//  *         schema:
//  *           type: array
//  *           items:
//  *             $ref: '#/definitions/User'
//  */
// app.get('/users', (req, res) => {
//   // Your implementation logic comes here ...
// });

// /**
//  * @swagger
//  *
//  * /users:
//  *   post:
//  *     description: Creates a user
//  *     produces:
//  *       - application/json
//  *     parameters:
//  *       - name: user
//  *         description: User object
//  *         in:  body
//  *         required: true
//  *         type: string
//  *         schema:
//  *           $ref: '#/definitions/NewUser'
//  *     responses:
//  *       200:
//  *         description: users
//  *         schema:
//  *           $ref: '#/definitions/User'
//  */
// app.post('/users', (req, res) => {
//   // Your implementation logic comes here ...
// });


// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });