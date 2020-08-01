const express       = require('express');
const router        = express.Router();

// router.use(`/`, require(`${global.appRoot}/middlewares/all.middle`));
// router.use(`/`, require(`${global.appRoot}/middlewares/err.middle`));
router.get(`/`, require('./get.post'));
router.post(`/`, require('./get.post'));

module.exports = router;