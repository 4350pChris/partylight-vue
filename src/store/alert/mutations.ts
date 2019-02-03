import { MutationTree } from 'vuex';
import { State } from '.';

export enum Mutations {
  SetVisibility = 'setVisibility',
  SetMessage = 'setMessage',
  SetColor = 'setColor'
}

const mutations: MutationTree<State> = {
  [Mutations.SetVisibility](state, payload: boolean) {
    state.visible = payload;
  },

  [Mutations.SetMessage](state, payload: string) {
    state.message = payload;
  },

  [Mutations.SetColor](state, payload: string) {
    state.color = payload;
  }
};

export default mutations;
