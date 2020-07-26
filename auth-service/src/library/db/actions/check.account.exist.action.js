module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.login)
            rej(`params undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            login
        } = params;
        console.log(`${login}`);
        
        await client.query(
            `
                SELECT username FROM users 
                WHERE username='${login}'
                ORDER BY user_id ASC;
            `, 
            (error, result) => {
                console.log("client ready:", client.readyForQuery);
                if (result) {
                    console.log(`SELECT username FROM users '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`SELECT username FROM users  '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}