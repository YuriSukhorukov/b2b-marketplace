const config            = require(`${global.appRoot}/config.json`).offersServiceConfig;
const rp                = require('request-promise');
const decodeJwt         = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = async (req, res) => {
    const uri = `${config.uri}:${config.port}${req.url}`;
    const {
        method,
        headers,
        query,
        params,
        cookies,
        body,
    } = req;

    let userId = null;
    let decodedToken = null;
    try {
        decodedToken = await decodeJwt(cookies.jwt);
        userId = decodedToken.userId;
    } catch (e) {}
    
    console.log(body);
    console.log('cookies: ', cookies);
    console.log('decoded: ', decodedToken);
    
    const response = await rp({
        uri,
        method,
        headers,
        cookies,
        body: body ? JSON.stringify({userId, ...body}) : undefined
    });

    res.send(response);
};