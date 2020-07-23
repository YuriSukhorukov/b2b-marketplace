module.exports = (req, res, next) => {
    console.log('gateway auth middleware');
    return next();
};