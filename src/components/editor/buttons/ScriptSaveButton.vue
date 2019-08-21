<template>
  <v-tooltip bottom>
    <span>Save</span>
    <template #activator="{ on }">
      <LoadingButton
        color="primary"
        v-bind="$attrs"
        v-on="on"
        :load="saveScript"
        :icon="icon"
        :disabled="disabled"
      >
        <v-icon v-if="icon">mdi-content-save</v-icon>
        <slot v-else>save</slot>
      </LoadingButton>
    </template>
  </v-tooltip>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import { Action, Mutation, Getter } from 'vuex-class';
import { Actions, Mutations, Getters } from '@/store/scripts';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';
import LoadingButton from '@/components/shared/LoadingButton.vue';
import { isEqual } from 'lodash';

@Component({ components: { LoadingButton }})
export default class ScriptSaveButton extends Mixins(AlertMixin) {
  @Prop({ required: true })
  script!: Script;

  @Prop({ required: false, default: false }) icon!: boolean;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | undefined;

  @Action(Actions.SaveScript)
  save!: (script: Script) => Promise<void>;

  get disabled() {
    const original = this.scriptById(this.script.id);
    return isEqual(this.script, original);
  }

  async saveScript(): Promise<void> {
    try {
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
