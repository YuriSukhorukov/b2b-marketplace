const editProfile = require(`${global.appRoot}/controllers/profile/edit.profile`);
const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = async (req, res) => {
    const {cookies} = req;
    
    let userId = null;
    let decodedToken = null;

    try {
        decodedToken = await decodeJwt(cookies.jwt);
        userId = decodedToken.user_id;
    } catch (e) {
        res.status(401).json({error: error.message});
    }

    try {
        const result = await editProfile({...req.body});
        console.log('result: ', result);
        res.status(200).send({succes: true, body: 'result'});
    } catch (e) {
        res.status(200).send({succes: false});
    }
}