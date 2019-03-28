import { Module } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import Script from '@/models/script';

export { Actions } from './actions';
export { Getters } from './getters';
export { Mutations } from './mutations';
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
