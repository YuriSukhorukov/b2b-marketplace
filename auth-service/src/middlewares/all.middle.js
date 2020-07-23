module.exports = async (req, res, next) => {
    console.log('auth middleware validate');
    return next();
}