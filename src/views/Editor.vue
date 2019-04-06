<template>
  <v-layout row fill-height>
    <v-flex sm9 md8 fill-height>
      <v-layout column justify-space-around fill-height>
        <v-flex>
          <v-layout row nowrap>
            <v-flex>
              <v-dialog v-show="deleteEnabled" v-model="deleteDialog" max-width="290">
                <v-btn class="ml-0 lighten-1" color="error" slot="activator">Delete</v-btn>
                <v-card>
                  <v-card-title class="headline">Confirm Deletion</v-card-title>
                  <v-card-text>Are you sure you would like to delete {{ editorScript.name }}?</v-card-text>
                  <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" flat @click.native="deleteDialog = false">Cancel</v-btn>
                    <LoadingButton
                      class="primary"
                      :click-handler="closeDeleteHandler(editorScript)"
                    >Delete</LoadingButton>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-spacer/>
            <v-flex shrink>
              <LoadingButton
                class="accent"
                :click-handler="setActiveScriptHandler(editorScript)"
              >activate</LoadingButton>
              <LoadingButton
                class="mr-0 success"
                :click-handler="saveScriptHandler(editorScript)"
              >Save</LoadingButton>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="mb-2">
          <v-layout row nowrap align-end>
            <v-flex>
              <v-text-field
                v-model="editorScript.name"
                label="Name"
                hide-details
              />
            </v-flex>
            <v-spacer/>
            <v-flex shrink hidden-sm-and-up>
              <v-menu>
                <v-btn class="mr-0 mb-0" color="secondary" slot="activator">scripts</v-btn>
                <ScriptList v-if="!scriptsLoading" @select="editorScript = { ...$event }"/>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex fill-height>
          <ScriptEditor v-model="editorScript.code" class="elevation-4" fill-height/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex ml-3 text-xs-center hidden-xs-only>
      <v-card tile>
        <v-card-actions>
          <v-btn flat block color="primary" @click="newScript()">new script</v-btn>
        </v-card-actions>
      </v-card>
      <ScriptList v-if="!scriptsLoading" @select="editorScript = { ...$event }"></ScriptList>
      <v-progress-circular v-else indeterminate :size="48"/>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Actions as ScriptActions, Getters, Mutations } from '@/store/scripts';
import { Component, Mixins, Vue } from 'vue-property-decorator';
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
        message: 'Failed deleting script on server.<br>' + e
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
          message: 'Failed getting script settings from server.<br>' + e
        })
      )
      .finally(() => (this.scriptsLoading = false));
  }
}
</script>

