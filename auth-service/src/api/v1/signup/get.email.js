const checkEmailExist = require(`${global.appRoot}/controllers/check.email.exist`);

module.exports = async (req, res) => {
    const email = req.params['email'];
    const result = await checkEmailExist({email});
    console.log(`checkEmailExist: ${result}`);
    console.log(result);
    if (result == true)
        res.send({code: 302, message: `Email '${email}' занят`});
    else 
        res.send({code: 204, message: `Email '${email}' свободен`});
}