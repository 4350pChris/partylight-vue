import AudioParameters, { ScalingStrategy } from '../../models/audioParameters';
import { Module } from 'vuex';
import mutations from './mutations';
import actions from './actions';

export { Mutations } from './mutations';
export { Actions } from './actions';

export interface State {
  parameters: AudioParameters;

  buffer: number[];
}

export const state: State = {
  parameters: {
    maximumAmplitude: 0,
    minimumFrequency: 0,
    maximumFrequency: 0,
    numberOfChannels: 0,
    useAverage: false,
    scalingStrategy: ScalingStrategy.Decibel
  },
  buffer: [] as number[]
};

const module: Module<State, any> = {
  state,
  mutations,
  actions
};

export default module;
