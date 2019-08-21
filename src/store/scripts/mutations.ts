import { MutationTree } from 'vuex';
import { State } from '.';
import Script from '@/models/script';
import Vue from 'vue';

export enum Mutations {
  SetScripts = 'setScripts',
  AddScript = 'addScript',
  UpdateScript = 'updateScript',
  DeleteScript = 'deleteScript',
  SetActiveScript = 'setActiveScript',
  SetEditorScript = 'setEditorScript',
}

const mutations: MutationTree<State> = {
  [Mutations.SetScripts](state, payload) {
    state.scripts = payload;
  },

  [Mutations.UpdateScript](state, payload: Script) {
    const i = state.scripts.findIndex(s => s.id === payload.id);
    if (i > -1) {
      Vue.set(state.scripts, i, payload);
    }
  },

  [Mutations.DeleteScript](state, payload: number) {
    state.scripts = state.scripts.filter(s => s.id !== payload);
  },

  [Mutations.AddScript](state, payload: Script) {
    state.scripts.push(payload);
  },

  [Mutations.SetActiveScript](state, id: number | null) {
    state.activeScriptId = id;
  },

  [Mutations.SetEditorScript](state, script: Script | number | null) {
    if (typeof script !== 'object') {
      state.editorScript = state.scripts.find(s => s.id === script) || null;
    } else {
      state.editorScript = script;
    }
  },
};

export default mutations;
