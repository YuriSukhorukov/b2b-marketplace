module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.userId || !params.offerId)
            rej(`params undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            userId,
            offerId
        } = params;
        console.log(`${userId} ${offerId}`);
        
        await client.query(
            `
                INSERT INTO proposals(user_id, offer_id) 
                VALUES ('${userId}', '${offerId}')
                RETURNING user_id, offer_id, created_on;
            `, 
            (error, result) => {
                console.log("client ready:", client.readyForQuery);
                if (result) {
                    console.log(`INSERT INTO proposals '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`INSERT INTO proposals '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}