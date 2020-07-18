const express 			= require("express");
const app 				= express();
const signin            = require('./components/signin/index');
const signup            = require('./components/signup/index');

app.use('/signin', signin);
app.use('/signup', signup);

module.exports = app;