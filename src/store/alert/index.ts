import { Module } from 'vuex';
import mutations from './mutations';
import actions from './actions';

export { Mutations } from './mutations';
export { Actions } from './actions';

export const state: State = {
  visible: false,
  message: '',
  color: ''
};

const module: Module<State, any> = {
  state,
  mutations,
  actions
};

export interface State {
  visible: boolean;

  message: string;

  color: string;
}

export default module;
