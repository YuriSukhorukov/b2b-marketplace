const checkEmailExist = require(`${global.appRoot}/controllers/check.email.exist`);

module.exports = async (req, res) => {
    const email = req.params['email'];
    const result = await checkEmailExist({email});
    console.log(`checkEmailExist: ${result}`);
    console.log(result);
    if (result == true)
        res.status(200).send({succes: false, message: `Email '${email}' занят`});
    else 
        res.status(200).send({succes: true, message: `Email '${email}' свободен`});
}