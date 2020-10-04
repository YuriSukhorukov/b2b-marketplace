const checkUsernameExist = require(`${global.appRoot}/controllers/check.username.exist`);

module.exports = async (req, res) => {
    const username = req.params['username'];
    const result = await checkUsernameExist({username});
    console.log(`checkUsernameExist: ${result}`);
    console.log(result);
    if (result == true)
        res.status(200).send({succes: true, message: `Username '${username}' существует`});
    else 
        res.status(200).send({succes: false, message: `Username '${username}' не существует`});
}