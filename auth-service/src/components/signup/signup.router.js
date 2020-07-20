const express       = require('express');
const router        = express.Router();

router.use(`/`, require('./signup.middleware.validate'));
router.use(`/`, require('./signup.middleware.error'));
router.get(`/`, require('./signup.handler.get'));
router.post(`/`, require('./signup.handler.post'));

module.exports = router;