import { Module } from 'vuex';
import mutations from './mutations';
import actions from './actions';

export { Mutations } from './mutations';
export { Actions } from './actions';
export { initDMX } from './reactivity';

export interface State {
  samplingRate: number;
  packetsPerSecond: number;
  lengthOfUniverse: number;
}

export const state: State = {
  samplingRate: 50,
  packetsPerSecond: 0,
  lengthOfUniverse: 16
};

const module: Module<State, any> = {
  state,
  mutations,
  actions
};

export default module;
