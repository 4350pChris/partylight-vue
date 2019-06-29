import alert, { State as AlertState } from './alert';
import audio, { State as AudioState, initAudio } from './audio';
import dmx, { State as DMXState, initDMX } from './dmx';
import scripts, { State as ScriptsState, initScripts } from './scripts';
import settings, { State as SettingsState, initSettings } from './settings';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { Store } from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export { Actions } from './actions';
export { Getters } from './getters';
export { Mutations } from './mutations';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state: State = {
  drawer: null,
  darkMode: false,
  initFunctions: {
    audio: { fn: initAudio },
    dmx: { fn: initDMX },
    scripts: { fn: initScripts },
    settings: { fn: initSettings }
  }
};

const storeOptions: StoreOptions<State> = {
  state,
  getters,
  mutations,
  actions,
  modules: { alert, audio, dmx, settings, scripts },
  strict: debug
};

// cast to StoreState so type includes modules
const store = new Vuex.Store(storeOptions) as unknown as Store<StoreState>;

export default store;

export type InitFunction = (store: Store<any>) => Promise<void>;

export type InitFunctions = {
  [module in keyof Pick<StoreModules, Exclude<keyof StoreModules, 'alert'>>]: {
    fn: InitFunction,
    initialized?: boolean
  }
};

export interface State {
  initFunctions: InitFunctions;
  darkMode: boolean;
  drawer: boolean | null;
}

export interface StoreModules {
  alert: AlertState;
  audio: AudioState;
  dmx: DMXState;
  scripts: ScriptsState;
  settings: SettingsState;
}

export type StoreState = State & StoreModules;
