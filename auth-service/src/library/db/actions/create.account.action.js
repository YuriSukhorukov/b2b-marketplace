module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.login || !params.email || !params.password)
            rej(`params undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            login, 
            email, 
            password
        } = params;
        console.log(`${login} ${email} ${password}`);
        
        await client.query(
            `
                INSERT INTO users(username, email, password) 
                VALUES ('${login}', '${email}', '${password}')
                RETURNING user_id, created_on;
            `, 
            (error, result) => {
                console.log("client ready:", client.readyForQuery);
                if (result) {
                    console.log(`INSERT INTO users '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`INSERT INTO users '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}