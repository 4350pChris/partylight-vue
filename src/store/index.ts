import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import settings, { initSettings, State as SettingsState } from './settings';
import scripts, { initScripts, State as ScriptsState } from './scripts';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const storeOptions: StoreOptions<{ settings: SettingsState, scripts: ScriptsState}> = {
  modules: { settings, scripts },
  strict: debug
};

const store = new Vuex.Store(storeOptions);

export interface Store {
  settings: SettingsState;

  scripts: ScriptsState;
}

Promise.all([
  initScripts(store),
  initSettings(store)
]).catch(e => console.log("DAMN: " + e));

export default store;
