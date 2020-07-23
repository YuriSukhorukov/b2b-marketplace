const path              = require('path');
global.appRoot          = path.resolve(__dirname); // 'gateway-service/src'

const express 			= require("express");
const app 				= express();
const auth              = require('./api/v1/auth/delete.router');

app.get('/customers', async (req, res) => {
    res.send('ok');
});

const swaggerUi 	= require("swagger-ui-express");
const swaggerJsDoc 	= require("swagger-jsdoc");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'B2B Marketplace API',
            description: "Customer API Information",
            contact: {
                name: "Owner"   
            },
            servers: [`http://localhost:8080`]
        },  
    },
    apis: ['./api/v1/auth/router.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;