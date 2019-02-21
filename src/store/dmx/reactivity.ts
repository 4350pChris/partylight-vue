import { Store } from 'vuex';
import services from '@/api';
import { Actions, Mutations } from '.';

export async function initDMX(store: Store<any>) {
  const dmxService = services.dmx;

  await dmxService.startConnection();
  await store.dispatch(Actions.FetchDMXSettings);

  dmxService.onChange((prop, value) =>
    store.commit(Mutations.SetDMXSettings, { [prop]: value })
  );
}
