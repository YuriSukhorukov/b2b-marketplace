const express       = require('express');
const router        = express.Router();

router.get(`/`, require('./get'));

router.use(`/`, require(`${global.appRoot}/middlewares/all.middle`));
router.use(`/`, require(`${global.appRoot}/middlewares/all.middle.err`));

router.post(`/:username`, require('./post.username'));
router.post(`/:username/:password`, require('./post.username.password'));

module.exports = router;