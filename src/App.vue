<template>
  <v-app :dark="dark">
    <app-navigation :routes="routes" @dark-mode="dark = !dark"></app-navigation>
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
import { routes as origRoutes } from './router';

@Component({
  components: { AppNavigation }
})
export default class App extends Vue {
  private dark: boolean = false;

  private routes = origRoutes.filter(r => r.name);

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
