import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import ServiceFactory from '@/api';
import SettingsService from '@/api/settings/settingsService';

const service = ServiceFactory.get('settings') as SettingsService;

export const Actions = {
  FetchSettings: 'fetchSettings',
  SaveSettings: 'saveSettings'
};

const actions: ActionTree<State, {}> = {
  [Actions.FetchSettings]({ commit }) {
    return Promise.all([
      service.getBrightness().then(val => commit(Mutations.SetBrightness, val)),
      service.getColor().then(val => commit(Mutations.SetColor, val)),
      service.getDelay().then(val => commit(Mutations.SetDelay, val))
    ]);
  },

  [Actions.SaveSettings]({ commit }, payload: Partial<State>) {
    commit(Mutations.SetSettings, payload);
    const promises: Array<Promise<void>> = [];

    if (payload.brightness) {
      promises.push(service.setBrightness(payload.brightness));
    }
    if (payload.color) {
      promises.push(service.setColor(payload.color));
    }
    if (payload.delay) {
      promises.push(service.setDelay(payload.delay));
    }
    return Promise.all(promises);
  }
};

export default actions;
