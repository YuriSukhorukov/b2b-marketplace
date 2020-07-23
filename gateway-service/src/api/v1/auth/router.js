const express       = require('express');
const router        = express.Router();

router.use(`/`, require(`${global.appRoot}/middlewares/all.middle`));
router.use(`/`, require(`${global.appRoot}/middlewares/err.middle`));
router.get(`/signin`, require('./get.post'));
router.get(`/signup/email/:email`, require('./get.post'));
router.get(`/signup/login/:login`, require('./get.post'));
router.post(`/signup/user`, require('./get.post'));

module.exports = router;