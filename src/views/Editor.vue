<template>
  <v-layout column justify-center>
    <template v-if="!scriptsLoading">
      <v-flex shrink>
        <v-layout column>
          <v-container fluid grid-list-md>
            <v-layout align-end row wrap>
              <v-flex xs12 sm6 md3 v-if="$vuetify.breakpoint.mdAndUp">
                <v-text-field v-model="editorScript.name" label="Name" hide-details/>
              </v-flex>
              <v-flex xs12 sm6 md3>
                <ScriptList class="script-list" />
              </v-flex>
                <v-spacer/>
                <v-flex v-if="$vuetify.breakpoint.mdAndUp">
                  <v-btn @click="newScript">New Script</v-btn>
                </v-flex>
                <v-flex class="text-xs-right">
                  <ScriptDeleteButton :script="editorScript" />
                  <ScriptActivateButton :script="editorScript" />
                  <ScriptSaveButton v-if="$vuetify.breakpoint.mdAndUp" :script="editorScript" />
                </v-flex>
            </v-layout>
          </v-container>
        </v-layout>            
      </v-flex>
      <v-flex v-if="$vuetify.breakpoint.smAndUp">
        <ScriptEditor class="elevation-2" :code.sync="editorScript.code"/>
      </v-flex>
    </template>
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
  dial = true;

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

<style scoped>
.script-list {
  margin-bottom: -3px;
}
</style>
