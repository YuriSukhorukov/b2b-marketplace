const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = (req, res) => {
    const token = req.cookies.jwt;
    decodeJwt(token).then(result => {
        res.status(200).send({succes: true});
    })
    .catch(error => {
        console.log('error: ', error);
        res.status(200).json({succes: false, error: error.message});
        return next(error);
    })
};