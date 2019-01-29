import { MutationTree } from 'vuex';
import { State } from '.';

export enum Mutations {
  SetBrightness = 'setBrightness',
  SetDelay = 'setDelay',
  SetColor = 'setColor',
  SetSettings = 'setSettings'
}

export default {
  [Mutations.SetBrightness](state, payload: number) {
    state.brightness = payload;
  },

  [Mutations.SetDelay](state, payload: number) {
    state.delay = payload;
  },

  [Mutations.SetColor](state, payload: number) {
    state.color = payload;
  }
} as MutationTree<State>;
