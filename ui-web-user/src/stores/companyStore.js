import {
    observable, 
    action,
} from 'mobx';

import api from '../api/index';

const getCompany                = action(async ({user_id})=>{
    let result = await api.company.profile.get({user_id});
    companyStore.profile = result.data.body.length > 0 ? result.data.body[0] : {};
});
const resetCompany              = action(async ()=>{
    companyStore.profile = {};
});

const setProfileLegalType       = action(async (legal_type)=>{
    companyStore.editedProfile.legal_type = legal_type;
});
const setProfileName            = action(async (company_name)=>{
    companyStore.editedProfile.company_name = company_name;
});
const setProfileTaxNumber       = action(async (tax_id)=>{
    companyStore.editedProfile.tax_id = tax_id;
});

const editProfile               = action(async ()=>{
    let result = await api.company.profile.edit(companyStore.editedProfile);
    console.log('edit company: ', result);
});

const companyStore = observable({
    editedProfile: {
        legal_type: null,
        company_name: null,
        tax_id: null,
    },
    profile: {},
    setProfileLegalType,
    setProfileName,
    setProfileTaxNumber,
    editProfile,
    getCompany,
    resetCompany
});

export default companyStore;

window.companyStore = companyStore;