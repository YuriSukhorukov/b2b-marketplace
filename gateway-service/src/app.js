const path              = require('path');

global.appRoot          = path.resolve(__dirname); // 'gateway-service/src'

const express 			= require("express");
const app 				= express();
const cors              = require('cors');
const cookieParser      = require('cookie-parser');
const bodyParser        = require('body-parser');
const auth              = require('./api/v1/auth/router');
const home              = require('./api/v1/home/router');
const market            = require('./api/v1/market/router');
const company           = require('./api/v1/company/router');

const STATIC = path.resolve(__dirname, 'public');
const INDEX = path.resolve(STATIC, 'index.html');

app.use(express.static(STATIC));
app.get('/', (req, res) => {
  res.sendFile(INDEX);
});

app.use(cors());
app.use(bodyParser());
app.use(cookieParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/home', home);
app.use('/api/v1/market', market);
app.use('/api/v1/company', company);

app.disable('etag');

module.exports = app;