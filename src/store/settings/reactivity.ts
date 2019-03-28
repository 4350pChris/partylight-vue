import { Actions, Mutations } from '.';
import { Store } from 'vuex';
import services from '@/api';

export async function initSettings(store: Store<any>) {
  const settingsService = services.settings;

  await settingsService.startConnection();
  // init state first
  await store.dispatch(Actions.FetchSettings);
  // then make reactive
  settingsService.onSettingChanged((prop: string, value: number) => {
    store.commit(Mutations.SetSettings, { [prop]: value });
  });
}
