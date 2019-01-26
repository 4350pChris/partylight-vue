<template>
  <v-app>
    <v-navigation-drawer id='navdrawer' v-model="drawer" fixed clipped app>
      <v-list dense>
        <v-list-tile
          v-for="route in routes"
          :key="route.name"
          :to="route.link"
          @click.stop="">
          <v-list-tile-action>
            <v-icon>{{route.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{route.name.toUpperCase()}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-img
        id='logo'
        class="mx-2 my-2"
        :src="require('@/assets/splash.png')"
        contain
      ></v-img>
    </v-navigation-drawer>
    <v-toolbar id="toolbar" dense fixed clipped-left app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

@Component
export default class App extends Vue {
  private drawer = false;
  private routes = [
    { icon: 'home', name: 'home', link: '/' },
    { icon: 'code', name: 'editor', link: '/editor' },
    { icon: 'contact_support', name: 'about', link: '/about' },
  ];
}
</script>

<style scoped>
#toolbar {
  /* needed so CodeMirror doesn't overlap when scrolling */
  z-index: 6;
}

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

