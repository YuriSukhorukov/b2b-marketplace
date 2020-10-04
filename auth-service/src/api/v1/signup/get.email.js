const checkEmailExist = require(`${global.appRoot}/controllers/check.email.exist`);

module.exports = async (req, res) => {
    const email = req.params['email'];
    
    try {
        const result = await checkEmailExist({email});
        if (result == true)
            res.status(200).send({succes: false});
        else 
            res.status(200).send({succes: true});
    } catch (e) {
        res.status(200).send({succes: false, body: e});
    }
}