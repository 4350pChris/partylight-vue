import ServiceFactory from '@/api';
import SettingsService from '@/api/settings/settingsService';
import { Store } from 'vuex';
import { Actions, Mutations } from '.';
import Settings from '@/models/settings';

export function initSettings(store: Store<{ settings: Settings }>) {
  const settingsService = ServiceFactory.get('settings') as SettingsService;

  settingsService.startConnection().then(() => {
    // init state first
    store.dispatch(Actions.FetchSettings).finally(() => {
      // then make reactive
      settingsService.onSettingChanged((prop: string, value: number) => {
        // only update if new value is different to prevent looping beween client and server
        const key = prop.toLowerCase() as keyof Settings;
        const oldVal = store.state.settings[key];
        if (oldVal === value) {
          return;
        }
        const updated = Object.assign({ ...store.state.settings }, { [key]: value });
        store.commit(Mutations.SetSettings, updated);
      });

      store.subscribe(mutation => {
        if (mutation.type in Mutations) {
          store.dispatch(Actions.SaveSettings);
        }
      });
    });
  });
}
