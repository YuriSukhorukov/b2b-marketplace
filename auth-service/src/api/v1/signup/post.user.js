const createAccount = require(`${global.appRoot}/controllers/create.user`);

module.exports = async (req, res) => {
    const login = req.headers["username"];
    const email = req.headers["email"];
    const password = req.headers["password"];

    console.log(req.headers);
    
    if (!login || !email || !password)
        res.json({
            success: false,
            code: 401, 
            message: `Registration failed!`
        });

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