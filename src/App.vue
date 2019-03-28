<template>
  <v-app :dark="dark">
    <app-navigation :routes="routes" @dark-mode="dark = !dark"></app-navigation>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <app-alert></app-alert>
    <disconnected-snackbar></disconnected-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { routes as origRoutes } from './router';
import AppAlert from '@/components/app/AppAlert.vue';
import AppNavigation from '@/components/app/AppNavigation.vue';
import DisconnectedSnackbar from '@/components/app/DisconnectedSnackbar.vue';


@Component({
  components: { AppNavigation, AppAlert, DisconnectedSnackbar }
})
export default class App extends Vue {
  private dark: boolean = false;

  private routes = origRoutes.filter(r => r.name);
}
</script>
