const checkUsernameAndPassword = require(`${global.appRoot}/controllers/check.username.password`);
const createJwt = require(`${global.appRoot}/controllers/create.jwt`);
const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = async (req, res) => {
    const username = req.params['username'];
    const password = req.params['password'];
    const result = await checkUsernameAndPassword({username, password});
    console.log(`checkUsernameAndPassword: ${result}`);
    console.log(result);
    
    if (result.length) {
        const user_id = result[0].user_id; 
        const token = await createJwt({user_id});
        console.log(`token: ${token}`);
        const decoded = await decodeJwt(token);
        console.log(decoded);
        res.send({
            code: 200, 
            token,
            message: `Авторизация прошла успешно`
        });
    } else {
        res.send({
            code: 401, 
            message: `Неправильное имя пользователя или пароль`
        });
    }
}