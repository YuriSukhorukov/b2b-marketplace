const checkUsernameAndPassword = require(`${global.appRoot}/controllers/check.username.password`);
const createJwt = require(`${global.appRoot}/controllers/create.jwt`);
const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = async (req, res) => {
    const username = req.headers["username"];
    const password = req.headers["password"];

    if (!username || !password)
        res.json({
            succes: false,
            message: `Недостаточно параметров`
        });

    console.log(req.headers);
    
    const result = await checkUsernameAndPassword({username, password});
    console.log(`checkUsernameAndPassword: ${result}`);
    console.log(result);
    
    if (result.length) {
        const user_id = result[0].user_id; 
        const token = await createJwt({user_id});
        console.log(`token: ${token}`);
        const decoded = await decodeJwt(token);
        console.log(decoded);
        res.status(200);
        res.cookie("jwt", token, {httpOnly: true}); //secure: false, 
        res.json({
            succes: true,
            user_id: user_id,
            message: `Успешная авторизация`,
        });
    } else {
        res.status(200).json({
            succes: false, 
            error: 'Недалось авторизоваться'
        });
    }
}