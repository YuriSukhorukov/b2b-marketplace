const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'gateway-service/src'

const express 			= require("express");
const app 				= express();
const bodyParser        = require('body-parser');
const auth              = require('./api/v1/auth/router');
const home              = require('./api/v1/home/router');
const market            = require('./api/v1/market/router');

app.use(bodyParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/home', home);
app.use('/api/v1/market', market);

module.exports = app;