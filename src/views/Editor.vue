<template>
  <v-layout row fill-height>
    <v-flex sm9 md8 fill-height>
      <v-layout column fill-height>
        <v-card class="pb-3" :color="theme.isDark ? '#1e1e1e' : ''">
          <v-card-title primary-title>
            <v-text-field
              v-model="editorScript.name"
              label="Name"
              hide-details
            />
            <v-menu class="hidden-sm-and-up">
              <v-btn color="secondary" slot="activator">scripts</v-btn>
              <ScriptList v-if="!scriptsLoading" @select="editorScript = { ...$event }"/>
            </v-menu>
          </v-card-title>
          <v-card-actions class="mx-2">
            <v-dialog v-show="deleteEnabled" v-model="deleteDialog" max-width="290">
              <v-btn class="lighten-1" color="error" :outline="theme.isDark" slot="activator">Delete</v-btn>
              <v-card>
                <v-card-title class="headline">Confirm Deletion</v-card-title>
                <v-card-text>Are you sure you would like to delete {{ editorScript.name }}?</v-card-text>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="primary" flat @click.native="deleteDialog = false">Cancel</v-btn>
                  <LoadingButton
                    :button-options="{ color: 'primary', flat: true }"
                    :click-handler="closeDeleteHandler(editorScript)"
                  >Delete</LoadingButton>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-spacer/>
            <LoadingButton
              :button-options="{ color: 'accent', outline: theme.isDark }"
              :click-handler="setActiveScriptHandler(editorScript)"
            >activate</LoadingButton>
            <LoadingButton
              :button-options="{ color: 'success', outline: theme.isDark }"
              :click-handler="saveScriptHandler(editorScript)"
            >save</LoadingButton>
          </v-card-actions>
        </v-card>
        <v-flex>
          <ScriptEditor :dark="theme.isDark" class="elevation-2" v-model="editorScript.code" fill-height/>
        </v-flex>
      </v-layout>            
    </v-flex>
    <v-flex ml-3 text-xs-center hidden-xs-only>
      <v-card tile>
        <v-card-actions>
          <v-btn flat block color="primary" @click="newScript()">new script</v-btn>
        </v-card-actions>
      </v-card>
      <ScriptList v-if="!scriptsLoading" @select="editorScript = { ...$event }"/>
      <v-progress-circular v-else indeterminate :size="48"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Actions as ScriptActions, Getters, Mutations } from '@/store/scripts';
import { Component, Inject, Mixins, Vue } from 'vue-property-decorator';
import { State, Action, Mutation, Getter } from 'vuex-class';
import { StoreState, Actions as RootActions, InitFunctions } from '@/store';
import Script from '@/models/script';
import ScriptEditor from '@/components/editor/ScriptEditor.vue';
import ScriptList from '@/components/editor/ScriptList.vue';
import LoadingButton from '@/components/shared/LoadingButton.vue';
import { Constructor } from 'vue/types/options';
import InitModule from '@/mixins/initModule';
import Alert from '@/mixins/alert';

@Component({
  components: {
    LoadingButton,
    ScriptEditor,
    ScriptList
  }
})
export default class Editor extends Mixins(Alert, InitModule) {
  private editorScript: Script | null = null;

  private scriptsLoading = true;

  private deleteDialog = false;

  @Inject()
  private theme!: { isDark: boolean };

  private get deleteEnabled(): boolean {
    return this.editorScript !== null && this.editorScript.id !== undefined;
  }

  @Getter(Getters.ActiveScript)
  private activeScript!: Script | null;

  @State((store: StoreState) => store.scripts.scripts)
  private scripts!: Script[];

  @Action(ScriptActions.SaveScript)
  private save!: (script: Script) => Promise<void>;

  @Action(ScriptActions.SetActiveScript)
  private setActive!: (script: Script) => Promise<void>;

  @Action(ScriptActions.DeleteScript)
  private deleteScript!: (id: number) => Promise<void>;

  private setActiveScriptHandler(script: Script): CallableFunction {
    return () => this.setActive(script).catch((e: any) => this.showAlert({
      type: 'error',
      message: 'Error while setting active script<br>' + e
    }));
  }

  private saveScriptHandler(script: Script): CallableFunction {
    return () => this.save(script).catch((e: any) => this.showAlert({
        type: 'error',
        message: 'Error while saving script<br>' + e
    })).finally(() => this.editorScript = { ...script });
  }

  private closeDeleteHandler(script: Script): CallableFunction {
    return () => script.id === undefined || this.deleteScript(script.id)
      .catch((e: any) => this.showAlert({
        type: 'error',
        message: 'Deleting script on server failed.<br>' + e
      }))
      .finally(() => {
        this.newScript();
        this.deleteDialog = false;
      });
  }

  private newScript() {
    this.editorScript = {
      name: 'New Script',
      code: 'public void setup() {\n\n}\n\npublic void loop() {\n\n}\n'
    };
  }

  private created() {
    this.newScript();
    this.initModule('scripts')
      .catch((e: any) => this.showAlert({
          type: 'error',
          message: 'Getting script settings from server failed.<br>' + e
        })
      )
      .finally(() => (this.scriptsLoading = false));
  }
}
</script>

