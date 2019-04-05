import { MutationTree } from 'vuex';
import { State } from '.';
import Script from '@/models/script';
import { maxBy } from 'lodash';
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
    if (payload.id === undefined) {
      const maxIdScript = maxBy(state.scripts, 'id');
      let maxId = -1;
      if (maxIdScript) {
        maxId = maxIdScript.id === undefined ? -1 : maxIdScript.id;
      }
      payload.id = maxId + 1;
    }
    state.scripts = state.scripts.concat(payload);
  },

  [Mutations.SetActiveScript](state, payload: Script | number) {
    let pk: number;
    if (typeof payload === 'object') {
      pk = payload.id !== undefined ? payload.id : -1;
    } else {
      pk = payload;
    }
    state.activeScriptId = pk;
  }
};

export default mutations;
