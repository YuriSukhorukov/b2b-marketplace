import {
    observable, 
    action,
} from 'mobx';

import api from '../api/index';

const createOffer       = action(async ()=>{});
const getOfferDetails   = action(async ()=>{});
const getOffers         = action(async ()=>{});

const offersStore = observable({
    filter: {
        type: null,
        lowPrice: null, 
        hightPrice: null,
    },
    offers: [],
    createOffer,
    getOfferDetails,
    getOffers
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