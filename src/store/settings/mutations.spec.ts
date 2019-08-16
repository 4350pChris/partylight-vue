import { State } from '.';
import mutations, { Mutations } from './mutations';
import { Percentage, Millisecond } from '@/models/measurement';

const color: State['color'] = {
  a: 1,
  hsl: { h: 252, s: 0.5, l: 0.65, a: 1 },
  hex: '#8C79D2',
  hex8: '#8C79D2FF',
  rgba: { r: 140, g: 121, b: 210, a: 1 },
  hsv: { h: 252, s: 0.42, v: 0.825, a: 1 }
};

const makeState: () => State = () => ({
  brightness: new Percentage(20),
  color,
  delay: new Millisecond(50)
});

describe('Test Settings Mutations', () => {
  let state: State;

  beforeEach(() => {
    state = makeState();
  });

  it('Set Brightness', () => {
    mutations[Mutations.SetBrightness](state, 50);
    expect(state.brightness.value).toBe(50);
  });
  it('Set Delay', () => {
    mutations[Mutations.SetDelay](state, 80);
    expect(state.delay.value).toBe(80);
  });
  it('Set Color', () => {
    const colorCpy = { ...color, rgba: { r: 0, g: 0, b: 200, a: 0.5 }};
    mutations[Mutations.SetColor](state, colorCpy);
    expect(state.color).toEqual(colorCpy);
  });
  it('Set Settings', () => {
    const payload: State = {
      brightness: new Percentage(50),
      delay: new Millisecond(100),
      color: { ...color, rgba: { r: 0, g: 0, b: 200, a: 0.5 }}
    };
    mutations[Mutations.SetSettings](state, payload);
    expect(state).toEqual(payload);
  });
});
