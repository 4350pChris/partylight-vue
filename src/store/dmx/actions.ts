import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import services from '@/api';

const dmxService = services.dmx;

export enum Actions {
  FetchDMXSettings = 'fetchDMXSettings',
  SaveSamplingRate = 'saveSamplingRate',
  SaveLengthOfUniverse = 'saveLengthOfUniverse'
}

const actions: ActionTree<State, any> = {
  async [Actions.FetchDMXSettings]({ commit }) {
    const [packetsPerSecond, samplingRate, lengthOfUniverse, usedFrequency] = await Promise.all([
      dmxService.getPacketsPerSecond(),
      dmxService.getSamplingRate(),
      dmxService.getLengthOfUniverse(),
      dmxService.getUsedFrequency(),
    ]);
    commit(Mutations.SetDMXSettings, { packetsPerSecond, samplingRate, lengthOfUniverse, usedFrequency });
  },

  [Actions.SaveSamplingRate]({ commit }, samplingRate: number) {
    commit(Mutations.SetDMXSettings, { samplingRate });
    return dmxService.setSamplingRate(samplingRate);
  },

  [Actions.SaveLengthOfUniverse]({ commit }, lengthOfUniverse: number) {
    commit(Mutations.SetDMXSettings, { lengthOfUniverse });
    return dmxService.setLengthOfUniverse(lengthOfUniverse);
  },
};

export default actions;
