const db = require(`${global.appRoot}/library/db/index`);

module.exports = async (params) => {
    let result = await db.checkEmailExist(params);
    return result.some(el => el.email == params.email);
}
