const express       = require('express');
const router        = express.Router();

router.use(`/`, require(`${global.appRoot}/middlewares/check.token.middle`));
router.get(`/`, require('./get.post'));
router.post(`/`, require('./get.post'));

module.exports = router;