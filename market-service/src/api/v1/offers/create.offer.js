const createOffer = require(`${global.appRoot}/controllers/offer/create.offer.js`);

module.exports = async (req, res) => {
    console.log('offer:', req.body);
    
    const {
        userId,
        title,
        description,
        price,
        amount,
        currency_code,
        offer_type,
        measure_unit_code,
        date_expires,
        country,
        city
    } = req.body;

    try {
        const result = await createOffer({
            userId,
            title,
            description,
            price,
            amount,
            currency_code,
            offer_type,
            measure_unit_code,
            date_expires,
            country,
            city
        });
        console.log('result: ', result);
        res.json({code: 200, message: `create.offer.js`, body: result});
    } catch (e) {
        res.json({
            success: false,
            code: 404,
            message: "Something wrong"
        })
    }
}