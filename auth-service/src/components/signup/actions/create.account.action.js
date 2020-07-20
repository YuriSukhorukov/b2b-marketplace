const db = require('../../../library/db/index');

module.exports = async (params) => {
    const result = await db.createAccount();
    console.log(result);
}
