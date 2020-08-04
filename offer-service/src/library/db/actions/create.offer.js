module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.userId)
            rej(`params undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            userId
        } = params;
        console.log(`${userId}`);
        
        await client.query(
            `
                INSERT INTO offers(user_id) 
                VALUES ('${userId}')
                RETURNING user_id, created_on;
            `, 
            (error, result) => {
                console.log("client ready:", client.readyForQuery);
                if (result) {
                    console.log(`INSERT INTO offers '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`INSERT INTO offers '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}