<template>
  <v-layout row fill-height>
    <v-flex md8 fill-height>
      <v-layout column justify-space-around fill-height>
        <v-flex>
          <v-text-field outline v-model="editorScript.name" hide-details label="Name"></v-text-field>
        </v-flex>
        <v-flex>
          <v-layout row nowrap justify-space-around>
            <v-flex v-if="$vuetify.breakpoint.smAndDown">
              <v-menu>
                <template v-slot:activator="{ on }">
                  <v-btn class="ml-0" color="secondary" v-on="on">scripts</v-btn>
                </template>
                <script-list
                  v-if="!scriptsLoading"
                  :scripts="scripts"
                  :active="activeScript"
                  @new="newScript()"
                  @select="scriptSelected($event)"
                ></script-list>
              </v-menu>
            </v-flex>
            <v-flex text-xs-right>
              <v-btn @click="saveScript(editorScript)" color="success" :loading="saveLoading">Save</v-btn>
              <v-btn @click="setActiveScript(editorScript)" class="mr-0" color="accent" :loading="activeLoading">Set Active</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex mt-2 fill-height>
          <script-editor v-model="editorScript.code" class="elevation-4" fill-height/>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex md4 ml-3 text-xs-center v-if="$vuetify.breakpoint.mdAndUp">
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

  private saveScript(script: Script) {
    this.saveLoading = true;
    try {
      this.save(script);
    } catch (error) {
      this.showAlert({
        type: 'error',
        message: 'Error while saving script<br>' + error
      });
    } finally {
      this.saveLoading = false;
    }
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

