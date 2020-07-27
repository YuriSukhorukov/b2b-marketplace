const config            = require(`${global.appRoot}/config.json`).authServiceConfig;
const rp                = require('request-promise');

module.exports = async (req, res) => {
    res.send('home GET');
};