const checkLoginExist = require(`${global.appRoot}/controllers/check.login.exist`);

module.exports = async (req, res) => {
    const login = req.params['login'];
    const result = await checkLoginExist({login});
    console.log(`${req.params['login']}`);
    console.log(result);
    res.send('signup page GET');
}