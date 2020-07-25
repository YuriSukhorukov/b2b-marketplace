const createAccount = require(`${global.appRoot}/controllers/create.user`);

module.exports = async (req, res) => {
    const email = req.query.email;
    const login = req.query.login;
    const password = req.query.password;
    console.log(`login: ${login}, email: ${email}, password: ${password}`);
    try {
        const result = await createAccount({login, password, email});
        res.send({code: 201, message: `Регистрация пользователя '${login}' успешна`});
        console.log(`createAccount: ${result}`);
        console.log(result);
    } catch (e) {
        res.send({code: 403, message: `Регистрация пользователя '${login}' неудачна`});
    }
}