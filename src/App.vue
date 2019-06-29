<template>
  <v-app :dark="darkMode">
    <AppTopBar/>
    <AppDrawer/>
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
import AppTopBar from '@/components/app/AppTopBar.vue';
import DisconnectedSnackbar from '@/components/app/DisconnectedSnackbar.vue';
import { State } from 'vuex-class';
import { StoreState } from '@/store';

@Component({
  components: { AppDrawer, AppAlert, AppTopBar, DisconnectedSnackbar }
})
export default class App extends Vue {
  @State((store: StoreState) => store.darkMode)
  darkMode!: boolean;
}
</script>

<style scoped>
#logo {
  flex: inherit;
}
</style>
