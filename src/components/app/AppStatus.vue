<template>
  <v-container>
    <v-row dense v-for="{ text, value } in items" :key="text">
      <v-col cols="9">{{ text }}</v-col>
      <v-col>{{ value }}</v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { State } from 'vuex-class';
import { StoreState } from '@/store';

@Component
export default class AppStatus extends Vue {
  @State((store: StoreState) => store.dmx.samplingRate)
  samplingRate!: number;

  @State((store: StoreState) => store.dmx.packetsPerSecond)
  packetsPerSecond!: number;

  @State((store: StoreState) => store.dmx.maximumFrequency)
  maximumFrequency!: number;

  @State((store: StoreState) => store.dmx.usedFrequency)
  usedFrequency!: number;

  get items() {
    return [
      { text: 'Sampling Rate', value: this.samplingRate },
      { text: 'Packets per Second', value: this.packetsPerSecond },
      { text: 'Used Frequency', value: this.usedFrequency },
      { text: 'Maximum Frequency', value: this.maximumFrequency }
    ];
  }
}
</script>
