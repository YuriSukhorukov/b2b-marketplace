module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.table)
            rej(`params.table undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        await client.query(
            `CREATE TABLE ${params.table} (
                id SERIAL NOT NULL,
                name VARCHAR(255) NOT NULL,
                address TEXT NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(20) NOT NULL
            );`, 
            (error, result) => {
                console.log("client ready:", client.readyForQuery)
                if (result) {
                    console.log(`CREATE TABLE '${params.table}' result:`, result.rows);
                    client.release();
                    res(result);
                }
                if (error) {
                    console.log(`CREATE TABLE '${params.table}' result:`, error.stack);
                    client.release();
                    rej(error);
                }
            }
        );
    })
}