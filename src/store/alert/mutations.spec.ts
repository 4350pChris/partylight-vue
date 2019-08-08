import { State } from '@/store/alert';
import mutations, { Mutations } from '@/store/alert/mutations';

const makeState: () => State = () => ({ message: '', visible: true, type: 'alert' });

describe('Alert Store Mutations', () => {
  it('Set Message', () => {
    const state = makeState();
    const msg = 'My message';
    const setMessage = mutations[Mutations.SetMessage];
    setMessage(state, msg);
    expect(state.message).toBe(msg);
  });
  it('Set Type', () => {
    const state = makeState();
    const setType = mutations[Mutations.SetType];
    const type = 'warning';
    setType(state, type);
    expect(state.type).toBe(type);
  });
  it('Set Visibility', () => {
    const state = makeState();
    const setVis = mutations[Mutations.SetVisibility];
    setVis(state, false);
    expect(state.visible).toBe(false);
  });
});
