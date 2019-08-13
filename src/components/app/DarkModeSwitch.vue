<template>
  <v-switch v-model="dm" label="Dark Mode"></v-switch>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import { StoreState } from '@/store';
import { Mutations } from '@/store';

@Component
export default class DarkModeSwitch extends Vue {
  @State((store: StoreState) => store.darkMode)
  darkMode!: boolean;

  @Mutation(Mutations.SetDarkMode)
  setDarkMode!: (dm: boolean) => void;

  get dm() {
    return this.darkMode;
  }

  set dm(val: boolean) {
    this.setDarkMode(val);
    this.$vuetify.theme.dark = val;
  }
}
</script>

