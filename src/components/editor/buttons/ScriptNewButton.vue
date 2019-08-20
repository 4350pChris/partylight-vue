<template>
  <v-btn :icon="icon" @click="newScript">
    <v-icon v-if="icon">mdi-new-box</v-icon>
    <slot v-else>New Scripts</slot>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import { Mutations } from '@/store/scripts';

@Component
export default class ScriptNewButton extends Vue {
  @Prop({ required: false, default: false }) icon!: boolean;

  @Mutation(Mutations.SetSelectedScript)
  setSelectedScript!: (id: number | null) => void;

  newScript() {
    this.setSelectedScript(null);
  }
}
</script>
