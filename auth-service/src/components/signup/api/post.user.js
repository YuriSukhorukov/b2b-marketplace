module.exports = async (req, res) => {
    const email = req.query.email;
    const login = req.query.login;
    const password = req.query.password;
    console.log(`login: ${login}, email: ${email}, password: ${password}`);
    res.send('signup page GET');
}