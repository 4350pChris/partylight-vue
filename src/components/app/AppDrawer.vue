<template>
  <v-navigation-drawer
    id="navdrawer"
    :value="value"
    @input="$emit('input', $event)"
    :clipped="$vuetify.breakpoint.smAndDown"
    fixed
    app>
    <v-list dense>
      <v-list-tile v-for="route in routes" :key="route.name" :to="route.path" ripple>
        <v-list-tile-action>
          <v-icon>{{route.meta.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{route.name.toUpperCase()}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="mt-4">
        <v-list-tile-action>
          <v-switch @change="$emit('dark-mode')" label="Toggle dark mode"></v-switch>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <slot name="list-append"></slot>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class AppDrawer extends Vue {
  @Prop({ default: null })
  private value!: boolean | null;

  @Prop()
  private routes!: Route[];
}
</script>

<style scoped>
#navdrawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
