import { ActionTree } from 'vuex';
import { state as moduleState } from '.';
import { Mutations } from './mutations';
import ServiceFactory from '@/api';
import SettingsService from '@/api/settings/settingsService';

const service = ServiceFactory.get('settings') as SettingsService;

export const Actions = {
  FetchSettings: 'FetchSettings',
  SaveSettings: 'SaveSettings'
};

const actions: ActionTree<typeof moduleState, {}> = {
  [Actions.FetchSettings]({ commit }) {
    return Promise.all([
      service.getBrightness().then(val => commit(Mutations.SetBrightness, val)),
      service.getColor().then(val => commit(Mutations.SetColor, val)),
      service.getDelay().then(val => commit(Mutations.SetDelay, val))
    ]);
  },

  [Actions.SaveSettings]({ state }) {
    return Promise.all([
      service.setBrightness(state.brightness),
      service.setColor(state.color),
      service.setDelay(state.delay)
    ]);
  }
};

export default actions;
