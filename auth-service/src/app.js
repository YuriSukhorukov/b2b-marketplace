const express 			= require("express");
const app 				= express();
const signin            = require('./components/signin/index');
const signup            = require('./components/signup/index');

app.use('/auth/signin', signin);
app.use('/auth/signup', signup);

module.exports = app;