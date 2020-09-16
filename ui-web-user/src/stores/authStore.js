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

// Signup
const isEmailFree = action(async ({email})=>{
    const response = await api.auth.signup.checkEmail({email});
    return response.data.code != 302;
});
const register = action(async ({email, password})=>{
    const response = await api.auth.signup.register({email, password});
    return response != undefined;
});

// Signout
const logout = action(async ()=>{
    try {
        const response = await api.auth.signout.logout();
        authStore.authorization = !(response.status == 200);
        return true;
    } catch (e) {
        authStore.authorization = false;
        return e;
    }
});

// Export
const authStore = observable({
    token: '',
    isEmailExist,
    login,
    logout,
    isEmailFree,
    register,
    authorization: false,
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