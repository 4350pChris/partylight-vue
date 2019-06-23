<template>
  <v-layout row fill-height justify-center align-center>
    <v-flex xs12 fill-height v-if="!scriptsLoading">
      <v-layout column fill-height>
        <v-card class="pb-3" :color="theme.isDark ? '#1e1e1e' : ''">
          <v-container fluid grid-list-lg>
            <v-layout align-end>
              <v-flex xs12 lg3>
                <v-text-field v-model="editorScript.name" label="Name" hide-details/>
              </v-flex>
              <v-flex xs12 lg4 xl3>
                <ScriptList/>
              </v-flex>
              <v-spacer/>
              <v-flex class="text-xs-right">
                <v-btn @click="newScript">New Script</v-btn>
                <ScriptDeleteButton :script="editorScript" />
                <ScriptActivateButton :script="editorScript" />
                <ScriptSaveButton :script="editorScript" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-flex>
          <ScriptEditor class="elevation-2" v-model="editorScript.code" fill-height/>
        </v-flex>
      </v-layout>            
    </v-flex>
    <v-progress-circular size="80" width="8" indeterminate v-else />
  </v-layout>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { State, Mutation, Getter } from 'vuex-class';
import { Getters, Mutations } from '@/store/scripts';
import { StoreState, InitFunctions } from '@/store';
import Script from '@/models/script';
import ScriptEditor from '@/components/editor/ScriptEditor.vue';
import ScriptList from '@/components/editor/ScriptList.vue';
import InitModule from '@/mixins/initModule';
import Alert from '@/mixins/alert';
import ThemeMixin from '@/mixins/theme';
import ScriptActivateButton from '@/components/editor/buttons/ScriptActivateButton.vue';
import ScriptDeleteButton from '@/components/editor/buttons/ScriptDeleteButton.vue';
import ScriptSaveButton from '@/components/editor/buttons/ScriptSaveButton.vue';

@Component({
  components: {
    ScriptEditor,
    ScriptList,
    ScriptActivateButton,
    ScriptDeleteButton,
    ScriptSaveButton,
  }
})
export default class Editor extends Mixins(Alert, ThemeMixin, InitModule) {
  scriptsLoading = true;

  @State((store: StoreState) => store.scripts.selectedScriptId)
  selectedScriptId!: number | null;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | null;

  @Getter(Getters.EmptyScript)
  emptyScript!: Script;

  @Mutation(Mutations.SetSelectedScript)
  setSelectedScript!: (id: number | null) => void;

  get editorScript(): Script {
    let script: Script | null = null;
    if (this.selectedScriptId !== null) {
      script = this.scriptById(this.selectedScriptId);
    }
    return script === null ? this.emptyScript : { ...script };
  }

  newScript() {
    this.setSelectedScript(null);
  }

  created() {
    this.initModule('scripts')
      .catch((e: any) => this.showAlert({
          type: 'error',
          message: 'Getting script settings from server failed.<br>' + e
        })
      )
      .finally(() => this.scriptsLoading = false);
  }
}
</script>

