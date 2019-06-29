import { InitFunction, State, InitFunctions } from '.';
import { MutationTree } from 'vuex';

export enum Mutations {
  SetDarkMode = 'setDarkMode',
  SetDrawer = 'setDrawer',
  SetModuleInitialized = 'setModuleInitialized'
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
  },
  [Mutations.SetDarkMode](state, darkMode: boolean) {
    state.darkMode = darkMode;
  },
  [Mutations.SetDrawer](state, drawer: boolean | null) {
    state.drawer = drawer;
  },
};

export default mutations;
