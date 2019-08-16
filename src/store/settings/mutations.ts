import { MutationTree } from 'vuex';
import { Color, State } from '.';
import Vue from 'vue';

export enum Mutations {
  SetBrightness = 'setBrightness',
  SetDelay = 'setDelay',
  SetColor = 'setColor',
  SetSettings = 'setSettings'
}

const mutations: MutationTree<State> = {
  [Mutations.SetBrightness](state, payload: number) {
    state.brightness.value = payload;
  },

  [Mutations.SetDelay](state, payload: number) {
    state.delay.value = payload;
  },

  [Mutations.SetColor](state, payload: Color) {
    state.color = { ...state.color, ...payload };
  },

  [Mutations.SetSettings](state, payload: { [key: string]: any}) {
    for (const [key, value] of Object.entries(payload)) {
      Vue.set(state, key, value);
    }
  }
};

export default mutations;
