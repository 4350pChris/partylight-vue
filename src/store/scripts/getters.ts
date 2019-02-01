import { GetterTree } from 'vuex';
import { State } from '.';
import Script from '@/models/script';

export enum Getters {
  ActiveScript = 'activeScript'
}

const getters: GetterTree<State, {}> = {
  [Getters.ActiveScript]({ scripts, activeScriptIndex }): Script {
    return scripts[activeScriptIndex];
  }
};

export default getters;
