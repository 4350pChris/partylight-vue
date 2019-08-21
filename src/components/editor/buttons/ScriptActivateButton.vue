<template>
  <LoadingButton
    color="accent"
    :load="setActiveScript"
    :icon="icon"
    v-bind="$attrs"
  >
    <v-icon v-if="icon">mdi-check-circle</v-icon>
    <slot v-else>activate</slot>
  </LoadingButton>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Actions, Getters } from '@/store/scripts';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';
import LoadingButton from '@/components/shared/LoadingButton.vue';

@Component({ components: { LoadingButton }})
export default class ScriptActivateButton extends Mixins(AlertMixin) {
  @Prop({ type: Object, required: true })
  script!: Script;

  @Prop({ required: false, default: false }) icon!: boolean;

  @Action(Actions.SetActiveScript)
  setActive!: (id: number | null) => Promise<void>;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | null;

  async setActiveScript(): Promise<void> {
    return this.setActive(this.script.id).catch((e: any) => this.showAlert({
      type: 'error',
      message: 'Error while setting active script<br>' + e
    }));
  }
}
</script>
