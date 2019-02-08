import { Module } from 'vuex';
import mutations from './mutations';
import actions from './actions';

export { Mutations } from './mutations';
export { Actions } from './actions';
export * from './reactivity';

export interface State {
  samplingRate: number;
  packetsPerSecond: number;
}

export const state: State = {
  samplingRate: 0,
  packetsPerSecond: 0
};

const module: Module<State, any> = {
  state,
  mutations,
  actions
};

export default module;
