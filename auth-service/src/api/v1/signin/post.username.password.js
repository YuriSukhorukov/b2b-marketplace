const checkUsernameAndPassword = require(`${global.appRoot}/controllers/check.username.password`);

module.exports = async (req, res) => {
    const username = req.params['username'];
    const password = req.params['password'];
    const result = await checkUsernameAndPassword({username, password});
    console.log(`checkUsernameExist: ${result}`);
    console.log(result);
    if (result == true)
        res.send({code: 200, message: `Авторизация прошла успешно`});
    else 
        res.send({code: 401, message: `Неправильное имя пользователя или пароль`});
}