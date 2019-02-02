<template>
  <v-card>
    <v-slide-y-transition class="py-0" group tag="v-list">
        <v-list-tile @click="$emit('new')" ripple key="-1">
          <v-list-tile-content>
            <v-list-tile-title>New Script</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-for="script in scripts"
          :key="script.id"
          @click="$emit('select', script)"
          ripple
          :color="isActiveScript(script) ? 'primary' : ''"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ script.name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-scroll-x-transition>
            <v-icon v-if="isActiveScript(script)" color="success">check_circle</v-icon>
          </v-scroll-x-transition>
        </v-list-tile>
    </v-slide-y-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Script from '@/models/script';

@Component
export default class ScriptList extends Vue {
  @Prop() private scripts!: Script[];
  @Prop() private active!: Script | null;

  private isActiveScript(script: Script) {
    if (this.active === null) {
      return '';
    }
    return this.active.id === script.id;
  }
}
</script>

