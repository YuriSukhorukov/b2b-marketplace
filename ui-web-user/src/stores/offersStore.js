import {
    observable, 
    action,
} from 'mobx';

import api from '../api/index';

const createOffer = action(async ()=>{
    let result = await api.market.offers.createOffer(offersStore.newOffer);
    console.log('create offer: ', result);
});
const getOffers = action(async ()=>{
    let result = await api.market.offers.getOffers(offersStore.filter);
    offersStore.offers = result.data.body;
    // console.log('get offers: ', offersStore.offers);
    // console.log('get offers: ', result.data.body);
    // result.data.body.forEach(o => {
    //     offersStore.offers.push(o);
    // })
});
const getOfferDetails   = action(async ()=>{});
const resetOffersFilter = action(async ()=>{});

const offersStore = observable({
    filter: {
        type: null,
        lowPrice: null, 
        hightPrice: null,
    },
    newOffer: {
        description: null,
        userId: 1,
    },
    offers: [],
    createOffer,
    getOfferDetails,
    getOffers,
    resetOffersFilter
});

export default offersStore;

window.offersStore = offersStore;