const checkEmailExist = require(`${global.appRoot}/controllers/check.email.exist`);

module.exports = async (req, res) => {
    console.log(req.params);
    res.send('OK');
}