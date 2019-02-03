import { Module } from 'vuex';
import mutations from './mutations';

export { Mutations } from './mutations';
export { Actions } from './actions';

export const state: State = {
  visible: false,
  message: '',
  color: ''
};

const module: Module<State, any> = {
  state,
  mutations
};

export interface State {
  visible: boolean;

  message: string;

  color: string;
}

export default module;
