<template>
  <v-tabs v-model="tab" class="elevation-2 align-self-start" fixed-tabs>
    <v-tab v-for="(name, i) in ['Visual', 'Audio']" :key="i">{{name}}</v-tab>
    <v-tab-item>
      <visual-panel></visual-panel>
    </v-tab-item>
    <v-tab-item>
      <audio-panel></audio-panel>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AudioPanel from '@/components/settings/AudioPanel.vue';
import VisualPanel from '@/components/settings/VisualPanel.vue';

@Component({
  components: { AudioPanel, VisualPanel }
})
export default class SettingsList extends Vue {
  tab = 0;
}
</script>

