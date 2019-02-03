import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import ServiceFactory from '../../api';
import AudioService from '../../api/audio/audioService';

const audioService = ServiceFactory.get('audio') as AudioService;

export enum Actions {
  SaveBuffer = 'saveBuffer',
  SaveParameters = 'saveParameters'
}

const actions: ActionTree<State, any> = {
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
