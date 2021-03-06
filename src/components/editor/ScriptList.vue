<template>
  <v-select
    v-model="value"
    :items="scripts"
    item-text="name"
    item-value="id"
    hide-details
    single-line
    label="Select a script"
  >
    <template #prepend-inner>
      <v-slide-x-transition>
        <v-icon v-if="active" color="success">mdi-check-circle</v-icon>
      </v-slide-x-transition>
    </template>
    <template #item="{ item }">
      <ScriptItem :active="isActiveScript(item)" :value="item" />
    </template>
  </v-select>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Script from '@/models/script';
import { StoreState } from '@/store';
import { Actions, Getters, Mutations } from '@/store/scripts';
import { Action, Getter, Mutation, State } from 'vuex-class';
import ScriptItem from './ScriptItem.vue';

@Component({ components: { ScriptItem }})
export default class ScriptList extends Vue {
  @State((store: StoreState) => store.scripts.scripts)
  scripts!: Script[];

  @State((store: StoreState) => store.scripts.editorScript)
  editorScript!: Script | null;

  @State((store: StoreState) => store.scripts.activeScriptId)
  activeScriptId!: number;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | undefined;

  @Mutation(Mutations.SetEditorScript)
  setEditorScript!: (script: Script | number | null) => void;

  get value() {
    return this.editorScript ? this.editorScript.id : undefined;
  }

  set value(val: number | undefined) {
    this.setEditorScript(val === undefined ? null : val);
  }

  get active(): Script | null {
    return this.scriptById(this.activeScriptId) || null;
  }

  isActiveScript(script: Script) {
    return this.active !== null && this.active.id === script.id;
  }
}
</script>

