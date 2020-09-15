const express       = require('express');
const router        = express.Router();

router.post(`/`, require('./logout'));

module.exports = router;