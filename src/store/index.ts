import Vue from 'vue';
import Vuex from 'vuex';
import settings, { initWebsockets } from './settings';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const storeOptions = {
  modules: { settings },
  strict: debug
};

const store = new Vuex.Store(storeOptions);

initWebsockets(store);

export default store;
