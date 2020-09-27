const db = require(`${global.appRoot}/database/index`);

module.exports = async (params) => {
    return await db.getProfiles(params);
}
