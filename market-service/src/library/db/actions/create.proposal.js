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
        
        await client.query(
            `
                INSERT  INTO proposals(user_id, offer_id)
                SELECT  ${userId}, ${offerId}
                WHERE   
                    NOT EXISTS (
                        SELECT FROM offers AS o
                        WHERE  o.id = ${offerId}
                        AND    o.user_id = ${userId}
                    )
                RETURNING id, user_id, offer_id, created_on;
            `, 
            (error, result) => {
                // console.log("client ready:", client.readyForQuery);
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

// CHECK (offers.offer_id = offer_id AND offers.user_id != user_id)




// INSERT INTO proposals(user_id, offer_id)
// SELECT 12, 7
// WHERE  NOT EXISTS (
// 	SELECT FROM offers AS o
// 	WHERE  o.id = 7
// 	AND    o.user_id = 12
// )
// RETURNING id, user_id, offer_id, created_on;