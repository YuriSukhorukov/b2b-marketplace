const getProfile = require(`${global.appRoot}/controllers/profile/get.profile`);
const getProfiles = require(`${global.appRoot}/controllers/profile/get.profiles`);

module.exports = async (req, res) => {
    const {query}       = req;
    const {user_id}     = query;
    const {user_ids}    = query;
    
    console.log('query: ', query);

    try {
        let result = null;
        if (user_ids)
            result = await getProfiles({...query});
        else if (user_id)
            result = await getProfile({...query});
        
        console.log('result: ', result);
        res.status(200).send({succes: result.length > 0, body: result});
    } catch (e) {
        res.status(200).send({succes: false, body: e});
    }
}