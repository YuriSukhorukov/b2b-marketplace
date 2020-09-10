import {
    observable, 
    action,
} from 'mobx';

import api from '../api/index';

const createOffer       = action(async ()=>{});
const getOfferDetails   = action(async ()=>{});
const getOffers         = action(async ()=>{});

const offersStore = observable({
    token: '',
    isEmailExist,
    login,
    isEmailFree,
    register,
    authorization: null,
    get isAuthenticated() {return this.authorization},
});

export default offersStore;

window.offersStore = offersStore;

// login = () => {}
// logout = () => {}
// getToken = () => {}
// setToken = () => {}
// isAuthenticated = () => {}

// autorun(()=>{
//     console.log(authStore.token);
// })

// const authStore = window.authStore = new Auth