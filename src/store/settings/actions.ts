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

  [Actions.SaveSettings]({ commit }, payload: State) {
    commit(Mutations.SetSettings, payload);
    return Promise.all([
      service.setBrightness(payload.brightness),
      service.setColor(payload.color),
      service.setDelay(payload.delay)
    ]);
  }
};

export default actions;
