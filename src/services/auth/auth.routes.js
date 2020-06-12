const express = require('express');
const router = express.Router();

const {
  EMPTY,
  SIGN_UP,
  SIGN_IN
} = require(`${process.env.PWD}/src/const/auth.route.const.js`)

router.get(`/${EMPTY}`, function (req, res) {
  console.log('Auth server got request');
  res.json({message: 'hi'});
})

router.get(`/${SIGN_UP}`, (req, res) => {
  console.log('Auth server got request');
  res.send('signup page');
})

router.get(`/${SIGN_IN}`, function (req, res) {
  console.log('Auth server got request');
  res.send('signin page');
})

module.exports = router;
