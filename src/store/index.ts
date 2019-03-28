import alert, { State as AlertState } from './alert';
import audio, { State as AudioState } from './audio';
import dmx, { State as DMXState } from './dmx';
import scripts, { State as ScriptsState } from './scripts';
import settings, { State as SettingsState } from './settings';
import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

export { initAudio } from './audio/reactivity';
export { initDMX } from './dmx/reactivity';
export { initScripts } from './scripts/reactivity';
export { initSettings } from './settings/reactivity';

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
  scripts: ScriptsState;
  settings: SettingsState;
}

export default store;
