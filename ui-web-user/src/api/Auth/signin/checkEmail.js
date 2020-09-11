import axios from 'axios';

export default ({email}) => {
    return new Promise((res, rej) => {
        axios.post(`/api/v1/auth/signin/${email}`).then(response => {
            res(response);
        }).catch((error) => {
            rej(error);
        });
    });
}