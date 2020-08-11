import {observable, autorun} from 'mobx';

const authStore = observable({
    token: ''
});

export default authStore;

autorun(()=>{
    console.log(authStore.token);
})