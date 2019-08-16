import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import { Percentage, Millisecond } from '@/models/measurement';

export { Actions } from './actions';
export { Mutations } from './mutations';
export { initSettings } from './reactivity';

export const state: State = {
  brightness: new Percentage(0),
  color: {
    hex: '#194d33',
    hex8: '#194d33FF',
    hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
    hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
    rgba: { r: 25, g: 77, b: 51, a: 1 },
    a: 1
  },
  delay: new Millisecond(0)
};

const store: Module<State, any> = {
  state,
  mutations,
  actions
};

export interface Color {
  a: number;
  hex: string;
  hex8: string;
  hsl: { a: number, h: number, s: number, l: number };
  hsv: { a: number, h: number, s: number, v: number };
  rgba: { r: number, g: number, b: number, a: number };
  [key: string]: any;
}

export interface State {
  brightness: Percentage;
  color: Color;
  delay: Millisecond;
}

export default store;
