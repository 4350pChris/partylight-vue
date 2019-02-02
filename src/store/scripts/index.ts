import Script from '@/models/script';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export { Mutations } from './mutations';
export { Getters } from './getters';
export { Actions } from './actions';
export * from './reactivity';

export const state: State = {
  scripts: [
    { id: 1, name: 'First Script', code: 'hi i Bims der code' },
    {
      id: 2,
      name: 'ich probier mal injection',
      code: '<script>alert(\'hi\');</script>'
    },
    { id: 3, name: 'notha Script', code: '1 + 1 = 3' },
    { id: 4, name: 'dat Script', code: 'whattup' }
  ],
  activeScriptId: -1
};

const module: Module<typeof state, any> = {
  state,
  mutations,
  getters,
  actions
};

export interface State {
  scripts: Script[];

  activeScriptId: number;
}

export default module;
