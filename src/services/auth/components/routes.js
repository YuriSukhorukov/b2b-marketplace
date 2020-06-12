const express = require('express');
const router = express.Router();

const {
  EMPTY,
  SIGN_UP,
  SIGN_IN
} = require(`${process.env.PWD}/src/const/auth.route.const.js`)

const {
  empty,
  signup,
  signin
} = require('./handlers.js');

router.get(`/${EMPTY}`, empty);
router.get(`/${SIGN_UP}`, signup)
router.get(`/${SIGN_IN}`, signin)

module.exports = router;
