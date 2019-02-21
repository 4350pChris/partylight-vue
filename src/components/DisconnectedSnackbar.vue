<template>
  <v-snackbar bottom v-model="snackbar" :timeout="0">
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
import { Component, Vue } from 'vue-property-decorator';
import services from '@/api';
import { BaseSocketService } from '@/api/baseSocketService';

@Component
export default class DisconnectedSnackbar extends Vue {
  private reconnecting = false;

  private get snackbar() {
    return Object.values(services).every(
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
