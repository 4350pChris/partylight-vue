import { MutationTree } from 'vuex';
import { State } from '.';
import Script from '@/models/script';
import { maxBy } from 'lodash';

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
      scripts = scripts.splice(i, 1, payload);
    }
  },

  [Mutations.DeleteScript]({ scripts }, payload: number) {
    scripts = scripts.filter(s => s.id !== payload);
  },

  [Mutations.AddScript]({ scripts }, payload: Script) {
    if (payload.id === undefined) {
      const maxIdScript = maxBy(scripts, 'id');
      let maxId = -1;
      if (maxIdScript) {
        maxId = maxIdScript.id === undefined ? -1 : maxIdScript.id;
      }
      payload.id = maxId + 1;
    }
    scripts.push(payload);
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
