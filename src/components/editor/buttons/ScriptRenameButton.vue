<template>
  <v-dialog v-model="dialog" max-width="290">
    <template #activator="{ on }">
      <v-btn
        :icon="icon"
        v-on="on"
        v-bind="$attrs"
      >
        <v-icon v-if="icon">mdi-rename-box</v-icon>
        <slot v-else>rename</slot>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Rename Script</v-card-title>
      <v-card-text>
        <v-text-field v-model="syncedScript.name" />
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text @click.stop="dialog = false">Cancel</v-btn>
        <LoadingButton color="primary" text :load="renameScript">Rename</LoadingButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Mixins, PropSync } from 'vue-property-decorator';
import { Mutation, Action } from 'vuex-class';
import { Mutations, Actions } from '@/store/scripts';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';
import LoadingButton from '@/components/shared/LoadingButton.vue';

@Component({ components: { LoadingButton }})
export default class ScriptNewButton extends Mixins(AlertMixin) {
  dialog = false;

  name = '';

  @Prop({ required: false, default: false }) icon!: boolean;

  @PropSync('script', { required: true, type: Object })
  syncedScript!: Script;

  @Action(Actions.SaveScript)
  saveScript!: (script: Script) => Promise<void>;

  async renameScript() {
    try {
      this.saveScript(this.syncedScript);
    } catch (e) {
      this.showAlert({
        type: 'error',
        message: 'Renaming script on server failed.'
      });
    } finally {
      this.dialog = false;
    }
  }
}
</script>
