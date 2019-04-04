import { GetterTree } from 'vuex';
import { State, InitFunctions } from '.';

export enum Getters {
  FailedInitModules = 'failedInitModules'
}

const getters: GetterTree<State, any> = {
  [Getters.FailedInitModules]({ initFunctions }): Array<keyof InitFunctions> {
    return Object.entries(initFunctions)
      .filter(([k, { initialized }]) => initialized === false)
      .map(([k, v]) => k as keyof InitFunctions);
  }
};

export default getters;
