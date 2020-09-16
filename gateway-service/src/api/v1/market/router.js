const express       = require('express');
const router        = express.Router();

router.use(`/`, require(`${global.appRoot}/middlewares/err.middle`));
router.post('/offers', require(`${global.appRoot}/middlewares/check.token.middle`));

router.get(`/offers`, require('./get'));
router.post(`/offers`, require('./post'));

router.get(`/proposals`, require('./get'));
router.post(`/proposals`, require('./get'));

module.exports = router;