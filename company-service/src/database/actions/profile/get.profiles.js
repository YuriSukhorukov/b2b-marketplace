module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });

        const {user_ids} = params;

        await client.query(
            `
                SELECT * 
                FROM profiles 
                WHERE user_id IN (${user_ids})
                ORDER BY created_on ASC;
            `, 
            (error, result) => {
                // console.log("client ready:", client.readyForQuery);
                if (result) {
                    console.log(`SELECT * FROM profiles '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`SELECT * FROM profiles '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}