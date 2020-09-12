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
                    title VARCHAR(255) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    price NUMERIC(17,3) NOT NULL,
                    currency_code VARCHAR(3) NOT NULL,
                    offer_type VARCHAR(16) NOT NULL,
                    country VARCHAR(255) NOT NULL,
                    city VARCHAR(255) NOT NULL,
                    date_expires TIMESTAMP NOT NULL,
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