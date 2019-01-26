import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';
import Settings from '@/models/settings';

export * from './reactivity';

export const state: Settings = {
  brightness: 0,
  delay: 0,
  color: 0
};

export default {
  state,
  mutations,
  actions
} as Module<Settings, any>;
