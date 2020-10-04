const config            = require(`${global.appRoot}/config.json`).authServiceConfig;
const axios             = require('axios');

module.exports = async (req, res) => {
    const uri = `${config.uri}:${config.port}${req.url}`;
    console.log('Cookies from client: ', req.cookies);
    console.log('JWT from client: ', req.cookies.jwt);

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
        withCredentials
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
        withCredentials
    }).then((response) => {
        console.log('Cookie: ', response.headers['set-cookie']);
        console.log(`Status: ${response.status}`);
        console.log(response.data);
        res.cookie(response.headers['set-cookie']);
        res.status(response.status).send(response.data);
    }).catch((error) => {
        console.log(error.response.status);
        res.status(error.response.status).json({error}).end();
    });
};