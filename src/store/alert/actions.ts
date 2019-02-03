import { ActionTree } from 'vuex';
import { State } from '.';
import { Mutations } from '.';

export enum Actions {
  ShowAlert = 'showAlert'
}

const actions: ActionTree<State, any> = {
  [Actions.ShowAlert]({ commit }, payload: { type: string, duration?: number, message: string }) {
    commit(Mutations.SetMessage, payload.message);
    commit(Mutations.SetType, payload.type);
    commit(Mutations.SetVisibility, true);
    setTimeout(() => commit(Mutations.SetVisibility, false), payload.duration || 4000);
  }
};

export default actions;
