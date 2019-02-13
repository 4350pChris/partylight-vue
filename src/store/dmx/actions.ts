import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import ServiceFactory from '@/api';
import DMXService from '../../api/dmx/dmxService';

const dmxService = ServiceFactory.get('dmx') as DMXService;

export enum Actions {
  FetchDMXSettings = 'fetchDMXSettings',
  SaveSamplingRate = 'saveSamplingRate',
  SaveLengthOfUniverse = 'saveLengthOfUniverse'
}

const actions: ActionTree<State, any> = {
  async [Actions.FetchDMXSettings]({ commit }) {
    const [pps, samplingRate, lengthOfUniverse] = await Promise.all([
      dmxService.getPacketsPerSecond(),
      dmxService.getSamplingRate(),
      dmxService.getLengthOfUniverse()
    ]);
    commit(Mutations.SetDMXSettings, { pps, samplingRate, lengthOfUniverse });
  },

  [Actions.SaveSamplingRate]({ commit }, payload: number) {
    commit(Mutations.SetSamplingRate, payload);
    return dmxService.setSamplingRate(payload);
  },

  [Actions.SaveLengthOfUniverse]({ commit }, payload: number) {
    commit(Mutations.SetLengthOfUniverse, payload);
    return dmxService.setLengthOfUniverse(payload);
  }
};

export default actions;
