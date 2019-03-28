import { Color } from '@/models/settings';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';

export { Actions } from './actions';
export { Mutations } from './mutations';
export * from './reactivity';

export const state: State = {
  brightness: 0,
  color: { a: 0, r: 0, g: 0, b: 0},
  delay: 0
};

const module: Module<State, any> = {
  state,
  mutations,
  actions
};

export interface State {
  brightness: number;
  color: Color;
  delay: number;
}

export default module;
