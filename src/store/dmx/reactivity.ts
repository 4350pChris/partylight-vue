import { Store } from 'vuex';
import ServiceFactory from '@/api';
import DMXService from '@/api/dmx/dmxService';
import { Actions, Mutations } from '.';

export async function initDMX(store: Store<any>) {
  const dmxService = ServiceFactory.get('dmx') as DMXService;

  await dmxService.startConnection();
  await store.dispatch(Actions.FetchDMXSettings);

  dmxService.onChange((prop, value) => store.commit(Mutations.SetDMXSettings, { [prop]: value }));
}
