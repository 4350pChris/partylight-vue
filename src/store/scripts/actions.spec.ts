import { createLocalVue } from '@vue/test-utils';
import Script from '@/models/script';
import Vuex, { Store } from 'vuex';
import { cloneDeep } from 'lodash';

const mockScripts: Script[] = [
  { code: 'code...', id: 1, name: 'first' },
  { code: 'public void main() {}', id: 2, name: 'second' },
  { code: 'int x = 1;', id: 3, name: 'third' }
];
jest.mock('@/api', () => ({
  scripts: {
    getScripts: jest.fn().mockResolvedValue(mockScripts),
    getScriptById: jest.fn(id => Promise.resolve(mockScripts.find(s => s.id === id))),
    addScript: jest.fn().mockResolvedValue(true),
    replaceScript: jest.fn().mockResolvedValue(true),
    deleteScript: jest.fn().mockResolvedValue(true),
    setActiveScript: jest.fn().mockResolvedValue(true),
    setActiveScriptById: jest.fn().mockResolvedValue(true)
  }
}));

import api from '@/api';
import scriptsStore, { State, Actions } from '.';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('DMX Store Actions', () => {
  let store: Store<State>;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(scriptsStore));
  });

  it('Delete Script', async () => {
    store.replaceState({ ...store.state, scripts: mockScripts });
    store.dispatch(Actions.DeleteScript, 2);
    expect(store.state.scripts).toHaveLength(2);
    expect(api.scripts.deleteScript).toHaveBeenCalledWith(2);
  });
  it('Fetch Scripts', async () => {
    await store.dispatch(Actions.FetchScripts);
    expect(store.state.scripts).toEqual(mockScripts);
    expect(api.scripts.getScripts).toHaveBeenCalled();
  });
  it('Save New Script', () => {
    const script = { code: 'my code', id: 1, name: 'another' };
    store.dispatch(Actions.SaveScript, script);
    expect(api.scripts.addScript).toHaveBeenCalledWith(script);
    expect(store.state.scripts).toEqual([script]);
  });
  it('Save Existing Script', () => {
    const script = { code: 'my code', id: 1, name: 'another' };
    store.replaceState({...store.state, scripts: [script]});
    const changedScript = { ...script, name: 'changed' };
    store.dispatch(Actions.SaveScript, changedScript);
    expect(api.scripts.replaceScript).toHaveBeenCalledWith(changedScript);
    expect(store.state.scripts).toEqual([changedScript]);
  });
  it('SetActive Script', async () => {
    const id = 2;
    await store.dispatch(Actions.SetActiveScript, id);
    expect(store.state.activeScriptId).toBe(id);
    expect(api.scripts.setActiveScriptById).toHaveBeenCalledWith(id);
  });
});
