const createProposal = require(`${global.appRoot}/controllers/proposal/create.proposal.js`);
const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = async (req, res) => {
    const {cookies} = req;
    const {offerId} = req.body;

    let userId = null;
    let decodedToken = null;

    try {
        decodedToken = await decodeJwt(cookies.jwt);
        userId = decodedToken.user_id;
    } catch (e) {
        res.status(401).json({error: error.message});
    }

    try {
        const result = await createProposal({userId, offerId});
        if (result.length > 0)
            res.status(200).send({succes: true, body: result});
        else
            res.status(200).send({succes: false});
    } catch (e) {
        res.status(200).send({succes: false});
    }
}