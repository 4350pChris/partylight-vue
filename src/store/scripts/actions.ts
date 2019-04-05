import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import Script from '@/models/script';
import services from '@/api';

const scriptsService = services.scripts;

export enum Actions {
  DeleteScript = 'deleteScript',
  FetchScripts = 'fetchScripts',
  SaveScript = 'saveScript',
  SetActiveScript = 'setActiveScript'
}

const actions: ActionTree<State, {}> = {
  [Actions.DeleteScript]({ commit }, payload: number) {
    commit(Mutations.DeleteScript, payload);
    return scriptsService.deleteScript(payload);
  },

  async [Actions.FetchScripts]({ commit }) {
    const scripts = await scriptsService.getScripts();
    commit(Mutations.SetScripts, scripts);
  },
  /**
   * Saves the script to the store first, then tries saving it on the server.
   * @async
   * @throws {Error} When saving goes wrong
   * @param {*} { commit }
   * @param {Script} payload
   * @returns {Promise<void>}
   */
  async [Actions.SaveScript]({ commit }, payload: Script): Promise<void> {
    let success: boolean;
    if (payload.id !== undefined) {
      commit(Mutations.UpdateScript, payload);
      success = await scriptsService.replaceScript(payload);
    } else {
      commit(Mutations.AddScript, payload);
      success = await scriptsService.addScript(payload);
    }
    if (!success) {
      throw new Error('Failed saving script on server.');
    }
  },
  /**
   * Sets the active script on the server, then commits result to store.
   * @async
   * @throws {Error} If saving to server goes wrong
   * @param {*} { commit }
   * @param {(Script | number)} payload
   * @returns {Promise<void>}
   */
  async [Actions.SetActiveScript]({ commit }, payload: Script | number): Promise<void> {
    let success: boolean;
    if (typeof payload === 'object') {
      success = await scriptsService.setActiveScript(payload);
    } else {
      success = await scriptsService.setActiveScriptById(payload);
    }
    if (!success) {
      throw new Error('Failed setting active script on server.');
    }
    commit(Mutations.SetActiveScript, payload);
  }
};

export default actions;
