const getProposals = require(`${global.appRoot}/controllers/proposal/get.proposals.js`);

module.exports = async (req, res) => {
    const {offer_id} = req.query;
    console.log('offer_id: ', offer_id);
    if (offer_id) {
        const result = await getProposals({offerId: offer_id});
        console.log(result);
        res.status(200).send({succes: true, body: result});
    } else {
        res.status(200).send({succes: false});
    }
}