const config            = require('../../../config.json').authServiceConfig;
const rp                = require('request-promise');

module.exports = async (req, res) => {    
    const uri = `${config.uri}:${config.port}${req.url}`;
    const response = await rp({uri});
    res.send(response);
};