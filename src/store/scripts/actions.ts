import { ActionTree } from 'vuex';
import ServiceFactory from '@/api';
import ScriptsService from '@/api/scripts/scriptsService';
import { state as moduleState, Mutations } from '.';
import Script from '@/models/script';

const scriptsService = ServiceFactory.get('scripts') as ScriptsService;

export enum Actions {
  FetchScripts = 'fetchScripts',
  SaveScript = 'saveScript',
  SetActiveScript = 'setActiveScript'
}

const actions: ActionTree<typeof moduleState, {}> = {
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

  [Actions.SetActiveScript]({ commit }, payload: Script) {
    if (payload.id !== undefined) {
      commit(Mutations.SetActiveScript, payload);
      return scriptsService.setActiveScript(payload.id);
    }
  }
};

export default actions;
