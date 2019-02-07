import { MutationTree } from 'vuex';
import { State } from '.';
import Vue from 'vue';
import { Color } from '@/models/settings';

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

  [Mutations.SetColor](state, payload: Color) {
    state.color = payload;
  },

  [Mutations.SetSettings](state, payload: { [key: string]: number}) {
    for (const key of Object.keys(payload)) {
      Vue.set(state, key, payload[key]);
    }
  }
} as MutationTree<State>;
