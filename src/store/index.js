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
    saveAdminInfo(state, adminInfo) { 
        state.adminInfo = adminInfo;
    }
}
const actions = {
    async getAdminData({ commit }) {
        try {
            const res = await getAdminInfo();
            if (res.data.status === 1) {
                commit('saveAdminInfo', res.data.data);
            } else { 
                throw new Error(res);
            }
        } catch (err) {
            console.log('您尚未登陆或者session失效');
        }
    }
}
export default new Vuex.Store({
    state,
    actions,
    mutations
})