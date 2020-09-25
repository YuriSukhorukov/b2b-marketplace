const express       = require('express');
const router        = express.Router();

router.get('/', require('./get.profile'));
router.post(`/`, require('./edit.profile'));

module.exports = router;