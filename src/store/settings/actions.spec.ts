import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import { cloneDeep } from 'lodash';
import { Millisecond, Percentage } from '@/models/measurement';

jest.mock('@/api', () => ({
  settings: {
    getBrightness: jest.fn().mockResolvedValue(100),
    getDelay: jest.fn().mockResolvedValue(200),
    getColor: jest.fn().mockResolvedValue({ a: 0, r: 100, g: 200, b: 50 }),
    setBrightness: jest.fn(),
    setDelay: jest.fn(),
    setColor: jest.fn()
  }
}));

import api from '@/api';
import settingsStore, { Actions, State } from '.';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Test Settings Actions', () => {
  let store: Store<State>;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(settingsStore));
  });

  it('Fetch Settings', async () => {
    await store.dispatch(Actions.FetchSettings);
    expect(store.state).toEqual({
      brightness: new Percentage(100),
      delay: new Millisecond(200),
      color: { a: 0, r: 100, g: 200, b: 50 }
    });
  });
  it('Save Settings', () => {
    const state: State = {
      brightness: new Percentage(50),
      delay: new Millisecond(100),
      color: { a: 0, r: 50, g: 100, b: 200 }
    };
    store.dispatch(Actions.SaveSettings, state);
    expect(store.state).toEqual(state);
    expect(api.settings.setBrightness).toHaveBeenCalledWith(state.brightness.value);
    expect(api.settings.setColor).toHaveBeenCalledWith(state.color);
    expect(api.settings.setDelay).toHaveBeenCalledWith(state.delay.value);
  });
});
