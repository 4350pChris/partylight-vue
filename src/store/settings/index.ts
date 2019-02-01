import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';

export { Mutations } from './mutations';
export { Actions } from './actions';
export * from './reactivity';

export const state: State = {
  brightness: 0,
  delay: 0,
  color: 0
};

const module: Module<State, any> = {
  state,
  mutations,
  actions
};

export interface State {
  brightness: number;
  delay: number;
  color: number;
}

export default module;
