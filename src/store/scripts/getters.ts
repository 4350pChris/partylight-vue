import { GetterTree } from 'vuex';
import { State } from '.';
import Script from '@/models/script';

export enum Getters {
  ActiveScript = 'activeScript'
}

const getters: GetterTree<State, {}> = {
  [Getters.ActiveScript]({ scripts, activeScriptId }): Script | null {
    return scripts.find(s => s.id === activeScriptId) || null;
  }
};

export default getters;
