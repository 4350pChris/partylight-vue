<template>
  <v-card>
    <v-slide-y-transition class="py-0" group tag="v-list">
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
import { Component, Vue } from 'vue-property-decorator';
import Script from '@/models/script';
import { StoreState } from '@/store';
import { Actions, Getters } from '@/store/scripts';
import { Action, Getter, State } from 'vuex-class';

@Component
export default class ScriptList extends Vue {
  @State((store: StoreState) => store.scripts.scripts)
  private scripts!: Script[];

  @Getter(Getters.ActiveScript)
  private active!: Script | null;

  private isActiveScript(script: Script) {
    return this.active !== null && this.active.id === script.id;
  }
}
</script>

