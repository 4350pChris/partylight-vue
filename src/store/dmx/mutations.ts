import { MutationTree } from 'vuex';
import { State } from '.';
import Vue from 'vue';

export enum Mutations {
  SetDMXSettings = 'setDMXSettings'
}

const mutations: MutationTree<State> = {
  [Mutations.SetDMXSettings](state, payload: Partial<State>) {
    for (const [key, value] of Object.entries(payload)) {
      Vue.set(state, key, value);
    }
  }
};

export default mutations;
