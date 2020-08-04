module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.offerId)
            rej(`params undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            offerId
        } = params;
        console.log(`${offerId}`);
        
        await client.query(
            `
                SELECT * FROM proposals 
                WHERE offer_id='${offerId}'
                ORDER BY created_on ASC;
            `, 
            (error, result) => {
                console.log("client ready:", client.readyForQuery);
                if (result) {
                    console.log(`SELECT * FROM proposals '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`SELECT * FROM proposals '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}