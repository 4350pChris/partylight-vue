import AudioParameters, { ScalingStrategy } from '../../models/audioParameters';
import { Module } from 'vuex';
import mutations from './mutations';
import actions from './actions';

export { Mutations } from './mutations';
export { Actions } from './actions';
export { initAudio } from './reactivity';

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
