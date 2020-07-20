const express       = require('express');
const router        = express.Router();

router.get(`/`, require('./api/get'));

router.use(`/`, require('./middlewares/all.middle'));
router.use(`/`, require('./middlewares/all.middle.err'));

router.get(`/email/:email`, require('./api/get.email'));
router.get(`/login/:login`, require('./api/get.login'));

router.post(`/user`, require('./api/post.user'));

module.exports = router;