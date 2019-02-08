import Vue from 'vue';
import Router from 'vue-router';
import Settings from './views/Settings.vue';

Vue.use(Router);

export const routes = [
  {
    path: '/',
    name: 'settings',
    meta: { icon: 'settings' },
    component: Settings
  },
  {
    path: '/editor',
    name: 'editor',
    meta: { icon: 'code' },
    component: () => import(/* webpackChunkName: "editor" */ './views/Editor.vue'),
  },
  {
    path: '/status',
    name: 'status',
    meta: { icon: 'show_chart' },
    component: () => import(/* webpackChunkName: "status" */ './views/Status.vue')
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "pagenotfound" */ './views/PageNotFound.vue'),
  },
];

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});
