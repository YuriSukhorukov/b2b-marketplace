const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'offer-service/src'

const express 			= require("express");
const app 				= express();
const cors              = require('cors');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const offers            = require(`${global.appRoot}/api/v1/offers/router`);
const proposals         = require(`${global.appRoot}/api/v1/proposals/router`);

app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.use('/offers', offers);
app.use('/proposals', proposals);

app.disable('etag');

module.exports          = app;