<template>
  <v-dialog v-model="dialog" max-width="290">
    <template #activator="{ on: dialog }">
      <v-tooltip bottom>
        <span>Rename</span>
        <template #activator="{ on: tooltip }">
          <v-btn
            :icon="icon"
            v-on="{ ...dialog, ...tooltip }"
            v-bind="$attrs"
          >
            <v-icon v-if="icon">mdi-rename-box</v-icon>
            <slot v-else>rename</slot>
          </v-btn>
        </template>
      </v-tooltip>
    </template>
    <v-card>
      <v-card-title class="headline">Rename Script</v-card-title>
      <v-card-text>
        <v-text-field :value="name" @input="localName = $event" />
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
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator';
import Script from '@/models/script';
import AlertMixin from '@/mixins/alert';

@Component
export default class ScriptRenameButton extends Vue {
  dialog = false;

  localName = '';

  @Prop({ required: false, default: false }) icon!: boolean;

  @Model('change', { required: true })
  name!: string;

  @Watch('name')
  nameChanged() {
    this.localName = this.name;
  }

  renameScript() {
    this.$emit('change', this.localName);
    this.dialog = false;
  }
}
</script>
