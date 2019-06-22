<template>
  <v-app :dark="dark">
    <v-app-bar app clipped-left dense v-if="$vuetify.breakpoint.mdAndDown">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
    </v-app-bar>
    <AppDrawer @dark-mode="dark = !dark" v-model="drawer">
      <template #list-append>
        <AppStatus v-if="$vuetify.breakpoint.smAndDown"/>
      </template>
    </AppDrawer>
    <v-system-bar v-if="$vuetify.breakpoint.mdAndUp" app color="info" :class="[dark ? 'darken-2' : 'lighten-1']">
      <AppStatus class="pa-0" />
    </v-system-bar>
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <AppAlert/>
    <DisconnectedSnackbar/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
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
}
</script>

<style scoped>
#logo {
  flex: inherit;
}
</style>
