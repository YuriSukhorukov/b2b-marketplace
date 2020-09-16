const express       = require('express');
const router        = express.Router();

router.post(`/`, require('./verify'));

module.exports = router;