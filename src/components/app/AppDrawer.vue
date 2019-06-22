<template>
  <v-navigation-drawer
    id="navdrawer"
    :value="value"
    @input="$emit('input', $event)"
    :clipped="$vuetify.breakpoint.smAndDown"
    fixed
    app
  >
    <v-container fluid class="pa-0" fill-height>
      <v-layout column>
        <NavList :routes="routes"/>
        <v-flex px-3>
          <v-switch @change="$emit('dark-mode')" label="Toggle dark mode"></v-switch>
        </v-flex>
        <slot name="list-append"></slot>
        <v-spacer/>
        <v-flex shrink>
          <v-img id="logo" pb-1 :src="require('@/assets/splash.png')" />
        </v-flex>
      </v-layout>
    </v-container>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { routes as origRoutes } from '@/router';
import NavList from './NavList.vue';

@Component({ components: { NavList }})
export default class AppDrawer extends Vue {
  @Prop({ default: null })
  private value!: boolean | null;

  private routes = origRoutes.filter(r => r.name);
}
</script>

<style scoped>
#navdrawer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
