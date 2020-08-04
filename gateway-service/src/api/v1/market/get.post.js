const config            = require(`${global.appRoot}/config.json`).offersServiceConfig;
const rp                = require('request-promise');

module.exports = async (req, res) => {
    const uri = `${config.uri}:${config.port}${req.url}`;
    const method = req.method;
    const headers = req.headers;
    const query = req.query;
    const params = req.params;
    const body = req.body ? JSON.stringify(req.body) : undefined;

    console.log(body);
    
    const response = await rp({
        uri,
        method,
        headers: {
            "content-type": "application/json"
        },
        body
    });

    res.send(response);
};