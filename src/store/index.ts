import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import settings, { State as SettingsState } from './settings';
import scripts, { State as ScriptsState } from './scripts';
import alert, { State as AlertState } from './alert';
import audio, { State as AudioState } from './audio';
import dmx, { State as DMXState } from './dmx';

export { initAudio } from './audio/reactivity';
export { initScripts } from './scripts/reactivity';
export { initSettings } from './settings/reactivity';
export { initDMX } from './dmx/reactivity';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const storeOptions: StoreOptions<StoreState> = {
  modules: { alert, audio, dmx, settings, scripts },
  strict: debug
};

const store = new Vuex.Store(storeOptions);

export interface StoreState {
  alert: AlertState;
  audio: AudioState;
  dmx: DMXState;
  settings: SettingsState;
  scripts: ScriptsState;
}

export default store;
