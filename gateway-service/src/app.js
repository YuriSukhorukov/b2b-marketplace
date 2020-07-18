const express 			= require("express");
const app 				= express();
const http              = require('http');
const { auth }          = require('./components/auth/index');

app.use('/api/v1/auth', auth.router);

module.exports = app;