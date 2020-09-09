import {observable, autorun} from 'mobx';

const authStore = observable({
    token: ''
});

export default authStore;

autorun(()=>{
    console.log(authStore.token);
})

// login = () => {}
// logout = () => {}
// getToken = () => {}
// setToken = () => {}
// isAuthenticated = () => {}

// const authStore = window.authStore = new Auth
window.authStore = authStore;