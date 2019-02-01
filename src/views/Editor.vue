<template>
  <v-container>
    <v-layout row fill-height>
      <v-flex xs12 md8>
        <v-card raised>
          <script-editor id="editor" v-model="editorScript.code"/>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 mx-1>
        <v-btn @click="saveScript(editorScript)">Save</v-btn>
        <v-btn @click="setActiveScript(editorScript)">Set Active</v-btn>
        <script-list :scripts="scripts" @new="newScript()" @select="scriptSelected($event)"></script-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Mutation } from "vuex-class";
import ScriptEditor from "@/components/ScriptEditor.vue";
import ScriptList from "@/components/ScriptList.vue";
import Script from "@/models/script";
import { Store } from "@/store";
import { Actions } from "@/store/scripts";
import { Mutations } from '@/store/scripts';

@Component({
  components: {
    ScriptEditor,
    ScriptList
  }
})
export default class Editor extends Vue {
  private editorScript: Script = { name: "New Script", code: "" };

  @State((store: Store) => store.scripts.activeScript)
  private activeScript!: Script | null;

  @State((store: Store) => store.scripts.scripts) private scripts!: Script[];

  @Action(Actions.SaveScript) private saveScript!: (
    script: Script
  ) => Promise<boolean>;

  @Action(Actions.SetActiveScript) private setActiveScript!: (
    script: Script
  ) => Promise<boolean>;

  private newScript() {
    this.editorScript = { name: "New Script", code: "" };
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

