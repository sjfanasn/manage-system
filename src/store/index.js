import Vue from 'vue';
import Vuex from 'vuex';
import { getAdminInfo } from '../service/getData';
Vue.use(Vuex);
const state = {
    adminInfo: {
        avatar: 'default.jpg'
    }
}
const mutations = {
    
}
const actions = {
    async getAdminData({ commit }) {
        console.log('3333');
        try {
            const res = await getAdminInfo();
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
}
export default new Vuex.Store({
    state,
    actions,
    mutations
})