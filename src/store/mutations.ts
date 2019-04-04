import { InitFunction, State, InitFunctions } from '.';
import { MutationTree } from 'vuex';

export enum Mutations {
  SetModuleInitialized = 'SetModuleInitialized'
}

const mutations: MutationTree<State> = {
  [Mutations.SetModuleInitialized](state, payload: { module: keyof InitFunctions, initialized: boolean }) {
    const m = {
      ...state.initFunctions[payload.module],
      initialized: payload.initialized
    };
    state.initFunctions = {
      ...state.initFunctions,
      [payload.module]: m
    };
  }
};

export default mutations;
