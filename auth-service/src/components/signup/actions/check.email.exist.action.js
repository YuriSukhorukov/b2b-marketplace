const db = require('../../../library/db/index');

module.exports = async (params) => {
    const result = await db.checkEmailExist(params);
    console.log(result);
}
