<template>
  <v-layout row fill-height>
    <v-flex md8 fill-height>
      <v-layout column justify-space-around fill-height>
        <v-flex>
          <v-layout row nowrap align-end>
            <v-flex>
              <v-text-field
                v-model="editorScript.name"
                label="Name"
                outline
                hide-details>
              </v-text-field>
            </v-flex>
            <v-flex shrink v-if="$vuetify.breakpoint.xs">
              <v-menu>
                <v-btn class="mr-0" color="secondary" slot="activator">scripts</v-btn>
                <script-list
                  v-if="!scriptsLoading"
                  :scripts="scripts"
                  :active="activeScript"
                  @new="newScript()"
                  @select="scriptSelected($event)"
                ></script-list>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          <v-layout row nowrap>
            <v-flex>
              <v-dialog v-show="deleteEnabled" v-model="deleteDialog" max-width="290">
                <v-btn class="ml-0 lighten-1" color="error" slot="activator">Delete</v-btn>
                <v-card>
                  <v-card-title class="headline">Confirm Deletion</v-card-title>
                  <v-card-text>Are you sure you would like to delete {{ editorScript.name }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click.native="deleteDialog = false">Cancel</v-btn>
                    <v-btn color="primary" flat @click.native="closeDelete(editorScript)">Delete</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-flex text-xs-right>
              <v-btn @click="setActiveScript(editorScript)" color="accent" :loading="activeLoading">activate</v-btn>
              <v-btn @click="saveScript(editorScript)" color="success" class="mr-0" :loading="saveLoading">Save</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex fill-height>
          <script-editor v-model="editorScript.code" class="elevation-4" fill-height/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md4 ml-3 text-xs-center v-if="$vuetify.breakpoint.smAndUp">
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
import { Actions as ScriptActions, Getters, Mutations } from '@/store/scripts';
import { Component, Mixins, Vue } from 'vue-property-decorator';
import { State, Action, Mutation, Getter } from 'vuex-class';
import { StoreState, Actions as RootActions, InitFunctions } from '@/store';
import Script from '@/models/script';
import ScriptEditor from '@/components/editor/ScriptEditor.vue';
import ScriptList from '@/components/editor/ScriptList.vue';
import { Constructor } from 'vue/types/options';
import InitModule from '@/mixins/initModule';

@Component({
  components: {
    ScriptEditor,
    ScriptList
  }
})
export default class Editor extends Mixins(InitModule) {
  private editorScript: Script | null = null;

  private scriptsLoading = true;

  private saveLoading = false;

  private activeLoading = false;

  private deleteDialog = false;

  private get deleteEnabled(): boolean {
    return this.editorScript !== null && this.editorScript.id !== undefined;
  }

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

  @Action(ScriptActions.DeleteScript)
  private deleteScript!: (id: number) => Promise<boolean>;

  private async setActiveScript(script: Script) {
    this.activeLoading = true;
    try {
      await this.setActive(script);
    } catch (error) {
      this.showAlert({
        type: 'error',
        message: 'Error while setting active script<br>' + error
      });
    } finally {
      this.activeLoading = false;
    }
  }

  private async saveScript(script: Script) {
    this.saveLoading = true;
    let success: boolean = false;
    let error: any;
    try {
      success = await this.save(script);
    } catch (e) {
      error = e;
    }
    this.saveLoading = false;
    if (!success || error) {
      this.showAlert({
        type: 'error',
        message: 'Error while saving script<br>' + error
      });
    }
  }

  private async closeDelete(script: Script) {
    this.deleteDialog = false;
    if (script.id === undefined) {
      return;
    }
    let success: boolean = false;
    let error: any;
    try {
      success = await this.deleteScript(script.id);
    } catch (e) {
      error = e;
    } finally {
      if (!success || error) {
        this.showAlert({
          type: 'error',
          message: 'Failed deleting script on server.<br>' + error
        });
      }
    }
  }

  private scriptSelected(script: Script) {
    this.editorScript = { ...script };
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

