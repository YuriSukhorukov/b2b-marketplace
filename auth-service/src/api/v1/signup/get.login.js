const checkLoginExist = require(`${global.appRoot}/controllers/check.login.exist`);

module.exports = async (req, res) => {
    const login = req.params['login'];

    try {
        const result = await checkLoginExist({login});
        if (result == true)
            res.status(200).send({succes: false});
        else 
            res.status(200).send({succes: true});
    } catch (e) {
        res.status(200).send({succes: false, body: e});
    }
}