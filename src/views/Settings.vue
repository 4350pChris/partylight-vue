<template>
  <v-layout>
    <v-flex xs12>
      <v-list :elevation="4" class="panels">
        <v-list-group prepend-icon="mdi-eye">
          <template #activator>
            <v-list-item-title>Visual</v-list-item-title>
          </template>
          <VisualPanel/>
          <v-divider/>
        </v-list-group>
        <v-list-group prepend-icon="mdi-ear-hearing">
          <template #activator>
            <v-list-item-title>Audio</v-list-item-title>
          </template>
          <AudioPanel/>
        </v-list-group>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AudioPanel from '@/components/settings/AudioPanel.vue';
import VisualPanel from '@/components/settings/VisualPanel.vue';

@Component({
  components: { AudioPanel, VisualPanel }
})
export default class SettingsList extends Vue {}
</script>

<style lang="scss">
.panels .v-expansion-panel:last-child {
  &::before {
    box-shadow: none;
  }
}
</style>
