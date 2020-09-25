module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {} = params;

        console.log('params: ', params);
        
        // await client.query(
        //     `
        //         INSERT INTO offers(user_id, title, description, price, amount, currency_code, offer_type, measure_unit_code, date_expires, country, city) 
        //         VALUES ('${userId}', '${title}', '${description}', '${price}', '${amount}', '${currency_code}', '${offer_type}', '${measure_unit_code}', '${date_expires}', '${country}', '${city}')
        //         RETURNING id, user_id, created_on;
        //     `, 
        //     (error, result) => {
        //         if (result) {
        //             console.log(`INSERT INTO offers '${params}' result:`, result.rows);
        //             client.release();
        //             res(result.rows);
        //         } else if (error) {
        //             console.log(`INSERT INTO offers '${params}' error`, error.stack);
        //             client.release();
        //             rej(error.stack);
        //         }
        //     }
        // );
        res(true);
    })
}