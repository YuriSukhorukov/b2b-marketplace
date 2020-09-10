import {
    observable, 
    action,
    // autorun,
} from 'mobx';

import api from '../api/index';

// Signin
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
const logout = action(async ()=>{
    // remove token from httpomly cookie
});

// Signup
const isEmailFree = action(async ({email})=>{
    const response = await api.auth.signup.checkEmail({email});
    return response.data.code != 302;
});
const register = action(async ({email, password})=>{
    const response = await api.auth.signup.register({email, password});
    return response != undefined;
});

// Export
const authStore = observable({
    token: '',
    isEmailExist,
    login,
    isEmailFree,
    register,
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