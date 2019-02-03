import { ActionTree } from 'vuex';
import { State } from '.';
import { Mutations } from '.';
import { debounce } from 'lodash';

export enum Actions {
  ShowAlert = 'showAlert',
  HideAlert = 'hideAlert'
}

const actions: ActionTree<State, any> = {
  [Actions.ShowAlert]({ commit, dispatch }, payload: { type: string, duration?: number, message: string }) {
    commit(Mutations.SetMessage, payload.message);
    commit(Mutations.SetType, payload.type);
    commit(Mutations.SetVisibility, true);
    setTimeout(() => dispatch(Actions.HideAlert), payload.duration);
  },

  [Actions.HideAlert]: debounce(({ commit }) => commit(Mutations.SetVisibility, false), 2000),

};

export default actions;
