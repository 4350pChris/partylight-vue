import Vue from 'vue';
import Router from 'vue-router';
import Settings from './views/Settings.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import(/* webpackChunkName: "editor" */ './views/Editor.vue'),
    },
    {
      path: '*',
      component: () =>
        import(/* webpackChunkName: "pagenotfound" */ './views/PageNotFound.vue'),
    },
  ],
});
