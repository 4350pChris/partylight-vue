<template>
  <v-navigation-drawer id="navdrawer" v-model="drawer" fixed clipped app permanent>
    <v-list dense>
      <v-list-tile v-for="route in routes" :key="route.name" :to="route.link" ripple>
        <v-list-tile-action>
          <v-icon>{{route.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{route.name.toUpperCase()}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-img id="logo" pb-1 :src="require('@/assets/splash.png')" contain></v-img>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class AppNavigation extends Vue {
  @Prop() private routes!: Route[];
  private drawer = null;
}
</script>

<style scoped>
#navdrawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* toolbar + 1, otherwise toolbar overlaps drawer on mobile */
  z-index: 7;
}

#logo {
  flex: inherit;
}
</style>
