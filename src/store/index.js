import Vue from 'vue'
import vuex from 'vuex';
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
Vue.use(vuex);

const debug = process.env.NODE_ENV != 'production';

export default new vuex.Store({
    state,
    getters,
    mutations,
    actions
})

