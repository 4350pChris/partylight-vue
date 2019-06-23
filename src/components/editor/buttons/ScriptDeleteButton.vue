<template>
  <v-dialog v-model="deleteDialog" max-width="290">
    <template #activator="{ on }">
      <v-btn
        class="lighten-1"
        color="error"
        :outlined="theme.isDark"
        :disabled="disabled"
        v-on="on"
      >Delete</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Confirm Deletion</v-card-title>
      <v-card-text>Are you sure you would like to delete {{ script.name }}?</v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" text @click.stop="deleteDialog = false">Cancel</v-btn>
        <LoadingButton color="error" text :load="closeDelete">Delete</LoadingButton>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Actions, Getters } from '@/store/scripts';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';
import ThemeMixin from '@/mixins/theme';
import LoadingButton from '@/components/shared/LoadingButton.vue';

@Component({ components: { LoadingButton }})
export default class ScriptDeleteButton extends Mixins(AlertMixin, ThemeMixin) {
  deleteDialog: boolean = false;

  @Prop({ required: true, type: Object })
  script!: Script;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | null;

  get disabled(): boolean {
    return this.scriptById(this.script.id) === null;
  }

  @Action(Actions.DeleteScript)
  deleteScript!: (id: number) => Promise<void>;

  async closeDelete(): Promise<void> {
    try {
      await this.deleteScript(this.script.id);
    } catch (e) {
      this.showAlert({
        type: 'error',
        message: 'Deleting script on server failed.<br>' + e
      });
    } finally {
      this.deleteDialog = false;
    }
  }
}
</script>

