import { State } from '.';
import mutations, { Mutations } from './mutations';
import { Color } from '@/models/settings';

const makeState: () => State = () => ({
  brightness: 20,
  color: { a: 0, r: 10, g: 20, b: 30},
  delay: 50
});

describe('Test Settings Mutations', () => {
  let state: State;
  beforeEach(() => {
    state = makeState();
  });

  it('Set Brightness', () => {
    mutations[Mutations.SetBrightness](state, 50);
    expect(state.brightness).toBe(50);
  });
  it('Set Delay', () => {
    mutations[Mutations.SetDelay](state, 80);
    expect(state.delay).toBe(80);
  });
  it('Set Color', () => {
    const color: Color = { a: 1, r: 100, g: 100, b: 100 };
    mutations[Mutations.SetColor](state, color);
    expect(state.color).toEqual(color);
  });
  it('Set Settings', () => {
    const payload: State = {
      brightness: 100,
      delay: 200,
      color: { a: 1, r: 100, g: 100, b: 100 }
    };
    mutations[Mutations.SetSettings](state, payload);
    expect(state).toEqual(payload);
  });
});
