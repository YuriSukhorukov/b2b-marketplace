import axios from 'axios';

export default ({email, password}) => {
    return new Promise((res, rej) => {
        axios({
            url: `/api/v1/auth/signin`,
            method: 'post',
            headers: {
                username: `${email}`,
                password: `${password}`
            }
        }).then(response => {
            res(response);
        }).catch(error => {
            rej(error);
        })
    });
}