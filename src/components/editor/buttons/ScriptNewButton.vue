<template>
  <v-btn :icon="icon" @click="newScript">
    <v-icon v-if="icon">mdi-new-box</v-icon>
    <slot v-else>New Scripts</slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { Actions } from '@/store/scripts';

@Component
export default class ScriptNewButton extends Vue {
  @Prop({ required: false, default: false }) icon!: boolean;

  @Action(Actions.UpdateEditorScript)
  setEditorScript!: () => void;

  newScript() {
    this.setEditorScript();
  }
}
</script>
