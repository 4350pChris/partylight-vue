import Script from '@/models/script';
import { Module } from 'vuex';
import actions from './actions';
import mutations from './mutations';

export * from './reactivity';

export const state: State = {
    scripts: [] as Script[],
    activeScript: null
};

const module: Module<typeof state, any> = {
    state,
    mutations,
    actions
};

export interface State {
    scripts: Script[];

    activeScript: Script | null;
}

export default module;
