<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex md8 mr-3>
        <v-layout row wrap justify-space-between align-end>
          <v-flex md5>
            <v-text-field outline v-model="editorScript.name" hide-details label="Name"></v-text-field>
          </v-flex>
          <v-flex md6 text-xs-right>
            <v-btn @click="saveScript(editorScript)" class="mb-0">Save</v-btn>
            <v-btn @click="setActiveScript(editorScript)" class="mb-0 mr-0">Set Active</v-btn>
          </v-flex>
          <v-flex md12>
            <v-card raised>
              <script-editor id="editor" v-model="editorScript.code"/>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4>
        <script-list :scripts="scripts" :active="activeScript" @new="newScript()" @select="scriptSelected($event)"></script-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Mutation, Getter } from 'vuex-class';
import ScriptEditor from '@/components/ScriptEditor.vue';
import ScriptList from '@/components/ScriptList.vue';
import Script from '@/models/script';
import { StoreState } from '@/store';
import { Actions, Getters, Mutations } from '@/store/scripts';

@Component({
  components: {
    ScriptEditor,
    ScriptList
  }
})
export default class Editor extends Vue {
  private editorScript: Script = { name: 'New Script', code: '' };

  @Getter(Getters.ActiveScript)
  private activeScript!: Script | null;

  @State((store: StoreState) => store.scripts.scripts)
  private scripts!: Script[];

  @Action(Actions.SaveScript)
  private saveScript!: (script: Script) => Promise<boolean>;

  @Action(Actions.SetActiveScript)
  private setActiveScript!: (script: Script) => Promise<boolean>;

  private newScript() {
    this.editorScript = { name: 'New Script', code: '' };
  }

  private scriptSelected(script: Script) {
    this.editorScript = { ...script };
  }
}
</script>

<style scoped>
#editor {
  height: 100%;
}
</style>

