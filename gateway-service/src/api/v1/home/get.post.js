const config            = require(`${global.appRoot}/config.json`).authServiceConfig;
const rp                = require('request-promise');

module.exports = async (req, res) => {
    res.send({code: 200, message: `Home GET`});
};