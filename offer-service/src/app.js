const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'offer-service/src'

const express 			= require("express");
const app 				= express();
const bodyParser        = require('body-parser');
const offers            = require(`${global.appRoot}/api/v1/offers/router`);
const proposals         = require(`${global.appRoot}/api/v1/proposals/router`);

app.use(bodyParser());
app.use('/offers', offers);
app.use('/proposals', proposals);

module.exports          = app;