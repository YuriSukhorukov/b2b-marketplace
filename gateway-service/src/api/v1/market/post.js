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
        res.status(response.status).send(response.data);
    }).catch(e => {
        res.status(err.response.status).end();
        console.log(e.message);
    });
};