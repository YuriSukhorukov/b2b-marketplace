const express       = require('express');
const router        = express.Router();

router.get(`/`, require('../proposals/get.proposals'));
router.post(`/:id`, require('../proposals/create.proposal'));
router.delete(`/:id`, require('../proposals/delete.proposal'));

module.exports = router;