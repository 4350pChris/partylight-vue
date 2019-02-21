import { ActionTree } from 'vuex';
import { State, Mutations } from '.';
import services from '@/api';

const service = services.settings;

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

    if (payload.brightness !== undefined) {
      promises.push(service.setBrightness(payload.brightness));
    }
    if (payload.color !== undefined) {
      promises.push(service.setColor(payload.color));
    }
    if (payload.delay !== undefined) {
      promises.push(service.setDelay(payload.delay));
    }
    return Promise.all(promises);
  }
};

export default actions;
