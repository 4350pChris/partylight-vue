import { MutationTree } from 'vuex';
import { State } from '.';
import Script from '@/models/script';
import Vue from 'vue';

export enum Mutations {
  SetScripts = 'setScripts',
  AddScript = 'addScript',
  UpdateScript = 'updateScript',
  DeleteScript = 'deleteScript',
  SetActiveScript = 'setActiveScript'
}

const mutations: MutationTree<State> = {
  [Mutations.SetScripts](state, payload) {
    state.scripts = payload;
  },

  [Mutations.UpdateScript]({ scripts }, payload: Script) {
    const i = scripts.findIndex(s => s.id === payload.id);
    if (i > -1) {
      Vue.set(scripts, i, payload);
    }
  },

  [Mutations.DeleteScript]({ scripts }, payload: Script) {
    scripts = scripts.filter(s => s.id !== payload.id);
  },

  [Mutations.AddScript]({ scripts }, payload: Script) {
    if (payload.id === undefined) {
      payload.id = scripts
        .map(s => (s.id === undefined ? 0 : s.id))
        .reduce((a, b) => (a > b ? a : b));
    }
    scripts.push(payload);
  },

  [Mutations.SetActiveScript](state, payload: Script) {
    state.activeScriptIndex = payload.id || -1;
  }
};

export default mutations;
