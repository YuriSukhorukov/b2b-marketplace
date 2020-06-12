var router = require('express').Router();

const apiVersion = 'v1';

router.use(`/api`, require(`./api`));

module.exports = router;