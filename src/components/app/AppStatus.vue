<template>
  <v-system-bar status color="info" app window>
    <v-container class="pa-0">
      <v-layout justify-space-between>
        <v-flex>Sampling Rate - {{ samplingRate }}</v-flex>
        <v-flex>Packets / sec - {{ packetsPerSecond }}</v-flex>
        <v-flex>Max Frequency - {{ maximumFrequency }}</v-flex>
        <v-flex>Used Frequency - {{ usedFrequency }}</v-flex>
      </v-layout>
    </v-container>
  </v-system-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { State } from 'vuex-class';
import { StoreState } from '@/store';

@Component
export default class AppStatus extends Vue {
  @State((store: StoreState) => store.dmx.samplingRate)
  private samplingRate!: number;

  @State((store: StoreState) => store.dmx.packetsPerSecond)
  private packetsPerSecond!: number;

  @State((store: StoreState) => store.dmx.maximumFrequency)
  private maximumFrequency!: number;

  @State((store: StoreState) => store.dmx.usedFrequency)
  private usedFrequency!: number;
}
</script>
