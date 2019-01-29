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
      Vue.set(scripts, i, payload);
  },

  [Mutations.DeleteScript]({ scripts }, payload: Script) {
      scripts = scripts.filter(s => s.id !== payload.id);
  },

  [Mutations.AddScript]({ scripts }, payload: Script) {
      scripts.push(payload);
  },

  [Mutations.SetActiveScript](state, payload: Script) {
      state.activeScript = payload;
  }
};

export default mutations;
