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
                INSERT INTO profiles 
                    (user_id, legal_type, company_name, tax_id) 
                VALUES 
                    ('${user_id}', '${legal_type}', '${company_name}', '${tax_id}')
                ON CONFLICT (user_id) 
                    DO UPDATE 
                        SET legal_type = excluded.legal_type, 
                            company_name = excluded.company_name, 
                            tax_id = excluded.tax_id
                RETURNING 
                    legal_type, 
                    company_name, 
                    tax_id, 
                    created_on;
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