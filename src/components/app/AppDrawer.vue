<template>
  <v-navigation-drawer
    id="navdrawer"
    v-model="drawer"
    :clipped="$vuetify.breakpoint.smAndDown"
    fixed
    app
  >
    <v-container fluid class="pa-0" fill-height>
      <v-layout column>
        <NavList :routes="routes"/>
        <v-flex pl-4>
          <DarkModeSwitch />
        </v-flex>
        <v-flex>
          <v-divider/>
          <div class="title pl-2">Status</div>
          <AppStatus class="shrink" />
        </v-flex>
        <v-flex shrink>
          <v-img :src="require('@/assets/splash.png')" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { routes as origRoutes } from '@/router';
import NavList from '@/components/app/NavList.vue';
import AppStatus from '@/components/app/AppStatus.vue';
import DarkModeSwitch from '@/components/app/DarkModeSwitch.vue';
import { State, Mutation } from 'vuex-class';
import { StoreState, Mutations } from '@/store';

@Component({ components: { AppStatus, DarkModeSwitch, NavList }})
export default class AppDrawer extends Vue {
  @Mutation(Mutations.SetDrawer)
  setDrawer!: (dm: boolean | null) => void;

  get drawer() {
    return this._drawer;
  }

  set drawer(val: boolean | null) {
    this.setDrawer(val);
  }

  routes = origRoutes.filter(r => r.name);

  @State((store: StoreState) => store.drawer)
  _drawer!: boolean | null;
}
</script>

<style scoped>
#navdrawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
