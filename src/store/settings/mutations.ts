import { MutationTree } from 'vuex';
import { state as moduleState } from '.';

export enum Mutations {
  SetBrightness = 'settings/setBrightness',
  SetDelay = 'settings/setDelay',
  SetColor = 'settings/setColor',
  SetSettings = 'settings/setSettings'
}

export default {
  [Mutations.SetBrightness](state, payload) {
    state.brightness = payload as number;
  },

  [Mutations.SetDelay](state, payload) {
    state.delay = payload as number;
  },

  [Mutations.SetColor](state, payload) {
    state.color = payload as number;
  },

  [Mutations.SetSettings](state, payload) {
    Object.assign(state, payload);
  }
} as MutationTree<typeof moduleState>;
