module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.username || !params.password)
            rej(`params undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            username,
            password
        } = params;
        console.log(`${username}, ${password}`);
        await client.query(
            `
                SELECT username, email FROM users 
                WHERE (username='${username}' OR email='${username}')
                AND password='${password}'
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