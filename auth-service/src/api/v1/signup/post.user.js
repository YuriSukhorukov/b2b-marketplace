const createAccount = require(`${global.appRoot}/controllers/create.user`);

module.exports = async (req, res) => {
    const email = req.headers["email"];
    const password = req.headers["password"];

    console.log(req.headers);
    
    if (!email || !password)
        res.status(200).send({succes: false, message: "Недостаточно параметров"});

    console.log(`email: ${email}, password: ${password}`);
    try {
        const result = await createAccount({password, email});
        res.status(200).send({succes: true});
        console.log(`createAccount: ${result}`);
        console.log(result);
    } catch (e) {
        res.status(200).send({succes: false});
    }
}