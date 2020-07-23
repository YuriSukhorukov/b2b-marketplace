const express       = require('express');
const router        = express.Router();

// Routes
/**
 * @swagger
 * /customers/getList:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.use(`/`, async (req, res) => {
    res.send('ok');
});

module.exports = router;