const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'auth-service/src'

const express 			= require("express");
const app 				= express();
const signin            = require(`${global.appRoot}/api/v1/signin/router`);
const signup            = require(`${global.appRoot}/api/v1/signup/router`);

app.use('/signin', signin);
app.use('/signup', signup);

module.exports          = app;