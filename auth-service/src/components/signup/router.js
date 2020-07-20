const express       = require('express');
const router        = express.Router();
const checkEmailExist = require('./actions/check.email.exist.action');
const checkLoginExist = require('./actions/check.login.exist.action');

// Handlers
router.get(`/`, async (req, res) => {
    res.send('signup page GET');
});
router.get(`/email/:email`, async (req, res) => {
    const email = req.params['email'];
    const result = await checkEmailExist({email});
    console.log(`${req.params['email']}`);
    console.log(result);
    res.send('signup page GET');
});
router.get(`/login/:login`, async (req, res) => {
    const login = req.params['login'];
    const result = await checkLoginExist({login});
    console.log(`${req.params['login']}`);
    console.log(result);
    res.send('signup page GET');
});
router.post(`/user`, async (req, res) => {
    const email = req.query.email;
    const login = req.query.login;
    const password = req.query.password;
    console.log(`login: ${login}, email: ${email}, password: ${password}`);
    res.send('signup page GET');
});
// Middleware
router.use(`/`, (req, res, next) => {
    console.log('auth middleware validate');
    return next();
});
// Error
router.use(`/`, async (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!').end();
});

module.exports = router;