import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import Script from '@/models/script';
import services from '@/api';

const scriptsService = services.scripts;

export enum Actions {
  FetchScripts = 'fetchScripts',
  SaveScript = 'saveScript',
  SetActiveScript = 'setActiveScript'
}

const actions: ActionTree<State, {}> = {
  async [Actions.FetchScripts]({ commit }) {
    const scripts = await scriptsService.getScripts();
    commit(Mutations.SetScripts, scripts);
  },

  [Actions.SaveScript]({ commit }, payload: Script) {
    if (payload.id !== undefined) {
      commit(Mutations.UpdateScript, payload);
      return scriptsService.replaceScript(payload);
    } else {
      commit(Mutations.AddScript, payload);
      return scriptsService.addScript(payload);
    }
  },

  async [Actions.SetActiveScript]({ commit }, payload: Script | number) {
    let result: boolean;
    if (typeof payload === 'object') {
      result = await scriptsService.setActiveScript(payload);
    } else {
      result = await scriptsService.setActiveScriptById(payload);
    }
    if (result) {
      commit(Mutations.SetActiveScript, payload);
    }
  }
};

export default actions;
