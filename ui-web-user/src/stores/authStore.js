import {
    observable, 
    action,
    // autorun,
} from 'mobx';

import api from '../api/index';

const isEmailExist = action(async ({email})=>{
    const response = await api.auth.signin.checkEmail({email});
    return response.data.code == 302;
});
const login = action(async ({email, password}) => {
    try {
        await api.auth.signin.login({email, password});
        authStore.authorization = true;
    } catch (e) {
        authStore.authorization = false;
    }
});

const authStore = observable({
    token: '',
    isEmailExist,
    login,
    authorization: null,
    get isAuthenticated() {return this.authorization},
});

export default authStore;

window.authStore = authStore;

// login = () => {}
// logout = () => {}
// getToken = () => {}
// setToken = () => {}
// isAuthenticated = () => {}

// autorun(()=>{
//     console.log(authStore.token);
// })

// const authStore = window.authStore = new Auth