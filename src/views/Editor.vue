<template>
  <v-layout column justify-center>
    <template v-if="!scriptsLoading && script">
      <v-flex shrink>
        <ScriptToolbar :script="script"/>
      </v-flex>
      <v-flex>
        <ScriptEditor class="elevation-2 hidden-sm-and-down" v-model="code"/>
      </v-flex>
    </template>
    <v-flex shrink align-self-center v-else>
      <v-progress-circular size="80" width="8" indeterminate />
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import { State, Getter } from 'vuex-class';
import { Getters } from '@/store/scripts';
import { StoreState } from '@/store';
import Script from '@/models/script';
import ScriptEditor from '@/components/editor/ScriptEditor.vue';
import InitModule from '@/mixins/initModule';
import Alert from '@/mixins/alert';
import ScriptToolbar from '@/components/editor/ScriptToolbar.vue';

@Component({
  components: { ScriptEditor, ScriptToolbar }
})
export default class Editor extends Mixins(Alert, InitModule) {
  scriptsLoading = true;
  dial = true;
  script: Script | null = null;

  get code() {
    if (this.script) {
      return this.script.code;
    }
    return '';
  }

  set code(code: string) {
    const s = this.script as Script;
    this.script = { ...s, code };
  }

  @State((store: StoreState) => store.scripts.selectedScriptId)
  selectedScriptId!: number | null;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | null;

  @Getter(Getters.EmptyScript)
  emptyScript!: Script;

  @Watch('selectedScriptId')
  selectedScriptChanged() {
    if (this.selectedScriptId !== null) {
      this.script = this.scriptById(this.selectedScriptId);
    } else {
      this.script = { ...this.emptyScript };
    }
  }

  created() {
    this.initModule('scripts')
      .then(() => this.selectedScriptChanged())
      .catch((e: any) => this.showAlert({
          type: 'error',
          message: 'Getting script settings from server failed.<br>' + e
        })
      )
      .finally(() => this.scriptsLoading = false);
  }
}
</script>
