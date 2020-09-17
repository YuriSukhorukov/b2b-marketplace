const config            = require(`${global.appRoot}/config.json`).offersServiceConfig;
const axios             = require('axios');

module.exports = async (req, res) => {
    const uri = `${config.uri}:${config.port}${req.url}`;

    const {
        method,
        query,
        params,
        body,
        headers,
        mode,
        cache,
        credentials,
        redirect,
        referrerPolicy,
        cookies,
        withCredentials
    } = req;
    
    axios(uri, {
        method,
        query,
        params,
        data: body,
        headers,
        mode,
        cache,
        credentials,
        redirect,
        referrerPolicy,
        cookies,
        withCredentials
    }).then(response => {
        console.log(response.data); 
        res.status(200).json(response.data).end();
    }).catch(e => {
        res.status(424).end();
        console.log(e.message)
    });
};