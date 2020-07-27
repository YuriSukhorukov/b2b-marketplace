const config            = require(`${global.appRoot}/config.json`).authServiceConfig;
const rp                = require('request-promise');

module.exports = async (req, res) => {
    const uri = `${config.uri}:${config.port}${req.url}`;
    const method = req.method;
    const headers = req.headers;
    const query = req.query;
    const params = req.params;
    const response = await rp({
        uri,
        method,
        query,
        params,
        headers
    });
    console.log(response);
    res.send(response);
};