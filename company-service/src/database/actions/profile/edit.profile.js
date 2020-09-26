module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            user_id,
            legal_type, 
            company_name, 
            tax_id
        } = params;

        console.log('params db: ', params);
        
        await client.query(
            `
                UPDATE profiles SET user_id='${user_id}', legal_type='${legal_type}', company_name='${company_name}', tax_id='${tax_id}' WHERE user_id='${user_id}';
                INSERT INTO profiles (user_id, legal_type, company_name, tax_id)
                SELECT '${user_id}', '${legal_type}', '${company_name}', '${tax_id}'
                WHERE NOT EXISTS (SELECT 1 FROM profiles WHERE user_id='${user_id}');
            `,
            (error, result) => {
                if (result) {
                    console.log(`INSERT INTO profiles '${params}' result:`, result.rows);
                    client.release();
                    res(true);
                } else if (error) {
                    console.log(`INSERT INTO profiles '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
        res(true);
    })
}