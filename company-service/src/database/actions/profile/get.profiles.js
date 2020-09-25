module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        let client = await pool.connect().catch(err => {
            console.log('pool connect error: ', err);
            rej(err);
        });
        const {} = params;

        console.log('params: ', params);
        
        // await client.query(``, 
        //     (error, result) => {
        //         if (result) {
        //             client.release();
        //             res(result.rows);
        //         } else if (error) {
        //             client.release();
        //             rej(error.stack);
        //         }
        //     }
        // );
        res(true);
    })
}