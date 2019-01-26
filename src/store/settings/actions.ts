import { ActionTree } from 'vuex';
import { state as moduleState } from '.';
import { Mutations } from './mutations';
import ServiceFactory from '@/api';
import SettingsService from '@/api/settings/settingsService';

const service = ServiceFactory.get<SettingsService>('settings');

export const Actions = {
  FetchSettings: 'settings/fetchSettings',
  SaveSettings: 'settings/saveSettings'
};

const actions: ActionTree<typeof moduleState, {}> = {
  fetchSettings({ commit }) {
    return Promise.all([
      service.getBrightness().then(val => commit(Mutations.SetBrightness, val)),
      service.getColor().then(val => commit(Mutations.SetColor, val)),
      service.getDelay().then(val => commit(Mutations.SetDelay, val))
    ]);
  },

  saveSettings({ state }) {
    return Promise.all([
      service.setBrightness(state.brightness),
      service.setColor(state.color),
      service.setDelay(state.delay)
    ]);
  }
};

export default actions;
