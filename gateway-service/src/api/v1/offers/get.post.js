const config            = require(`${global.appRoot}/config.json`).offersServiceConfig;
const rp                = require('request-promise');

module.exports = async (req, res) => {
    // res.send({code: 200, message: `Home GET`});
    const uri = `${config.uri}:${config.port}${req.url}`;
    const method = req.method;
    const headers = req.headers;
    const query = req.query;
    const params = req.params;
    console.log(config);
    
    console.log(uri);
    console.log(req.url);
    
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