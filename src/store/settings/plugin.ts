import { Store, Module } from 'vuex';
import SettingsService from '@/api/settings-service';
import mutations, { MUTATIONS } from './mutations';
import { Settings } from '@/api/settings';
import { state } from './state';

const settingsModule: Module<typeof state, {}> = {
  state,
  mutations
};

export default function createSettingsPlugin(api: SettingsService) {
  return (store: Store<{}>) => {
    store.registerModule('settings', settingsModule);

    api.connection.on('SettingsChanged', settings =>
      store.commit(MUTATIONS.SET_SETTINGS, settings)
    );

    store.subscribe(mutation => {
      if (mutation.type === MUTATIONS.SET_SETTINGS) {
        api.setSettings(mutation.payload as Settings);
      }
    });
  };
}
