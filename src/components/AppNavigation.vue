<template>
  <v-navigation-drawer id="navdrawer" v-model="drawer" fixed clipped app permanent>
    <v-list dense>
      <v-list-tile v-for="route in routes" :key="route.name" :to="route.link" ripple @click.stop>
        <v-list-tile-action>
          <v-icon>{{route.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{route.name.toUpperCase()}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-img id="logo" class="" :src="require('@/assets/splash.png')" contain></v-img>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Route } from "vue-router";

@Component
export default class AppNavigation extends Vue {
  @Prop() routes!: Route[];
  private drawer = null;
}
</script>

