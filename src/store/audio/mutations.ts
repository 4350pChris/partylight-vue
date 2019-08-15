import { MutationTree } from 'vuex';
import { State } from '.';

export enum Mutations {
  SetBuffer = 'setBuffer',
  SetParameters = 'setParameters',
}

const mutations: MutationTree<State> = {
  [Mutations.SetParameters](state, payload: Partial<State['parameters']>) {
    state.parameters = { ...state.parameters, ...payload };
  },

  [Mutations.SetBuffer](state, payload: State['buffer']) {
    state.buffer = payload;
  }
};

export default mutations;
