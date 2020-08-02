const express       = require('express');
const router        = express.Router();

router.get(`/`, require('./get.offers'));
router.get(`/:id`, require('./get.offer'));
router.put(`/:id`, require('./update.offer'));
router.post(`/:id`, require('./create.offer'));
router.delete(`/:id`, require('./delete.offer'));

module.exports = router;