const config            = require(`${global.appRoot}/config.json`).authServiceConfig;
const rp                = require('request-promise');

module.exports = async (req, res) => {
    const uri = `${config.uri}:${config.port}${req.url}`;

    const {
        method,
        query,
        params,
        headers,
        mode,
        cache,
        credentials,
        redirect,
        referrerPolicy,
    } = req;
    
    const response = await rp({
        uri,
        method,
        query,
        params,
        headers,
        mode,
        cache,
        credentials,
        redirect,
        referrerPolicy,
    });

    console.log(response);
    res.send(response);
};