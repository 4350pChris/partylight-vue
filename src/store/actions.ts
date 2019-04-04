import { State, InitFunctions } from '.';
import { Mutations } from './mutations';
import { ActionTree } from 'vuex';

export enum Actions {
  InitModule = 'initModule'
}

const actions: ActionTree<State, any> = {
  async [Actions.InitModule]({ commit, state }, payload: keyof InitFunctions) {
    let initialized = true;
    try {
      await state.initFunctions[payload].fn(this);
    } catch (error) {
      initialized = false;
    }
    commit(Mutations.SetModuleInitialized, { module: payload , initialized });
  }
};

export default actions;
