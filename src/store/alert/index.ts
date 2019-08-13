import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';

export { Actions } from './actions';
export { Mutations } from './mutations';

export const state: State = {
  visible: false,
  message: '',
  type: 'info'
};

const store: Module<State, any> = {
  state,
  mutations,
  actions
};

export interface State {
  visible: boolean;

  message: string;

  type: 'success' | 'info' | 'warning' | 'alert';
}

export default store;
