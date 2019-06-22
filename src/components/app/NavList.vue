<template>
  <v-list dense nav>
      <v-list-item v-for="route in routes" :key="route.name" :to="route.path" ripple>
        <v-list-item-avatar>
          <v-icon>{{route.meta.icon}}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{route.name.toUpperCase()}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class NavList extends Vue {
  @Prop({ required: true, type: Array })
  private routes!: Route[];
}
</script>

