import axios from 'axios';

export default () => {
    return new Promise((res, rej) => {
        axios({
            url: `/api/v1/auth/verification`,
            method: 'post',
        }).then(response => {
            res(response);
        }).catch(error => {
            rej(error);
        })
    });
}