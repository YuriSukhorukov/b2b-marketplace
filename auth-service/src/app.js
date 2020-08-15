const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'auth-service/src'

const express 			= require("express");
const app 				= express();
const cors              = require('cors');
const cookieParser      = require('cookie-parser');
const signin            = require(`${global.appRoot}/api/v1/signin/router`);
const signup            = require(`${global.appRoot}/api/v1/signup/router`);

app.use(cors());
app.use(cookieParser());

app.use(`/`, require(`./middlewares/all.middle`));
app.use('/signin', signin);
app.use('/signup', signup);

module.exports          = app;