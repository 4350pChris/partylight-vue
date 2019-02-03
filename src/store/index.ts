import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import settings, { initSettings, State as SettingsState } from './settings';
import scripts, { initScripts, State as ScriptsState } from './scripts';
import alert, { State as AlertState } from './alert';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const storeOptions: StoreOptions<StoreState> = {
  modules: { alert, settings, scripts },
  strict: debug
};

const store = new Vuex.Store(storeOptions);

Promise.all([
  initScripts(store),
  initSettings(store)
]);

export interface StoreState {
  alert: AlertState;

  settings: SettingsState;

  scripts: ScriptsState;
}

export default store;
