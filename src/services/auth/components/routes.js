const express = require('express');
const router = express.Router();

const {
  validate
} = require('./middleware');

const {
  empty,
  signup,
  signin
} = require('./handlers');

const {
  SIGN_UP,
  SIGN_IN
} = require(`${process.env.PWD}/src/const/auth.route.const.js`)

router.use(`/`, validate);
router.get(`/`, empty);
router.get(`/${SIGN_UP}`, signup);
router.get(`/${SIGN_IN}`, signin);

module.exports = router;
