import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import services from '@/api';

const audioService = services.audio;

export enum Actions {
  FetchParameters = 'fetchParameters',
  SaveParameters = 'saveParameters'
}

const actions: ActionTree<State, any> = {
  async [Actions.FetchParameters]({ commit }) {
    const parameters = await audioService.getAudioParameters();
    commit(Mutations.SetParameters, parameters);
  },

  [Actions.SaveParameters]({ commit }, payload) {
    commit(Mutations.SetParameters, payload);
    return audioService.setAudioParameters(payload);
  }
};

export default actions;
