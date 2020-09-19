const createAccount = require(`${global.appRoot}/controllers/create.user`);

module.exports = async (req, res) => {
    const email = req.headers["email"];
    const password = req.headers["password"];

    console.log(req.headers);
    
    if (!email || !password)
        res.status(401).end();

    console.log(`email: ${email}, password: ${password}`);
    try {
        const result = await createAccount({password, email});
        res.status(201).end();
        console.log(`createAccount: ${result}`);
        console.log(result);
    } catch (e) {
        res.status(403).end();
    }
}