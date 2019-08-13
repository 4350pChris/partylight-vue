import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { cloneDeep } from 'lodash';
import api from '@/api';

jest.mock('@/api', () => ({
  dmx: {
    getSamplingRate: jest.fn(),
    getPacketsPerSecond: jest.fn(),
    getMaximumFrequency: jest.fn(),
    getUsedFrequency: jest.fn(),
    getLengthOfUniverse: jest.fn(),
    setLengthOfUniverse: jest.fn(),
    setSamplingRate: jest.fn()
  }
}));

import dmxStore, { State, Actions } from '.';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DMX Store Actions', () => {
  let store: Store<State>;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(dmxStore));
  });

  it('Fetch Settings', () => {
    store.dispatch(Actions.FetchDMXSettings);
    expect(api.dmx.getPacketsPerSecond).toHaveBeenCalled();
    expect(api.dmx.getSamplingRate).toHaveBeenCalled();
    expect(api.dmx.getLengthOfUniverse).toHaveBeenCalled();
    expect(api.dmx.getUsedFrequency).toHaveBeenCalled();
  });

  it('Save Length of Universe', () => {
    store.dispatch(Actions.SaveLengthOfUniverse, 123);
    expect(api.dmx.setLengthOfUniverse).toHaveBeenCalledWith(123);
  });

  it('Save Sampling Rate', () => {
    store.dispatch(Actions.SaveSamplingRate, 123);
    expect(api.dmx.setSamplingRate).toHaveBeenCalledWith(123);
  });
});
