const express       = require('express');
const router        = express.Router();

router.use(`/`, require('./auth.middleware.validate'));
router.use(`/`, require('./auth.middleware.error'));
router.get(`/signin`, require('./auth.handler'));
router.get(`/signup/email/:email`, require('./auth.handler'));
router.get(`/signup/login/:login`, require('./auth.handler'));
router.post(`/signup/user`, require('./auth.handler'));

module.exports = router;