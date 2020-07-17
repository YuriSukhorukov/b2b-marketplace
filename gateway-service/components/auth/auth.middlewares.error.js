const signupErr = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!').end();
};
const signinErr = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!').end();
};

module.exports = {
    signupErr,
    signinErr
}