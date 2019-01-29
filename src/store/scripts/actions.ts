import { ActionTree } from 'vuex';
import ServiceFactory from '@/api';
import ScriptsService from '@/api/scripts/scriptsService';
import { state as moduleState } from '.';
import { Mutations } from './mutations';
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
    commit(Mutations.UpdateScript, payload);
    return scriptsService.replaceScript(payload);
  }
};

export default actions;
