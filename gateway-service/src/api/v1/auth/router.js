const express       = require('express');
const router        = express.Router();
/**
 * @swagger
 * /:
 *   get:
 *     description:  Endpoint for everything
 */
router.use(`/`, require(`${global.appRoot}/middlewares/all.middle`));
/**
 * @swagger
 * /:
 *   get:
 *     description:  Endpoint for everything
 */
router.use(`/`, require(`${global.appRoot}/middlewares/err.middle`));
/**
 * @swagger
 * /:
 *   get:
 *     description:  Endpoint for everything
 */
router.get(`/signin`, require('./get.post'));
/**
 * @swagger
 * /signin:
 *   get:
 *     description:  Endpoint for everything
 */
router.get(`/signup/email/:email`, require('./get.post'));
/**
 * @swagger
 * //signup/login/:login:
 *   get:
 *     description:  Endpoint for everything
 */
router.get(`/signup/login/:login`, require('./get.post'));
/**
 * @swagger
 * /signup/user:
 *   post:
 *     description:  Endpoint for everything
 */
router.post(`/signup/user`, require('./get.post'));

module.exports = router;