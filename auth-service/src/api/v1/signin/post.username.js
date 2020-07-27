const checkUsernameExist = require(`${global.appRoot}/controllers/check.username.exist`);

module.exports = async (req, res) => {
    const username = req.params['username'];
    const result = await checkUsernameExist({username});
    console.log(`checkUsernameExist: ${result}`);
    console.log(result);
    if (result == true)
        res.send({code: 302, message: `Username '${username}' существует`});
    else 
        res.send({code: 204, message: `Username '${username}' не существует`});
}