import { Module } from 'vuex';
import mutations from './mutations';
import actions from './actions';

export { Mutations } from './mutations';
export { Actions } from './actions';

export const state: State = {
  visible: false,
  message: '',
  type: 'info'
};

const module: Module<State, any> = {
  state,
  mutations,
  actions
};

export interface State {
  visible: boolean;

  message: string;

  type: 'success' | 'info' | 'warning' | 'alert';
}

export default module;
