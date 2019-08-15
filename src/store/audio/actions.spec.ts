import { ScalingStrategy } from '@/models/audioParameters';
import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { cloneDeep } from 'lodash';
import api from '@/api';

const mockAudioParams: State['parameters'] = {
  maximumAmplitude: 100,
  minimumFrequency: new Frequency(100),
  maximumFrequency: { unit: 'Hz', value: 8000},
  numberOfChannels: 32,
  useAverage: true,
  scalingStrategy: ScalingStrategy.Decibel
};
jest.mock('@/api', () => ({
  audio: {
    getAudioParameters: jest.fn().mockResolvedValue(mockAudioParams),
    setAudioParameters: jest.fn()
  }
}));

import audioStore, { Actions, State } from '.';
import { Frequency } from '@/models/measurement';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Audio Store Actions', () => {
  let store: Store<State>;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(audioStore));
  });

  it('Get Parameters', async () => {
    await store.dispatch(Actions.FetchParameters);
    expect(store.state.parameters).toEqual(mockAudioParams);
  });

  it('Set Parameters', async () => {
    expect(store.state.parameters).not.toEqual(mockAudioParams);
    await store.dispatch(Actions.SaveParameters, mockAudioParams);
    expect(store.state.parameters).toEqual(mockAudioParams);
  });
});
