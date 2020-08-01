const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'offer-service/src'

const express 			= require("express");
const app 				= express();
const offers            = require(`${global.appRoot}/api/v1/offers/router`);

app.use('/', offers);

module.exports          = app;