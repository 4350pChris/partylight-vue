import { GetterTree } from 'vuex';
import { State } from '.';
import Script from '@/models/script';
import { maxBy } from 'lodash';

export enum Getters {
  ScriptById = 'scriptById',
  NextId = 'nextId',
  EmptyScript = 'emptyScript',
}

const getters: GetterTree<State, {}> = {
  [Getters.ScriptById]({ scripts }): (id: number) => Script | null {
    return (id: number) => scripts.find(s => s.id === id) || null;
  },

  [Getters.NextId]({ scripts }): number {
    const maxIdScript = maxBy(scripts, 'id');
    return maxIdScript === undefined ? 0 : maxIdScript.id + 1;
  },

  [Getters.EmptyScript](state, { [Getters.NextId]: nextId }): Script {
    return {
      id: nextId,
      name: 'Empty Script',
      code: 'public void setup() {\n\n}\n\npublic void loop() {\n\n}\n'
    };
  },
};

export default getters;
