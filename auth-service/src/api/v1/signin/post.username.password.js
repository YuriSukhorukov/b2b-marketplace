const checkUsernameAndPassword = require(`${global.appRoot}/controllers/check.username.password`);
const createJwt = require(`${global.appRoot}/controllers/create.jwt`);
const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = async (req, res) => {
    const username = req.headers["username"];
    const password = req.headers["password"];

    if (!username || !password)
        res.json({
            success: false,
            code: 401, 
            message: `Authentication failed!`
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
            success: true,
            code: 200, 
            message: `Authentication successful!`
        });
    } else {
        res.status(401).json({
            success: false, 
            error: 'Sorry, error'
        });
    }
}