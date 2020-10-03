import axios from 'axios';

export default (params) => {
    return new Promise((res, rej) => {
        const url       = `/api/v1/company/profile`;
        const method    = 'GET';
        const headers   = {"content-type": "application/json"};

        console.log('get company: ', params);
        
        axios({
            url,
            method,
            headers,
            params
        }).then(response => {
            res(response);
        }).catch((error) => {
            rej(error);
        });
    });
}