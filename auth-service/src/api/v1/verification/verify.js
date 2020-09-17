const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = (req, res) => {
    const token = req.cookies.jwt;
    decodeJwt(token).then(result => {
        // res.status(200).end();
        setTimeout(()=>{res.status(200).end();}, 1000);
    })
    .catch(error => {
        console.log('error: ', error);
        res.status(401).json({error: error.message});
        return next(error);
    })
};