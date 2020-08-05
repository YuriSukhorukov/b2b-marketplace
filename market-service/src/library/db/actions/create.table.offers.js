module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        await client.query(
            `
                CREATE TABLE offers (
                    id SERIAL NOT NULL PRIMARY KEY,
                    user_id SERIAL NOT NULL,
                    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                );
            `, 
            (error, result) => {
                // console.log("client ready:", client.readyForQuery)
                if (result) {
                    // console.log(`CREATE TABLE 'users' result:`, result.rows);
                    client.release();
                    res(result);
                }
                if (error) {
                    console.log(`CREATE TABLE 'users' result:`, error.stack);
                    client.release();
                    rej(error);
                }
            }
        );
    })
}