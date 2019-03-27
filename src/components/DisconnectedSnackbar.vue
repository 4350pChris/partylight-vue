<template>
  <v-snackbar right v-model="snackbar" :timeout="0">
    Could not establish connection to back end.
    <v-btn
      color="accent"
      flat
      :loading="reconnecting"
      @click="reconnect">
      reconnect
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import services from '@/api';
import { BaseSocketService } from '@/api/baseSocketService';
import { debounce } from 'lodash';

@Component
export default class DisconnectedSnackbar extends Vue {
  private reconnecting = false;

  private services = services;

  private snackbar = false;

  private serviceChanged = debounce(() => {
    this.snackbar = Object.values(this.services).every(
      (s: BaseSocketService) => !s.isConnected
    );
  }, 2000);

  @Watch('services', { deep: true })
  private onServicesChanged() {
    this.serviceChanged();
  }

  private async reconnect() {
    this.reconnecting = true;
    Promise.all(
      Object.values(services).map((s: BaseSocketService) => s.startConnection())
    ).finally(() => (this.reconnecting = false));
  }
}
</script>
