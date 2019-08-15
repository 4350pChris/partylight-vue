import { Color } from '@/models/settings';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import { Percentage, Millisecond } from '@/models/measurement';

export { Actions } from './actions';
export { Mutations } from './mutations';
export { initSettings } from './reactivity';

export const state: State = {
  brightness: new Percentage(0),
  color: { a: 0, r: 0, g: 0, b: 0},
  delay: new Millisecond(0)
};

const store: Module<State, any> = {
  state,
  mutations,
  actions
};

export interface State {
  brightness: Percentage;
  color: Color;
  delay: Millisecond;
}

export default store;
