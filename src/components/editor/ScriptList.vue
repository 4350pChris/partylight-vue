<template>
  <v-select
    v-model="value"
    class="py-1"
    :items="scripts"
    item-text="name"
    item-value="id"
    solo
    rounded
    hide-details
    label="Select a script"
  >
    <template #item="{ item }">
      <ScriptItem :active="isActiveScript(item)" :value="item" />
    </template>
    <template #selection="{ item }">
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

  @State((store: StoreState) => store.scripts.selectedScriptId)
  selectedScriptId!: number;

  @State((store: StoreState) => store.scripts.activeScriptId)
  activeScriptId!: number;

  @Getter(Getters.ScriptById)
  scriptById!: (id: number) => Script | undefined;

  @Mutation(Mutations.SetSelectedScript)
  setSelectedScript!: (id: number) => void;

  get value() {
    return this.selectedScriptId;
  }

  set value(val: number) {
    this.setSelectedScript(val);
  }

  get active(): Script | null {
    return this.scriptById(this.activeScriptId) || null;
  }

  isActiveScript(script: Script) {
    return this.active !== null && this.active.id === script.id;
  }
}
</script>

