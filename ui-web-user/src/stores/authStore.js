import {
    observable, 
    action,
    // autorun,
} from 'mobx';

import api from '../api/index';

// Signin
const isEmailExist = action(async ({email})=>{
    const response = await api.auth.signin.checkEmail({email});
    return response.data.succes;
});
const login = action(async ({email, password}) => {
    let response = await api.auth.signin.login({email, password});
    authStore.authorization = response.data.succes;
    if (response.data.succes === true)
        setCookie('id', response.data.user_id, 30);
});

const verify = action(async () => {
    try {
        if (authStore.user_id == '') {
            authStore.authorization = false;
            return;
        }else {
            const response = await api.auth.verification.verify();
            authStore.authorization = response.data.succes;        
        }
    } catch (e) {
        console.log(e);
        authStore.authorization = false;
    }
});

// Signup
const isEmailFree = action(async ({email})=>{
    const response = await api.auth.signup.checkEmail({email});
    return response.data.succes;
});
const register = action(async ({email, password})=>{
    const response = await api.auth.signup.register({email, password});
    return response.data.succes;
});

// Signout
const logout = action(async ()=>{
    const response = await api.auth.signout.logout();
    authStore.authorization = !response.data.succes;
    if (response.data.succes)
        deleteCookie('id');
    return response.data.succes;
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
    authorization: null,
    get user_id() {return getCookie('id')},
    get isAuthenticated() {
        return this.authorization
    },
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