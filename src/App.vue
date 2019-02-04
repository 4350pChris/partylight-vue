<template>
  <v-app>
    <app-navigation :routes="routes"></app-navigation>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <v-alert id="error-alert" :type="alertType" :value="alertVisible" transition="scale-transition">
      <span v-html="alertMessage"></span>
    </v-alert>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import AppNavigation from '@/components/AppNavigation.vue';
import { State } from 'vuex-class';
import { StoreState } from '@/store';

@Component({
  components: { AppNavigation }
})
export default class App extends Vue {
  private routes = [
    { icon: 'home', name: 'home', link: '/' },
    { icon: 'code', name: 'editor', link: '/editor' },
    { icon: 'contact_support', name: 'about', link: '/about' }
  ];

  @State((state: StoreState) => state.alert.visible)
  private alertVisible!: boolean;

  @State((state: StoreState) => state.alert.message)
  private alertMessage!: string;

  @State((state: StoreState) => state.alert.type)
  private alertType!: string;
}
</script>

<style scoped>
#error-alert {
  position: sticky;
  bottom: 0;
}
</style>
