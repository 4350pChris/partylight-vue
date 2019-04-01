<template>
  <v-layout row fill-height>
    <v-flex md8 mr-3 fill-height>
      <v-layout column justify-space-around fill-height>
        <v-flex>
          <v-text-field outline v-model="editorScript.name" hide-details label="Name"></v-text-field>
        </v-flex>
        <v-flex text-xs-right>
          <v-btn @click="saveScript(editorScript)" class="mb-0" color="success" :loading="saveLoading">Save</v-btn>
          <v-btn @click="setActiveScript(editorScript)" class="mb-0 mr-0" color="accent" :loading="activeLoading">Set Active</v-btn>
        </v-flex>
        <v-flex mt-2 class="editor" fill-height>
          <script-editor v-model="editorScript.code" class="elevation-4" fill-height/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md4 text-xs-center>
      <script-list
        v-if="!scriptsLoading"
        :scripts="scripts"
        :active="activeScript"
        @new="newScript()"
        @select="scriptSelected($event)"
      ></script-list>
      <v-progress-circular v-else indeterminate :size="48"></v-progress-circular>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Actions as AlertActions } from '@/store/alert';
import { Actions as ScriptActions, Getters, Mutations, initScripts } from '@/store/scripts';
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Mutation, Getter } from 'vuex-class';
import { StoreState } from '@/store';
import Script from '@/models/script';
import ScriptEditor from '@/components/editor/ScriptEditor.vue';
import ScriptList from '@/components/editor/ScriptList.vue';

@Component({
  components: {
    ScriptEditor,
    ScriptList
  }
})
export default class Editor extends Vue {
  private editorScript: Script = {
    name: 'New Script',
    code: 'public void setup() {\n\n}\n\npublic void loop() {\n\n}\n'
  };

  private scriptsLoading = true;

  private saveLoading = false;

  private activeLoading = false;

  @Getter(Getters.ActiveScript)
  private activeScript!: Script | null;

  @State((store: StoreState) => store.scripts.scripts)
  private scripts!: Script[];

  @Action(AlertActions.ShowAlert)
  private showAlert!: (
    payload: { type: string; duration?: number; message: string }
  ) => void;

  @Action(ScriptActions.SaveScript)
  private save!: (script: Script) => Promise<boolean>;

  @Action(ScriptActions.SetActiveScript)
  private setActive!: (script: Script) => Promise<void>;

  private setActiveScript(script: Script) {
    this.activeLoading = true;
    return this.setActive(script).catch(e =>
      this.showAlert({
        type: 'error',
        message: 'Error while setting active script<br>' + e
      })
    ).finally(() => (this.activeLoading = false));
  }

  private saveScript(script: Script) {
    this.saveLoading = false;
    return this.save(script).catch(e =>
      this.showAlert({
        type: 'error',
        message: 'Error while saving script<br>' + e
      })
    ).finally(() => (this.saveLoading = false));
  }

  private newScript() {
    this.editorScript = {
      name: 'New Script',
      code: 'public void setup() {\n\n}\n\npublic void loop() {\n\n}\n'
    };
  }

  private scriptSelected(script: Script) {
    this.editorScript = { ...script };
  }

  private created() {
    initScripts(this.$store)
      .catch(e =>
        this.showAlert({
          type: 'error',
          message: 'Failed getting script settings from server.<br>' + e
        })
      )
      .finally(() => (this.scriptsLoading = false));
  }
}
</script>

