<template>
  <v-dialog v-model="dialog" max-width="290">
    <template #activator="{ on }">
      <v-btn
        :icon="icon"
        v-on="on"
        v-bind="$attrs"
      >
        <v-icon v-if="icon">mdi-rename-box</v-icon>
        <slot v-else>rename</slot>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">Rename Script</v-card-title>
      <v-card-text>
        <v-text-field v-model="name" />
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn text @click.stop="dialog = false">Cancel</v-btn>
        <v-btn color="primary" text @click="renameScript">Rename</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, PropSync } from 'vue-property-decorator';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';

@Component
export default class ScriptNewButton extends Vue {
  dialog = false;

  name = '';

  @Prop({ required: false, default: false }) icon!: boolean;

  @PropSync('script', { required: true, type: Object })
  syncedScript!: Script;

  mounted() {
    this.name = this.syncedScript.name;
  }

  renameScript() {
    this.$emit('input', this.name);
    this.dialog = false;
  }
}
</script>
