const createProposal = require(`${global.appRoot}/controllers/proposal/create.proposal.js`);

module.exports = async (req, res) => {
    const {userId, offerId} = req.body;
    if (userId && offerId) {
        try {
            const result = await createProposal({userId, offerId});
            console.log(result);
            res.json({code: 200, message: `create.proposal.js`, body: result});
        } catch (e) {
            res.json({
                success: false,
                code: 404,
                message: "Something wrong"
            })
        }
        
    } else {
        res.json({
            success: false,
            code: 404,
            message: "Something wrong"
        })
    }
}