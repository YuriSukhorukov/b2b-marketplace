const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'company-service/src'

const express 			= require("express");
const app 				= express();
const cors              = require('cors');
const cookieParser      = require('cookie-parser');

app.use(cors());
app.use(cookieParser());

module.exports          = app;