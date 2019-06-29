<template>
  <v-snackbar top :value="alertVisible" :color="alertType">
    <span v-html="alertMessage"></span>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { StoreState } from '@/store';

@Component
export default class AppAlert extends Vue {
  @State((state: StoreState) => state.alert.visible)
  alertVisible!: boolean;

  @State((state: StoreState) => state.alert.message)
  alertMessage!: string;

  @State((state: StoreState) => state.alert.type)
  alertType!: string;
}
</script>

<style scoped>
#alertBar {
  z-index: 4;
}
</style>
