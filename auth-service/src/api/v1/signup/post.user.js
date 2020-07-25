const createAccount = require(`${global.appRoot}/controllers/create.user`);

module.exports = async (req, res) => {
    const email = req.query.email;
    const login = req.query.login;
    const password = req.query.password;
    const result = await createAccount({login, password, email});
    console.log(`login: ${login}, email: ${email}, password: ${password}`);
    console.log(`createAccount: ${result}`);
    console.log(result);
    if (result.some(el => el.user_id != undefined))
        res.send({code: 201, message: `Регистрация пользователя '${login}' успешна`});
    else 
        res.send({code: 403, message: `Регистрация пользователя '${login}' не удалась`});
}