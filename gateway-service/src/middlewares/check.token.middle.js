const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = (req, res, next) => {
    console.log('gateway auth middleware token');
    console.log('!!!');
    

    // const token = req.headers['authorization'];
    // TODO заменить
    const token = req.cookies.jwt;
    console.log(`token in gateway: ${token}`);

    decodeJwt(token)
    .then(result => {
        console.log('result: ', result);
        return next();
    })
    .catch(error => {
        console.log('error: ', error);
        res.status(401).json({error: error.message});
        return next(error);
    })
};