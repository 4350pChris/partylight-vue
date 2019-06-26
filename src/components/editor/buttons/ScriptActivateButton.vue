<template>
  <LoadingButton
    color="accent"
    :outlined="theme.isDark"
    :load="setActiveScript"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <slot>activate</slot>
  </LoadingButton>
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
export default class ScriptActivateButton extends Mixins(AlertMixin, ThemeMixin) {
  @Prop({ type: Object, required: true })
  script!: Script;

  @Action(Actions.SetActiveScript)
  setActive!: (id: number | null) => Promise<void>;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | null;

  get disabled(): boolean {
    return this.scriptById(this.script.id) === null;
  }

  async setActiveScript(): Promise<void> {
    return this.setActive(this.script.id).catch((e: any) => this.showAlert({
      type: 'error',
      message: 'Error while setting active script<br>' + e
    }));
  }
}
</script>
