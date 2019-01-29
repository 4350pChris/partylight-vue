import Vue from 'vue';
import Vuex from 'vuex';
import settings, { initSettings } from './settings';
import scripts, { initScripts } from './scripts';
import Settings from '@/models/settings';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const storeOptions = {
  modules: { settings },
  strict: debug
};

const store = new Vuex.Store<{ settings: Settings }>(storeOptions);



export default store;
