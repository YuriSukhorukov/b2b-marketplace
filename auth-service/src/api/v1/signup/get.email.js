const checkEmailExist = require(`${global.appRoot}/controllers/check.email.exist`);

module.exports = async (req, res) => {
    const email = req.params['email'];
    const result = await checkEmailExist({email});
    console.log(`${req.params['email']}`);
    console.log(result);
    res.send('signup page GET');
}