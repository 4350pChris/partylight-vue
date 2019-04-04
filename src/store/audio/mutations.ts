import { MutationTree } from 'vuex';
import { State } from '.';
import AudioParameters from '../../models/audioParameters';

export enum Mutations {
  SetBuffer = 'setBuffer',
  SetParameters = 'setParameters',
}

const mutations: MutationTree<State> = {
  [Mutations.SetParameters](state, payload: Partial<AudioParameters>) {
    state.parameters = { ...state.parameters, ...payload };
  },

  [Mutations.SetBuffer](state, payload: number[]) {
    state.buffer = payload;
  }
};

export default mutations;
