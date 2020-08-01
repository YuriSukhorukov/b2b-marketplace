const express       = require('express');
const router        = express.Router();

router.get(`/search`, require('./search.offers'));
router.get(`/:offer_id`, require('./get.offer'));
router.put(`/:offer_id`, require('./update.offer'));
router.post(`/:offer_id`, require('./create.offer'));
router.delete(`/:offer_id`, require('./delete.offer'));

router.get(`/:offer_id/proposals`, require('./get.proposals'));
router.post(`/:offer_id/proposals`, require('./create.proposal'));
router.delete(`/:offer_id/proposals/:proposals_id`, require('./delete.proposal'));

module.exports = router;