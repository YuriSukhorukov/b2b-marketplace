const signup = (req, res) => {
    res.send('signup page');
};
const signin = (req, res) => {
    res.send('signin page');
};

module.exports = {
    signup,
    signin
}