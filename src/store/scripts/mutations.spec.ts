import { State } from '.';
import mutations, { Mutations } from './mutations';
import Script from '@/models/script';

const makeState: () => State = () => ({
  scripts: [
    { code: 'something', id: 1, name: 'first' },
    { code: 'public void main() {}', id: 2, name: 'second' },
    { code: 'another', id: 3, name: 'third' },
  ],
  activeScriptId: null,
  editorScript: null
});

describe('Scripts Store Mutations', () => {
  let state: State;

  beforeEach(() => {
    state = makeState();
  });

  it('Set Scripts', () => {
    const scripts: Script[] = [
      { code: 'code...', id: 1, name: 'first' },
      { code: 'public void main() {}', id: 2, name: 'second' },
      { code: 'int x = 1;', id: 3, name: 'third' },
    ];
    mutations[Mutations.SetScripts](state, scripts);
    expect(state.scripts).toEqual(scripts);
  });
  it('Add Script', () => {
    const script = { code: 'public void main() {}', id: 4, name: 'second' };
    mutations[Mutations.AddScript](state, script);
    expect(state.scripts).toHaveLength(4);
    expect(state.scripts).toContain(script);
  });
  it('Update Script', () => {
    const script = { code: 'some other code', id: 1, name: 'replaced' };
    mutations[Mutations.UpdateScript](state, script);
    expect(state.scripts).toHaveLength(3);
    expect(state.scripts).toContain(script);
  });
  it('Delete Script', () => {
    const id = 2;
    const script = state.scripts.find(s => s.id === id);
    mutations[Mutations.DeleteScript](state, id);
    expect(state.scripts).toHaveLength(2);
    expect(state.scripts).not.toContain(script);
  });
  it('Set Active Script', () => {
    const id = 3;
    mutations[Mutations.SetActiveScript](state, id);
    expect(state.activeScriptId).toBe(id);
  });
  it('Set Selected Script', () => {
    const script = { code: 'some other code', id: 1, name: 'replaced' };
    mutations[Mutations.SetEditorScript](state, script);
    expect(state.editorScript).toEqual(script);
  });
});
