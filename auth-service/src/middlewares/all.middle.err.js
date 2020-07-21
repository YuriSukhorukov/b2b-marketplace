module.exports = async (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!').end();
}