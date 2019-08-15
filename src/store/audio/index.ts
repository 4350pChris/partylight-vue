import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import { ScalingStrategy } from '@/models/audioParameters';
import { Frequency } from '@/models/measurement';

export { Actions } from './actions';
export { initAudio } from './reactivity';
export { Mutations } from './mutations';

export interface State {
  parameters: {
    maximumAmplitude: number,
    minimumFrequency: Frequency,
    maximumFrequency: Frequency,
    numberOfChannels: number,
    useAverage: boolean,
    scalingStrategy: ScalingStrategy
  };
  buffer: number[];
}

export const state: State = {
  parameters: {
    maximumAmplitude: 255,
    minimumFrequency: new Frequency(0),
    maximumFrequency: new Frequency(20000),
    numberOfChannels: 1,
    useAverage: true,
    scalingStrategy: ScalingStrategy.Linear
  },
  buffer: [] as number[]
};

const store: Module<State, any> = {
  state,
  mutations,
  actions
};

export default store;
