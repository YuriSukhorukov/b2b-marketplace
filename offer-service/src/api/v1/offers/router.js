const express       = require('express');
const router        = express.Router();

router.get(`/offers`, require('./search.offers'));
router.get(`/offers/:id`, require('./get.offer'));
router.put(`/offers/:id`, require('./update.offer'));
router.post(`/offers/:id`, require('./create.offer'));
router.delete(`/offers/:id`, require('./delete.offer'));

router.get(`/proposals`, require('./get.proposals'));
router.post(`/proposals/:id`, require('./create.proposal'));
router.delete(`/proposals/:id`, require('./delete.proposal'));

module.exports = router;