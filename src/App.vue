<template>
  <v-app :dark="dark">
    <v-toolbar app clipped-left dense v-if="$vuetify.breakpoint.mdAndDown">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
    </v-toolbar>
    <AppDrawer :routes="routes" @dark-mode="dark = !dark" v-model="drawer">
      <template #list-append>
        <v-img id="logo" pb-1 :src="require('@/assets/splash.png')" contain />
      </template>
    </AppDrawer>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <AppAlert/>
    <DisconnectedSnackbar/>
    <AppStatus />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import { routes as origRoutes } from './router';
import AppAlert from '@/components/app/AppAlert.vue';
import AppDrawer from '@/components/app/AppDrawer.vue';
import DisconnectedSnackbar from '@/components/app/DisconnectedSnackbar.vue';
import AppStatus from '@/components/app/AppStatus.vue';


@Component({
  components: { AppDrawer, AppAlert, DisconnectedSnackbar, AppStatus }
})
export default class App extends Vue {
  private dark: boolean = false;

  private drawer: boolean | null = null;

  private routes = origRoutes.filter(r => r.name);
}
</script>

<style scoped>
#logo {
  flex: inherit;
}
</style>
