const getOffers = require(`${global.appRoot}/controllers/offer/get.offers.js`);

module.exports = async (req, res) => {
    const result = await getOffers();
    console.log('GET OFFERS: ', result);
    
    res.json({code: 200, message: `get.offers.js`, body: result});
}