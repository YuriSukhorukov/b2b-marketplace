const db = require(`${global.appRoot}/library/db/index`);

module.exports = async (params) => {
    let result = await db.checkAccountExist(params);
    return result.some(el => el.username == params.login);
}
