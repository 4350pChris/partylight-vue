<template>
  <v-app>
    <app-navigation :routes="routes"></app-navigation>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import AppNavigation from '@/components/AppNavigation.vue';

@Component({
  components: { AppNavigation }
})
export default class App extends Vue {
  private routes = [
    { icon: 'home', name: 'home', link: '/' },
    { icon: 'code', name: 'editor', link: '/editor' },
    { icon: 'contact_support', name: 'about', link: '/about' }
  ];
}
</script>
