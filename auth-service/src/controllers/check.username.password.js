const db = require(`${global.appRoot}/library/db/index`);

module.exports = async (params) => {
    let result = await db.checkUsernameAndPassword(params);
    return result.some(el => el.username == params.username || el.email == params.username);
}
