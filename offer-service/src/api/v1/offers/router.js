const express       = require('express');
const router        = express.Router();

router.get(`/search`, require('./search.offers'));
router.get(`/:id`, require('./get.offer'));
router.put(`/:id`, require('./update.offer'));
router.post(`/:id`, require('./create.offer'));
router.delete(`/:id`, require('./delete.offer'));

router.get(`/:id/proposals`, require('./get.proposals'));
router.post(`/:id/proposals`, require('./create.proposal'));
router.delete(`/:id/proposals`, require('./delete.proposal'));

module.exports = router;