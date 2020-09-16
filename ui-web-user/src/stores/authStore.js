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
        let response = await api.auth.signin.login({email, password});
        authStore.authorization = response.status == 200;
        setCookie('id', response.data.user_id, 30);
    } catch (e) {
        console.log(e);
        authStore.authorization = false;
    }
});

const verify = action(async () => {
    try {
        const response = await api.auth.verification.verify();
        authStore.authorization = response.status == 200;    
    } catch (e) {
        console.log(e);
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
        deleteCookie('id');
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
    verify,
    login,
    logout,
    isEmailFree,
    register,
    authorization: false,
    get user_id() {return getCookie('id')},
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



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function deleteCookie(cname) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }