import axios from 'axios';

export default (params) => {
    return new Promise((res, rej) => {
        const url       = `/api/v1/company/profile`;
        const method    = 'POST';
        const headers   = {"content-type": "application/json"};
        const data      = JSON.stringify(params);

        console.log(data);
        
        axios({
            url,
            method,
            headers,
            data
        }).then(response => {
            res(response);
        }).catch((error) => {
            rej(error);
        });
    });
}