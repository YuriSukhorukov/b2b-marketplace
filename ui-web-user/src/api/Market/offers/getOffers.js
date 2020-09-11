import axios from 'axios';

export default (params) => {
    return new Promise((res, rej) => {
        const url       = `/api/v1/market/offers`;
        const method    = 'GET';
        const headers   = {"content-type": "application/json"};
        
        axios({
            url,
            method,
            headers,
        }).then(response => {
            res(response);
        }).catch((error) => {
            rej(error);
        });
    });
}