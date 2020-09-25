const express       = require('express');
const router        = express.Router();

router.get('/', require('./get.profile'));
router.post(`/`, require('./modify.profile'));

module.exports = router;