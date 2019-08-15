import { Module } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import { Frequency } from '@/models/measurement';

export { Mutations } from './mutations';
export { Actions } from './actions';
export { initDMX } from './reactivity';

export interface State {
  samplingRate: Frequency;
  packetsPerSecond: number;
  lengthOfUniverse: number;
  maximumFrequency: Frequency;
  usedFrequency: Frequency;
}

export const state: State = {
  samplingRate: new Frequency(0),
  packetsPerSecond: 0,
  lengthOfUniverse: 0,
  maximumFrequency: new Frequency(0),
  usedFrequency: new Frequency(0)
};

const store: Module<State, any> = {
  state,
  mutations,
  actions
};

export default store;
