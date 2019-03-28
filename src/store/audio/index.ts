import { Module } from 'vuex';
import actions from './actions';
import AudioParameters, { ScalingStrategy } from '../../models/audioParameters';
import mutations from './mutations';

export { Actions } from './actions';
export { initAudio } from './reactivity';
export { Mutations } from './mutations';

export interface State {
  parameters: AudioParameters;

  buffer: number[];
}

export const state: State = {
  parameters: {
    maximumAmplitude: 255,
    minimumFrequency: 0,
    maximumFrequency: 20000,
    numberOfChannels: 1,
    useAverage: true,
    scalingStrategy: ScalingStrategy.Linear
  },
  buffer: [] as number[]
};

const module: Module<State, any> = {
  state,
  mutations,
  actions
};

export default module;
