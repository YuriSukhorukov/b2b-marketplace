module.exports = async (pool) => {
    return new Promise(async (res, rej) => {
        try {
            let client = await pool.connect();
            console.log('Database connection success');
            res(client);
        } catch (e) {
            console.log('pool .connect ->', e);
            rej(e);
        }
    })
}