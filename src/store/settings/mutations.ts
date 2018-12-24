import { MutationTree } from 'vuex';
import { Settings } from '@/api/settings';

export const MUTATIONS = {
  SET_SETTINGS: 'SET_SETTINGS'
};

export default {
  [MUTATIONS.SET_SETTINGS](state, payload) {
    const { brightness, delay } = payload as Settings;
    state.brightness = brightness;
    state.delay = delay;
  }
} as MutationTree<Settings>;

