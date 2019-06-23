<template>
  <v-btn :loading="loading" v-bind="$attrs" v-on="$listeners" @click="click">
    <slot></slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ inheritAttrs: false })
export default class LoadingButton extends Vue {
  loading: boolean = false;

  @Prop({ type: Function, required: true })
  load!: () => void | Promise<void>;

  async click() {
    this.loading = true;
    try {
      await this.load();
    } finally {
      this.loading = false;
    }
  }
}
</script>
