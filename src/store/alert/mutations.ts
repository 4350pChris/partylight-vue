import { MutationTree } from 'vuex';
import { State } from '.';

export enum Mutations {
  SetVisibility = 'setVisibility',
  SetMessage = 'setMessage',
  SetType = 'setType'
}

const mutations: MutationTree<State> = {
  [Mutations.SetVisibility](state, payload: boolean) {
    state.visible = payload;
  },

  [Mutations.SetMessage](state, payload: string) {
    state.message = payload;
  },

  [Mutations.SetType](state, payload) {
    state.type = payload;
  }
};

export default mutations;
