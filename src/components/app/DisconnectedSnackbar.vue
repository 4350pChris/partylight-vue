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
import { BaseSocketService } from '@/api/baseSocketService';
import { Component, Vue, Watch } from 'vue-property-decorator';
import services from '@/api';

@Component
export default class DisconnectedSnackbar extends Vue {
  private reconnecting = false;

  private services = services;

  private get snackbar() {
    return Object.values(this.services).some(
      (s: BaseSocketService) => !s.isConnected
    );
  }

  private async reconnect() {
    this.reconnecting = true;
    Promise.all(
      Object.values(services).map((s: BaseSocketService) => s.startConnection())
    ).finally(() => (this.reconnecting = false));
  }
}
</script>
