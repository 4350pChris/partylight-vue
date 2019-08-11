import alertStore, { Actions, State, state } from '@/store/alert';
import Vuex, { Store } from 'vuex';
import { createLocalVue } from '@vue/test-utils';
import { cloneDeep } from 'lodash';
import lolex from 'lolex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Alert Store Actions', () => {
  let store: Store<State>;
  let clock: lolex.InstalledClock;

  beforeEach(() => {
    clock = lolex.install();
    store = new Vuex.Store(cloneDeep(alertStore));
  });

  afterEach(() => {
    clock.uninstall();
  });

  it('Show Alert', () => {
    const payload = { type: 'error', message: 'Test', duration: 0 };
    store.dispatch(Actions.ShowAlert, payload);
    clock.tick(1999);
    expect(store.state.visible).toBe(true);
    clock.tick(1);
    expect(store.state.visible).toBe(false);
  });

  it ('Hide Alert', () => {
    store.replaceState({ ...state, visible: true });
    store.dispatch(Actions.HideAlert);
    expect(store.state.visible).toBe(true);
    clock.tick(2000);
    expect(store.state.visible).toBe(false);
  });
});
