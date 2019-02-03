import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import ServiceFactory from '../../api';
import AudioService from '../../api/audio/audioService';

const audioService = ServiceFactory.get('audio') as AudioService;

export enum Actions {
  FetchBuffer = 'fetchBuffer',
  FetchParameters = 'fetchParameters',
  SaveBuffer = 'saveBuffer',
  SaveParameters = 'saveParameters'
}

const actions: ActionTree<State, any> = {
  async [Actions.FetchBuffer]({ commit }) {
    const buffer = await audioService.getAudioBuffer();
    commit(Mutations.SetBuffer, buffer);
  },

  async [Actions.FetchParameters]({ commit }) {
    const parameters = await audioService.getAudioParameters();
    commit(Mutations.SetParameters, parameters);
  },

  [Actions.SaveBuffer]({ commit }, payload: number[]) {
    commit(Mutations.SetBuffer, payload);
    return audioService.setAudioBuffer(payload);
  },

  [Actions.SaveParameters]({ commit }, payload) {
    commit(Mutations.SetParameters, payload);
    return audioService.setAudioParameters(payload);
  }
};

export default actions;
