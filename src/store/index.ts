import Vue from 'vue';
import Vuex from 'vuex';
import createSettingsPlugin from './settings/plugin';
import SettingsService from '@/api/settings-service';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const settingsService = new SettingsService('/api/settings');
const settingsPlugin = createSettingsPlugin(settingsService);

export default new Vuex.Store<{}>({
  plugins: [settingsPlugin],
  strict: debug
});
