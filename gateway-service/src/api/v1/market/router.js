const express       = require('express');
const router        = express.Router();

router.use(`/`, require(`${global.appRoot}/middlewares/all.middle`));
router.use(`/`, require(`${global.appRoot}/middlewares/err.middle`));
router.get(`/offers`, require('./get.post'));
router.post(`/offers`, require('./get.post'));
router.get(`/proposals`, require('./get.post'));
router.post(`/proposals`, require('./get.post'));

module.exports = router;