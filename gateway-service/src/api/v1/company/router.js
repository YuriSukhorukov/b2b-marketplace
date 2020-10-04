const express       = require('express');
const router        = express.Router();

router.use(`/`, require(`${global.appRoot}/middlewares/err.middle`));
router.post('/', require(`${global.appRoot}/middlewares/check.token.middle`));

router.get(`/profile`, require('./get'));
router.post(`/profile`, require('./post'));

module.exports = router;