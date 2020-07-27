const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = (req, res, next) => {
    console.log('gateway auth middleware');

    const token = req.headers['authorization'];
    console.log(`token in gateway: ${token}`);
    
    decodeJwt(token)
    .then(result => {
        console.log(result);
        return next();
    })
    .catch(error => {
        console.log(error);
        res.send('error jwt');
    })
};