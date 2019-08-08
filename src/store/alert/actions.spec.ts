import alertStore, { Actions, State } from '@/store/alert';
import Vuex, { Store } from 'vuex';
import { createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Alert Store Actions', () => {
  let store: Store<State>;

  beforeEach(() => {
    store = new Vuex.Store(alertStore);
  });

  it('Show/Hide Alert', async () => {
    const payload = { type: 'error', message: 'Test', duration: 2000 };
    store.dispatch(Actions.ShowAlert, payload);
    // alert should be visible right after the call
    expect(store.state.visible).toBe(true);
    // after waiting for duration ms the alert should not be visible anymore
    await setTimeout(() => expect(store.state.visible).toBe(false), payload.duration);
  });
});
