const createOffer = require(`${global.appRoot}/controllers/offer/create.offer.js`);

module.exports = async (req, res) => {
    const {userId} = req.body;
    if (userId) {
        const result = await createOffer({userId});
        console.log(result);
        res.json({code: 200, message: `create.offer.js`, body: req.body});
    } else {
        res.json({
            success: false,
            code: 404,
            message: "Something wrong"
        })
    }
}