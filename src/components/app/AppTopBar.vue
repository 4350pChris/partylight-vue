<template>
  <v-app-bar app clipped-left dense v-if="$vuetify.breakpoint.mdAndDown">
    <v-app-bar-nav-icon @click.stop="toggleDrawer"/>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import { StoreState, Mutations } from '@/store';

@Component
export default class AppTopBar extends Vue {
  @State((store: StoreState) => store.drawer)
  drawer!: boolean | null;

  @Mutation(Mutations.SetDrawer)
  setDrawer!: (dm: boolean | null) => void;

  toggleDrawer() {
    this.setDrawer(!this.drawer);
  }
}
</script>
