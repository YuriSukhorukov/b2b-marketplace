const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'gateway-service/src'

const express 			= require("express");
const app 				= express();
const auth              = require('./api/v1/auth/router');

app.use('/api/v1/auth', auth);

module.exports = app;