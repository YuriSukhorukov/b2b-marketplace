const checkLoginExist = require(`${global.appRoot}/controllers/check.login.exist`);

module.exports = async (req, res) => {
    const login = req.params['login'];
    const result = await checkLoginExist({login});
    console.log(`checkLoginExist: ${result}`);
    console.log(result);
    if (result == true)
        res.status(200).send({succes: false, message: `Login '${login}' занят`});
    else 
        res.status(200).send({succes: true, message: `Login '${login}' свободен`});
}