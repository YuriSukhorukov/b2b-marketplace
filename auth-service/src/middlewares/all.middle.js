module.exports = async (req, res, next) => {
    console.log('auth middleware validate');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
}