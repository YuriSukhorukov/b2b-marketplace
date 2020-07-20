const express       = require('express');
const router        = express.Router();

router.use(`/`, require('./auth.middleware.validate'));
router.use(`/`, require('./auth.middleware.error'));
router.get(`/signin`, require('./auth.handler'));
router.get(`/signup`, require('./auth.handler'));
router.post(`/signup`, require('./auth.handler'));

module.exports = router;