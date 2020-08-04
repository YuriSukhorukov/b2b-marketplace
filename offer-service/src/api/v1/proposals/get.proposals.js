const getProposals = require(`${global.appRoot}/controllers/proposal/get.proposals.js`);

module.exports = async (req, res) => {
    const {offer_id} = req.query;
    if (offer_id) {
        const result = await getProposals({offerId: offer_id});
        console.log(result);
        res.json({code: 200, message: `get.proposals.js`, body: result});
    } else {
        res.json({
            success: false,
            code: 404,
            message: "Something wrong"
        })
    }
}