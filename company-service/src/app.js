const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'company-service/src'

const express 			= require("express");
const app 				= express();
const cors              = require('cors');
const cookieParser      = require('cookie-parser');

const profile           = require(`${global.appRoot}/api/v1/profile/router`);

app.use(cors());
app.use(cookieParser());

app.use('/profile', profile);

module.exports          = app;