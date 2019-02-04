import ServiceFactory from '@/api';
import SettingsService from '@/api/settings/settingsService';
import { Store } from 'vuex';
import { Actions, Mutations } from '.';
import Settings from '@/models/settings';

export async function initSettings(store: Store<{ settings: Settings }>) {
  const settingsService = ServiceFactory.get('settings') as SettingsService;

  await settingsService.startConnection();
  // init state first
  await store.dispatch(Actions.FetchSettings);
  // then make reactive
  settingsService.onSettingChanged((prop: string, value: number) => {
    store.commit(Mutations.SetSettings, { [prop]: value });
  });
}
