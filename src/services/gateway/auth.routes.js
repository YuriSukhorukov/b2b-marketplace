var express = require('express');
var router = express.Router();
var rp = require('request-promise');

const {
  EMPTY,
  SIGN_UP,
  SIGN_IN
} = require(`${process.env.PWD}/src/const/auth.route.const.js`);

const URL_AUTH = process.env.URL_AUTH;
const PORT_AUTH = process.env.PORT_AUTH;

router.use(`/${EMPTY}`,  (req, res, next) => {
  console.log('auth middleware');
  return next();
});

router.use(`/${EMPTY}`,  (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!').end();
});

router.get(`/${EMPTY}`, async (req, res) => {
  const uri = `${URL_AUTH}:${PORT_AUTH}/${EMPTY}`;
  const body = {message: 'hello'};
  const json = true;
  const method = 'GET';
  const response = await rp({uri, body, json, method});
  res.send(response);
})

router.get(`/${SIGN_UP}`, async (req, res) => {
  const uri = `${URL_AUTH}:${PORT_AUTH}/${SIGN_UP}`;
  const response = await rp({uri});
  res.send(response);
})

router.get(`/${SIGN_IN}`, async (req, res) => {
  const uri = `${URL_AUTH}:${PORT_AUTH}/${SIGN_IN}`;
  const response = await rp({uri});
  res.send(response);
})

module.exports = router;
