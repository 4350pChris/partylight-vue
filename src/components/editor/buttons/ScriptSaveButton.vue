<template>
  <LoadingButton
    color="primary"
    v-bind="$attrs"
    :load="saveScript"
    :icon="icon"
  >
    <v-icon v-if="icon">mdi-content-save</v-icon>
    <slot v-else>save</slot>
  </LoadingButton>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';
import { Actions, Mutations } from '@/store/scripts';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';
import LoadingButton from '@/components/shared/LoadingButton.vue';

@Component({ components: { LoadingButton }})
export default class ScriptSaveButton extends Mixins(AlertMixin) {
  @Prop({ required: true, type: Object })
  script!: Script;

  @Prop({ required: false, default: false }) icon!: boolean;

  @Action(Actions.SaveScript)
  save!: (script: Script) => Promise<void>;

  @Mutation(Mutations.SetSelectedScript)
  setSelectedScript!: (id: number | null) => void;

  async saveScript(): Promise<void> {
    try {
      this.setSelectedScript(this.script.id);
      await this.save(this.script);
    } catch (e) {
      this.showAlert({
        type: 'error',
        message: 'Error while saving script<br>' + e
      });
    }
  }
}
</script>
