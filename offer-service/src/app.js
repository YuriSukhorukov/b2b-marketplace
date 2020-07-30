const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'offer-service/src'

const express 			= require("express");
const app 				= express();

module.exports          = app;