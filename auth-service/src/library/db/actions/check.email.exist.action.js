module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.email)
            rej(`params undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            email
        } = params;
        console.log(`${email}`);
        
        await client.query(
            `
                SELECT email FROM users 
                WHERE email='${email}'
                ORDER BY user_id ASC;
            `, 
            (error, result) => {
                console.log("client ready:", client.readyForQuery);
                if (result) {
                    console.log(`SELECT email FROM users '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`SELECT email FROM users  '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}