<template>
  <v-alert id="error-alert" :type="alertType" :value="alertVisible" transition="scale-transition">
    <span v-html="alertMessage"></span>
  </v-alert>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { StoreState } from '@/store';

@Component
export default class AppAlert extends Vue {
  @State((state: StoreState) => state.alert.visible)
  private alertVisible!: boolean;

  @State((state: StoreState) => state.alert.message)
  private alertMessage!: string;

  @State((state: StoreState) => state.alert.type)
  private alertType!: string;
}
</script>

<style scoped>
#error-alert {
  position: sticky;
  bottom: 0;
}
</style>
