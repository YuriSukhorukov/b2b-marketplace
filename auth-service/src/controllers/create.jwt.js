const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync(`${global.appRoot}/private.key`, 'utf8');

module.exports = async (params) => {
    return new Promise((res, rej) => {
        if (!params || !params.user_id)
            rej('params undefined')
        const {
            user_id
        } = params;
        let token = jwt.sign(
            { 
                user_id
            }, 
            privateKey, 
            {
                algorithm: 'RS256', 
                expiresIn: '1h' 
            }
        );
        res(token);
    })
}