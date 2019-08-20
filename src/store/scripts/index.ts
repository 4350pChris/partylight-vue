import { Module } from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import Script from '@/models/script';

export { Actions } from './actions';
export { Getters } from './getters';
export { Mutations } from './mutations';
export { initScripts } from './reactivity';

export interface State {
  scripts: Script[];
  activeScriptId: number | null;
  editorScript: Script | null;
}

export const state: State = {
  scripts: [],
  activeScriptId: null,
  editorScript: null,
};

const store: Module<State, any> = {
  state,
  mutations,
  getters,
  actions
};

export default store;
