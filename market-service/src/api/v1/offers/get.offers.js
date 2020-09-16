const getOffers = require(`${global.appRoot}/controllers/offer/get.offers.js`);

module.exports = async (req, res) => {
    // let {
    //     user_id,
    //     offer_type
    // } = req.query;

    const result = await getOffers({...req.query});
    // console.log('GET OFFERS: ', result);
    
    console.log('query', req.query);
    console.log('params', req.params);
    console.log('body', req.body);
    

    res.json({code: 200, message: `get.offers.js`, body: result});
}