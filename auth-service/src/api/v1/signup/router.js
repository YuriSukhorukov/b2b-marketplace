const express       = require('express');
const router        = express.Router();

router.get(`/`, require('./get'));

router.use(`/`, require(`${global.appRoot}/middlewares/all.middle`));
router.use(`/`, require(`${global.appRoot}/middlewares/all.middle.err`));

router.get(`/email/:email`, require('./get.email'));
router.get(`/login/:login`, require('./get.login'));

router.post(`/`, require('./post.user'));

module.exports = router;