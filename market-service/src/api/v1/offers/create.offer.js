const createOffer = require(`${global.appRoot}/controllers/offer/create.offer.js`);
const decodeJwt = require(`${global.appRoot}/controllers/decode.jwt`);

module.exports = async (req, res) => {
    console.log('!!!!@E@#RE#@R');
    console.log('offer:', req.body);
    
    const {
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

    const {cookies} = req;
    
    let userId = null;
    let decodedToken = null;

    try {
        decodedToken = await decodeJwt(cookies.jwt);
        userId = decodedToken.user_id;
    } catch (e) {}

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
        res.status(200).json(result).end();
    } catch (e) {
        res.status(424).end();
    }
}