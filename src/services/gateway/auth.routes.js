const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const {convertObjToQuery} = require(`${process.env.PWD}/src/utils/params.js`);

const {
  EMPTY,
  SIGN_UP,
  SIGN_IN
} = require(`${process.env.PWD}/src/const/auth.route.const.js`);

const URL_AUTH = process.env.URL_AUTH;

router.use(`/${EMPTY}`,  (req, res, next) => {
  console.log('gateway middleware');
  return next();
});

router.use(`/${EMPTY}`,  (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!').end();
});

router.get(`/${EMPTY}`, async (req, res) => {
  const uri = `${URL_AUTH}/${EMPTY}`;
  const body = {message: 'hello'};
  const json = true;
  const method = 'GET';
  const response = await rp({uri, body, json, method});
  res.send(response);
})

router.get(`/${SIGN_UP}`, async (req, res) => {
  let query = convertObjToQuery(req.query);
  const uri = `${URL_AUTH}/${SIGN_UP}?${query}`;
  const response = await rp({uri});
  res.send(response);
})

router.get(`/${SIGN_IN}`, async (req, res) => {
  const uri = `${URL_AUTH}/${SIGN_IN}`;
  const response = await rp({uri});
  res.send(response);
})

module.exports = router;
