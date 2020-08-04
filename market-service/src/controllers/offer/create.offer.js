const db = require(`${global.appRoot}/library/db/index`);

module.exports = async (params) => {
    return await db.createOffer(params);
}
