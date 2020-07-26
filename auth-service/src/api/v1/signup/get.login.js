const checkLoginExist = require(`${global.appRoot}/controllers/check.login.exist`);

module.exports = async (req, res) => {
    const login = req.params['login'];
    const result = await checkLoginExist({login});
    console.log(`checkLoginExist: ${result}`);
    console.log(result);
    if (result == true)
        res.send({code: 302, message: `Login '${login}' занят`});
    else 
        res.send({code: 204, message: `Login '${login}' свободен`});
}