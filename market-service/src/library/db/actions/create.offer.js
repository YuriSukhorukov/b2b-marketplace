module.exports = async (pool, params) => {
    return new Promise(async (res, rej) => {
        let client = await pool.connect().catch(err => {
            console.log('pool .connect ->', err);
            rej(err);
        });
        const {
            userId,
            title,
            description,
            price,
            currency_code,
            offer_type,
            date_expires,
            country,
            city
        } = params;
        
        await client.query(
            `
                INSERT INTO offers(user_id, title, description, price, currency_code, offer_type, country, city, date_expires) 
                VALUES ('${userId}', '${title}', '${description}', '${price}', '${currency_code}', '${offer_type}', '${country}', '${city}', '${date_expires}')
                RETURNING created_on;
            `, 
            (error, result) => {
                // console.log("client ready:", client.readyForQuery);
                if (result) {
                    // console.log(`INSERT INTO offers '${params}' result:`, result.rows);
                    client.release();
                    res(result.rows);
                }
                if (error) {
                    console.log(`INSERT INTO offers '${params}' error`, error.stack);
                    client.release();
                    rej(error.stack);
                }
            }
        );
    })
}