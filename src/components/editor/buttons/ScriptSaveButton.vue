<template>
  <LoadingButton
    color="primary"
    v-bind="$attrs"
    :load="saveScript"
    :icon="icon"
    :disabled="disabled"
  >
    <v-icon v-if="icon">mdi-content-save</v-icon>
    <slot v-else>save</slot>
  </LoadingButton>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch, PropSync } from 'vue-property-decorator';
import { Action, Mutation, Getter } from 'vuex-class';
import { Actions, Mutations, Getters } from '@/store/scripts';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';
import LoadingButton from '@/components/shared/LoadingButton.vue';
import { isEqual } from 'lodash';

@Component({ components: { LoadingButton }})
export default class ScriptSaveButton extends Mixins(AlertMixin) {
  disabled: boolean = false;

  @PropSync('script', { required: true, type: Object })
  syncedScript!: Script;

  @Prop({ required: false, default: false }) icon!: boolean;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | undefined;

  @Action(Actions.SaveScript)
  save!: (script: Script) => Promise<void>;

  @Mutation(Mutations.SetSelectedScript)
  setSelectedScript!: (id: number | null) => void;

  get original() {
    return this.scriptById(this.syncedScript.id);
  }

  @Watch('script', { deep: true })
  scriptChanged() {
    console.log('Watcher invoked');
    this.disabled = isEqual(this.syncedScript, this.original);
  }

  async saveScript(): Promise<void> {
    try {
      this.setSelectedScript(this.syncedScript.id);
      await this.save(this.syncedScript);
    } catch (e) {
      this.showAlert({
        type: 'error',
        message: 'Error while saving script<br>' + e
      });
    }
  }
}
</script>
