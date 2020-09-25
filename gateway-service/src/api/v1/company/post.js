const config            = require(`${global.appRoot}/config.json`).companyServiceConfig;
const axios             = require('axios');

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
        cookies,
        withCredentials,
        body,
    } = req;

    axios(uri, {
        method,
        query,
        params,
        headers,
        mode,
        cache,
        credentials,
        redirect,
        referrerPolicy,
        cookies,
        withCredentials,
        data: body,
    }).then((response) => {
        res.status(response.status).send(response.data);
    }).catch((error) => {
        res.status(error.response.status).json({error}).end();
    });
};