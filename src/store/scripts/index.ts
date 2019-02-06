import Script from '@/models/script';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export { Mutations } from './mutations';
export { Getters } from './getters';
export { Actions } from './actions';
export * from './reactivity';

export const state: State = {
  scripts: [],
  activeScriptId: -1
};

const module: Module<State, any> = {
  state,
  mutations,
  getters,
  actions
};

export interface State {
  scripts: Script[];

  activeScriptId: number;
}

export default module;
