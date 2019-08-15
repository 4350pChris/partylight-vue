import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import services from '@/api';
import AudioParameters from '@/models/audioParameters';

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

  [Actions.SaveParameters]({ commit, state }, payload: Partial<State['parameters']>) {
    commit(Mutations.SetParameters, payload);
    const onlyNums = Object.entries(state.parameters).reduce(
      (obj, [key, val]) => typeof val === 'object' ?
        { ...obj, [key]: val.value } : { ...obj, [key]: val }
    , {} as AudioParameters);
    return audioService.setAudioParameters(onlyNums);
  }
};

export default actions;
