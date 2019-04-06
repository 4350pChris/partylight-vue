<template>
  <v-btn @click="click()" :loading="loading">
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoadingButton extends Vue {
  private loading: boolean = false;

  @Prop()
  private clickHandler!: CallableFunction;

  private async click() {
    this.loading = true;
    try {
      return this.clickHandler();
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }
}
</script>

