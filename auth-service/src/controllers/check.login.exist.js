const db = require(`${global.appRoot}/library/db/index`);

module.exports = async (params) => {
    const result = await db.checkAccountExist(params);
    console.log(result);
}
