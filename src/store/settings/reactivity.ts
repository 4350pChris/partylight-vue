import ServiceFactory from '@/api';
import SettingsService from '@/api/settings/settingsService';
import { Store } from 'vuex';
import { Actions } from './actions';
import { Mutations } from './mutations';
import Settings from '@/models/settings';

export function initWebsockets(store: Store<any>) {
  const settingsService = ServiceFactory.get<SettingsService>('settings');

  settingsService.startConnection().then(connected => {
    // init state first
    store.dispatch(Actions.FetchSettings).then(res => {
      // then make reactive
      settingsService.onSettingChanged((prop: string, value: number) => {
        const updated = Object.assign({ ...store.state }, { [prop]: value });
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