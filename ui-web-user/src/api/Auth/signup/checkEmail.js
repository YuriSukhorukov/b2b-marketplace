import axios from 'axios';

export default ({email}) => {
    return new Promise((res, rej) => {
        axios.get(`/api/v1/auth/signup/email/${email}`).then(response => {
            res(response);
        }).catch((error) => {
            rej(error);
        });
    });
}