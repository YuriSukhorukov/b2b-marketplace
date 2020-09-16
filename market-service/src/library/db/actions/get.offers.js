module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });

        console.log(params)
        let where = '';
        Object.keys(params).forEach((key, index) => {
            if (params[key]) {
                if (index == 0) 
                    where += 'WHERE '
                where += `${key}='${params[key]}'`;
                if (index  < Object.keys(params).length - 1)
                    where += ' AND '
            }
            console.log(params[key])
        });
        
        console.log('where: ', where);
 
        let q = `
            SELECT 
                * 
            FROM 
                offers 
            ${where}
            ORDER BY 
                created_on ASC;
        `;

        await client.query(
            q, 
            (error, result) => {
                // console.log("client ready:", client.readyForQuery);
                if (result) {
                    // console.log(`SELECT * FROM offers '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`SELECT * FROM offers '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}