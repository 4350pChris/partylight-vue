import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import ServiceFactory from '@/api';
import DMXService from '../../api/dmx/dmxService';

const dmxService = ServiceFactory.get('dmx') as DMXService;

export enum Actions {
  FetchDMXSettings = 'fetchDMXSettings',
  SaveSamplingRate = 'saveSamplingRate'
}

const actions: ActionTree<State, any> = {
  async [Actions.FetchDMXSettings]({ commit }) {
    const [pps, samplingRate] = await Promise.all([
      dmxService.getPacketsPerSecond(),
      dmxService.getSamplingRate()
    ]);
    commit(Mutations.SetPacketsPerSecond, pps);
    commit(Mutations.SetSamplingRate, samplingRate);
  },

  async [Actions.SaveSamplingRate]({ commit }, payload: number) {
    commit(Mutations.SetSamplingRate, payload);
    dmxService.setSamplingRate(payload);
  }
};

export default actions;
