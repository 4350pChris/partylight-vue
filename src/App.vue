<template>
  <v-app>
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';
import AppAlert from '@/components/app/AppAlert.vue';
import AppDrawer from '@/components/app/AppDrawer.vue';
import AppTopBar from '@/components/app/AppTopBar.vue';
import DisconnectedSnackbar from '@/components/app/DisconnectedSnackbar.vue';

@Component({
  components: { AppDrawer, AppAlert, AppTopBar, DisconnectedSnackbar }
})
export default class App extends Vue {

}
</script>

<style scoped>
#logo {
  flex: inherit;
}
</style>
