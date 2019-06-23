<template>
  <LoadingButton color="success" :outlined="theme.isDark" :load="saveScript">save</LoadingButton>
</template>

<script lang="ts">
import { Component, Prop, Mixins, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';
import { Actions, Mutations } from '@/store/scripts';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';
import ThemeMixin from '@/mixins/theme';
import LoadingButton from '@/components/shared/LoadingButton.vue';

@Component({ components: { LoadingButton }})
export default class ScriptSaveButton extends Mixins(AlertMixin, ThemeMixin) {
  @Prop({ required: true, type: Object })
  script!: Script;

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
