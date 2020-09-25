module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        if (!params || !params.table)
            rej(`params.table undefined`);
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        await client.query(
            `DROP TABLE ${params.table} CASCADE;`, 
            (error, result) => {
                // console.log("client ready:", client.readyForQuery);
                if (result) {
                    // console.log(`DROP TABLE '${params.table}' result:`, result.rows);
                    client.release();
                    res(result);
                }
                if (error) {
                    console.log(`DROP TABLE '${params.table}' error`, error.stack);
                    client.release();
                    rej(error);
                }
            }
        );
    })
}