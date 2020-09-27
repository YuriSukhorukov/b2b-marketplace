const getProfile = require(`${global.appRoot}/controllers/profile/get.profile`);

module.exports = async (req, res) => {
    const {query} = req;
    
    console.log('query: ', query);

    try {
        const result = await getProfile({...query});
        console.log('result: ', result);
        res.status(200).send({succes: true, body: result});
    } catch (e) {
        res.status(200).send({succes: false, body: e});
    }
}