<template>
  <v-toolbar v-if="script !== null">
    <ScriptList/>
    <ScriptRenameButton v-model="name" :icon="true" />
    <v-spacer/>
    <ScriptNewButton :icon="true"/>
    <ScriptActivateButton :script="script" :icon="true" />
    <ScriptDeleteButton :script="script" :icon="true"/>
    <ScriptSaveButton :script="script" :icon="true" />
  </v-toolbar>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ScriptList from '@/components/editor/ScriptList.vue';
import ScriptActivateButton from '@/components/editor/buttons/ScriptActivateButton.vue';
import ScriptDeleteButton from '@/components/editor/buttons/ScriptDeleteButton.vue';
import ScriptNewButton from '@/components/editor/buttons/ScriptNewButton.vue';
import ScriptSaveButton from '@/components/editor/buttons/ScriptSaveButton.vue';
import ScriptRenameButton from '@/components/editor/buttons/ScriptRenameButton.vue';
import Script from '@/models/script';
import { State, Action, Getter } from 'vuex-class';
import { StoreState } from '@/store';
import { Actions, Getters } from '@/store/scripts';

@Component({
  components: { ScriptList, ScriptActivateButton, ScriptDeleteButton, ScriptNewButton, ScriptSaveButton, ScriptRenameButton }
})
export default class ScriptToolbar extends Vue {
  @State((store: StoreState) => store.scripts.editorScript)
  script!: Script | null;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | null;

  @Action(Actions.UpdateEditorScript)
  updateScript!: (s: Partial<Script>) => void;

  @Action(Actions.SaveScript)
  saveScript!: (s: Script) => Promise<void>;

  get name() {
    return this.script ? this.script.name : '';
  }

  set name(name: string) {
    this.updateScript({ ...this.script, name });
    if (this.script !== null) {
      const existing = this.scriptById(this.script.id);
      if (existing !== null) {
        this.saveScript({ ...existing, name });
      }
    }
  }
}
</script>
