<template>
  <v-snackbar v-model="snackbar" :timeout="0" :multi-line="$vuetify.breakpoint.xs">
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
import { Action, Getter } from 'vuex-class';
import { StoreState, InitFunction, InitFunctions } from '@/store';
import { Getters } from '@/store/getters';
import { Actions } from '@/store/actions';

@Component
export default class DisconnectedSnackbar extends Vue {
  private reconnecting = false;

  @Getter(Getters.FailedInitModules)
  private failedInitModules!: Array<keyof InitFunctions>;

  private get snackbar() {
    return this.failedInitModules.length > 0;
  }

  @Action(Actions.InitModule)
  private initModule!: (payload: keyof InitFunctions) => Promise<any>;

  private async reconnect() {
    this.reconnecting = true;
    await Promise.all(this.failedInitModules.map(mod => this.initModule(mod)));
    this.reconnecting = false;
  }
}
</script>
