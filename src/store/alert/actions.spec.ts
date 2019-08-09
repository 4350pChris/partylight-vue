import alertStore, { Actions, State, state } from '@/store/alert';
import Vuex, { Store } from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { cloneDeep } from 'lodash';

const localVue = createLocalVue();

localVue.use(Vuex);
jest.useRealTimers();

describe('Alert Store Actions', () => {
  let store: Store<State>;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(alertStore));
  });

  it('Show Alert', done => {
    const payload = { type: 'error', message: 'Test', duration: 0 };
    store.dispatch(Actions.ShowAlert, payload);
    // alert should be visible right after the call
    expect(store.state.visible).toBe(true);
    // it then calls hide which is debounced by 2 seconds
    setTimeout(() => {
      expect(store.state.visible).toBe(false);
      done();
    }, 2500);
  });
  it ('Hide Alert', done => {
    store.replaceState({ ...state, visible: true });
    expect(store.state.visible).toBe(true);
    store.dispatch(Actions.HideAlert);
    setTimeout(() => {
      expect(store.state.visible).toBe(false);
      done();
    }, 2500);
  });
});
