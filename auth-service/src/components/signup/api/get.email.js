const checkEmailExist = require('../actions/check.email.exist.action');

module.exports = async (req, res) => {
    const email = req.params['email'];
    const result = await checkEmailExist({email});
    console.log(`${req.params['email']}`);
    console.log(result);
    res.send('signup page GET');
}