// const port 				= process.env.PORT || 8080;
// const express 			= require("express");
// const app 				= express();
// const router            = require('express').Router();


// app.listen(port, () => {
//   console.log(`API Gateway server listening on port ${port}`);
// });

// app.get(`/${EMPTY}`, (req, res) => {
//   res.status(200).send("I'm gateway");
// });

const validate = (req, res, next) => {
    console.log('auth middleware');
    return next();
};
const signup = (req, res) => {
    res.send('signup page');
};
const signin = (req, res) => {
    res.send('signin page');
};



// app.js
const {appConfig}       = require('./config.json');

const express 			= require("express");
const app 				= express();
const http              = require('http');
const router            = express.Router();

router.use(`/`, validate);
router.get(`/signup`, signup);
router.get(`/signin`, signin);

app.use('/api/v1', router);

module.exports = app;