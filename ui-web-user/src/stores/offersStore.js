import {
    observable, 
    action,
} from 'mobx';

import api from '../api/index';

const createOffer       = action(async ()=>{
    let result = await api.market.offers.createOffer(offersStore.newOffer);
    console.log('create offer: ', result);
});
const getOfferDetails   = action(async ()=>{});
const getOffers         = action(async ()=>{});

const offersStore = observable({
    filter: {
        type: null,
        lowPrice: null, 
        hightPrice: null,
    },
    newOffer: {
        // description: null,
        userId: 1,
    },
    offers: [],
    createOffer,
    getOfferDetails,
    getOffers,
});

export default offersStore;

window.offersStore = offersStore;