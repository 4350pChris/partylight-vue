<template>
  <v-layout column justify-center>
    <template v-if="!scriptsLoading">
      <v-flex shrink>
        <v-container fluid>
          <v-layout align-center row wrap justify-md-space-between justify-end>
            <v-flex md3 class="hidden-sm-and-down">
              <v-text-field v-model="editorScript.name" label="Name" hide-details/>
            </v-flex>
            <v-flex xs12 md4>
              <ScriptList class="script-list" />
            </v-flex>
            <v-flex shrink class="mt-4 mt-md-0">
              <v-btn-toggle rounded>
                <ScriptActivateButton :script="editorScript" text />
                <v-btn text v-if="$vuetify.breakpoint.mdAndUp" @click="newScript">New Script</v-btn>
                <ScriptDeleteButton :script="editorScript" text />
                <ScriptSaveButton v-if="$vuetify.breakpoint.mdAndUp" text :script="editorScript" />
              </v-btn-toggle>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex>
        <ScriptEditor class="elevation-2 hidden-sm-and-down" :code.sync="editorScript.code"/>
      </v-flex>
    </template>
    <v-flex shrink align-self-center v-else>
      <v-progress-circular size="80" width="8" indeterminate />
    </v-flex>
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
