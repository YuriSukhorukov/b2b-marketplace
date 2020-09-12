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
});
const getOfferDetails   = action(async ()=>{});
const resetOffersFilter = action(async ()=>{});

const setOfferTitle             = action(async (title)=>{
    offersStore.newOffer.title = title;
});
const setOfferDescription       = action(async (description)=>{
    offersStore.newOffer.description = description;
});
const setOfferPrice             = action(async (price)=>{
    offersStore.newOffer.price = price;
});
const setOfferCurrencyCode      = action(async (currency_code)=>{
    offersStore.newOffer.currency_code = currency_code;
});
const setOfferOfferType         = action(async (offer_type)=>{
    offersStore.newOffer.offer_type = offer_type;
});
const setOfferDataExpires       = action(async (date_expires)=>{
    offersStore.newOffer.date_expires = date_expires;
});
const setOfferCountry           = action(async (country)=>{
    offersStore.newOffer.country = country;
});
const setOfferCity              = action(async (city)=>{
    offersStore.newOffer.city = city;
});

const offersStore = observable({
    filter: {
        type: null,
        lowPrice: null, 
        hightPrice: null,
    },
    newOffer: {
        userId: 1,
        title: null,
        description: null,
        price: null,
        currency_code: null,
        offer_type: null,
        date_expires: null,
        country: null,
        city: null,
    },
    offers: [],
    createOffer,
    getOfferDetails,
    getOffers,
    resetOffersFilter,
    setOfferTitle,
    setOfferDescription,
    setOfferPrice,
    setOfferCurrencyCode,
    setOfferOfferType,
    setOfferDataExpires,
    setOfferCountry,
    setOfferCity,
});

export default offersStore;

window.offersStore = offersStore;