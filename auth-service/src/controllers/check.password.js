const db = require(`${global.appRoot}/library/db/index`);

module.exports = async (params) => {
    let result = await db.checkPassword(params);
    // return result.some(el => el.username == params.login);
    return result;
}
