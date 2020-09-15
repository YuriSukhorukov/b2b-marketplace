const express       = require('express');
const router        = express.Router();

router.use(`/`, require(`${global.appRoot}/middlewares/err.middle`));
router.get(`/signin`, require('./get.post'));
router.get(`/signup/email/:email`, require('./get.post'));
router.get(`/signup/login/:login`, require('./get.post'));
router.post(`/signup/user`, require('./get.post'));
router.post(`/signin/:username`, require('./get.post'));
router.post(`/signin/:username/:password`, require('./get.post'));
router.post(`/signup`, require('./get.post'));
router.post(`/signin`, require('./get.post'));
router.post(`/signout`, require('./get.post'));

module.exports = router;