const express       = require('express');
const router        = express.Router();

const {
    signup,
    signin
}                   = require('./auth.handlers');
const {
    signupErr,
    signinErr
}                   = require('./auth.middlewares.error');
const {
    validate
}                   = require('./auth.middlewares');

router.use(`/`, validate);
router.use(`/signup`, signupErr);
router.use(`/signin`, signinErr);
router.get(`/signup`, signup);
router.get(`/signin`, signin);

exports.router = router;