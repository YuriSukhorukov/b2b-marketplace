const express       = require('express');
const router        = express.Router();

router.use(`/`, require('./signin.middleware.validate'));
router.use(`/`, require('./signin.middleware.error'));
router.get(`/`, require('./signin.handler.get'));

module.exports = router;