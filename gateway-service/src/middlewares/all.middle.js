const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = (req, res, next) => {
    console.log('gateway auth middleware');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
};