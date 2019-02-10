import { MutationTree } from 'vuex';
import { State } from '.';
import Vue from 'vue';

export enum Mutations {
  SetDMXSettings = 'setDMXSettings',
  SetSamplingRate = 'setSamplingRate',
  SetPacketsPerSecond = 'setPacketsPerSecond'
}

const mutations: MutationTree<State> = {
  [Mutations.SetDMXSettings](state, payload: Partial<State>) {
    for (const [key, value] of Object.entries(payload)) {
      Vue.set(state, key, value);
    }
  },

  [Mutations.SetSamplingRate](state, payload: number) {
    state.samplingRate = payload;
  },

  [Mutations.SetPacketsPerSecond](state, payload: number) {
    state.packetsPerSecond = payload;
  }
};

export default mutations;