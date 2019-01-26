import ServiceFactory from '@/api';
import SettingsService from '@/api/settings/settingsService';
import { Store } from 'vuex';
import { Actions } from './actions';
import { Mutations } from './mutations';
import Settings from '@/models/settings';

export function initWebsockets(store: Store<{ settings: Settings }>) {
  const settingsService = ServiceFactory.get<SettingsService>('settings');

  settingsService.startConnection().then(connected => {
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
