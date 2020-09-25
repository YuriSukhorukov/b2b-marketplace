const fs = require('fs');
const jwt = require('jsonwebtoken');
const publicKey = fs.readFileSync(`${global.appRoot}/public.key`, 'utf8');

module.exports = async (token) => {   
    let decoded = jwt.verify(token, publicKey);
    return decoded;
}