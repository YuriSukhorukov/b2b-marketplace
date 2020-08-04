const express       = require('express');
const router        = express.Router();

router.get(`/`, require('../proposals/get.proposals'));
router.post(`/`, require('../proposals/create.proposal'));
router.delete(`/`, require('../proposals/delete.proposal'));

module.exports = router;