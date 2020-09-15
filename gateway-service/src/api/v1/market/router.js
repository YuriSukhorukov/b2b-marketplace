const express       = require('express');
const router        = express.Router();

router.use(`/`, require(`${global.appRoot}/middlewares/err.middle`));
router.post('/offers', require(`${global.appRoot}/middlewares/check.token.middle`));

router.get(`/offers`, require('./get.post'));
router.post(`/offers`, require('./get.post'));
router.get(`/proposals`, require('./get.post'));
router.post(`/proposals`, require('./get.post'));

module.exports = router;